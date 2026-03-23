import { supabase } from './supabase';

export interface PortfolioDoc {
  id: string;
  content: string;
}

// Portfolio knowledge base (static — update when major changes occur)
export const PORTFOLIO_DOCS: PortfolioDoc[] = [
  {
    id: 'about',
    content: `Ihsanuddin Salav is a second-semester Software Engineering student based in Surabaya, Indonesia.
He specializes in Fullstack Development, AI Automation (n8n), and Linux Architecture. 
Tagline: Student. Builder. Learner.
GitHub: github.com/abelion512
Email: agen.salva@gmail.com
Instagram: @ihsanovid`,
  },
  {
    id: 'stack',
    content: `Tech stack: Next.js 16, TypeScript, Tailwind CSS v4, Motion v12, Supabase, 
PostgreSQL, Node.js, Docker, Linux, n8n, Anthropic SDK, OpenRouter, Groq, Vercel.
Special tools: n8n for workflow automation, Midtrans for payments.`,
  },
  {
    id: 'projects',
    content: `Active Projects:
- Abelink Portfolio: Personal portfolio (this site). Next.js 16 + Tailwind v4 + Motion.
- Lembaran: CLI TUI note-taking app, multi-environment.
- LearnInk AI: AI-first LMS with Pyodide code execution.
- Ab-Pay: Custom payment system with Midtrans (QRIS, e-wallet, VA).
- Abelion Notes: Zero-knowledge encrypted note app. 
- Abelion Finance: Crypto analysis automation via n8n.`,
  },
  {
    id: 'achievements',
    content: `Certificates (7 total):
- Dicoding: Dasar AI, Financial Literacy (2026)
- IBM SkillsBuild: Generative AI, Granite Models (2025)
- Dibimbing.id: RPA, DevOps, Data Science & ML (2025/2026)`,
  },
];

// Retrieve relevant context from Supabase realtime data
export async function getLiveContext(): Promise<string> {
  try {
    const { data } = await supabase
      .from('settings') 
      .select('currently_learning, currently_building')
      .eq('id', 1)
      .single();

    if (!data) return '';

    return `LIVE STATUS (as of now):
- Currently building: ${data.currently_building ?? 'Not specified'}
- Currently learning: ${data.currently_learning ?? 'Not specified'}`;
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
