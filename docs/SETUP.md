# CivicLens Developer Setup Guide

This guide describes how both team members can set up and run the CivicLens environment on their laptops.

---

## 1. Prerequisites

Ensure you have the following installed:
* **Node.js**: >= 18.18.0 (Node 20 LTS recommended)
* **Package Manager**: `npm` (v9+) or `pnpm` (v8+)
* **Git**: Installed and configured

Verify versions:
```bash
node -v
npm -v
git --version
```

---

## 2. Repository & Branch Setup

Clone or pull the repository:
```bash
git checkout -b feature/hackathon-mvp
```

Ensure sensitive files are ignored before staging anything:
```bash
git status
```

---

## 3. Environment Variables Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and configure the following keys:
   * `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (`https://<project-ref>.supabase.co`)
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon/public API key
   * `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role secret (server-side only)
   * `GEMINI_API_KEY`: Google AI Studio Gemini API Key
3. Verify that `.env.local` is never tracked by Git (`git status` should not show `.env.local`).

---

## 4. Supabase Database & Storage Setup

1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor**.
3. Copy and run the contents of [supabase/001_initial_schema.sql](file:///d:/CivicLens/supabase/001_initial_schema.sql).
4. Go to **Storage**:
   * Create a public bucket named `civic-reports` for report images.
   * Allow public read access to uploaded images.

---

## 5. Installing Dependencies & Running Locally

Once the Next.js foundation is initialized:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 6. Two-Developer Workflow & Responsibilities

* **Developer 1 (Frontend & Workflow)**:
  * Citizen report submission flow (camera/upload, geolocation, description).
  * Authority dashboard (incident list, priority sorting, status updates, map view).
* **Developer 2 (AI Pipeline & Database/RAG)**:
  * Gemini Vision triage API route (`/api/triage`).
  * pgvector / knowledge ingestion & grounded RAG retrieval.
  * Incident matching logic (`/api/match`).
