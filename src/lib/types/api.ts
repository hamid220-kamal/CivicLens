/**
 * CivicLens Canonical API & Domain Types
 * Location: src/lib/types/api.ts
 * Shared between Backend (Hamid) and Frontend (Syed)
 */

export type CivicSeverity = "low" | "medium" | "high" | "critical" | "uncertain";

export type ReportStatus = "pending_review" | "in_progress" | "resolved" | "rejected";

export interface CivicEvidence {
  source_title: string;
  publisher: string;
  source_url: string;
  excerpt: string;
}

export interface DepartmentRecommendation {
  name: string; // e.g. "GHMC Engineering Wing (Roads)" or "unknown"
  reason: string; // Grounded reason or human review disclaimer
  sla_hours?: number; // Optional advisory target timeframe from citizen charter
}

export interface ReportLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface PossibleDuplicateCandidate {
  report_id: string;
  incident_id?: string | null;
  distance_meters?: number | null;
  created_at: string;
  similarity_reason: string;
  match_score?: number; // 0.0 to 1.0 confidence
}

export interface CivicReport {
  id?: string;
  issue_type: string;
  severity: CivicSeverity;
  severity_reason: string;
  description_summary: string;
  department_recommendation: DepartmentRecommendation;
  location: ReportLocation;
  possible_duplicates: PossibleDuplicateCandidate[];
  evidence: CivicEvidence[];
  status: ReportStatus;
  image_url?: string;
  created_at?: string;
}

export interface AnalyzeReportResponse {
  success: boolean;
  report?: CivicReport;
  error?: string;
}

export interface ReportsListResponse {
  success: boolean;
  reports: CivicReport[];
  total: number;
  error?: string;
}

// Backward compatibility interfaces
export interface TriageRequest {
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
}

export interface MatchRequest {
  issueType: string;
  latitude?: number;
  longitude?: number;
  reportId?: string;
}
