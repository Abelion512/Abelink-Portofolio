// Centralized env config — single source of truth
// All fallbacks here, never inline

export const env = {
  // Site
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || "http://localhost:7000",
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "agen.salva@gmail.com",

  // Social — from env or defaults
  GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Abelion512",
  INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/ihsanovid",
  LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
  TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL || "#",

  // Supabase
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",

  // AI
  AI_BASE_URL: process.env.AI_BASE_URL || "https://openrouter.ai/api/v1",
  AI_API_KEY: process.env.AI_API_KEY || "",
  AI_MODEL: process.env.AI_MODEL || "openai/gpt-4o-mini",

  // Confidence thresholds
  AI_CONFIDENCE_HIGH: 0.95,
  AI_CONFIDENCE_TIER1: 0.98,
  AI_CONFIDENCE_TIER2: 0.9,
  CACHE_DOCS_MS: 5 * 60 * 1000,
  CACHE_LIVE_MS: 30 * 1000,

  // Revalidation
  REVALIDATE_HOME: 60,
  REVALIDATE_USES: 3600,

  // Settings row ID
  SETTINGS_ROW_ID: 1,
} as const;
