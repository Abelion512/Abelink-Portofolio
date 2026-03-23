-- ============================================
-- 2. CREATE TABLES
-- ============================================

-- SETTINGS (satu row, id=1)
CREATE TABLE IF NOT EXISTS settings (
  id                  serial PRIMARY KEY,
  open_to_work        boolean DEFAULT true,
  currently_learning  text DEFAULT 'Next.js 16 & AI Automation',
  currently_building  text,
  status              text DEFAULT 'Building',
  status_updated_at   timestamptz DEFAULT now()
);

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  description   text,
  status        text DEFAULT 'wip',
  cover_image   text,
  gradient_key  text DEFAULT 'default',
  tech          text[] DEFAULT '{}',
  github_url    text,
  live_url      text,
  is_pinned     boolean DEFAULT false,
  is_visible    boolean DEFAULT true,
  sort_order    integer DEFAULT 0,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS achievements (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL,
  issuer         text NOT NULL,
  year           integer,
  type           text DEFAULT 'certificate',
  image_path     text,
  credential_url text,
  valid_until    text,
  is_featured    boolean DEFAULT false,
  is_visible     boolean DEFAULT true,
  sort_order     integer DEFAULT 0,
  created_at     timestamptz DEFAULT now()
);

-- STACK ITEMS
CREATE TABLE IF NOT EXISTS stack_items (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category   text NOT NULL,
  name       text NOT NULL,
  logo_url   text,
  is_visible boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

-- USES ITEMS
CREATE TABLE IF NOT EXISTS uses_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category    text NOT NULL,
  name        text NOT NULL,
  description text,
  url         text,
  is_visible  boolean DEFAULT true,
  sort_order  integer DEFAULT 0
);

-- GUESTBOOK
CREATE TABLE IF NOT EXISTS guestbook (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  message    text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ACTIVITY
CREATE TABLE IF NOT EXISTS activity (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type       text NOT NULL DEFAULT 'commit',
  repo       text,
  message    text,
  url        text,
  created_at timestamptz DEFAULT now()
);

-- NOW PLAYING
CREATE TABLE IF NOT EXISTS now_playing (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track      text,
  artist     text,
  platform   text DEFAULT 'manual',
  updated_at timestamptz DEFAULT now()
);

-- LEARNING LOG
CREATE TABLE IF NOT EXISTS learning_log (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry      text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- CHANGELOG ENTRIES
CREATE TABLE IF NOT EXISTS changelog_entries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version     text,
  title       text NOT NULL,
  description text,
  type        text DEFAULT 'portfolio',
  created_at  timestamptz DEFAULT now()
);

-- PROJECT VIEWS
CREATE TABLE IF NOT EXISTS project_views (
  project_id text PRIMARY KEY,
  count      integer DEFAULT 0
);

-- ============================================
-- 3. RLS POLICIES
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE stack_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE uses_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE now_playing ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Drop existing if any to avoid errors
DROP POLICY IF EXISTS "public_read_projects" ON projects;
DROP POLICY IF EXISTS "public_read_achievements" ON achievements;
DROP POLICY IF EXISTS "public_read_stack" ON stack_items;
DROP POLICY IF EXISTS "public_read_uses" ON uses_items;
DROP POLICY IF EXISTS "public_read_activity" ON activity;
DROP POLICY IF EXISTS "public_read_playing" ON now_playing;
DROP POLICY IF EXISTS "public_read_log" ON learning_log;
DROP POLICY IF EXISTS "public_read_changelog" ON changelog_entries;
DROP POLICY IF EXISTS "public_read_views" ON project_views;
DROP POLICY IF EXISTS "public_read_settings" ON settings;
DROP POLICY IF EXISTS "public_insert_guestbook" ON guestbook;
DROP POLICY IF EXISTS "public_read_guestbook" ON guestbook;

-- Create Policies
CREATE POLICY "public_read_projects"     ON projects     FOR SELECT USING (is_visible = true);
CREATE POLICY "public_read_achievements" ON achievements FOR SELECT USING (is_visible = true);
CREATE POLICY "public_read_stack"        ON stack_items  FOR SELECT USING (is_visible = true);
CREATE POLICY "public_read_uses"         ON uses_items   FOR SELECT USING (is_visible = true);
CREATE POLICY "public_read_activity"     ON activity     FOR SELECT USING (true);
CREATE POLICY "public_read_playing"      ON now_playing  FOR SELECT USING (true);
CREATE POLICY "public_read_log"          ON learning_log FOR SELECT USING (true);
CREATE POLICY "public_read_changelog"    ON changelog_entries FOR SELECT USING (true);
CREATE POLICY "public_read_views"        ON project_views FOR SELECT USING (true);
CREATE POLICY "public_read_settings"     ON settings     FOR SELECT USING (true);
CREATE POLICY "public_insert_guestbook" ON guestbook FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_guestbook"   ON guestbook FOR SELECT USING (true);

-- ============================================
-- 4. SEED DATA
-- ============================================

-- Settings
INSERT INTO settings (id, open_to_work, currently_learning)
VALUES (1, true, 'Next.js 16 & AI Automation')
ON CONFLICT (id) DO UPDATE SET
  open_to_work = EXCLUDED.open_to_work,
  currently_learning = EXCLUDED.currently_learning;

-- Projects
INSERT INTO projects (name, description, status, gradient_key, tech, github_url, is_pinned, sort_order) VALUES
('Abelink Portfolio',  'Personal portfolio with AI integration.', 'live', 'abelink-portfolio', ARRAY['Next.js', 'Tailwind v4', 'Motion v12'], 'https://github.com/abelion512/Abelink-Portofolio', true, 1),
('Lembaran',           'CLI TUI note-taking, multi-environment.', 'wip',  'lembaran',          ARRAY['Next.js', 'TypeScript', 'Supabase'], null, true, 2),
('LearnInk AI',        'AI-first LMS with code execution and gamification.', 'wip', 'learnink', ARRAY['Next.js', 'Anthropic SDK'], null, false, 3),
('Ab-Pay',             'Custom payment with Midtrans (QRIS, e-wallet, VA).', 'wip', 'ab-pay',  ARRAY['React', 'Node.js', 'Supabase'], null, false, 4),
('Abelion Finance',    'Crypto and stock analysis automation.', 'wip', 'default', ARRAY['n8n', 'AI Agents'], null, false, 5)
ON CONFLICT DO NOTHING;

-- Achievements
INSERT INTO achievements (title, issuer, year, type, image_path, credential_url, valid_until, is_featured, sort_order) VALUES
('Belajar Dasar AI',                                    'Dicoding Indonesia',          2026, 'certificate',   '/certs/dicoding-dasar-ai.jpg',         'https://dicoding.com/certificates/07Z6J9NM2XQR', '03 Januari 2029', true,  1),
('Introduction to Financial Literacy',                   'Dicoding × DBS Foundation',  2026, 'certificate',   '/certs/dicoding-financial-literacy.jpg', 'https://dicoding.com/certificates/1RXYQ9NRQZVM', '05 Januari 2029', false, 2),
('Use Generative AI for Software Development',           'IBM SkillsBuild',             2025, 'certificate',   '/certs/ibm-genai-software-dev.jpg',     null, null, true,  3),
('IBM Granite Models for Software Development',          'IBM SkillsBuild',             2025, 'certificate',   '/certs/ibm-granite-models.jpg',         null, null, false, 4),
('Robotic Process Automation',                           'Dibimbing.id',                2026, 'participation', '/certs/dibimbing-rpa.jpg',              null, null, false, 5),
('DevOps: No DevOps, No Product',                        'Dibimbing.id × GDGOCBION',    2026, 'participation', '/certs/dibimbing-devops.jpg',           null, null, false, 6),
('Data Science: Practical Introduction to Machine Learning','Dibimbing.id',             2025, 'participation', '/certs/dibimbing-data-science-ml.jpg',  null, null, false, 7)
ON CONFLICT DO NOTHING;

-- Stack items
INSERT INTO stack_items (category, name, sort_order) VALUES
('Languages', 'TypeScript', 1), ('Languages', 'JavaScript', 2), ('Languages', 'Python', 3), ('Languages', 'SQL', 4), ('Languages', 'Go', 5),
('Frameworks & Libraries', 'Next.js', 1), ('Frameworks & Libraries', 'React', 2), ('Frameworks & Libraries', 'Tailwind CSS v4', 3), ('Frameworks & Libraries', 'Motion v12', 4),
('Backend & Database', 'Supabase', 1), ('Backend & Database', 'PostgreSQL', 2), ('Backend & Database', 'Node.js', 3), ('Backend & Database', 'Docker', 4), ('Backend & Database', 'Linux', 5),
('AI & Operations', 'n8n', 1), ('AI & Operations', 'Gemini API', 2), ('AI & Operations', 'OpenRouter', 3), ('AI & Operations', 'Groq', 4), ('AI & Operations', 'Vercel', 5)
ON CONFLICT DO NOTHING;
