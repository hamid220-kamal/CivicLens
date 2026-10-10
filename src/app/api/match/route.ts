import { NextRequest, NextResponse } from "next/server";
import { findDuplicateCandidates } from "@/lib/duplicateMatcher";
import { MatchRequest } from "@/lib/types/api";

export const dynamic = "force-dynamic";

/**
 * POST /api/match
 * Checks for duplicate candidate reports near the specified coordinates.
 */
export async function POST(req: NextRequest) {
  try {
    const body: MatchRequest = await req.json();
    const lat = typeof body.latitude === "number" ? body.latitude : null;
    const lon = typeof body.longitude === "number" ? body.longitude : null;

    const candidates = await findDuplicateCandidates(
      body.issueType || "civic_issue",
      lat,
      lon,
      body.reportId
    );

    return NextResponse.json({
      hasCandidates: candidates.length > 0,
      candidates: candidates.map((c) => ({
        reportId: c.report_id,
        incidentId: c.incident_id,
        distanceMeters: c.distance_meters,
        createdAt: c.created_at,
        similarityReason: c.similarity_reason,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { hasCandidates: false, candidates: [], error: (error as Error).message },
      { status: 500 }
    );
  }
}
