import { supabase } from './supabase';

export interface PortfolioDoc {
  id: string;
  content: string;
}

// Portfolio knowledge base (static — update when major changes occur)
export const PORTFOLIO_DOCS: PortfolioDoc[] = [
  {
    id: 'about',
    content: `Ihsanuddin Salav is a second-semester student based in Surabaya, Indonesia.
He builds web applications and AI automation systems. 
Tagline: Student. Builder. Learner.
GitHub: github.com/abelion512
Email: agen.salva@gmail.com
Instagram: @ihsanovid`,
  },
  {
    id: 'stack',
    content: `Tech stack: Next.js 16, TypeScript, Tailwind CSS v4, Motion v12, Supabase, 
PostgreSQL, Node.js, Docker, Linux, n8n, Anthropic SDK, OpenRouter, Groq, Vercel.
Languages: TypeScript, JavaScript, Python, SQL, Go.`,
  },
  {
    id: 'projects',
    content: `Projects:
- Abelink Portfolio: Personal portfolio (this site). Next.js 16 + Tailwind v4 + Motion.
- Lembaran: CLI TUI note-taking app, multi-environment.
- LearnInk AI: AI-first LMS with Pyodide code execution, gamification.
- Ab-Pay: Custom payment system with Midtrans (QRIS, e-wallet, VA).
- Abelion Notes: Zero-knowledge encrypted note app. Dexie.js + IndexedDB.
- Abelion Finance: Crypto and stock analysis automation. n8n + AI Agents.`,
  },
  {
    id: 'achievements',
    content: `Certificates (7 total):
- Dicoding: Belajar Dasar AI (Jan 2026, valid to 2029)
- Dicoding: Financial Literacy x DBS Foundation (Jan 2026)
- IBM SkillsBuild: Generative AI for Software Dev (Oct 2025)
- IBM SkillsBuild: IBM Granite Models (Oct 2025)
- Dibimbing.id: Robotic Process Automation (Jan 2026)
- Dibimbing.id x GDGOCBION: DevOps (Jan 2026)
- Dibimbing.id: Data Science & Machine Learning (Dec 2025)`,
  },
];

// Retrieve relevant context from Supabase realtime data
export async function getLiveContext(): Promise<string> {
  try {
    const { data } = await supabase
      .from('projects_status') // Adjusted to match likely table name or generic settings
      .select('status, currently_learning, currently_building')
      .limit(1)
      .single();

    if (!data) return '';

    return `LIVE STATUS (as of now):
- Currently building: ${data.currently_building ?? 'Not specified'}
- Currently learning: ${data.currently_learning ?? 'Not specified'}
- Status: ${data.status ?? 'Building'}`;
  } catch {
    return '';
  }
}

// Simple keyword retrieval (no vector DB needed for small corpus)
export function getRelevantContext(query: string): string {
  const q = query.toLowerCase();
  const relevant = PORTFOLIO_DOCS.filter(doc => {
    const keywords = q.split(' ').filter(w => w.length > 3);
    return keywords.some(kw => doc.content.toLowerCase().includes(kw));
  });

  // Always include 'about' as base context if nothing else found
  const docs = relevant.length > 0 ? relevant : [PORTFOLIO_DOCS[0]];
  return docs.map(d => d.content).join('\n\n');
}
