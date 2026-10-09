# CivicLens — Syed's Implementation Plan (Frontend & Dashboard Lead)

* **Developer**: Syed Shahnawaz
* **Role**: Frontend UI, Citizen Submission Flow, Storage Upload, and Authority Dashboard
* **Branch**: `feat/frontend-ui`
* **Target Integration Branch**: `master`

---

## 1. Responsibilities & Deliverables

Syed owns the user interface and data interaction layer:
1. **Citizen Submission Flow**: Responsive report form with mobile camera picker, file upload, GPS coordinates, and optional description.
2. **Supabase Storage Integration**: Uploading citizen photos directly to the `civic-reports` bucket and acquiring public URLs.
3. **Connecting AI Triage**: Sending the uploaded image URL and coordinates to Hamid's `POST /api/triage` endpoint.
4. **Citizen Triage Receipt**: Rendering structured triage results with issue category, severity badge, SLA countdown, and clickable authentic source citations.
5. **Report Persistence**: Saving the complete citizen report record to the Supabase `reports` table.
6. **Authority Dashboard**: Live table/card view fetching saved reports from Supabase, highlighting priority scores, duplicate candidate counts, and status filters.
7. **UI States**: Implementing clean loading spinners, empty states, and toast/error alerts for failed uploads or network issues.

---

## 2. File Ownership & Boundaries

### Files Syed Owns:
* `src/app/page.tsx` — Landing page & hero navigation.
* `src/app/report/page.tsx` — Citizen report submission page & state machine.
* `src/app/dashboard/page.tsx` — Authority management dashboard.
* `src/components/ReportForm.tsx` — Photo upload, GPS capture, and input form.
* `src/components/TriageReceipt.tsx` — Diagnostic receipt showing AI classification & citations.
* `src/components/IncidentCard.tsx` — Dashboard card with duplicate candidate tags and citations.
* `src/lib/supabaseClient.ts` — Browser-safe Supabase client initialization.

### ⛔ DO NOT MODIFY (Hamid's Files):
* `src/app/api/triage/route.ts` (AI triage route)
* `src/app/api/match/route.ts` (Duplicate candidate matcher)
* `src/lib/gemini.ts` (Google AI Studio SDK logic)
* `src/lib/rag.ts` (Knowledge base querying)
* `src/lib/types/api.ts` (Shared interfaces — edit only by mutual agreement)
* `scripts/seed-knowledge.mjs`

---

## 3. Shared API & Interface Contract

### A. Triage Endpoint: `POST /api/triage`

* **Request Payload Sent by Syed**:
```typescript
export interface TriageRequest {
  imageUrl: string;      // Public URL from Supabase Storage 'civic-reports'
  latitude: number;      // e.g. 17.4399
  longitude: number;     // e.g. 78.4983
  description?: string;  // Optional citizen description
}
```

* **Success Response Received by Syed (200 OK)**:
```typescript
export interface Citation {
  sourceTitle: string;    // e.g. "GHMC Citizen Charter & Service Delivery Guidelines"
  publisher: string;      // e.g. "Greater Hyderabad Municipal Corporation"
  sourceUrl: string;      // e.g. "https://www.ghmc.gov.in"
  excerpt: string;        // Exact relevant rule excerpt
}

export interface TriageResponseData {
  issueType: string;                          // e.g. "Pothole", "Garbage Dump", "Sewer Overflow"
  severity: "low" | "medium" | "high" | "critical";
  priorityScore: number;                      // 1.0 to 10.0 scale
  department: string;                         // e.g. "GHMC Engineering Wing (Roads)" (AI Recommendation)
  slaHours: number;                           // e.g. 48
  aiReason: string;                           // Concise explanation based on image evidence
  citations: Citation[];                      // Array of genuine cited passages
  ragSourceIds: string[];                     // Database UUIDs of cited knowledge chunks
}

export interface TriageApiResponse {
  success: boolean;
  data?: TriageResponseData;
  error?: string;
}
```

---

### B. Duplicate Candidate Match Endpoint: `POST /api/match`

* **Request Payload**:
```typescript
export interface MatchRequest {
  issueType: string;
  latitude: number;
  longitude: number;
  reportId?: string;
}
```

* **Success Response (200 OK)**:
```typescript
export interface DuplicateCandidate {
  reportId: string;
  incidentId: string | null;
  distanceMeters: number;
  createdAt: string;
  similarityReason: string;
}

export interface MatchResponse {
  hasCandidates: boolean;
  candidates: DuplicateCandidate[];
}
```

---

## 4. Syed's Task Checklist

- [ ] **Task 1: Supabase Browser Client & Storage Upload Helper**
  * File: `src/lib/supabaseClient.ts`
  * Action: Initialize `createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)`. Build upload function for `civic-reports` bucket.
  * *Verification*: Upload a test image through browser console; verify public URL is accessible.

- [ ] **Task 2: Citizen Report Form UI with GPS**
  * Files: `src/app/report/page.tsx`, `src/components/ReportForm.tsx`
  * Action: Camera input/file picker, live preview, HTML5 GPS button (`navigator.geolocation`), and optional description box.
  * *Verification*: Click "Capture Location" $\rightarrow$ coordinates populate in form. Select photo $\rightarrow$ preview displays.

- [ ] **Task 3: Connect Triage API & Render Grounded Receipt**
  * Files: `src/app/report/page.tsx`, `src/components/TriageReceipt.tsx`
  * Action: On form submit: upload photo $\rightarrow$ call `POST /api/triage` $\rightarrow$ save report to Supabase `reports` table $\rightarrow$ display receipt with category, severity badge, department recommendation, and clickable citation links.
  * *Verification*: Submitting a test image displays the receipt with real citation metadata from Hamid's API.

- [ ] **Task 4: Authority Dashboard View**
  * Files: `src/app/dashboard/page.tsx`, `src/components/IncidentCard.tsx`
  * Action: Fetch all reports from Supabase `reports` table. Show status filters (`"open"`, `"in_review"`, `"resolved"`), priority badges, thumbnail previews, and cited source accordions.
  * *Verification*: Newly submitted reports appear immediately on the dashboard upon refresh.

- [ ] **Task 5: Display Duplicate Candidate Badges**
  * File: `src/components/IncidentCard.tsx`
  * Action: If `POST /api/match` returns `hasCandidates: true`, display a *"Possible Duplicate (Nearby)"* alert showing candidate report IDs and distances.
  * *Verification*: Cards with nearby reports display the candidate match badge.

---

## 5. Five-Hour Timeline

| Time | Syed's Deliverable | Dependency on Hamid |
| :--- | :--- | :--- |
| **10:00 – 10:30** | Confirm `src/lib/types/api.ts` and set up `supabaseClient.ts`. | Agree on shared API types. |
| **10:30 – 11:30** | Build `/report` page, camera picker, and Supabase Storage upload. | Hamid builds `POST /api/triage`. Syed can test against mock JSON. |
| **11:30 – 12:30** | Connect Report form to live `POST /api/triage` and build `TriageReceipt.tsx`. | Hamid provides working `POST /api/triage`. |
| **12:30 – 13:30** | Build `/dashboard` fetching real records from `reports` table. | Hamid completes `POST /api/match`. |
| **13:30 – 14:15** | End-to-end integration testing, mobile styling, and error states. | Test full flow with Hamid on local machines. |
| **14:15 – 15:00** | Code freeze, merge `feat/report-dashboard` to `master`, rehearse demo. | Live rehearsal of the 90-second judging presentation. |

---

## 6. Shared MVP Acceptance Checklist (Both Developers Must Pass)

- [ ] A citizen submits a genuine civic issue image, location, and optional description.
- [ ] The image is stored successfully and the report is saved in Supabase.
- [ ] The backend analyses the image using the real Gemini API.
- [ ] RAG retrieves relevant passages from real, documented civic sources.
- [ ] The interface displays the actual retrieved sources and grounded recommendations.
- [ ] The report shows issue type, severity, priority, and recommended department.
- [ ] Duplicate detection checks actual existing reports and returns real candidate IDs, or explicitly reports no candidates.
- [ ] The authority dashboard displays the saved report and analysis from the database.
- [ ] Loading and error states work; failures are not presented as successful submissions.
- [ ] The complete flow is demonstrated using a real submission, not fabricated AI output or fake database records.
- [ ] No secrets are exposed in browser code or committed to Git.
- [ ] Both branches are integrated into the shared default branch (`master`) and the end-to-end flow is retested.

---

## 7. Git Workflow for Syed

```cmd
REM 1. Create and switch to your feature branch
git checkout master
git checkout -b feat/report-dashboard

REM 2. Work, test, and commit your frontend changes
git add src/app/report/ src/app/dashboard/ src/components/ src/lib/supabaseClient.ts
git commit -m "feat(ui): implement citizen report submission flow and authority dashboard"

REM 3. Push your branch
git push -u origin feat/report-dashboard
```
