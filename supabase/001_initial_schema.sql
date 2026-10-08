-- CivicLens minimal schema.
-- This is a starter schema, not a finished production database.

create extension if not exists vector;
create extension if not exists postgis;

create table if not exists incidents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  issue_type text,
  location geography(point, 4326),
  status text not null default 'open',
  priority_score numeric,
  report_count integer not null default 0,
  department text,
  ai_summary text
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  image_url text,
  location geography(point, 4326),
  description text,
  issue_type text,
  severity text,
  priority_score numeric,
  department text,
  ai_reason text,
  incident_id uuid references incidents(id),
  rag_source_ids jsonb
);

create table if not exists knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source_title text not null,
  source_url text,
  source_publisher text,
  content text not null,
  embedding vector(1536),
  metadata jsonb
);
