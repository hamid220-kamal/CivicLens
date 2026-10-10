import { PossibleDuplicateCandidate } from "@/lib/types/api";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * Calculate great-circle distance between two coordinate pairs in meters (Haversine formula).
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Search for potential duplicate reports based on geographic proximity and issue category.
 * Maximum proximity threshold: 250 meters.
 */
export async function findDuplicateCandidates(
  issueType: string,
  latitude: number | null,
  longitude: number | null,
  currentReportId?: string
): Promise<PossibleDuplicateCandidate[]> {
  if (latitude === null || longitude === null) {
    return [];
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data: reports, error } = await supabase
      .from("reports")
      .select("id, issue_type, latitude, longitude, created_at, incident_id, description_summary, description")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !reports) {
      console.warn("Could not query existing reports for duplicate matching:", error?.message);
      return [];
    }

    const candidates: PossibleDuplicateCandidate[] = [];
    const MAX_DISTANCE_METERS = 250;

    for (const report of reports) {
      if (currentReportId && report.id === currentReportId) {
        continue;
      }

      // Check coordinates
      const repLat = typeof report.latitude === "number" ? report.latitude : parseFloat(report.latitude);
      const repLon = typeof report.longitude === "number" ? report.longitude : parseFloat(report.longitude);

      if (isNaN(repLat) || isNaN(repLon)) {
        continue;
      }

      const distance = calculateDistanceMeters(latitude, longitude, repLat, repLon);

      if (distance <= MAX_DISTANCE_METERS) {
        const isSameType =
          report.issue_type &&
          (report.issue_type.toLowerCase().includes(issueType.toLowerCase()) ||
            issueType.toLowerCase().includes(report.issue_type.toLowerCase()));

        if (isSameType) {
          // Calculate similarity score based on proximity (closer = higher score)
          const proximityScore = Math.max(0.4, 1 - distance / MAX_DISTANCE_METERS);
          const matchScore = Math.round(proximityScore * 100) / 100;

          candidates.push({
            report_id: report.id,
            incident_id: report.incident_id || null,
            distance_meters: distance,
            created_at: report.created_at,
            similarity_reason: `Reported matching defect (${report.issue_type}) approx. ${distance}m away`,
            match_score: matchScore,
          });
        }
      }
    }

    // Sort by closest distance
    return candidates.sort((a, b) => (a.distance_meters || 0) - (b.distance_meters || 0)).slice(0, 5);
  } catch (err) {
    console.error("Duplicate matcher error:", (err as Error).message);
    return [];
  }
}
