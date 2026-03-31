-- Migration: Add new columns for Projects & Achievements Upgrade
-- Date: 2026-03-31

-- PROJECTS Table Enhancements
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS content text, 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'Lead Developer',
ADD COLUMN IF NOT EXISTS timeline text,
ADD COLUMN IF NOT EXISTS dominant_color text DEFAULT '#00ffb3';

-- Populate slug for existing rows (using lowercase name and replacing spaces with hyphens)
UPDATE projects 
SET slug = lower(replace(name, ' ', '-'))
WHERE slug IS NULL;

-- ACHIEVEMENTS Table Enhancements
ALTER TABLE achievements
ADD COLUMN IF NOT EXISTS category text DEFAULT 'Software Engineering',
ADD COLUMN IF NOT EXISTS credential_id text;

-- Add comments for documentation
COMMENT ON COLUMN projects.slug IS 'Unique URL identifier for the project detail page.';
COMMENT ON COLUMN projects.content IS 'Detailed project case study in Markdown/MDX format.';
COMMENT ON COLUMN projects.dominant_color IS 'Main color used for dynamic Spotlight UI effects.';
COMMENT ON COLUMN achievements.category IS 'Grouping for achievements (e.g. AI, Development, Finance).';
