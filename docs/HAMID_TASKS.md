# CivicLens — Hamid's Implementation Plan (Backend & AI Lead)

* **Developer**: Hamid Kamal
* **Role**: Backend, AI Vision, Grounded RAG, and Duplicate Candidate Matching
* **Branch**: `feat/ai-rag`
* **Target Integration Branch**: `master`

---

## 1. Responsibilities & Deliverables

Hamid owns the AI intelligence and backend service layer:
1. **Gemini Vision Triage**: Multimodal analysis of real uploaded civic images.
2. **Issue Classification & Severity**: Categorization, severity scoring (`"low"` | `"medium"` | `"high"` | `"critical"`), and priority score (1.0–10.0).
3. **Department Recommendation**: Grounded municipal routing clearly flagged as an *AI recommendation* (not a direct government dispatch).
4. **Grounded RAG Pipeline**: Retrieving genuine municipal charter standards from `knowledge_chunks` and returning real source citations.
5. **Duplicate Candidate Detection**: Comparing incoming report coordinates/types against actual reports in Supabase to return matching candidate IDs.
6. **Robust Error Handling**: Handling invalid image URLs, empty descriptions, API rate limits, and missing RAG matches safely.

---

## 2. File Ownership & Boundaries

### Files Hamid Owns:
* `src/app/api/triage/route.ts` — Main AI triage & RAG endpoint.
* `src/app/api/match/route.ts` — Duplicate candidate detection endpoint.
* `src/lib/gemini.ts` — Google AI Studio SDK client & prompt execution.
* `src/lib/rag.ts` — Supabase `knowledge_chunks` retrieval helper (keyword / category search).
* `src/lib/types/api.ts` — Shared TypeScript API request & response interfaces.
* `scripts/seed-knowledge.mjs` — Script to seed `knowledge-base/civic_knowledge_seeds.json` into Supabase.

### ⛔ DO NOT MODIFY (Syed's Files):
* `src/app/page.tsx` (Landing page)
* `src/app/report/page.tsx` (Citizen report form & UI state)
* `src/app/dashboard/page.tsx` (Authority dashboard)
* `src/components/ReportForm.tsx` & `src/components/IncidentCard.tsx`
* `src/lib/supabaseClient.ts` (Browser Supabase client)

---

## 3. Shared API & Interface Contract

### A. Triage Endpoint: `POST /api/triage`

* **Request Payload**:
```typescript
export interface TriageRequest {
  imageUrl: string;      // Public URL from Supabase Storage 'civic-reports'
  latitude: number;      // e.g. 17.4399
  longitude: number;     // e.g. 78.4983
  description?: string;  // Optional citizen description
}
```

* **Success Response (200 OK)**:
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

* **Fallback Response (When RAG has no match or AI confidence is low)**:
```json
{
  "success": true,
  "data": {
    "issueType": "Unclassified Civic Issue",
    "severity": "medium",
    "priorityScore": 5.0,
    "department": "General Municipal Review",
    "slaHours": 72,
    "aiReason": "No specific citizen charter rule found matching this defect. Routing to manual review.",
    "citations": [],
    "ragSourceIds": []
  }
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
  reportId?: string;     // Current report ID to exclude from match
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

## 4. Hamid's Task Checklist

- [ ] **Task 1: Seed Knowledge Base**
  * File: `scripts/seed-knowledge.mjs`
  * Action: Script that reads `knowledge-base/civic_knowledge_seeds.json` and inserts rows into `knowledge_chunks` in Supabase.
  * *Verification*: Query `knowledge_chunks` table in Supabase and confirm 6 authentic records exist.

- [ ] **Task 2: Define Shared Interfaces**
  * File: `src/lib/types/api.ts`
  * Action: Export `TriageRequest`, `TriageApiResponse`, `MatchRequest`, and `MatchResponse` matching the contract.
  * *Verification*: TypeScript compiles cleanly (`npx tsc --noEmit`).

- [ ] **Task 3: Implement RAG Retrieval Helper**
  * File: `src/lib/rag.ts`
  * Action: Query Supabase `knowledge_chunks` using SQL `ILIKE` on `keywords`, `category`, and `content`. Return top 1-2 chunks.
  * *Verification*: Calling `findRelevantGuidance("pothole")` returns the GHMC Roads charter excerpt.

- [ ] **Task 4: Build Gemini Vision Triage API Route**
  * Files: `src/lib/gemini.ts`, `src/app/api/triage/route.ts`
  * Action: Fetch image bytes or pass public image URL to Gemini 2.5 Flash, pass retrieved RAG context, enforce strict JSON output matching `TriageResponseData`.
  * *Verification*: Send test POST via curl/fetch to `/api/triage` with a sample pothole image URL and verify valid JSON with citations.

- [ ] **Task 5: Implement Duplicate Candidate Matcher**
  * File: `src/app/api/match/route.ts`
  * Action: Query recent reports from Supabase matching `issue_type` within ~200 meters. Return array of candidate IDs and distances.
  * *Verification*: Insert two reports with coordinates 50m apart; verify `/api/match` identifies candidate duplicate.

---

## 5. Five-Hour Timeline

| Time | Hamid's Deliverable | Dependency on Syed |
| :--- | :--- | :--- |
| **10:00 – 10:30** | Confirm `src/lib/types/api.ts`, run `seed-knowledge.mjs`. | Agree on shared API types and coordinate field names. |
| **10:30 – 11:30** | Build `src/lib/gemini.ts` and `src/lib/rag.ts`. | Syed creates Supabase Storage upload flow. |
| **11:30 – 12:30** | Implement `POST /api/triage` with Gemini Vision + RAG citations. | Syed connects Report form to `POST /api/triage`. |
| **12:30 – 13:30** | Implement `POST /api/match` (duplicate candidate detection). | Syed passes report coordinates and displays candidate badge. |
| **13:30 – 14:15** | End-to-end integration tests & edge-case fixes. | Test full flow with Syed on local machines. |
| **14:15 – 15:00** | Code freeze, merge `feat/ai-rag` to `master`, prep demo images. | Live rehearsal of the 90-second judging presentation. |

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

## 7. Git Workflow for Hamid

```cmd
REM 1. Create and switch to your feature branch
git checkout master
git checkout -b feat/ai-rag

REM 2. Work, test, and commit your backend changes
git add src/app/api/ src/lib/gemini.ts src/lib/rag.ts src/lib/types/ scripts/
git commit -m "feat(ai): implement Gemini 2.5 Flash triage and grounded RAG retrieval"

REM 3. Push your branch
git push -u origin feat/ai-rag
```
