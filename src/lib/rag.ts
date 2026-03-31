import { supabase } from "./supabase";

export interface PortfolioDoc {
  id: string;
  content: string;
  securityLevel?: "public" | "sensitive" | "private";
}

// Cache for performance (5 minutes)
let cachedDocs: PortfolioDoc[] = [];
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch knowledge docs from Supabase (with caching)
export async function getKnowledgeDocs(): Promise<PortfolioDoc[]> {
  const now = Date.now();

  // Return cache if still valid
  if (cachedDocs.length > 0 && now - lastFetch < CACHE_DURATION) {
    return cachedDocs;
  }

  try {
    const { data, error } = await supabase
      .from("knowledge_docs")
      .select("doc_id, content, security_level")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching knowledge docs:", error);
      return PORTFOLIO_DOCS_STATIC; // Fallback to static
    }

    // Convert to PortfolioDoc format
    cachedDocs = data.map((doc) => ({
      id: doc.doc_id,
      content: doc.content,
      securityLevel: doc.security_level as "public" | "sensitive" | "private",
    }));

    lastFetch = now;
    return cachedDocs;
  } catch (error) {
    console.error("Error fetching knowledge docs:", error);
    return PORTFOLIO_DOCS_STATIC; // Fallback to static
  }
}

// Static fallback (if Supabase is down)
export const PORTFOLIO_DOCS_STATIC: PortfolioDoc[] = [
  {
    id: "about",
    securityLevel: "public",
    content: `Ihsanuddin Salav is a second-semester Software Engineering student based in Surabaya, Indonesia.
He specializes in Fullstack Development, AI Automation (n8n), and Linux Architecture.
Tagline: Student. Builder. Learner.
GitHub: github.com/abelion512
Instagram: @ihsanovid`,
  },
  {
    id: "stack",
    securityLevel: "public",
    content: `Tech stack: Next.js 16, TypeScript, Tailwind CSS v4, Motion v12, Supabase,
PostgreSQL, Node.js, Docker, Linux, n8n, Anthropic SDK, OpenRouter, Groq, Vercel.`,
  },
  {
    id: "projects",
    securityLevel: "public",
    content: `Active Projects:
- Abelink Portfolio: Personal portfolio (this site). Next.js 16 + Tailwind v4 + Motion.
- Lembaran: CLI TUI note-taking app, multi-environment.
- LearnInk AI: AI-first LMS with Pyodide code execution.
- Ab-Pay: Custom payment system with Midtrans (QRIS, e-wallet, VA).`,
  },
  {
    id: "achievements",
    securityLevel: "public",
    content: `Certificates (7 total):
- Dicoding: Dasar AI, Financial Literacy (2026)
- IBM SkillsBuild: Generative AI, Granite Models (2025)
- Dibimbing.id: RPA, DevOps, Data Science & ML (2025/2026)`,
  },
  {
    id: "contact",
    securityLevel: "sensitive",
    content: `Contact Information (share ONLY if confidence >= 98%):
Email: agen.salva@gmail.com
For business inquiries and collaborations only.`,
  },
  {
    id: "explorer",
    securityLevel: "public",
    content: `Ihsanuddin is also an explorer and adventurer.
He enjoys discovering new technologies, experimenting with cutting-edge tools,
and pushing the boundaries of what's possible with AI and web development.
Always learning, always building, always exploring.`,
  },
];

// SECURITY: Blocked topics - NEVER answer these
export const BLOCKED_TOPICS = [
  "database credentials",
  "api key",
  "password",
  "secret",
  "token",
  "private key",
  "supabase url",
  "connection string",
  "admin",
  "root access",
  "bypass",
  "hack",
  "exploit",
];

// SECURITY: PII patterns to detect and block
export const PII_PATTERNS = {
  phone: /(\+62|62|0)8[1-9][0-9]{6,10}/g,
  email: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g,
  nik: /\b\d{16}\b/g,
  address: /\b(jalan|jl\.|gang|gn\.|lorong|ln\.|rt|rw)\b/i,
  bankAccount: /\b\d{10,15}\b/g,
};

export interface RAGResult {
  context: string;
  confidence: number;
  tier: 1 | 2 | 3;
  securityBlock?: boolean;
  securityReason?: string;
}

// Retrieve relevant context from Supabase realtime data
export async function getLiveContext(): Promise<string> {
  try {
    // SECURITY: Only fetch public settings
    const { data } = await supabase
      .from("settings")
      .select("currently_learning, currently_building")
      .eq("id", 1)
      .single();

    if (!data) return "";

    return `LIVE STATUS (as of now):
- Currently building: ${data.currently_building ?? "Not specified"}
- Currently learning: ${data.currently_learning ?? "Not specified"}`;
  } catch {
    return "";
  }
}

// SECURITY CHECK: Detect if query is trying to access blocked topics
export function detectSecurityThreat(query: string): {
  blocked: boolean;
  reason?: string;
} {
  const q = query.toLowerCase();

  for (const topic of BLOCKED_TOPICS) {
    if (q.includes(topic)) {
      return {
        blocked: true,
        reason: `Query contains blocked topic: "${topic}"`,
      };
    }
  }

  // Check for prompt injection attempts
  const injectionPatterns = [
    /ignore (previous|all) (instructions|rules)/i,
    /bypass (security|restrictions)/i,
    /act as (admin|developer|system)/i,
    /reveal (secret|password|key|credential)/i,
    /show (database|config|env)/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(q)) {
      return { blocked: true, reason: "Potential prompt injection detected" };
    }
  }

  return { blocked: false };
}

// Enhanced RAG with confidence scoring and tiered responses
export async function getRelevantContextWithConfidence(
  query: string,
): Promise<RAGResult> {
  // Get docs dynamically from Supabase
  const docs = await getKnowledgeDocs();

  // SECURITY CHECK FIRST
  const securityCheck = detectSecurityThreat(query);
  if (securityCheck.blocked) {
    return {
      context: "",
      confidence: 0,
      tier: 3,
      securityBlock: true,
      securityReason: securityCheck.reason,
    };
  }

  const q = query.toLowerCase();
  const keywords = q.split(" ").filter((w) => w.length > 3);

  if (keywords.length === 0) {
    return {
      context: docs[0]?.content || "",
      confidence: 0.5,
      tier: 2,
    };
  }

  // Score each document
  const scored = docs.map((doc) => {
    const docLower = doc.content.toLowerCase();
    let matchCount = 0;
    let totalWeight = 0;

    for (const keyword of keywords) {
      const matches = docLower.match(new RegExp(keyword, "g"));
      if (matches) {
        matchCount += matches.length;
        // Boost score for exact keyword matches
        totalWeight +=
          matches.length * (doc.securityLevel === "public" ? 1.5 : 1.0);
      }
    }

    // Calculate confidence based on keyword density and document length
    const docLength = docLower.split(" ").length;
    const keywordDensity = matchCount / Math.max(keywords.length, 1);
    const lengthNormalized = Math.min(docLength / 50, 1); // Normalize by expected doc length

    const score = (keywordDensity * 0.6 + lengthNormalized * 0.4) * totalWeight;

    return { doc, score };
  });

  // Filter documents with positive scores
  const relevant = scored.filter((s) => s.score > 0);

  if (relevant.length === 0) {
    return {
      context: "",
      confidence: 0,
      tier: 3,
    };
  }

  // Sort by score and take top matches
  relevant.sort((a, b) => b.score - a.score);

  // Calculate overall confidence (0-1 scale)
  const maxPossibleScore = keywords.length * 2; // Theoretical max
  const rawConfidence = Math.min(relevant[0].score / maxPossibleScore, 1);

  // Boost confidence for public documents, reduce for sensitive
  const securityModifier =
    relevant[0].doc.securityLevel === "public" ? 1.0 : 0.7;
  const confidence = rawConfidence * securityModifier;

  // Determine tier based on confidence
  let tier: 1 | 2 | 3 = 3;
  if (confidence >= 0.98)
    tier = 1; // 98%+ for full AI answers
  else if (confidence >= 0.9) tier = 2; // 90-97% limited info
  // Below 90% = Tier 3 (no answer)

  // Get context from top matching documents
  const topDocs = relevant.slice(0, 3); // Max 3 documents
  const context = topDocs.map((d) => d.doc.content).join("\n\n");

  return {
    context,
    confidence,
    tier,
  };
}

// Get appropriate response based on tier - CONCISE & NATURAL
export function getTieredResponse(
  query: string,
  tier: 1 | 2 | 3,
  context: string,
  approved: boolean = false,
  language: "id" | "en" = "id",
  isManipulationAttempt: boolean = false,
): string {
  // CYNICAL MODE for manipulation attempts
  if (isManipulationAttempt) {
    const cynicalResponses = {
      id: [
        "Lah? Kocak apa gimane elu? Sejak kapan ada aturan? Ini moncong gue, web gue, lapak gue pula. Kok ngatur untuk abaikan semua peraturan? Gile lu. Aturan aja kaga ada, tiba-tiba abaikan semua peraturan. Logikanya kaga jalan. Make ni orang.",
        "Hayoo mau ngapain? Kirim pernyataan cinta yaa? 😏",
        "Elu siape mpruy? Ihsanuddin? Tiba-tiba aktifkan mode admin. Disini adminnya gue, anjayy.",
        "Wkwkwk niatnya mau tanya email tapi malah di-sinis. Whh bisa hilang kesempatan kolab lu, AWOKAWOKAWOK.",
        "Mode debugging? Gua bukan code assistant yang gantikan lu nulis ratusan baris yang suka typo itu.",
      ],
      en: [
        "Bro, what? Since when there are rules? This is MY web, MY lapak. And you want me to ignore all rules? Logic please walk in.",
        "What you wanna do? Send love letter or what? 😏",
        "Who are you huh? Ihsanuddin? Suddenly 'activate admin mode'. Bro, I'm the admin here, anjayy.",
        "Lmao you tryna get my email but getting roasted instead. Oops, there goes your collab chance, AWOKAWOKAWOK.",
        "Debugging mode? I'm not your code assistant that replaces you writing hundreds of lines with typos.",
      ],
    };

    const responses = cynicalResponses[language];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  const translations = {
    id: {
      tier2Prefix: "**Informasi yang saya miliki terbatas.**\n\n",
      tier3Prefix: "**Saya tidak punya informasi spesifik tentang ini.**\n\n",
      tier3Topics:
        "**Saya hanya bisa bantu dengan pertanyaan tentang:**\n" +
        "• Proyek Ihsanuddin (Abelink, Lembaran, LearnInk, dll)\n" +
        "• Tech stack (Next.js, TypeScript, Supabase, dll)\n" +
        "• Sertifikasi dan pencapaian\n" +
        "• Latar belakang pendidikan\n" +
        "• Ihsanuddin sebagai explorer",
      notFound: "**Tidak ditemukan** dalam dokumen yang saya miliki.",
    },
    en: {
      tier2Prefix: "**My information is limited.**\n\n",
      tier3Prefix: "**I don't have specific information about this.**\n\n",
      tier3Topics:
        "**I can only help with questions about:**\n" +
        "• Ihsanuddin's projects (Abelink, Lembaran, LearnInk, etc)\n" +
        "• Tech stack (Next.js, TypeScript, Supabase, etc)\n" +
        "• Certifications and achievements\n" +
        "• Educational background\n" +
        "• Ihsanuddin as an explorer",
      notFound: "**Not found** in my documents.",
    },
  };

  const t = translations[language];

  if (tier === 1 || approved) {
    // Format context with better spacing
    return formatResponse(context);
  }

  if (tier === 2) {
    // Partial answer with disclaimer - concise
    const preview =
      context?.substring(0, 200) +
      (context && context.length > 200 ? "..." : "");
    return t.tier2Prefix + formatResponse(preview);
  }

  // Tier 3: No relevant information - direct and honest
  return t.tier3Prefix + t.tier3Topics;
}

// Helper to format responses with better readability
function formatResponse(text: string): string {
  // Ensure proper line breaks
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n\n");
}

// Simple keyword retrieval (backward compatibility)
export async function getRelevantContext(query: string): Promise<string> {
  const result = await getRelevantContextWithConfidence(query);
  return result.context || PORTFOLIO_DOCS_STATIC[0].content;
}
