-- Enable Row Level Security (RLS) on all tables
alter table if exists incidents enable row level security;
alter table if exists reports enable row level security;
alter table if exists knowledge_chunks enable row level security;

-- Drop existing policies if any
drop policy if exists "Allow public read incidents" on incidents;
drop policy if exists "Allow public insert incidents" on incidents;
drop policy if exists "Allow public update incidents" on incidents;

drop policy if exists "Allow public read reports" on reports;
drop policy if exists "Allow public insert reports" on reports;
drop policy if exists "Allow public update reports" on reports;

drop policy if exists "Allow public read knowledge_chunks" on knowledge_chunks;
drop policy if exists "Allow public insert knowledge_chunks" on knowledge_chunks;

-- Create permissive public policies for Hackathon MVP
create policy "Allow public read incidents" on incidents for select using (true);
create policy "Allow public insert incidents" on incidents for insert with check (true);
create policy "Allow public update incidents" on incidents for update using (true);

create policy "Allow public read reports" on reports for select using (true);
create policy "Allow public insert reports" on reports for insert with check (true);
create policy "Allow public update reports" on reports for update using (true);

create policy "Allow public read knowledge_chunks" on knowledge_chunks for select using (true);
create policy "Allow public insert knowledge_chunks" on knowledge_chunks for insert with check (true);

-- Grant table access to anon and authenticated roles
grant all on table incidents to anon, authenticated, service_role;
grant all on table reports to anon, authenticated, service_role;
grant all on table knowledge_chunks to anon, authenticated, service_role;
