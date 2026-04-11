-- Security Hardening Migration
-- Last Updated: 2026-04-03 20:55:00 WIB

-- 1. Fix Mutable Search Path for Knowledge Sync Functions
-- Prevents role-mutable search path hijacking as per Supabase Security Best Practices.

ALTER FUNCTION public.sync_certificates_to_knowledge() SET search_path = public;
ALTER FUNCTION public.sync_projects_to_knowledge() SET search_path = public;

-- 2. Refine Guestbook RLS Policy
-- Original: WITH CHECK (true) -> Allowed unrestricted global inserts.
-- Updated: Ensuring content is present and within reasonable limits.

DROP POLICY IF EXISTS "Allow public insert to guestbook" ON public.guestbook;

CREATE POLICY "Allow validated public insert to guestbook"
ON public.guestbook
FOR INSERT
WITH CHECK (
    length(message) > 0 AND
    length(message) < 1000 AND
    (auth.uid() IS NOT NULL OR true) -- Keep public, but restrict payload
);

-- 3. Standardize RLS for Certificates & Knowledge Docs
-- Ensures RLS is enabled and has at least a public read policy.

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'certificates' AND policyname = 'Public read access for certificates') THEN
        CREATE POLICY "Public read access for certificates" ON public.certificates FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'knowledge_docs' AND policyname = 'Public read access for knowledge_docs') THEN
        CREATE POLICY "Public read access for knowledge_docs" ON public.knowledge_docs FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Public read access for projects') THEN
        CREATE POLICY "Public read access for projects" ON public.projects FOR SELECT USING (true);
    END IF;
END $$;
