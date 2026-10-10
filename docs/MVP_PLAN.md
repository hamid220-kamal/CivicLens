# CivicLens — Hackathon MVP Plan

> **Core Value Proposition**: *One underlying civic incident connects multiple citizen reports.*
> CivicLens turns raw citizen photos and GPS coordinates into verified, deduplicated, and department-routed civic incidents grounded in authentic municipal guidance.

---

## 1. Scope & Feature Classification

| Feature | Classification | Implementation Status | Description |
| :--- | :--- | :--- | :--- |
| **Citizen Photo Upload & Preview** | **Must-Have** | Implemented in skeleton | Upload real image to Supabase Storage bucket `civic-reports`. |
| **Browser GPS Geolocation** | **Must-Have** | Not implemented | HTML5 `navigator.geolocation` capturing lat/lng with fallback. |
| **Gemini Vision Triage API** | **Must-Have** | Not implemented | Multimodal prompt classifying issue, severity, and priority score. |
| **Grounded RAG Guidance** | **Must-Have** | Seeds ready, API pending | Retrieve matching municipal charter chunk; require source citation in AI recommendation. |
| **Incident Matcher / Deduplication** | **Must-Have** | Prompts ready, API pending | Match against recent/nearby reports to group into a single incident rather than duplicate tickets. |
| **Authority Dashboard** | **Must-Have** | Not implemented | Live table/card view of incidents, report counts, severity badges, and cited evidence. |
| **Source Evidence Modal/Accordion** | **Must-Have** | Not implemented | Displays genuine cited excerpt, publisher URL, and SLA standard. |
| **Interactive Map (OpenStreetMap/Leaflet)** | *Only if time remains* | Out of scope for v1 | Visual pins for incident clusters (use tabular coordinates first). |
| **Citizen Status Tracking Portal** | *Only if time remains* | Out of scope for v1 | Public lookup by report ID. |
| **User Authentication & Roles** | **Out of Scope** | Cut | Keep open for speed; protect admin view via route/query param if needed. |
| **Real municipal API dispatch** | **Out of Scope** | Cut | Department routing is strictly an AI recommendation with cited SLA. |

---

## 2. Agreed Data & API Contracts

### A. Database Tables (PostgreSQL / Supabase)

1. **`incidents`** (Aggregated real-world civic problems):
   * `id`: `uuid` (PK)
   * `created_at`: `timestamptz`
   * `issue_type`: `text` (e.g. `"Pothole"`, `"Garbage Dump"`, `"Sewer Overflow"`, `"Electric Hazard"`)
   * `latitude`: `numeric`
   * `longitude`: `numeric`
   * `status`: `text` (`"open"` | `"in_review"` | `"resolved"`)
   * `priority_score`: `numeric` (1 to 10 scale)
   * `report_count`: `integer` (Default: 1)
   * `department`: `text` (e.g. `"GHMC Engineering Wing (Roads)"`)
   * `ai_summary`: `text`

2. **`reports`** (Individual citizen submissions):
   * `id`: `uuid` (PK)
   * `created_at`: `timestamptz`
   * `image_url`: `text` (Supabase Storage public URL)
   * `latitude`: `numeric`
   * `longitude`: `numeric`
   * `description`: `text` (Optional citizen text)
   * `issue_type`: `text`
   * `severity`: `text` (`"low"` | `"medium"` | `"high"` | `"critical"`)
   * `priority_score`: `numeric`
   * `department`: `text`
   * `ai_reason`: `text`
   * `incident_id`: `uuid` (FK -> `incidents.id`, nullable on initial triage)
   * `rag_source_ids`: `jsonb` (Array of cited chunk IDs and sources)

3. **`knowledge_chunks`** (Municipal knowledge base):
   * `id`: `uuid` (PK)
   * `source_title`: `text`
   * `source_url`: `text`
   * `source_publisher`: `text`
   * `category`: `text`
   * `department`: `text`
   * `sla_hours`: `integer`
   * `content`: `text`
   * `embedding`: `vector(1536)` (Optional)

---

### B. API Contracts

#### 1. `POST /api/triage`
Processes image + location + optional description. Retrieves relevant civic knowledge chunk and returns grounded classification.

* **Request Body**:
```json
{
  "imageUrl": "https://kexilkwpqvcrwttfjymx.supabase.co/storage/v1/object/public/civic-reports/sample.jpg",
  "latitude": 17.4399,
  "longitude": 78.4983,
  "description": "Deep hole in middle of road near market"
}
```

* **Response Body (200 OK)**:
```json
{
  "success": true,
  "data": {
    "issueType": "Pothole",
    "severity": "high",
    "priorityScore": 8.5,
    "department": "GHMC Engineering Wing (Roads)",
    "slaHours": 360,
    "aiReason": "Large asphalt cavity visible with high traffic risk.",
    "citations": [
      {
        "sourceTitle": "GHMC Citizen Charter — Road Maintenance & Potholes",
        "publisher": "Greater Hyderabad Municipal Corporation (GHMC)",
        "sourceUrl": "https://ghmc.gov.in/CitizenCharter/CitizenCharter-19.06.pdf",
        "excerpt": "As per Item 1 (Engineering Wing) of the official GHMC Citizen Charter, the stipulated timeframe for 'Filling of potholes / repair of road surface' is 15 days (360 hours)."
      }
    ]
  }
}
```

* **Fallback Behavior (When Retrieval Finds No Match)**:
```json
{
  "success": true,
  "data": {
    "issueType": "Unclassified Civic Issue",
    "severity": "medium",
    "priorityScore": 5.0,
    "department": "General Municipal Review",
    "slaHours": null,
    "aiReason": "No authenticated municipal charter standard matched this issue type. Manual staff review required.",
    "citations": []
  }
}
```

---

#### 2. `POST /api/match`
Compares a new report against existing open incidents within spatial proximity (e.g. ~200 meters) and same issue type.

* **Request Body**:
```json
{
  "issueType": "Pothole",
  "latitude": 17.4399,
  "longitude": 78.4983,
  "aiSummary": "Deep pothole in middle of lane"
}
```

* **Response Body (200 OK)**:
```json
{
  "matched": true,
  "matchType": "same_incident",
  "incidentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reason": "Existing open pothole incident reported 35 meters away 2 hours ago."
}
```

---

## 3. Two-Developer Branch & Task Division

### Git Strategy
* **Base Branch**: `master` (or `main`)
* **Hamid's Branch**: `feature/ai-backend` (Backend, AI, RAG, Database & APIs)
* **Syed's Branch**: `feature/frontend-ui` (Frontend, Citizen Flow, Dashboard & Components)

---

### Hamid (Developer 1) — Backend, AI, RAG & Database Pipeline
* **Branch**: `feature/ai-backend`
* **Owned Files**:
  * `src/app/api/triage/route.ts` (Multimodal vision + RAG grounding logic)
  * `src/app/api/match/route.ts` (Proximity & duplicate incident matcher)
  * `src/lib/gemini.ts` (Google AI Studio SDK helper)
  * `src/lib/rag.ts` (Knowledge retrieval helper querying `knowledge_chunks`)
  * `src/lib/supabaseServer.ts` (Server-side Supabase client)
  * `scripts/seed-knowledge.mjs` (Script to seed `knowledge-base/civic_knowledge_seeds.json` into Supabase)
* **Dependency on Syed**: None for API implementation; uses test scripts and curl for verification.
* **Pass/Fail Test**: Send image URL + coordinates to `/api/triage`, receive valid JSON matching the exact contract with real cited charter text and SLA.

---

### Syed (Developer 2) — Frontend & User Interfaces
* **Branch**: `feature/frontend-ui`
* **Owned Files**:
  * `src/app/page.tsx` (Landing page & hero navigation)
  * `src/app/report/page.tsx` (Citizen photo capture, GPS, submission state)
  * `src/app/dashboard/page.tsx` (Authority dashboard, incident queue, report aggregator)
  * `src/components/ReportForm.tsx` (Upload form with camera/file picker & preview)
  * `src/components/IncidentCard.tsx` (Incident display with cited source modal)
  * `src/lib/supabaseClient.ts` (Browser Supabase client)
* **Dependency on Hamid**: Consumes `/api/triage` and `/api/match` responses. Can work against mock JSON for 30 minutes while Hamid builds backend endpoints.
* **Pass/Fail Test**: Submit a real photo from browser, verify image upload in Supabase Storage, and render the triage result receipt with citation details.

---

### Integration & Merge Procedure
1. Hamid completes `/api/triage` & seeds knowledge chunks -> tests with `node scripts/seed-knowledge.mjs`.
2. Syed connects `ReportForm.tsx` to `/api/triage`.
3. Hamid pushes `feature/ai-backend` -> Merged into `master`.
4. Syed pulls latest `master` into `feature/frontend-ui` and runs full end-to-end test.
5. Syed merges `feature/frontend-ui` into `master`.

---

## 4. Five-Hour Build Schedule

| Time Window | Phase | Hamid (Backend & AI) | Syed (Frontend & UI) | Milestone Deliverable |
| :--- | :--- | :--- | :--- | :--- |
| **0:00 – 0:30** | **1. Foundation** | Run `seed-knowledge.mjs`, create `gemini.ts` and `rag.ts`. | Build `/report` layout, camera input, and GPS hook. | Knowledge base seeded in DB; UI captures photo + GPS. |
| **0:30 – 1:30** | **2. Core AI Triage** | Implement `POST /api/triage` with Gemini Vision + RAG lookup. | Connect Supabase Storage upload (`civic-reports` bucket). | Real photo uploads to storage & gets classified via AI. |
| **1:30 – 2:30** | **3. Grounded Receipt** | Implement `POST /api/match` for duplicate incident grouping. | Build citation breakdown & receipt UI showing SLA & wing. | End-to-end citizen flow working with verifiable citations. |
| **2:30 – 3:30** | **4. Authority View** | Connect report creation to update `incident.report_count`. | Build `/dashboard` table showing aggregated incidents. | Authority sees duplicate reports linked to 1 incident. |
| **3:30 – 4:15** | **5. Integration** | Verify error handling (empty descriptions, night photos). | Merge branches, test multi-report submission flow. | Full app working locally without console errors. |
| **4:15 – 5:00** | **6. Deploy & Rehearse** | Prepare 2 real test photos (Pothole & Garbage Dump) for demo. | Deploy to `civiclens-live.vercel.app`, test live mobile upload. | Live deployment tested & 90s pitch rehearsed. |

---

## 5. End-to-End Acceptance Checklist (Demo Ready)

- [ ] **Test 1**: Citizen uploads a real photo of a road defect + GPS.
- [ ] **Test 2**: AI returns `Pothole`, `GHMC Engineering Wing (Roads)`, and 15-day (360h) charter SLA.
- [ ] **Test 3**: UI displays the official GHMC citizen charter citation with working source link.
- [ ] **Test 4**: Submitting a second report nearby links to the same incident (`report_count = 2`).
- [ ] **Test 5**: Authority dashboard reflects updated priority score and linked reports.
- [ ] **Test 6**: Live URL [https://civiclens-live.vercel.app](https://civiclens-live.vercel.app) loads without environment variable errors.
