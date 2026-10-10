import { NextRequest, NextResponse } from "next/server";
import { analyzeCivicImage } from "@/lib/gemini";
import { retrieveCivicGuidance } from "@/lib/rag";
import { findDuplicateCandidates } from "@/lib/duplicateMatcher";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { AnalyzeReportResponse, CivicReport } from "@/lib/types/api";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let imageBuffer: Buffer | null = null;
    let mimeType = "image/jpeg";
    let description = "";
    let latitude: number | null = null;
    let longitude: number | null = null;
    let existingImageUrl: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    // 1. Parse multipart/form-data or JSON request
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const imageFile = formData.get("image") as File | null;
      description = (formData.get("description") as string) || "";
      const latStr = formData.get("latitude") as string | null;
      const lonStr = formData.get("longitude") as string | null;

      if (latStr && !isNaN(parseFloat(latStr))) latitude = parseFloat(latStr);
      if (lonStr && !isNaN(parseFloat(lonStr))) longitude = parseFloat(lonStr);

      if (!imageFile || imageFile.size === 0) {
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: "Missing required 'image' file in multipart upload." },
          { status: 400 }
        );
      }

      // Validate file size (max 15MB)
      if (imageFile.size > 15 * 1024 * 1024) {
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: "Image file exceeds maximum allowable size (15MB)." },
          { status: 400 }
        );
      }

      mimeType = imageFile.type || "image/jpeg";
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      description = body.description || "";
      if (typeof body.latitude === "number") latitude = body.latitude;
      if (typeof body.longitude === "number") longitude = body.longitude;

      if (body.image_base64) {
        imageBuffer = Buffer.from(body.image_base64, "base64");
        mimeType = body.mime_type || "image/jpeg";
      } else if (body.image_url || body.imageUrl) {
        existingImageUrl = body.image_url || body.imageUrl;
        // Fetch image bytes from URL
        try {
          const imgRes = await fetch(existingImageUrl!);
          if (imgRes.ok) {
            const arr = await imgRes.arrayBuffer();
            imageBuffer = Buffer.from(arr);
            mimeType = imgRes.headers.get("content-type") || "image/jpeg";
          }
        } catch (e) {
          console.warn("Could not download image from provided URL:", existingImageUrl);
        }
      }

      if (!imageBuffer) {
        return NextResponse.json<AnalyzeReportResponse>(
          { success: false, error: "Missing required 'image_base64' or valid 'image_url' in JSON body." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json<AnalyzeReportResponse>(
        { success: false, error: "Unsupported Content-Type. Please use multipart/form-data or application/json." },
        { status: 400 }
      );
    }

    // 2. Upload to Supabase Storage bucket 'civic-reports' if not already a hosted URL
    let storedImageUrl = existingImageUrl || "";
    const supabase = getSupabaseServerClient();

    if (!storedImageUrl && imageBuffer) {
      try {
        const fileExt = mimeType.split("/")[1] || "jpg";
        const fileName = `report_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("civic-reports")
          .upload(fileName, imageBuffer, {
            contentType: mimeType,
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from("civic-reports")
            .getPublicUrl(fileName);
          storedImageUrl = publicUrlData.publicUrl;
        } else {
          console.warn("Notice: Supabase Storage upload skipped:", uploadError.message);
        }
      } catch (err) {
        console.warn("Storage upload notice:", (err as Error).message);
      }
    }

    // 3. Multimodal AI Vision Analysis with Gemini
    const analysis = await analyzeCivicImage(imageBuffer, mimeType, description);

    // 4. Grounded RAG Retrieval from Authentic Civic Sources
    const ragResult = await retrieveCivicGuidance(
      `${analysis.description_summary} ${description}`,
      analysis.issue_type
    );

    const departmentRec = ragResult.recommendedDepartment || {
      name: "unknown",
      reason: "Official responsibility has not been verified from image alone.",
    };

    // 5. Possible Duplicate Detection
    const possibleDuplicates = await findDuplicateCandidates(
      analysis.issue_type,
      latitude,
      longitude
    );

    // 6. Persist Real Report in Supabase
    let reportId: string | undefined = undefined;
    let createdAt = new Date().toISOString();

    try {
      const { data: inserted, error: insertError } = await supabase
        .from("reports")
        .insert({
          image_url: storedImageUrl || null,
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

      if (!insertError && inserted) {
        reportId = inserted.id;
        createdAt = inserted.created_at || createdAt;
      } else if (insertError) {
        console.warn("Notice: Inserting report to Supabase reports table:", insertError.message);
      }
    } catch (dbErr) {
      console.warn("Database insert notice:", (dbErr as Error).message);
    }

    // 7. Format and Return Stable Frontend Contract Response
    const responseReport: CivicReport = {
      id: reportId,
      issue_type: analysis.issue_type,
      severity: analysis.severity,
      severity_reason: analysis.severity_reason,
      description_summary: analysis.description_summary,
      department_recommendation: {
        name: departmentRec.name,
        reason: departmentRec.reason,
      },
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      possible_duplicates: possibleDuplicates,
      evidence: ragResult.evidence,
      status: "pending_review",
      image_url: storedImageUrl || undefined,
      created_at: createdAt,
    };

    return NextResponse.json<AnalyzeReportResponse>({
      success: true,
      report: responseReport,
    });
  } catch (error) {
    console.error("Unhandled error in /api/analyze-report:", error);
    return NextResponse.json<AnalyzeReportResponse>(
      {
        success: false,
        error: (error as Error).message || "Internal server error analyzing report.",
      },
      { status: 500 }
    );
  }
}
