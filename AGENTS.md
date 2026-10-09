# AGENTS.md — Mandatory AI Coding Agent Instructions

> **CivicLens Hackathon Rulebook**
> This file is the binding instruction manual for every AI coding agent operating in this repository on both Hamid's and Syed's machines. Follow all instructions strictly.

---

## 1. Mandatory Startup Procedure

1. **Read `AGENTS.md` first**: Always read this file before performing any analysis or code modification.
2. **Inspect first**: Check the current Git branch and inspect existing files, functions, components, API routes, and database schemas before creating new ones.
3. **Preserve working trees**: Never overwrite, delete, or discard another developer's uncommitted work or branch files.
4. **Halt on contract conflict**: If a user request conflicts with the agreed architecture or API contracts in `docs/MVP_PLAN.md`, stop immediately and explain the conflict before modifying shared files.

---

## 2. Shared Architecture & Single-Project Rule

* **Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (PostgreSQL/Storage) + Google Gemini 2.5 Flash (`@google/generative-ai`).
* **Single Integrated App**: CivicLens is ONE integrated web application. Do not create separate `/frontend` and `/backend` directories or standalone sub-apps.
* **No Unapproved Dependencies**: Do not introduce extra state management (Redux/Zustand), external vector DBs (Pinecone/Chroma), LangChain/LangGraph, or paid mapping APIs.
* **Canonical Types**: All shared TypeScript interfaces must live in `src/lib/types/api.ts`. Never create duplicate interface definitions.

---

## 3. Developer Ownership & File Boundaries

| Developer | Assigned Branch | Core Domain & Owned Files |
| :--- | :--- | :--- |
| **Hamid Kamal** | `feat/ai-rag` | **Backend & AI Pipeline**: `src/app/api/triage/`, `src/app/api/match/`, `src/lib/gemini.ts`, `src/lib/rag.ts`, `src/lib/types/api.ts`, `scripts/` |
| **Syed Shahnawaz** | `feat/report-dashboard` | **Frontend & UI**: `src/app/page.tsx`, `src/app/report/`, `src/app/dashboard/`, `src/components/`, `src/lib/supabaseClient.ts` |

* **Cross-Editing Rule**: Do not modify files owned by the other developer, shared types, or database schemas without explicit coordination.
* **Coordination**: Ownership is for conflict prevention; never duplicate files or refuse necessary integration work.

---

## 4. API & Database Contracts

* **Triage Route**: `POST /api/triage`
  * Request: `{ imageUrl: string, latitude: number, longitude: number, description?: string }`
  * Response: `{ success: boolean, data: { issueType, severity, priorityScore, department, slaHours, aiReason, citations, ragSourceIds } }`
  * Severity values must strictly be: `"low"` | `"medium"` | `"high"` | `"critical"`.
* **Matching Route**: `POST /api/match`
  * Request: `{ issueType: string, latitude: number, longitude: number, reportId?: string }`
  * Response: `{ hasCandidates: boolean, candidates: Array<{ reportId, incidentId, distanceMeters, createdAt, similarityReason }> }`
* **Schema Integrity**: Rely only on `incidents`, `reports`, and `knowledge_chunks` tables as defined in `supabase/001_initial_schema.sql` and `supabase/002_rls_policies.sql`.
* **Honest Attribution**: Department assignment is strictly an *AI recommendation* based on municipal charters, not a live government dispatch.

---

## 5. Security & Secret Protection

1. **Zero Secret Exposure**: Never print, echo, summarize, or paste secret values from `pass.txt` or `.env.local` into chat responses, logs, or comments.
2. **Server-Side Only Secrets**: `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed in client components or prefixed with `NEXT_PUBLIC_`.
3. **Preserve `.gitignore`**: Ensure `pass.txt`, `.env`, `.env.local`, and build files remain excluded from Git tracking at all times.
4. **No Fake Bypasses**: Never disable Row Level Security (RLS) or input validation to simulate a working demo.

---

## 6. AI & Grounded RAG Integrity

* **Real AI Service**: Always invoke the real Google AI Studio Gemini API (`gemini-2.5-flash`). Never use hard-coded mock AI strings.
* **Genuine Sources**: Ground classifications in authentic Hyderabad/Telangana municipal sources cataloged in `docs/RAG_SOURCES.md` and `knowledge-base/manifest.csv`.
* **Real Citations**: Display only citations that were actually retrieved. Never invent fake municipal laws or policies.
* **Graceful Fallbacks**: If RAG finds no matching document, return `"department": "General Municipal Review"` with `citations: []` without crashing.

---

## 7. Git Collaboration & Branch Safety

* **Default Branch**: `master` is the default integration branch. Never rename it.
* **No Direct Commits to `master`**: All development must occur on `feat/ai-rag` or `feat/report-dashboard`.
* **No Destructive Commands**: Never run `git reset --hard`, force pushes (`git push -f`), or delete remote branches without user approval.
* **Selective Staging**: Stage only modified files explicitly related to the task (`git add <file>`). Never run broad unchecked staging if untracked secret files exist.
* **Integration**: Merge branches into `master` via pull request or reviewed merge only when acceptance tests pass.

---

## 8. Quality & Scope Discipline

* **Small & Focused**: Implement only the minimal code necessary for the current task.
* **No Speculative Abstractions**: Avoid over-engineering, premature refactoring, or unused utility functions.
* **Full UI States**: Every component must handle Loading, Empty, Success, and Error states cleanly.
* **Honest Testing**: Never claim a test, build, or database connection passed unless actual command output confirms it.

---

## 9. Mandatory Pre-Task Response Format

Before writing or editing code for any new task, every agent MUST output this brief 5-point plan:

1. **Current Branch & Target Files**: [Branch name] — [List of files to create/edit]
2. **Existing Code to Reuse**: [Existing components, helpers, or schemas being leveraged]
3. **Dependencies on Other Developer**: [What backend API or frontend component is expected]
4. **Contract / Schema Conflicts**: [None / Description of any interface discrepancy]
5. **Step-by-Step Implementation & Verification Plan**: [Concise 3-4 step checklist with exact test]
