-- CivicLens Migration 004 — Hardened Production RLS & Storage Security
-- Resolves duplicate 003 migration prefix and removes all permissive public write grants.

-- 1. Ensure RLS is active on core tables
alter table if exists incidents enable row level security;
alter table if exists reports enable row level security;
alter table if exists knowledge_chunks enable row level security;

-- 2. Revoke dangerous table mutation privileges from anon role
revoke insert, update, delete on table knowledge_chunks from anon;
revoke update, delete on table reports from anon;
revoke insert, update, delete on table incidents from anon;

-- 3. Drop all previous permissive policies
drop policy if exists "Allow public read incidents" on incidents;
drop policy if exists "Allow public insert incidents" on incidents;
drop policy if exists "Allow public update incidents" on incidents;
drop policy if exists "Public read incidents" on incidents;
drop policy if exists "Service role manage incidents" on incidents;

drop policy if exists "Allow public read reports" on reports;
drop policy if exists "Allow public insert reports" on reports;
drop policy if exists "Allow public update reports" on reports;
drop policy if exists "Anon citizen insert reports" on reports;
drop policy if exists "Public read reports" on reports;
drop policy if exists "Authenticated staff update reports" on reports;

drop policy if exists "Allow public read knowledge_chunks" on knowledge_chunks;
drop policy if exists "Allow public insert knowledge_chunks" on knowledge_chunks;
drop policy if exists "Public read knowledge_chunks" on knowledge_chunks;
drop policy if exists "Service role manage knowledge_chunks" on knowledge_chunks;

-- 4. Knowledge Base Policies
-- Public can read knowledge chunks for citations
create policy "Public read knowledge_chunks" on knowledge_chunks
  for select to anon, authenticated
  using (true);

-- Only service_role can insert/update/delete knowledge standards
create policy "Service role manage knowledge_chunks" on knowledge_chunks
  for all to service_role
  using (true)
  with check (true);

-- 5. Reports Policies
-- Anonymous citizens can submit new reports
create policy "Anon citizen insert reports" on reports
  for insert to anon, authenticated
  with check (true);

-- Public transparency feed / dashboard can view submitted reports
-- (Notice: reports table contains no citizen PII such as phone numbers, emails, or personal names)
create policy "Public read reports" on reports
  for select to anon, authenticated
  using (true);

-- Updates (e.g. status changes, assignments) restricted to service_role or authenticated staff claim
create policy "Staff or service update reports" on reports
  for update to authenticated, service_role
  using (
    auth.role() = 'service_role' or 
    coalesce(auth.jwt() ->> 'role', '') in ('staff', 'dispatcher', 'admin')
  )
  with check (
    auth.role() = 'service_role' or 
    coalesce(auth.jwt() ->> 'role', '') in ('staff', 'dispatcher', 'admin')
  );

-- Delete restricted strictly to service_role
create policy "Service role delete reports" on reports
  for delete to service_role
  using (true);

-- 6. Incidents Policies (Clustered triage groups)
create policy "Public read incidents" on incidents
  for select to anon, authenticated
  using (true);

create policy "Service role manage incidents" on incidents
  for all to service_role
  using (true)
  with check (true);

-- 7. Storage Bucket Security for 'civic-reports'
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'civic-reports',
  'civic-reports',
  true,
  15728640, -- 15MB limit
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 15728640,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

-- Drop existing storage policies
drop policy if exists "Public read civic-reports images" on storage.objects;
drop policy if exists "Authenticated or service upload civic-reports" on storage.objects;
drop policy if exists "Server service upload civic-reports" on storage.objects;

-- Allow public viewing of uploaded issue images
create policy "Public read civic-reports images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'civic-reports');

-- Uploads restricted strictly to backend service_role (via Next.js API server validation)
create policy "Service role upload civic-reports" on storage.objects
  for insert to service_role
  with check (bucket_id = 'civic-reports');
