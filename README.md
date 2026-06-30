# Abelink Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Personal portfolio — Apple-inspired UI, AI integration, real-time activity feed.

## Tech Stack

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@theme` directive) |
| Animation | `motion/react` v12 |
| Database | Supabase (PostgreSQL) |
| AI | Google Gemini 1.5 Pro, RAG |
| Runtime | Bun |
| Deploy | Vercel |

## Setup

```bash
# Install
bun install

# Copy env
cp .env.example .env.local
# Fill in: SUPABASE_URL, SUPABASE_ANON_KEY, AI_API_KEY, etc.

# Dev
bun dev

# Build
bun run build
```

## Environment Variables

See `.env.example` for all required keys:
- Supabase URL + anon key
- AI provider (Gemini/OpenRouter/Groq)
- Site URL, social links, email

## Project Structure

```
src/
├── app/          # Pages & API routes
├── components/
│   ├── layout/   # Navbar, BottomNav
│   ├── sections/ # Hero, Projects, Achievements
│   ├── ui/       # Atoms: SpotlightCard, Skeleton, etc.
│   └── chat/     # AI ChatWidget
├── config/       # Site config
├── hooks/        # Data fetching
├── lib/          # AI, RAG, Supabase client
└── store/        # Zustand (lang, command palette)
```

---
Built by [Ihsanuddin Salav](https://abelion.vercel.app)
