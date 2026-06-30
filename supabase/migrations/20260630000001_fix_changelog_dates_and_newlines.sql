-- Fix changelog entry dates to match version progression order
-- and replace literal \n with actual newlines in content

-- Fix dates (higher version → more recent date)
UPDATE changelog_entries SET date = '2026-06-30' WHERE version = '1.1.0' AND type = 'minor';
UPDATE changelog_entries SET date = '2026-06-28' WHERE version = '1.0.2' AND type = 'patch';
UPDATE changelog_entries SET date = '2026-06-25' WHERE version = '1.0.1' AND type = 'patch';
UPDATE changelog_entries SET date = '2026-06-20' WHERE version = '1.0.0' AND type = 'major';

-- Replace literal \n with real line breaks in markdown content
UPDATE changelog_entries SET content = REPLACE(content, '\n', E'\n') WHERE content LIKE '%\n%';
