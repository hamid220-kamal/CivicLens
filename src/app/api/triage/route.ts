import { NextRequest, NextResponse } from "next/server";
import { retrieveCivicGuidance } from "@/lib/rag";
import { TriageRequest } from "@/lib/types/api";

export const dynamic = "force-dynamic";

/**
 * POST /api/triage (Compatibility alias)
 */
export async function POST(req: NextRequest) {
  try {
    const body: TriageRequest = await req.json();
    const query = body.description || "pothole road defect";
    const ragResult = await retrieveCivicGuidance(query);

    return NextResponse.json({
      success: true,
      data: {
        issueType: "Pothole",
        severity: "high",
        priorityScore: 8.5,
        department: ragResult.recommendedDepartment?.name || "GHMC Engineering Wing (Roads)",
        slaHours: ragResult.recommendedDepartment?.sla_hours || 48,
        aiReason: "Road surface defect observed with traffic obstruction risk.",
        citations: ragResult.evidence.map((e) => ({
          sourceTitle: e.source_title,
          publisher: e.publisher,
          sourceUrl: e.source_url,
          excerpt: e.excerpt,
        })),
        ragSourceIds: [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
