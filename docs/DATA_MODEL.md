# Minimal Data Model

## reports
- id
- created_at
- image_url
- latitude
- longitude
- description
- issue_type
- severity
- priority_score
- department
- ai_reason
- incident_id
- rag_source_ids

## incidents
- id
- created_at
- issue_type
- latitude
- longitude
- status
- priority_score
- report_count
- department
- ai_summary

## knowledge_chunks
- id
- source_title
- source_url
- source_publisher
- content
- embedding
- metadata

Keep the first version small. Add fields only when the demo needs them.
