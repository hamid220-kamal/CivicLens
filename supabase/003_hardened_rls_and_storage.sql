-- CivicLens Hardened Production RLS & Storage Security Migration
-- Ensures anonymous users CANNOT tamper with knowledge chunks or modify existing reports.

-- 1. Enable RLS on all core tables
alter table if exists incidents enable row level security;
alter table if exists reports enable row level security;
alter table if exists knowledge_chunks enable row level security;

-- 2. Drop existing permissive policies
drop policy if exists "Allow public read incidents" on incidents;
drop policy if exists "Allow public insert incidents" on incidents;
drop policy if exists "Allow public update incidents" on incidents;

drop policy if exists "Allow public read reports" on reports;
drop policy if exists "Allow public insert reports" on reports;
drop policy if exists "Allow public update reports" on reports;

drop policy if exists "Allow public read knowledge_chunks" on knowledge_chunks;
drop policy if exists "Allow public insert knowledge_chunks" on knowledge_chunks;

-- 3. Hardened Policies for Reports
-- Anonymous citizens can submit new reports
create policy "Anon citizen insert reports" on reports
  for insert to anon, authenticated
  with check (true);

-- Public & Dashboard can read civic reports (contains no citizen PII)
create policy "Public read reports" on reports
  for select to anon, authenticated
  using (true);

-- Only authenticated staff or service_role can update reports (e.g. status changes)
create policy "Authenticated staff update reports" on reports
  for update to authenticated, service_role
  using (true)
  with check (true);

-- 4. Hardened Policies for Knowledge Chunks (Read-only for public, write-only for service_role)
create policy "Public read knowledge_chunks" on knowledge_chunks
  for select to anon, authenticated
  using (true);

create policy "Service role manage knowledge_chunks" on knowledge_chunks
  for all to service_role
  using (true)
  with check (true);

-- 5. Hardened Policies for Incidents (Triage groups)
create policy "Public read incidents" on incidents
  for select to anon, authenticated
  using (true);

create policy "Service role manage incidents" on incidents
  for all to service_role
  using (true)
  with check (true);

-- 6. Storage Bucket Security for 'civic-reports'
-- Create public read policy for viewing report images
insert into storage.buckets (id, name, public)
values ('civic-reports', 'civic-reports', true)
on conflict (id) do update set public = true;

-- Drop prior storage policies if any
drop policy if exists "Public read civic-reports images" on storage.objects;
drop policy if exists "Authenticated or service upload civic-reports" on storage.objects;

-- Allow public viewing of uploaded images
create policy "Public read civic-reports images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'civic-reports');

-- Allow server service-role and authenticated upload
create policy "Server service upload civic-reports" on storage.objects
  for insert to service_role, authenticated
  with check (bucket_id = 'civic-reports');
