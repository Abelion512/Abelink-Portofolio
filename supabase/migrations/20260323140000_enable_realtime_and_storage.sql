-- 1. Enable Realtime for tables
-- This allows the Supabase Realtime server to broadcast changes to these tables.
begin;
  -- Remove existing if any to avoid errors
  alter publication supabase_realtime intermediate;
  drop publication if exists supabase_realtime;
  
  -- Create publication for our tables
  create publication supabase_realtime for table achievements, creation;
commit;

-- 2. Setup Storage for Certificates
-- Create the 'certificates' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', true)
on conflict (id) do nothing;

-- 3. Storage RLS Policies
-- Allow public read access to certificates
create policy "Public Access to Certificates"
on storage.objects for select
to public
using (bucket_id = 'certificates');

-- Allow authenticated uploads (owner/admin only)
-- Note: Replace 'auth.uid()' check with your preferred logic if needed
create policy "Authenticated Uploads"
on storage.objects for insert
to authenticated
with check (bucket_id = 'certificates');
