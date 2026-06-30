-- Revoke excessive anon grants from tables that don't need public writes
-- Only guestbook needs public INSERT; everything else is read-only for anon
-- Run after: 20260404000000_security_hardening.sql

DO $$
DECLARE
  tbl TEXT;
  tables_with_public_read TEXT[] := ARRAY[
    'achievements', 'activity', 'changelog_entries', 'learning_log',
    'now_playing', 'project_views', 'projects', 'settings', 'uses_items',
    'knowledge_docs', 'certificates'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables_with_public_read
  LOOP
    EXECUTE format('REVOKE INSERT, UPDATE, DELETE ON public.%I FROM anon;', tbl);
  END LOOP;
END $$;
