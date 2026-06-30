-- Create creation table for the /creation page
create table if not exists public.creation (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    embed_url text not null,
    category text,
    cover_image text,
    is_visible boolean default true,
    created_at timestamptz default now()
);

-- Enable RLS
alter table public.creation enable row level security;

-- Public read policy
create policy "Allow public read access for creation"
on public.creation for select
to public
using (is_visible = true);

-- Seed initial data
insert into public.creation (title, embed_url, category, cover_image) values
('AI & Web Development', 'https://www.tiktok.com/@abelion.ai/video/7345678901234567890', 'AI / Web', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'),
('Next.js 16 Performance', 'https://www.tiktok.com/@abelion.ai/video/7345678901234567891', 'Web Dev', 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop'),
('AI Automation with n8n', 'https://www.tiktok.com/@abelion.ai/video/7345678911234567892', 'AI', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop')
on conflict (id) do nothing;

-- Add to realtime publication
alter publication supabase_realtime add table only creation;
