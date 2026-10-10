import { NextRequest, NextResponse } from "next/server";
import { analyzeCivicImage } from "@/lib/gemini";
import { retrieveCivicGuidance } from "@/lib/rag";
import { findDuplicateCandidates } from "@/lib/duplicateMatcher";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { AnalyzeReportResponse, CivicReport } from "@/lib/types/api";

export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic"]);

/**
 * Validate image buffer magic numbers to prevent malicious or non-image payloads.
 */
function isValidImageSignature(buffer: Buffer): { valid: boolean; detectedMime?: string } {
  if (buffer.length < 12) return { valid: false };

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedMime: "image/jpeg" };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, detectedMime: "image/png" };
  }

  // WEBP: RIFF .... WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, detectedMime: "image/webp" };
  }

  // HEIC: ftypheic / ftypmif1
  const brand = buffer.subarray(4, 12).toString("ascii");
  if (brand.startsWith("ftyp") && (brand.includes("heic") || brand.includes("mif1") || brand.includes("heix"))) {
    return { valid: true, detectedMime: "image/heic" };
  }

  return { valid: false };
}

/**
 * Strictly validate that image_url points exclusively to the authorized CivicLens Supabase storage bucket.
 * Mitigates SSRF against localhost, private IP networks, cloud metadata (169.254.169.254), and external sites.
 */
function isAuthorizedStorageUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:") return false;

    const configuredSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!configuredSupabaseUrl) return false;

    const supabaseHost = new URL(configuredSupabaseUrl).hostname.toLowerCase();
    if (parsed.hostname.toLowerCase() !== supabaseHost) return false;

    // Must be in the civic-reports storage bucket path
    const validPrefix = "/storage/v1/object/public/civic-reports/";
    const validAuthPrefix = "/storage/v1/object/authenticated/civic-reports/";
    return parsed.pathname.startsWith(validPrefix) || parsed.pathname.startsWith(validAuthPrefix);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let uploadedStorageFileName: string | null = null;
  const supabase = getSupabaseServerClient();

  try {
    let imageBuffer: Buffer | null = null;
    let mimeType = "image/jpeg";
    let description = "";
    let latitude: number | null = null;
    let longitude: number | null = null;
    let existingImageUrl: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    // 1. Parse and validate request body
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const imageFile = formData.get("image") as File | null;
      description = ((formData.get("description") as string) || "").slice(0, 2000);
      const latStr = formData.get("latitude") as string | null;
      const lonStr = formData.get("longitude") as string | null;

      if (latStr !== null && latStr.trim() !== "") {
        const parsedLat = parseFloat(latStr);
        if (isNaN(parsedLat) || !isFinite(parsedLat)) {
          return NextResponse.json<AnalyzeReportResponse>(
            { success: false, error: "Invalid latitude: must be a valid finite number." },
            { status: 400 }
          );
        }
        latitude = parsedLat;
      }

      if (lonStr !== null && lonStr.trim() !== "") {
        const parsedLon = parseFloat(lonStr);
        if (isNaN(parsedLon) || !isFinite(parsedLon)) {
          return NextResponse.json<AnalyzeReportResponse>(
            { success: false, error: "Invalid longitude: must be a valid finite number." },
            { status: 400 }
          );
        }
        longitude = parsedLon;
      }

      if (!imageFile || imageFile.size === 0) {
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: "Missing required 'image' file in multipart upload." },
          { status: 400 }
        );
      }

      if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: `Image file exceeds maximum allowable size (15MB).` },
          { status: 400 }
        );
      }

      mimeType = imageFile.type || "image/jpeg";
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    } else if (contentType.includes("application/json")) {
      let body: any;
      try {
        body = await req.json();
      } catch {
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: "Malformed JSON payload." },
          { status: 400 }
        );
      }

      description = (body.description || "").toString().slice(0, 2000);

      if (body.latitude !== undefined && body.latitude !== null) {
        if (typeof body.latitude !== "number" || !isFinite(body.latitude)) {
          return NextResponse.json<AnalyzeReportResponse>(
            { success: false, error: "Invalid latitude: must be a finite number." },
            { status: 400 }
          );
        }
        latitude = body.latitude;
      }

      if (body.longitude !== undefined && body.longitude !== null) {
        if (typeof body.longitude !== "number" || !isFinite(body.longitude)) {
          return NextResponse.json<AnalyzeReportResponse>(
            { success: false, error: "Invalid longitude: must be a finite number." },
            { status: 400 }
          );
        }
        longitude = body.longitude;
      }

      if (body.image_base64) {
        try {
          imageBuffer = Buffer.from(body.image_base64, "base64");
          if (imageBuffer.length > MAX_IMAGE_SIZE_BYTES) {
            return NextResponse.json<AnalyzeReportResponse>(
              { success: false, error: "Base64 image exceeds 15MB limit." },
              { status: 400 }
            );
          }
          mimeType = body.mime_type || "image/jpeg";
        } catch {
          return NextResponse.json<AnalyzeReportResponse>(
            { success: false, error: "Malformed base64 image encoding." },
            { status: 400 }
          );
        }
      } else if (body.image_url || body.imageUrl) {
        existingImageUrl = (body.image_url || body.imageUrl).toString().trim();

        // Strict SSRF validation
        if (!isAuthorizedStorageUrl(existingImageUrl!)) {
          return NextResponse.json<AnalyzeReportResponse>(
            {
              success: false,
              error: "Rejected image_url: only images stored in the official CivicLens Supabase storage bucket are permitted.",
            },
            { status: 400 }
          );
        }

        // Bounded fetch from authorized Supabase Storage only
        try {
          const fetchRes = await fetch(existingImageUrl!, {
            signal: AbortSignal.timeout(8000), // 8s timeout
          });

          if (!fetchRes.ok) {
            return NextResponse.json<AnalyzeReportResponse>(
              { success: false, error: `Could not retrieve image from storage: HTTP ${fetchRes.status}` },
              { status: 400 }
            );
          }

          const contentLength = parseInt(fetchRes.headers.get("content-length") || "0", 10);
          if (contentLength > MAX_IMAGE_SIZE_BYTES) {
            return NextResponse.json<AnalyzeReportResponse>(
              { success: false, error: "Remote image exceeds 15MB size limit." },
              { status: 400 }
            );
          }

          const arr = await fetchRes.arrayBuffer();
          if (arr.byteLength > MAX_IMAGE_SIZE_BYTES) {
            return NextResponse.json<AnalyzeReportResponse>(
              { success: false, error: "Remote image exceeds 15MB size limit." },
              { status: 400 }
            );
          }

          imageBuffer = Buffer.from(arr);
          mimeType = fetchRes.headers.get("content-type") || "image/jpeg";
        } catch (downloadErr) {
          return NextResponse.json<AnalyzeReportResponse>(
            { success: false, error: "Timeout or failure reading image from storage bucket." },
            { status: 400 }
          );
        }
      }

      if (!imageBuffer) {
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: "Missing required 'image_base64' or valid 'image_url' in request." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json<AnalyzeReportResponse>(
        { success: false, error: "Unsupported Content-Type. Please use multipart/form-data or application/json." },
        { status: 415 }
      );
    }

    // 2. Validate Coordinate Ranges (-90 to 90, -180 to 180)
    if (latitude !== null && (latitude < -90 || latitude > 90)) {
      return NextResponse.json<AnalyzeReportResponse>(
        { success: false, error: "Latitude must be between -90 and +90 degrees." },
        { status: 400 }
      );
    }

    if (longitude !== null && (longitude < -180 || longitude > 180)) {
      return NextResponse.json<AnalyzeReportResponse>(
        { success: false, error: "Longitude must be between -180 and +180 degrees." },
        { status: 400 }
      );
    }

    // 3. Validate Image Buffer Signature (Magic Bytes)
    const signature = isValidImageSignature(imageBuffer);
    if (!signature.valid) {
      return NextResponse.json<AnalyzeReportResponse>(
        { success: false, error: "Invalid image format. Supported formats: JPEG, PNG, WebP, HEIC." },
        { status: 400 }
      );
    }
    if (signature.detectedMime) {
      mimeType = signature.detectedMime;
    }

    // 4. Upload to Supabase Storage if new image provided
    let storedImageUrl = existingImageUrl || "";

    if (!storedImageUrl) {
      const fileExt = mimeType.split("/")[1] || "jpg";
      const randomId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10);
      const fileName = `report_${Date.now()}_${randomId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("civic-reports")
        .upload(fileName, imageBuffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload failure:", uploadError.message);
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: "Storage service temporarily unavailable. Could not save issue image." },
          { status: 503 }
        );
      }

      uploadedStorageFileName = fileName;
      const { data: publicUrlData } = supabase.storage.from("civic-reports").getPublicUrl(fileName);
      storedImageUrl = publicUrlData.publicUrl;
    }

    // 5. Multimodal AI Vision Analysis with Gemini
    const analysis = await analyzeCivicImage(imageBuffer, mimeType, description);

    // 6. Grounded RAG Retrieval from Authentic Civic Sources
    const ragResult = await retrieveCivicGuidance(
      `${analysis.description_summary} ${description}`,
      analysis.issue_type
    );

    const departmentRec = ragResult.recommendedDepartment || {
      name: "unknown",
      reason: "Official responsibility has not been verified from image alone.",
    };

    // 7. Spatial Duplicate Candidate Matching
    const possibleDuplicates = await findDuplicateCandidates(
      analysis.issue_type,
      latitude,
      longitude
    );

    // 8. Persist Real Report in Supabase Database
    const { data: inserted, error: insertError } = await supabase
      .from("reports")
      .insert({
        image_url: storedImageUrl,
        latitude: latitude,
        longitude: longitude,
        description: description || null,
        issue_type: analysis.issue_type,
        severity: analysis.severity,
        severity_reason: analysis.severity_reason,
        description_summary: analysis.description_summary,
        department: departmentRec.name,
        department_reason: departmentRec.reason,
        ai_reason: `${analysis.severity_reason} — ${departmentRec.reason}`,
        evidence: ragResult.evidence,
        status: "pending_review",
      })
      .select("id, created_at")
      .single();

    if (insertError || !inserted) {
      console.error("Database insert error:", insertError?.message);

      // Rollback newly uploaded file to avoid orphaned storage object
      if (uploadedStorageFileName) {
        try {
          await supabase.storage.from("civic-reports").remove([uploadedStorageFileName]);
        } catch (cleanupErr) {
          console.warn("Storage rollback warning:", (cleanupErr as Error).message);
        }
      }

      return NextResponse.json<AnalyzeReportResponse>(
        { success: false, error: "Failed to persist civic report record. Please retry." },
        { status: 500 }
      );
    }

    // 9. Return Canonical Contract Response
    const responseReport: CivicReport = {
      id: inserted.id,
      issue_type: analysis.issue_type,
      severity: analysis.severity,
      severity_reason: analysis.severity_reason,
      description_summary: analysis.description_summary,
      department_recommendation: {
        name: departmentRec.name,
        reason: departmentRec.reason,
        sla_hours: departmentRec.sla_hours,
      },
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      possible_duplicates: possibleDuplicates,
      evidence: ragResult.evidence,
      status: "pending_review",
      image_url: storedImageUrl,
      created_at: inserted.created_at || new Date().toISOString(),
    };

    return NextResponse.json<AnalyzeReportResponse>({
      success: true,
      report: responseReport,
    });
  } catch (error) {
    console.error("Unhandled error in /api/analyze-report:", (error as Error).message);

    // Rollback storage upload on unhandled exception
    if (uploadedStorageFileName) {
      try {
        await supabase.storage.from("civic-reports").remove([uploadedStorageFileName]);
      } catch {}
    }

    return NextResponse.json<AnalyzeReportResponse>(
      {
        success: false,
        error: "An unexpected error occurred while processing the civic report.",
      },
      { status: 500 }
    );
  }
}
