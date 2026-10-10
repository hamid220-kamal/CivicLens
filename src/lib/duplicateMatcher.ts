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
  if (
    typeof lat1 !== "number" || !isFinite(lat1) ||
    typeof lon1 !== "number" || !isFinite(lon1) ||
    typeof lat2 !== "number" || !isFinite(lat2) ||
    typeof lon2 !== "number" || !isFinite(lon2) ||
    lat1 < -90 || lat1 > 90 ||
    lat2 < -90 || lat2 > 90 ||
    lon1 < -180 || lon1 > 180 ||
    lon2 < -180 || lon2 > 180
  ) {
    return Infinity;
  }

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
 * Search for potential duplicate report candidates based on geographic proximity and issue category.
 * Enforces a strict 250m threshold and excludes test records or inappropriate statuses.
 */
export async function findDuplicateCandidates(
  issueType: string,
  latitude: number | null,
  longitude: number | null,
  currentReportId?: string
): Promise<PossibleDuplicateCandidate[]> {
  // Validate coordinates
  if (
    latitude === null ||
    longitude === null ||
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !isFinite(latitude) ||
    !isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return [];
  }

  try {
    const supabase = getSupabaseServerClient();
    const MAX_DISTANCE_METERS = 250;

    // Geographic bounding box envelope (~380 meters to bound database query)
    const deltaLat = 0.0035;
    const cosLat = Math.cos((latitude * Math.PI) / 180);
    const deltaLon = deltaLat / (cosLat > 0.01 ? cosLat : 1.0);

    let query = supabase
      .from("reports")
      .select("id, issue_type, latitude, longitude, created_at, incident_id, description_summary, status")
      .neq("status", "test_verification")
      .neq("status", "cancelled")
      .neq("status", "rejected")
      .gte("latitude", latitude - deltaLat)
      .lte("latitude", latitude + deltaLat)
      .gte("longitude", longitude - deltaLon)
      .lte("longitude", longitude + deltaLon)
      .limit(20);

    if (currentReportId) {
      query = query.neq("id", currentReportId);
    }

    const { data: reports, error } = await query;

    if (error || !reports) {
      return [];
    }

    const candidates: PossibleDuplicateCandidate[] = [];
    const normalizedTargetType = (issueType || "").trim().toLowerCase();

    for (const report of reports) {
      if (currentReportId && report.id === currentReportId) {
        continue;
      }

      const repLat = typeof report.latitude === "number" ? report.latitude : parseFloat(report.latitude);
      const repLon = typeof report.longitude === "number" ? report.longitude : parseFloat(report.longitude);

      if (isNaN(repLat) || isNaN(repLon)) {
        continue;
      }

      const distance = calculateDistanceMeters(latitude, longitude, repLat, repLon);

      if (distance <= MAX_DISTANCE_METERS) {
        const reportType = (report.issue_type || "").trim().toLowerCase();
        const isSameType =
          reportType.length > 0 &&
          (reportType.includes(normalizedTargetType) || normalizedTargetType.includes(reportType));

        if (isSameType) {
          const proximityFactor = Math.max(0.4, 1 - distance / MAX_DISTANCE_METERS);
          const matchScore = Math.round(proximityFactor * 100) / 100;

          candidates.push({
            report_id: report.id,
            incident_id: report.incident_id || null,
            distance_meters: distance,
            created_at: report.created_at,
            similarity_reason: `Potential candidate: matching defect (${report.issue_type}) approx. ${distance}m away`,
            match_score: matchScore,
          });
        }
      }
    }

    // Sort by proximity ascending, returning top 5 candidates
    return candidates.sort((a, b) => (a.distance_meters || 0) - (b.distance_meters || 0)).slice(0, 5);
  } catch (err) {
    console.warn("Duplicate matcher query notice:", (err as Error).message);
    return [];
  }
}
