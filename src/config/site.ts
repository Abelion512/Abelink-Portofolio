// Centralized site config — single source of truth for identity, social, contact.
// All env vars prefixed NEXT_PUBLIC_ are available client-side.
// ponytail: add more fields (location, taglines) when env starts feeling thin.

export const site = {
  name: "Ihsanuddin Salav",
  shortName: "Salav",
  initials: "IS",
  avatar: process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.jpg", // profile image, null → initials fallback
  title:
    process.env.NEXT_PUBLIC_SITE_TITLE ||
    "Abelink Portofolio — Ihsanuddin Salav",
  description:
    "Creative Developer & AI Builder based in Surabaya building things with AI and web technology.",

  url: process.env.NEXT_PUBLIC_SITE_URL || "https://abelion.vercel.app",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "agen.salva@gmail.com",

  social: {
    github:
      process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "https://github.com/Abelion512",
    instagram:
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
      "https://instagram.com/ihsanovid",
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ||
      "https://linkedin.com/in/ihsanuddin-abelion",
  },

  // Taglines shown in hero typing animation
  taglines: [
    "Fullstack Developer",
    "AI Enthusiast",
    "Linux Lover",
    "Open Source Contributor",
  ],
} as const;
