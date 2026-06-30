-- Seed changelog_entries for the timeline page

INSERT INTO public.changelog_entries (version, title, content, date, type) VALUES
('v1.0.0', 'Initial Release — Abelink Portofolio v4',
  'Portfolio rewrite with Next.js 16, Tailwind CSS v4, and Motion v12.\n\n• Complete UI overhaul with glassmorphism design system\n• AI Chat powered by OpenRouter (multi-model support)\n• Dynamic RAG knowledge base with Supabase auto-sync\n• Guestbook with GitHub/Google OAuth\n• Pulse Dashboard with real-time activity feed\n• Responsive Bento Grid layouts\n• Digital Business Card with QR sharing\n• Interactive 3D Hero Scene with Three.js\n• i18n support (EN/ID)\n• Accessibility improvements (ARIA labels, semantic HTML)',
  '2026-06-30', 'major'),

('v1.0.1', 'Security Hardening & Performance',
  '• Fixed RLS policies for all tables (read-only anon, except guestbook)\n• Removed excessive anon privileges\n• Hardened SQL function search paths\n• Optimized Turbopack config for faster builds\n• Fixed hydration errors in hero animations\n• Reduced bundle size via dynamic imports',
  '2026-06-29', 'patch'),

('v1.1.0', 'AI Agent Customization',
  '• Switched from hardcoded Gemini to generic OpenAI-compatible AI client\n• Added env-based configuration: AI_BASE_URL, AI_API_KEY, AI_MODEL\n• Support for OpenRouter, OpenAI, Groq, Gemini via API\n• Centralized env config (src/lib/env.ts)\n• Removed 8+ orphaned secrets from env\n• Consolidated email/social URLs to single source of truth',
  '2026-06-28', 'minor'),

('v1.0.2', 'Schema Alignment & Bugfixes',
  '• Fixed guestbook column mismatch (user_id, user_name)\n• Fixed increment_view RPC to use slug instead of UUID\n• Fixed creation page querying wrong table\n• Moved .backup migrations out of active directory\n• Supabase migration history repaired',
  '2026-06-25', 'patch')
ON CONFLICT DO NOTHING;
