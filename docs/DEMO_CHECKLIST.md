# CivicLens Demo Checklist (90-Second Hackathon Presentation)

## Presentation URLs
* **Production URL**: [https://civiclens-live.vercel.app](https://civiclens-live.vercel.app)
* **Citizen Flow**: `https://civiclens-live.vercel.app/report`
* **Authority Dashboard**: `https://civiclens-live.vercel.app/dashboard`

## Before Presentation
- [ ] Laptop 1 (Citizen View): Browser opened to `/report` with location permissions granted.
- [ ] Laptop 2 (Authority View): Browser opened to `/dashboard` showing live incident feed.
- [ ] 2-3 sample photos ready on phone/laptop (e.g., photo of deep pothole, broken streetlight, overflowing dumpster).
- [ ] Database running with sample knowledge chunks indexed via pgvector.
- [ ] Verify internet connection / API responsiveness.

---

## 90-Second Demo Progression

1. **The Problem (15s)**:
   * Citizen sees civic issue, doesn't know which department handles it or whether someone already reported it.
2. **Citizen Submission (25s)**:
   * Upload real pothole photo + capture GPS coordinates.
   * Hit "Submit Civic Report".
3. **AI Vision + Grounded RAG Triage (25s)**:
   * Show instant structured triage: Issue (`Pothole`), Severity (`High`), Responsible Wing (`Roads & Infrastructure Maintenance`).
   * Highlight **Source Evidence**: Show citation from authentic Civic Knowledge Base explaining why Roads Wing is responsible.
4. **Incident Deduplication / Match (15s)**:
   * Submit 2nd report at nearby coordinates for the same pothole.
   * CivicLens identifies `possible_duplicate` / groups it into existing incident instead of creating ticket chaos.
5. **Authority Dashboard & Closing (10s)**:
   * Switch to authority dashboard: prioritized queue with aggregated report count, geographic cluster, and AI summaries.
   * Conclude: *"CivicLens turns unstructured citizen reports into verified, deduplicated, and department-routed civic intelligence."*
