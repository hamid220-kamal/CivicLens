# 5-Hour Build Plan

## Phase 0 — 0:00–0:20
- Connect Supabase
- Run database schema
- Verify Storage
- Verify AI API

## Phase 1 — 0:20–1:20
Citizen report:
- photo upload
- browser geolocation
- optional description
- submit case

## Phase 2 — 1:20–2:20
AI triage:
- issue type
- severity
- confidence
- department
- structured JSON output

## Phase 3 — 2:20–3:10
RAG:
- ingest prepared civic documents
- retrieve top relevant chunks
- ground department/recommendation reasoning
- store citations/chunk IDs with each case

## Phase 4 — 3:10–4:00
Incident matching:
- compare new report with recent nearby reports
- return new incident / possible duplicate
- group reports under an incident

## Phase 5 — 4:00–4:40
Authority dashboard:
- active incidents
- priority
- category
- department
- report count
- AI explanation

## Phase 6 — 4:40–5:00
- Deploy
- Run a real end-to-end test
- Prepare 2–3 real reports
- Rehearse demo

### Cut first if time is short
1. Auth
2. Fancy maps
3. Verification workflow
4. Complex role permissions

### Never cut
- real report submission
- real AI call
- real RAG retrieval
- real database persistence
- real duplicate/incident logic
