# RAG Plan

## Goal
Ground AI-assisted civic classification/routing in a small, auditable knowledge base.

## Knowledge sources to collect BEFORE the hackathon
Use only sources you can legally access and cite. Prefer official/public sources.

Suggested categories:
- municipal department responsibilities
- civic complaint/service categories
- publicly documented service procedures
- publicly available ward/area information if useful
- public civic terminology and definitions

Do NOT invent rules or claim that a department owns a service unless the source supports it.

## Document format
Store source documents in `knowledge-base/raw/` and keep a source manifest containing:
- title
- publisher
- source URL
- retrieval date
- document type

## Retrieval flow
1. Convert report into a search query.
2. Embed/query the knowledge base.
3. Retrieve top 3–5 relevant chunks.
4. Pass chunks to the AI with the instruction to stay grounded.
5. Save the retrieved chunk IDs/source metadata with the case.

## Example output shape
```json
{
  "issue_type": "pothole",
  "severity": "high",
  "department": "<grounded department>",
  "priority": 0,
  "reason": "<grounded explanation>",
  "sources": ["<chunk-id>"]
}
```

The values above are schema examples, not pre-filled demo answers.
