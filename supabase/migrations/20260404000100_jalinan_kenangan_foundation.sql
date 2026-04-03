-- Phase 1: Jalinan Kenangan (The Archive) Foundation
-- Created: 2026-04-03 (Target: 2026-04-04)
-- Description: Core tables for Bento Grid media, Positivity Locks, and Digital Certificates.

-- 1. Memories Table (Bento Grid Media)
CREATE TABLE IF NOT EXISTS public.memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    type TEXT NOT NULL, -- 'tiktok', 'fancam', 'music', 'movie'
    title TEXT NOT NULL,
    description TEXT,
    media_url TEXT NOT NULL,
    media_source TEXT, -- Username/Source credit
    metadata JSONB DEFAULT '{}'::jsonb,
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    ai_access BOOLEAN DEFAULT false -- Security: Prevent AI scraping if false
);

-- 2. Positivity Locks (Gembok Digital)
-- Philosophy: "Aku memang menyukainya tetapi aku akan merubah caraku menyukainya dengan melepaskannya"
CREATE TABLE IF NOT EXISTS public.positivity_locks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT DEFAULT 'Saksi Rahasia',
    is_locked BOOLEAN DEFAULT true, -- Immutable flag
    metadata JSONB DEFAULT '{}'::jsonb -- Can store time/location
);

-- 3. Digital Visitors (Saksi Digital)
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ip_hash TEXT NOT NULL UNIQUE, -- For uniqueness without storing raw IP
    visit_count INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- --- SECURITY & PERMISSIONS ---

-- Enable RLS
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positivity_locks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Memories Policies
CREATE POLICY "Public read access for memories" ON public.memories FOR SELECT USING (is_public = true);
CREATE POLICY "Service role full access for memories" ON public.memories ALL USING (auth.role() = 'service_role');

-- Positivity Locks Policies (Write once, Read everywhere, No delete)
CREATE POLICY "Anyone can submit positivity" ON public.positivity_locks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read for locked positivity" ON public.positivity_locks FOR SELECT USING (true);
CREATE POLICY "No one can update/delete locked positivity" ON public.positivity_locks FOR UPDATE USING (false);

-- Visitors Policies (Restricted to Edge Functions)
CREATE POLICY "Service role access for visitors" ON public.visitors ALL USING (auth.role() = 'service_role');

-- --- SEARCH PATH SECURITY ---
-- (Applied globally via security hardening migration)
