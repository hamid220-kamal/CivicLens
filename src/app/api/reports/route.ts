import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { ReportsListResponse, CivicReport } from "@/lib/types/api";

export const dynamic = "force-dynamic";

/**
 * GET /api/reports
 * Returns list of persisted reports from Supabase for the Authority Dashboard.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("reports")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data: rows, count, error } = await query;

    if (error) {
      return NextResponse.json<ReportsListResponse>(
        { success: false, reports: [], total: 0, error: error.message },
        { status: 500 }
      );
    }

    const formattedReports: CivicReport[] = (rows || []).map((row) => ({
      id: row.id,
      issue_type: row.issue_type || "unclassified",
      severity: row.severity || "medium",
      severity_reason: row.severity_reason || row.ai_reason || "Report logged.",
      description_summary: row.description_summary || row.description || "Civic report.",
      department_recommendation: {
        name: row.department || "unknown",
        reason: row.department_reason || "Municipal assignment pending.",
      },
      location: {
        latitude: row.latitude ? parseFloat(row.latitude) : null,
        longitude: row.longitude ? parseFloat(row.longitude) : null,
      },
      possible_duplicates: [],
      evidence: Array.isArray(row.evidence) ? row.evidence : [],
      status: row.status || "pending_review",
      image_url: row.image_url || undefined,
      created_at: row.created_at,
    }));

    return NextResponse.json<ReportsListResponse>({
      success: true,
      reports: formattedReports,
      total: count || formattedReports.length,
    });
  } catch (error) {
    return NextResponse.json<ReportsListResponse>(
      {
        success: false,
        reports: [],
        total: 0,
        error: (error as Error).message || "Internal error fetching reports.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reports
 * Create or persist a report record directly.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("reports")
      .insert({
        issue_type: body.issue_type || "unclassified",
        severity: body.severity || "medium",
        severity_reason: body.severity_reason || "",
        description: body.description || null,
        description_summary: body.description_summary || body.description || "",
        latitude: body.location?.latitude || body.latitude || null,
        longitude: body.location?.longitude || body.longitude || null,
        image_url: body.image_url || null,
        department: body.department_recommendation?.name || body.department || "unknown",
        department_reason: body.department_recommendation?.reason || body.department_reason || "",
        evidence: body.evidence || [],
        status: body.status || "pending_review",
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, report: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
