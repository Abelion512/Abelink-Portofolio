-- Fix: Schema alignment (v2 — replaces partial 00002)
-- 1. guestbook: add user_id column
-- 2. increment_view RPC: match on slug not UUID id
-- 3. guestbook: ensure user_name exists (initial remote schema has it)

-- ============================================
-- 1. GUESTBOOK: Ensure user_name, add user_id
-- ============================================
ALTER TABLE public.guestbook
  ADD COLUMN IF NOT EXISTS user_name TEXT;

ALTER TABLE public.guestbook
  ADD COLUMN IF NOT EXISTS user_id TEXT;

-- Backfill user_name from user_avatar/providers if user_name is null
UPDATE public.guestbook
SET user_name = COALESCE(user_name, 'Anonymous')
WHERE user_name IS NULL;

ALTER TABLE public.guestbook
  ALTER COLUMN user_name SET NOT NULL;

-- ============================================
-- 2. FIX increment_view RPC
-- ============================================
-- Projects.id is UUID, code passes text slug
-- Match on slug column (added by 20260331220000)

CREATE OR REPLACE FUNCTION public.increment_view(page_slug text)
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  current_count int;
begin
  update public.projects
  set views = coalesce(views, 0) + 1
  where slug = page_slug
  returning views into current_count;

  if not found then
    return 0;
  end if;

  return current_count;
end;
$function$;
