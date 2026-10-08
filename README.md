# CivicLens — Hackathon Starter

> **Pre-hackathon scaffold only.** This repository is intentionally NOT a completed project.
>
> Hackathon goal: build a real, end-to-end CivicLens MVP during the event with no mocks or hard-coded demo responses.

## Product
CivicLens turns a citizen's photo + location + optional description into an AI-assisted civic case.

Core flow:

**REPORT → UNDERSTAND → RAG → PRIORITIZE → MATCH → ROUTE → VERIFY**

## Hackathon MVP
1. Real image upload
2. Real location capture
3. Vision/LLM issue classification
4. RAG-grounded civic guidance
5. Severity/priority estimation
6. Duplicate/incident matching against real submitted reports
7. Department routing
8. Authority dashboard

## What is intentionally NOT here
- No fake reports
- No fake AI outputs
- No API keys
- No completed frontend
- No completed backend
- No claimed municipal integration
- No fabricated civic rules

## Suggested stack
- Next.js + TypeScript + Tailwind
- Supabase Auth/Storage/Postgres
- pgvector for RAG
- Vision-capable LLM
- OpenStreetMap for map/context

See `docs/BUILD_PLAN.md` for the hackathon build sequence.
