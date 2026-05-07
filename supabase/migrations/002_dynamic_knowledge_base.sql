-- ============================================
-- Migration: 002_dynamic_knowledge_base
-- Description: Dynamic RAG knowledge base with auto-sync
-- Date: 2026-03-30
-- Dependencies: 001_initial_schema (if exists)
-- ============================================

-- ============================================
-- 1. CREATE KNOWLEDGE_DOCS TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS knowledge_docs (
  id SERIAL PRIMARY KEY,
  doc_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  security_level TEXT DEFAULT 'public' CHECK (security_level IN ('public', 'sensitive', 'private')),
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. ADD MISSING COLUMNS TO EXISTING TABLES
-- ============================================

-- Add is_active to projects
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add updated_at to projects
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add is_active to certificates (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'certificates') THEN
    ALTER TABLE certificates
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- ============================================
-- 3. CREATE CERTIFICATES TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS certificates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date_issued DATE,
  credential_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_knowledge_docs_active ON knowledge_docs(is_active);
CREATE INDEX IF NOT EXISTS idx_knowledge_docs_security ON knowledge_docs(security_level);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_certificates_active ON certificates(is_active);

-- ============================================
-- 5. CREATE TRIGGERS FOR AUTO-SYNC
-- ============================================

-- Function to update knowledge_docs from projects
-- Uses existing column names: tech, live_url, is_pinned, is_visible
CREATE OR REPLACE FUNCTION sync_projects_to_knowledge()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE knowledge_docs
  SET
    content = COALESCE(
      (SELECT string_agg(
        name || ': ' || COALESCE(description, '') || E'\n' ||
        'Tech: ' || array_to_string(COALESCE(tech, ARRAY[]::TEXT[]), ', ') || E'\n' ||
        'URL: ' || COALESCE(live_url, 'N/A') || E'\n\n',
        E'\n'
      )
      FROM projects WHERE is_active = true AND is_visible = true),
      'No active projects'
    ),
    updated_at = NOW()
  WHERE doc_id = 'projects';

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update knowledge_docs from certificates
CREATE OR REPLACE FUNCTION sync_certificates_to_knowledge()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE knowledge_docs
  SET
    content = COALESCE(
      (SELECT string_agg(
        title || ' - ' || issuer ||
        COALESCE(' (' || to_char(date_issued, 'YYYY') || ')', '') || E'\n' ||
        COALESCE('Credential: ' || credential_url || E'\n', ''),
        E'\n'
      )
      FROM certificates WHERE is_active = true),
      'No certificates'
    ),
    updated_at = NOW()
  WHERE doc_id = 'achievements';

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers
DROP TRIGGER IF EXISTS projects_sync_trigger ON projects;
CREATE TRIGGER projects_sync_trigger
AFTER INSERT OR UPDATE OR DELETE ON projects
FOR EACH STATEMENT
EXECUTE FUNCTION sync_projects_to_knowledge();

DROP TRIGGER IF EXISTS certificates_sync_trigger ON certificates;
CREATE TRIGGER certificates_sync_trigger
AFTER INSERT OR UPDATE OR DELETE ON certificates
FOR EACH STATEMENT
EXECUTE FUNCTION sync_certificates_to_knowledge();

-- ============================================
-- 6. SEED KNOWLEDGE DOCS
-- ============================================

INSERT INTO knowledge_docs (doc_id, title, content, security_level, category) VALUES
('about', 'About Ihsanuddin',
$I$
Ihsanuddin Salav is a second-semester Software Engineering student based in Surabaya, Indonesia.
He specializes in Fullstack Development, AI Automation (n8n), and Linux Architecture.
Tagline: Student. Builder. Learner.
GitHub: github.com/abelion512
Instagram: @ihsanovid
$I$,
'public', 'about')
ON CONFLICT (doc_id) DO NOTHING;

INSERT INTO knowledge_docs (doc_id, title, content, security_level, category) VALUES
('stack', 'Tech Stack',
$I$
Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion v12
Backend: Node.js, Supabase, PostgreSQL, Docker, Linux, n8n
AI/ML: Gemini API, Anthropic SDK, OpenRouter, Groq
$I$,
'public', 'stack')
ON CONFLICT (doc_id) DO NOTHING;

INSERT INTO knowledge_docs (doc_id, title, content, security_level, category) VALUES
('projects', 'Projects',
$I$
Active Projects:
- Abelink Portfolio: Personal portfolio with AI chat
- Lembaran: CLI TUI note-taking app
- LearnInk AI: AI-first LMS
- Ab-Pay: Payment system with Midtrans
$I$,
'public', 'projects')
ON CONFLICT (doc_id) DO NOTHING;

INSERT INTO knowledge_docs (doc_id, title, content, security_level, category) VALUES
('achievements', 'Achievements',
$I$
Certificates (7 total):
- Dicoding: Dasar AI, Financial Literacy (2026)
- IBM SkillsBuild: Generative AI, Granite Models (2025)
- Dibimbing.id: RPA, DevOps, Data Science & ML (2025/2026)
$I$,
'public', 'achievements')
ON CONFLICT (doc_id) DO NOTHING;

INSERT INTO knowledge_docs (doc_id, title, content, security_level, category) VALUES
('contact', 'Contact Information',
$I$
Email: agen.salva@gmail.com
For business inquiries only.
$I$,
'sensitive', 'contact')
ON CONFLICT (doc_id) DO NOTHING;

INSERT INTO knowledge_docs (doc_id, title, content, security_level, category) VALUES
('explorer', 'Explorer & Interests',
$I$
Ihsanuddin is also an explorer and adventurer.
Interests: AI, web technologies, automation, open source
$I$,
'public', 'explorer')
ON CONFLICT (doc_id) DO NOTHING;

INSERT INTO knowledge_docs (doc_id, title, content, security_level, category) VALUES
('vtuber_collabs', 'VTuber Collaborations',
$I$
VTuber Collaborations:
1. Neon Chronicles - Echo X Luna
2. Synapse Agency - Neural Arts
3. Ah Yu-jin - IVE
$I$,
'public', 'vtuber')
ON CONFLICT (doc_id) DO NOTHING;

-- ============================================
-- 7. SEED PROJECT (Using existing schema)
-- ============================================

-- Insert Abelink Portfolio using existing column names
INSERT INTO projects (id, name, description, tech, live_url, github_url, is_pinned, is_visible, is_active, created_at) VALUES
('abelink-portfolio', 'Abelink Portfolio', 'Personal portfolio with AI chat and VTuber collaborations',
 ARRAY['Next.js 16', 'TypeScript', 'Tailwind v4', 'Motion v12', 'Supabase'],
 'https://abelion.vercel.app',
 'https://github.com/Abelion512/Abelink-Portofolio',
 true,  -- is_pinned
 true,  -- is_visible
 true,  -- is_active
 NOW()) -- created_at
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 8. SEED CERTIFICATES
-- ============================================

INSERT INTO certificates (title, issuer, date_issued) VALUES
('Dasar Artificial Intelligence', 'Dicoding', '2026-01-15'),
('Financial Literacy', 'Dicoding', '2026-02-20'),
('Generative AI Fundamentals', 'IBM SkillsBuild', '2025-11-10')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 9. ROW LEVEL SECURITY (Optional - Enable if needed)
-- ============================================

-- Uncomment to enable RLS
-- ALTER TABLE knowledge_docs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Public can view active knowledge docs"
-- ON knowledge_docs FOR SELECT
-- USING (is_active = true AND security_level = 'public');

-- CREATE POLICY "Public can view active certificates"
-- ON certificates FOR SELECT
-- USING (is_active = true);

-- ============================================
-- MIGRATION COMPLETE ✅
-- ============================================

-- Verification queries
DO $$
DECLARE
  knowledge_count INTEGER;
  projects_count INTEGER;
  certificates_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO knowledge_count FROM knowledge_docs;
  SELECT COUNT(*) INTO projects_count FROM projects WHERE is_visible = true;
  SELECT COUNT(*) INTO certificates_count FROM certificates;

  RAISE NOTICE '================================';
  RAISE NOTICE 'Migration Complete! ✅';
  RAISE NOTICE '================================';
  RAISE NOTICE 'Knowledge Docs: %', knowledge_count;
  RAISE NOTICE 'Visible Projects: %', projects_count;
  RAISE NOTICE 'Certificates: %', certificates_count;
  RAISE NOTICE '================================';
END $$;

-- Quick verification
SELECT 'knowledge_docs' as table_name, COUNT(*) as count FROM knowledge_docs
UNION ALL
SELECT 'projects (visible)', COUNT(*) FROM projects WHERE is_visible = true
UNION ALL
SELECT 'certificates', COUNT(*) FROM certificates;
