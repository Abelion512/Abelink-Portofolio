-- Replace changelog with business-friendly language
DELETE FROM public.changelog_entries;

INSERT INTO public.changelog_entries (version, title, content, date, type) VALUES
('v1.0.0', 'Portfolio Launch — New Design & AI Features',
  'Complete portfolio rebuild with modern design. New AI chat assistant, live dashboard, digital business card, and guestbook with social login.',
  '2026-06-30', 'major'),

('v1.0.1', 'Security & Performance Upgrade',
  'Tighter data access controls, faster page loads, and smoother animations across the site.',
  '2026-06-29', 'patch'),

('v1.1.0', 'Flexible AI Integration',
  'AI assistant now works with multiple providers (OpenAI, OpenRouter, Groq, Gemini). Easier configuration through environment variables.',
  '2026-06-28', 'minor'),

('v1.0.2', 'Bug Fixes & Data Sync',
  'Fixed database mismatches that caused errors on guestbook, project views, and creation gallery. Improved data consistency.',
  '2026-06-25', 'patch')
ON CONFLICT DO NOTHING;
