# CivicLens — AI Civic Intelligence Platform

CivicLens turns citizen photos and geolocation into verified, deduplicated civic incidents routed to municipal departments with authentic citizen charter evidence.

> **Core Insight**: *One underlying civic incident connects multiple citizen reports.*

---

## Quick Start

### 1. Prerequisites
* **Node.js**: `>= 18.18.0` (Node 24 LTS verified)
* **npm**: `>= 9.0.0`
* **Supabase Account**: Project configured with PostgreSQL + Storage
* **Google AI Studio**: Gemini API Key with `gemini-2.5-flash`

### 2. Setup & Run Locally
```bash
# Clone repository
git clone https://github.com/hamid220-kamal/CivicLens.git
cd CivicLens

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env.local and add Supabase + Gemini keys
cp .env.example .env.local

# Test database and AI connectivity
npm run test:connections

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Live Demo & Documentation

* **Live Deployment**: [https://civiclens-live.vercel.app](https://civiclens-live.vercel.app)
* **Hackathon MVP & Architecture Plan**: [docs/MVP_PLAN.md](file:///d:/CivicLens/docs/MVP_PLAN.md)
* **Civic Knowledge Sources (RAG Catalog)**: [docs/RAG_SOURCES.md](file:///d:/CivicLens/docs/RAG_SOURCES.md)

---

## Hackathon Tech Stack
* **Framework**: Next.js 14 (App Router) + TypeScript
* **Styling**: Tailwind CSS
* **Database & Storage**: Supabase (PostgreSQL, RLS, Storage bucket `civic-reports`)
* **AI & Vision**: Google Gemini 2.5 Flash (`@google/generative-ai`)
* **Knowledge Retrieval (RAG)**: Municipal Charter Grounding (Hyderabad / Telangana)

