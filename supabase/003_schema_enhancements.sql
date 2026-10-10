-- CivicLens Schema Enhancements for Report Persistence & RAG
-- Safe idempotent additions to existing tables

alter table if exists reports add column if not exists latitude numeric;
alter table if exists reports add column if not exists longitude numeric;
alter table if exists reports add column if not exists status text not null default 'pending_review';
alter table if exists reports add column if not exists evidence jsonb default '[]'::jsonb;
alter table if exists reports add column if not exists severity_reason text;
alter table if exists reports add column if not exists department_reason text;
alter table if exists reports add column if not exists description_summary text;

alter table if exists knowledge_chunks add column if not exists category text;
alter table if exists knowledge_chunks add column if not exists department text;
alter table if exists knowledge_chunks add column if not exists sla_hours integer;
alter table if exists knowledge_chunks add column if not exists keywords text[];

-- Ensure RLS policies allow reading and writing
grant all on table reports to anon, authenticated, service_role;
grant all on table knowledge_chunks to anon, authenticated, service_role;
grant all on table incidents to anon, authenticated, service_role;
