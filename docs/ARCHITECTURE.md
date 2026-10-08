# CivicLens Architecture

```text
Citizen
  │ photo + location + description
  ▼
Next.js Web App
  │
  ├── Supabase Storage ── image
  └── API route / server action
          │
          ▼
     AI Triage Workflow
       ├── Vision analysis
       ├── RAG retrieval ──► Civic Knowledge Base / pgvector
       ├── Issue classification
       ├── Severity + priority
       └── Department routing
          │
          ▼
     Incident Matcher
       └── nearby/recent reports
          │
          ▼
     Supabase/Postgres
          │
          ▼
     Authority Dashboard
```

## RAG rule
The model should not invent civic procedures. Retrieve relevant source chunks first, then ask the model to make a grounded recommendation and return the source/chunk IDs used.

## Agentic framing
For the MVP, use a coordinated workflow rather than pretending every step is a fully autonomous agent:

`Triage → Retrieve → Reason → Match → Route`
