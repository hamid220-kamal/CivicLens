# 📡 Backend Handoff & Instructions for Syed (and Syed's AI Coding Agent)

> **To Syed and Syed's AI Coding Agent**:
> The AI Vision, Grounded RAG, and Supabase Persistence backend pipeline is **100% implemented, tested, and live**.
> You can now build the frontend components without mocking!

---

## 1. Live Backend Endpoints Ready for You

| Endpoint | Method | Purpose | Input Format |
| :--- | :--- | :--- | :--- |
| **`/api/analyze-report`** | `POST` | Primary end-to-end report triage, RAG grounding, duplicate detection & Supabase saving. | `multipart/form-data` or `application/json` |
| **`/api/reports`** | `GET` | Fetch all saved reports for the Authority Dashboard. | Query params: `?status=all&limit=50` |
| **`/api/triage`** | `POST` | Compatibility alias for instant classification & citations. | `application/json` |
| **`/api/match`** | `POST` | Proximity duplicate matcher (within ~250m). | `application/json` |

---

## 2. Canonical TypeScript Types

Import directly in your components from `@/lib/types/api`:

```typescript
import {
  CivicReport,
  AnalyzeReportResponse,
  ReportsListResponse,
  CivicEvidence,
  CivicSeverity,
  PossibleDuplicateCandidate,
  DepartmentRecommendation
} from "@/lib/types/api";
```

---

## 3. How to Submit from Citizen Report Form (`src/app/report/page.tsx`)

You can send the image directly as `multipart/form-data` from your camera / file picker:

```typescript
async function handleReportSubmit(imageFile: File, description: string, lat?: number, lon?: number) {
  const formData = new FormData();
  formData.append("image", imageFile);
  if (description) formData.append("description", description);
  if (lat !== undefined) formData.append("latitude", lat.toString());
  if (lon !== undefined) formData.append("longitude", lon.toString());

  const response = await fetch("/api/analyze-report", {
    method: "POST",
    body: formData, // Browser automatically sets multipart/form-data boundary
  });

  const data: AnalyzeReportResponse = await response.json();

  if (data.success && data.report) {
    // 1. data.report.id -> Unique ID saved in Supabase
    // 2. data.report.issue_type -> e.g. "pothole", "garbage_accumulation"
    // 3. data.report.severity -> "low" | "medium" | "high" | "critical" | "uncertain"
    // 4. data.report.department_recommendation.name -> e.g. "GHMC Engineering Wing (Roads)"
    // 5. data.report.evidence -> Array of authentic citations [{ source_title, publisher, source_url, excerpt }]
    // 6. data.report.possible_duplicates -> Array of nearby duplicates [{ report_id, distance_meters, similarity_reason }]
    return data.report;
  } else {
    throw new Error(data.error || "Analysis failed");
  }
}
```

---

## 4. How to Fetch Reports for Authority Dashboard (`src/app/dashboard/page.tsx`)

```typescript
async function fetchDashboardReports(status: string = "all") {
  const res = await fetch(`/api/reports?status=${status}&limit=50`, {
    cache: "no-store",
  });
  const data: ReportsListResponse = await res.json();
  return data.reports; // Array of CivicReport
}
```

---

## 5. What You Should Build in Frontend

1. **`src/app/report/page.tsx`**:
   * Image capture/upload input with preview.
   * "Get My Location" button (`navigator.geolocation.getCurrentPosition`).
   * Submit button calling `POST /api/analyze-report`.
   * Result screen displaying:
     * Category (`issue_type`) & Severity badge (`severity`).
     * Assigned Department (`department_recommendation.name`).
     * **Grounded Citations accordion** (`evidence` array with link to municipal source).
     * **Nearby Duplicate alert** (if `possible_duplicates.length > 0`).

2. **`src/app/dashboard/page.tsx`**:
   * Table or card feed displaying reports from `GET /api/reports`.
   * Status filter pills (`all`, `pending_review`, `in_progress`, `resolved`).
   * Clicking a report expands its image, coordinates, and cited municipal evidence.

---

## 6. File Ownership Reminder

* **You Own**: `src/app/page.tsx`, `src/app/report/`, `src/app/dashboard/`, `src/components/`, `src/lib/supabaseClient.ts`.
* **Hamid Owns**: `src/app/api/`, `src/lib/gemini.ts`, `src/lib/rag.ts`, `src/lib/duplicateMatcher.ts`, `scripts/`.
