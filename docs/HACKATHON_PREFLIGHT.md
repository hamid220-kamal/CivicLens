# CivicLens Hackathon Preflight Checklist

## Preflight Status

| Component | Status | Action Required |
| :--- | :--- | :--- |
| **Git & Secrets** | **VERIFIED** | Protected by .gitignore; pass.txt and .env.local not tracked |
| **Node.js Environment** | **VERIFIED** | Node v24.13.0, npm 11.6.2 |
| **Next.js & TypeScript** | **VERIFIED** | App Router boots on port 3000, 0 TypeScript errors |
| **Supabase Database** | **VERIFIED** | Connected, initial schema & RLS policies operational |
| **Supabase Storage** | Ready | Ensure `civic-reports` bucket exists |
| **Gemini AI Access** | **VERIFIED** | Active API key with 50 models including `gemini-2.5-flash` |
| **RAG Knowledge Base** | Ready | Manifest & sources documented; ready for hackathon ingestion |

---

## 5-Hour Timeline Quick-Reference

1. **0:00 - 0:20 (Phase 0)**: Connect Supabase, execute schema, test Gemini API.
2. **0:20 - 1:20 (Phase 1)**: Citizen Report UI + Image Upload + Geolocation.
3. **1:20 - 2:20 (Phase 2)**: Gemini Vision Triage API (issue, severity, department).
4. **2:20 - 3:10 (Phase 3)**: Knowledge-Base Ingestion & Grounded RAG retrieval.
5. **3:10 - 4:00 (Phase 4)**: Duplicate & Incident Matching logic.
6. **4:00 - 4:40 (Phase 5)**: Authority Dashboard & Status Management.
7. **4:40 - 5:00 (Phase 6)**: Deploy (Vercel), end-to-end rehearsal with real test images.

---

## Golden Rules
- No mocked/fake AI responses.
- No fabricated civic rules or invented departments.
- Ground all AI department recommendations in cited knowledge chunks.
- Never commit credentials to Git.
