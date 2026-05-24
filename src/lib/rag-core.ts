export interface PortfolioDoc {
  id: string;
  content: string;
  securityLevel?: "public" | "sensitive" | "private";
}

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

if (!contactEmail) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_CONTACT_EMAIL is required for Portfolio context.",
  );
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
Email: ${contactEmail}
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
export function formatResponse(text: string): string {
  // Ensure proper line breaks
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n\n");
}
