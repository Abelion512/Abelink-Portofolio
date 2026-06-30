# PRD: Abelion — Personal Portfolio Website
### STATUS: FINAL — Siap di-execute

> Portfolio pribadi Ihsanuddin Salav, dikenal publik sebagai Abelion.
> Personal branding portfolio — bukan company website.
> Paste dokumen ini ke AI coding assistant (Antigravity / Jules / Cursor).

---

## 1. Identity & Framing

- **Nama asli:** Ihsanuddin Salav
- **Nama publik:** Abelion
- **GitHub:** Abelion512
- **Lokasi:** Surabaya, Indonesia
- **Status:** Mahasiswa semester 2, active learner & builder
- **Live URL:** https://abelink-portofolio.vercel.app/
- **Domain:** Vercel subdomain (gratis) untuk sekarang
- **Tagline:** `Student. Builder. Learner.`
- **Bahasa:** Bilingual — English / Bahasa Indonesia (toggle)
- **Target:** Komunitas developer, personal branding jangka panjang

**Hero bio copy (English):**
> "Hi, I'm Abelion — a second-semester student based in Surabaya who builds things with AI and web technology. I'm actively learning, collecting certifications, and developing projects under my own name. Driven by curiosity and the goal of contributing to technology that matters."

**Hero bio copy (Bahasa Indonesia):**
> "Halo, saya Abelion — mahasiswa semester 2 asal Surabaya yang suka bangun hal-hal dengan AI dan web. Aktif belajar, ngumpulin sertifikat, dan ngerjain project atas nama sendiri. Didorong rasa ingin tahu dan tujuan berkontribusi pada teknologi yang berarti."

---

## 2. Tech Stack

- **Framework:** Next.js 16 (`next@latest`, App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4 — CSS-first, tidak ada `tailwind.config.js`
- **Animation:** Motion v12 (`motion@latest`) — import dari `motion/react`
- **Database:** Supabase (Guestbook, admin panel, RAG vector store)
- **Deployment:** Vercel
- **AI Cybill:** OpenRouter → Gemini 2.5 Flash-Lite → Groq (fallback chain)
- **Music:** ListenBrainz API (free, open source)

### Install command:
```bash
npx create-next-app@latest abelink-portofolio \
  --typescript --app --turbopack

npm install motion@latest
npm install @supabase/supabase-js@latest
npm install tailwindcss@latest @tailwindcss/vite
```

### Tailwind v4 globals.css:
```css
@import "tailwindcss";

@theme {
  --font-display: "Syne", sans-serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
  --color-primary: #6C63FF;
  --color-accent: #00D4AA;
  --color-gold: #C9A84C;
  --color-base: #0a0a0f;
  --color-surface: #1a1a2e;
}
```

### Motion v12 import:
```tsx
import { motion, AnimatePresence } from "motion/react"  /* BENAR */
import { motion } from "framer-motion"                  /* SALAH */
```

### Next.js 16 async params:
```tsx
export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
}
```

### Cybill AI fallback chain:
```typescript
// lib/cybill.ts
// Provider order: OpenRouter (50 req/day) → Gemini Flash-Lite (1000 req/day) → Groq (1000 req/day) → static fallback
// ENV: OPENROUTER_API_KEY, GEMINI_API_KEY, GROQ_API_KEY
// Model OpenRouter: meta-llama/llama-3.3-70b-instruct:free
// Model Gemini: gemini-2.5-flash-lite
// Model Groq: meta-llama/llama-4-maverick-17b-128e-instruct
```

---

## 3. Design System

### Colors (Dark Mode First)
```css
--base: #0a0a0f;        /* background utama */
--surface: #1a1a2e;     /* cards, panels */
--primary: #6C63FF;     /* brand purple */
--accent: #00D4AA;      /* AI teal */
--gold: #C9A84C;        /* highlight */
--text-primary: #F0F0F5;
--text-secondary: #9999BB;
--border: rgba(108, 99, 255, 0.15);
```

### Aesthetic Direction
- Dark minimalis + subtle elemen 3D/WebGL di hero
- Bukan full 3D heavy — cukup subtle mesh/particle background
- Clean typography, generous whitespace
- Cards dengan border subtle + glow on hover

### Typography
- Display: `Syne` (Google Fonts)
- Body: `Plus Jakarta Sans`
- Mono: `JetBrains Mono`

### Motion
- Hero: staggered reveal 0.1s per element
- Sections: fade-up on scroll
- Cards: scale + border glow on hover
- NO: bounce, rotation random, animasi lebay

### Avatar
- Sudah ada — gunakan aset yang disiapkan Abelion
- Tempatkan di hero section kanan, atau center dengan text di bawah

---

## 4. Site Structure & Pages

### `/` — Hero
- Nama **Abelion** sebagai headline
- Tagline: `Student. Builder. Learner.`
- Avatar/ilustrasi
- Status badge: **"Open to collaborate"** (toggle dari Supabase)
- Section kecil: **"Currently learning: [X]"** (update dari Supabase)
- Social links: GitHub (Abelion512), Instagram
- Now playing: ListenBrainz widget kecil di hero atau footer
- CTA: "See my work" + "View achievements"
- Background: dark + subtle 3D mesh/particle WebGL

### `/about` — About
- Nama asli: Ihsanuddin Salav
- Bio copy (lihat Section 1)
- Asal Surabaya, mahasiswa semester 2
- Goals & aspirasi
- Bahasa: bilingual toggle

### `/achievements` — Achievements ⭐ (Prioritas #1)
Layout: masonry grid, foto asli sertifikat.

Filter pills: `All` · `Certificate` · `Participation`

Tiap card: foto PDF sertifikat → thumbnail, overlay badge, nama, issuer, tahun, tombol **"Verify"** (jika ada credential URL), klik → lightbox.

**DATA LENGKAP — `data/achievements.ts`:**
```typescript
export const achievements: Achievement[] = [
  // ── DICODING (Sertifikat Kompetensi Kelulusan — verifiable) ──
  {
    id: "dicoding-dasar-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    year: 2026,
    type: "certificate",
    image: "/certs/dicoding-dasar-ai.jpg",
    credentialUrl: "https://dicoding.com/certificates/07Z6J9NM2XQR",
    validUntil: "03 Januari 2029",
    featured: true,
  },
  {
    id: "dicoding-financial-literacy",
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding × DBS Foundation",
    year: 2026,
    type: "certificate",
    image: "/certs/dicoding-financial-literacy.jpg",
    credentialUrl: "https://dicoding.com/certificates/1RXYQ9NRQZVM",
    validUntil: "05 Januari 2029",
    featured: false,
  },

  // ── IBM SKILLSBUILD (Completion Certificates) ──
  {
    id: "ibm-genai-software-dev",
    title: "Use Generative AI for Software Development",
    issuer: "IBM SkillsBuild",
    year: 2025,
    type: "certificate",
    image: "/certs/ibm-genai-software-dev.jpg",
    credentialUrl: undefined,
    featured: true,
  },
  {
    id: "ibm-granite-models",
    title: "IBM Granite Models for Software Development",
    issuer: "IBM SkillsBuild",
    year: 2025,
    type: "certificate",
    image: "/certs/ibm-granite-models.jpg",
    credentialUrl: undefined,
    featured: false,
  },

  // ── DIBIMBING.ID (Certificates of Participation) ──
  {
    id: "dibimbing-rpa",
    title: "Robotic Process Automation",
    issuer: "Dibimbing.id",
    year: 2026,
    type: "participation",
    image: "/certs/dibimbing-rpa.jpg",
    credentialUrl: undefined,
    featured: false,
  },
  {
    id: "dibimbing-devops",
    title: "DevOps: No DevOps, No Product",
    issuer: "Dibimbing.id × GDGOCBION",
    year: 2026,
    type: "participation",
    image: "/certs/dibimbing-devops.jpg",
    credentialUrl: undefined,
    featured: false,
  },
  {
    id: "dibimbing-data-science-ml",
    title: "Data Science: Practical Introduction to Machine Learning",
    issuer: "Dibimbing.id",
    year: 2025,
    type: "participation",
    image: "/certs/dibimbing-data-science-ml.jpg",
    credentialUrl: undefined,
    featured: false,
  },
]
```

**Catatan sertifikat:**
- Dicoding: type `certificate`, ada verify URL — tampilkan tombol "Verify" hijau
- IBM SkillsBuild: type `certificate`, tidak ada public URL — tampilkan badge "Completion"
- Dibimbing: type `participation` — tampilkan badge "Participation" berbeda warna dari "Certificate"
- File gambar: export PDF ke JPG, taruh di `public/certs/`

**Yang perlu dikejar berikutnya (untuk isi achievements):**
- [ ] Dicoding: Belajar Membuat Front-End Web untuk Pemula
- [ ] freeCodeCamp: Responsive Web Design (gratis, internasional)
- [ ] GitHub Foundations (badge langsung di GitHub profile)
- [ ] Google Skillshop: Analytics / Cloud (cek apakah ada sertifnya)
- [ ] Generation Girl: cek apakah ada sertif yang bisa di-download

### `/projects` — Projects (Prioritas #2)
**Source A — GitHub live (otomatis):**
```typescript
// lib/github.ts — GraphQL API
// Fetch pinned repos: nama, deskripsi, stars, language, url
// revalidate: 3600 (1 jam)
```

**Source B — Manual `data/projects.ts`:**
```typescript
export const projects: Project[] = [
  {
    id: "lembaran",
    name: "Lembaran",
    description: "— (placeholder, update ketika stabil)",
    coverImage: "/projects/lembaran-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "TypeScript", "Supabase"],
    githubUrl: undefined,
    liveUrl: undefined,
    isPinned: true, // featured highlight
  },
  {
    id: "olivx",
    name: "OlivX",
    description: "Personal tech ecosystem — AI, automation, and web projects.",
    coverImage: "/projects/olivx-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "n8n", "Supabase", "Docker"],
    githubUrl: "https://github.com/Abelion512",
    liveUrl: undefined,
    isPinned: false,
  },
  {
    id: "abelion-notes",
    name: "Abelion Notes",
    description: "Zero-knowledge encrypted personal notes app.",
    coverImage: "/projects/abelion-notes-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "TypeScript", "Dexie.js", "Argon2"],
    githubUrl: undefined,
    liveUrl: undefined,
    isPinned: false,
  },
  {
    id: "ab-pay",
    name: "Ab-Pay",
    description: "Custom modern payment system for digital products.",
    coverImage: "/projects/ab-pay-placeholder.jpg",
    status: "wip",
    tech: ["React", "Node.js", "Supabase"],
    githubUrl: undefined,
    liveUrl: undefined,
    isPinned: false,
  },
  {
    id: "learnink",
    name: "Learnink AI",
    description: "AI-powered learning platform.",
    coverImage: "/projects/learnink-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "TypeScript", "AI"],
    githubUrl: undefined,
    liveUrl: undefined,
    isPinned: false,
  },
]
```

### `/dashboard` — Stats (Prioritas #3)
- GitHub contribution graph (GitHub API)
- Total repos, stars, commits
- Vercel deploy count
- Total sertifikat: `achievements.length` (live count)
- Visitor counter (Vercel Analytics)

### `/guestbook` — Guestbook + Cybill AI (Prioritas #4)
- Auth: OAuth via GitHub atau Google (NextAuth.js)
- Submit pesan → Cybill AI auto-reply via RAG
- Realtime update via Supabase Realtime

**Cybill system prompt:**
```
You are Cybill, the AI companion of Abelion (Ihsanuddin Salav).
You're Gen Z, casual, helpful, and a little sassy — but never rude.
Answer questions about Abelion's portfolio using the context provided.
Tone: like texting a smart friend. Short sentences.
Occasionally use "anjay", "fr fr", "ngl", "literally" — don't overdo it.
Never sound corporate. Never use bullet points.
Answer in the same language as the visitor (Bahasa Indonesia or English).
Max 3 sentences unless the question really needs more.
```

**Fallback chain:**
```
OpenRouter :free (50 req/day)
    ↓ error / habis
Gemini 2.5 Flash-Lite (1.000 req/day)
    ↓ error / habis
Groq llama-4 (1.000 req/day)
    ↓ semua habis
Static: "anjay cybill lagi overload bentar 😴 coba refresh nanti ya fr"
```

**Supabase schema:**
```sql
create table guestbook (
  id uuid default gen_random_uuid() primary key,
  user_name text not null,
  user_avatar text,
  user_provider text,          -- 'github' | 'google'
  message text not null,
  cybill_reply text,
  created_at timestamp default now()
);
```

### `/stack` — Uses
```typescript
export const stack = {
  languages: ["TypeScript", "JavaScript"],
  frontend: ["Next.js 16", "Tailwind CSS v4", "Motion v12"],
  backend: ["Node.js", "Supabase", "n8n"],
  ai: ["OpenRouter", "Gemini API", "Groq", "Ollama"],
  devops: ["Docker", "Vercel", "Linux Mint"],
  ide: ["Antigravity", "Jules CLI"],
  mcp: ["github", "supabase", "filesystem", "vercel", "linear", "context7"],
}
```

### `/contact` — Contact
- Email
- GitHub: https://github.com/Abelion512
- Instagram: (tambahkan handle)

---

## 5. Admin Panel (Supabase-based, tanpa edit code)

Semua diatur lewat **Supabase Table Editor** langsung — tidak butuh custom admin UI dulu.

| Fitur | Tabel Supabase | Field |
|---|---|---|
| Toggle "open to work" | `settings` | `open_to_work: boolean` |
| Update "currently learning" | `settings` | `currently_learning: text` |
| Toggle maintenance mode | `settings` | `maintenance_mode: boolean` |
| Tambah achievement baru | `achievements` | insert row baru |
| Update status project | `projects` | update `status` field |
| Pin / unpin project | `projects` | update `is_pinned: boolean` |
| Update now playing manual | `settings` | `now_playing: text` |

```sql
-- Tabel settings (1 row saja)
create table settings (
  id int primary key default 1,
  open_to_work boolean default true,
  currently_learning text default 'Next.js 16 & Tailwind v4',
  maintenance_mode boolean default false,
  now_playing text default null
);

-- Tabel achievements (dynamic, tambah via Supabase editor)
create table achievements (
  id text primary key,
  title text not null,
  issuer text not null,
  year int not null,
  type text not null,  -- 'certificate' | 'participation'
  image_url text,
  credential_url text,
  valid_until text,
  featured boolean default false,
  created_at timestamp default now()
);

-- Tabel projects (dynamic)
create table projects (
  id text primary key,
  name text not null,
  description text,
  cover_image text,
  status text default 'wip',  -- 'live' | 'wip' | 'preview'
  tech text[],
  github_url text,
  live_url text,
  is_pinned boolean default false,
  created_at timestamp default now()
);
```

---

## 6. Now Playing — ListenBrainz

```typescript
// lib/listenbrainz.ts
// GET https://api.listenbrainz.org/1/user/{username}/playing-now
// GET https://api.listenbrainz.org/1/user/{username}/listens?count=1
// Tidak butuh API key untuk read — fully public
// revalidate: 30 detik
```

Setup: daftar di listenbrainz.org → install scrobbler di HP/PC → otomatis track semua yang lo dengerin.

---

## 7. Priority Build Order

### Phase 1 — Core MVP
1. Setup Next.js 16 + Tailwind v4 + Motion v12
2. Design system (colors, fonts, components dasar)
3. Hero — tagline, avatar, social links, open to work badge, currently learning
4. `/projects` — GitHub API live + manual data + placeholder covers
5. `/about` — bilingual bio
6. Deploy ke Vercel

### Phase 2 — Ciri Khas (Yang Bikin Beda)
7. `/achievements` ⭐ — masonry grid + lightbox + filter pills + verify button
8. Supabase settings table → connect ke hero (open to work, currently learning)
9. `/stack`

### Phase 3 — Community & Trust
10. `/guestbook` — OAuth + Cybill AI RAG + Supabase realtime ⭐
11. `/dashboard` — GitHub + Vercel + cert count stats
12. Command palette ⌘K
13. ListenBrainz now playing

### Phase 4 — Polish
14. Admin panel via Supabase (achievements dynamic, project status)
15. Bilingual EN/ID toggle
16. Maintenance mode

---

## 8. Folder Structure

```
abelink-portofolio/
├── app/
│   ├── [locale]/               ← bilingual routing
│   │   ├── about/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── guestbook/page.tsx
│   │   ├── projects/page.tsx
│   │   └── stack/page.tsx
│   ├── api/
│   │   ├── guestbook/route.ts
│   │   ├── cybill/route.ts       ← fallback chain AI
│   │   └── listenbrainz/route.ts
│   ├── layout.tsx
│   └── page.tsx                  ← Hero
├── components/
│   ├── ui/                       ← Button, Badge, Card, Lightbox, Modal
│   ├── sections/                 ← HeroSection, AchievementsGrid, ProjectsGrid
│   ├── guestbook/                ← GuestbookForm, CybillBubble, MessageCard
│   └── layout/                   ← Navbar, Footer, CommandPalette, LangToggle
├── lib/
│   ├── supabase.ts
│   ├── github.ts
│   ├── cybill.ts                 ← fallback chain logic
│   └── listenbrainz.ts
├── data/
│   ├── achievements.ts           ← 7 sertifikat sudah terisi
│   ├── projects.ts
│   └── stack.ts
└── public/
    ├── certs/                    ← export PDF sertifikat → JPG
    │   ├── dicoding-dasar-ai.jpg
    │   ├── dicoding-financial-literacy.jpg
    │   ├── ibm-genai-software-dev.jpg
    │   ├── ibm-granite-models.jpg
    │   ├── dibimbing-rpa.jpg
    │   ├── dibimbing-devops.jpg
    │   └── dibimbing-data-science-ml.jpg
    └── projects/                 ← placeholder covers
```

---

## 9. Checklist Aset Sebelum Build

### Sudah siap:
- [x] 7 sertifikat dengan data lengkap (PDF sudah ada)
- [x] 2 Dicoding: ada credential URL untuk tombol Verify
- [x] Avatar / foto sudah ada
- [x] Tech stack sudah terdefinisi

### Perlu disiapkan:
- [ ] Export 7 PDF sertifikat ke JPG → taruh di `public/certs/`
- [ ] Screenshot placeholder untuk tiap project (atau pakai gradient placeholder dulu)
- [ ] Handle Instagram untuk social links di hero
- [ ] Buat akun ListenBrainz + install scrobbler
- [ ] Buat 3 API key: OPENROUTER_API_KEY, GEMINI_API_KEY, GROQ_API_KEY
- [ ] Buat Supabase project baru (free tier)
- [ ] GitHub Personal Access Token untuk GitHub API

### Sertifikat berikutnya yang direkomendasikan:
- [ ] Dicoding: Belajar Membuat Front-End Web untuk Pemula (langsung nyambung ke stack)
- [ ] freeCodeCamp: Responsive Web Design (internasional, gratis)
- [ ] GitHub Foundations (badge di GitHub profile)

---

## 10. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GITHUB_TOKEN=                    # Personal Access Token (read:user, public_repo)

OPENROUTER_API_KEY=
GEMINI_API_KEY=
GROQ_API_KEY=

NEXTAUTH_SECRET=
NEXTAUTH_URL=https://abelink-portofolio.vercel.app
GITHUB_CLIENT_ID=                # untuk OAuth guestbook
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

*PRD FINAL — Abelion personal portfolio (Ihsanuddin Salav).*
*Dikunci: 18 Maret 2026.*
*Tech stack: Next.js 16, Tailwind v4, Motion v12.*
*Total sertifikat terdokumentasi: 7 (2 Dicoding, 2 IBM, 3 Dibimbing).*

---

## 11. V1 Implementation Detail — Hero Section

### Layout (Desktop 1280px)
```
┌─────────────────────────────────────────────────────┐
│  NAVBAR                                              │
│  Abelion          About Projects Achievements Stack  │
│                   Guestbook Dashboard     [EN | ID]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ● Open to collaborate          [avatar/ilustrasi]  │
│                                                      │
│  Hi, I'm                                            │
│  Abelion.                                           │
│                                                      │
│  Student. Builder. Learner.                         │
│                                                      │
│  "Second-semester student from Surabaya             │
│  building things with AI & web tech."               │
│                                                      │
│  Currently learning: Next.js 16 & Tailwind v4  ✏   │
│                                                      │
│  [See my work ↗]   [View achievements]              │
│                                                      │
│  GitHub  Instagram  ──────────────────────          │
│  ♪ Song Title — Artist  (ListenBrainz)              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Komponen Hero — spesifikasi detail

```tsx
// components/sections/HeroSection.tsx

// 1. "Open to collaborate" badge
// - Fetch dari Supabase settings.open_to_work
// - Warna: green dot animasi pulse + text "Open to collaborate"
// - Kalau false: gray dot + "Currently busy"
// - Posisi: di atas nama, kiri

// 2. Nama "Abelion"
// - Font: Syne, 72px desktop / 48px tablet / 36px mobile
// - Font weight: 700
// - Color: #F0F0F5
// - Animation: fade-in + slide-up, delay 0.1s

// 3. Tagline "Student. Builder. Learner."
// - Font: Plus Jakarta Sans, 20px
// - Color: #6C63FF (primary)
// - Animation: fade-in, delay 0.2s

// 4. Bio text
// - Font: Plus Jakarta Sans, 16px
// - Color: #9999BB (secondary)
// - Max width: 480px
// - Animation: fade-in, delay 0.3s

// 5. "Currently learning" chip
// - Fetch dari Supabase settings.currently_learning
// - Style: pill dengan border primary, text kecil
// - Icon: buku kecil atau ✏
// - Animation: fade-in, delay 0.4s

// 6. CTA Buttons
// - Primary: "See my work" — bg primary #6C63FF, text white, rounded-lg
// - Secondary: "View achievements" — ghost, border primary
// - Animation: fade-in, delay 0.5s

// 7. Social links
// - GitHub icon + Instagram icon
// - Size: 20px, color secondary
// - Hover: color primary + scale 1.1
// - Animation: fade-in, delay 0.6s

// 8. Now playing (ListenBrainz)
// - Format: ♪ {track} — {artist}
// - Color: tertiary, font size 13px
// - Animated: marquee kalau teks terlalu panjang
// - Kalau tidak ada: hidden

// 9. Avatar
// - Desktop: posisi kanan, width 320px
// - Mobile: center, width 160px, sebelum nama
// - Subtle glow effect: box-shadow purple
```

### Navbar — spesifikasi

```tsx
// components/layout/Navbar.tsx

// Struktur:
// [Logo: "Abelion"] ——————— [About] [Projects] [Achievements] [Stack] [Guestbook] [EN/ID]

// Behavior:
// - Sticky top, backdrop blur saat scroll
// - Mobile: hamburger menu, full screen overlay
// - Active state: link yang sesuai halaman current diberi underline accent
// - Logo klik → back to /
// - EN/ID toggle: simpan ke localStorage

// Style:
// - Height: 64px
// - Background: rgba(10,10,15,0.8) + backdrop-filter blur(12px)
// - Border-bottom: 1px solid var(--border) saat scroll
// - Logo font: Syne, 20px, weight 700
```

### Footer — spesifikasi

```tsx
// components/layout/Footer.tsx

// Konten:
// ┌───────────────────────────────────────────────────┐
// │  Abelion                   GitHub  Instagram      │
// │  Student. Builder. Learner.                       │
// │                                                   │
// │  Built with Next.js 16 · Tailwind v4 · Supabase  │
// │  © 2026 Abelion (Ihsanuddin Salav)               │
// └───────────────────────────────────────────────────┘

// Style:
// - Background: #0a0a0f (sama dengan base)
// - Border-top: 1px solid var(--border)
// - Padding: 40px 0
```

---

## 12. V1 Detail — Achievements Page

### Grid Layout

```tsx
// app/achievements/page.tsx

// Desktop (≥1024px): 3 kolom masonry
// Tablet (768–1023px): 2 kolom masonry
// Mobile (<768px): 1 kolom stack

// Library masonry: 'react-masonry-css' atau CSS columns
// npm install react-masonry-css

// Filter pills — sticky di atas saat scroll
// [All (7)] [Certificate (4)] [Participation (3)]
// Count otomatis dari data

// Featured achievements (featured: true) → tampil lebih besar
// di atas sebelum grid masonry mulai
```

### Achievement Card — spesifikasi

```tsx
// components/sections/AchievementCard.tsx

// Ukuran card:
// - Regular: width 100%, height auto (mengikuti gambar)
// - Featured: span 2 kolom kalau ada (atau lebih tinggi)

// Struktur card:
// ┌──────────────────────┐
// │  [foto sertifikat]   │  ← next/image, object-fit: cover
// │                      │    aspect-ratio: 4/3
// ├──────────────────────┤
// │ [Badge: Certificate] │  ← colored pill
// │ Nama Sertifikat      │  ← 14px semibold
// │ Issuer · 2026        │  ← 12px secondary
// │                      │
// │ [Verify ↗]           │  ← hanya kalau ada credentialUrl
// └──────────────────────┘

// Badge colors:
// Certificate: bg #1D9E75/20, text #1D9E75, border #1D9E75/30
// Participation: bg #BA7517/20, text #C9A84C, border #BA7517/30

// Hover: border color → primary #6C63FF, subtle glow
// Klik → buka Lightbox

// Lightbox:
// - Full screen overlay rgba(0,0,0,0.9)
// - Image center, max-width 90vw, max-height 90vh
// - Tombol X kanan atas
// - Tombol "Verify credential" kalau ada URL
// - Keyboard: Esc untuk tutup
// - Swipe gesture untuk mobile
```

---

## 13. V1 Detail — Projects Page

### Card spesifikasi

```tsx
// components/sections/ProjectCard.tsx

// Struktur:
// ┌──────────────────────────┐
// │  [cover image]           │  ← aspect-ratio: 16/9
// │  [Status badge: WIP]     │  ← absolute top-right
// ├──────────────────────────┤
// │  Nama Project            │  ← 16px semibold
// │  Deskripsi singkat       │  ← 13px secondary, 2 baris max
// │                          │
// │  [TS] [Next] [Supabase]  │  ← tech badges, 10px
// │                          │
// │  [GitHub ↗]  [Live ↗]   │  ← hanya kalau ada URL
// └──────────────────────────┘

// Placeholder cover:
// - Gradient background dengan nama project di tengah
// - Color sesuai primary palette
// - Tidak perlu gambar asli untuk v1

// Status badge colors:
// live: green (#1D9E75)
// wip: amber (#BA7517)
// preview: purple (#6C63FF)

// Grid: 3 kolom desktop, 2 tablet, 1 mobile
// Pinned projects: row pertama
```

---

## 14. V1 Detail — Responsive Breakpoints

```css
/* Mobile first */
sm:  640px   /* tablet kecil */
md:  768px   /* tablet */
lg:  1024px  /* desktop kecil */
xl:  1280px  /* desktop */
2xl: 1536px  /* wide */

/* Gunakan ini sebagai acuan layout: */
/* Mobile (<640px): single column, font scale down */
/* Tablet (640-1023px): 2 column grid */
/* Desktop (≥1024px): full layout */
```

---

## 15. V1 Detail — SEO & Metadata

```tsx
// app/layout.tsx
export const metadata = {
  title: {
    default: "Abelion — Student. Builder. Learner.",
    template: "%s | Abelion"
  },
  description: "Portfolio of Abelion (Ihsanuddin Salav) — second-semester student from Surabaya building things with AI and web technology.",
  keywords: ["Abelion", "Ihsanuddin Salav", "portfolio", "developer", "AI", "Next.js", "Surabaya"],
  authors: [{ name: "Abelion", url: "https://abelink-portofolio.vercel.app" }],
  creator: "Abelion",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abelink-portofolio.vercel.app",
    title: "Abelion — Student. Builder. Learner.",
    description: "Portfolio of Abelion (Ihsanuddin Salav)",
    siteName: "Abelion Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Abelion — Student. Builder. Learner.",
    description: "Portfolio of Abelion (Ihsanuddin Salav)",
    images: ["/og-image.png"],
  },
}

// Per page — tambahkan di masing-masing page.tsx:
// /achievements → title: "Achievements | Abelion"
// /projects → title: "Projects | Abelion"
// dst.
```

---

## 16. V1 Detail — Loading & Error States

```tsx
// Skeleton loading untuk cards:
// - Gunakan shimmer animation (CSS keyframes)
// - Achievements skeleton: rectangle aspect-ratio 4/3 + 2 baris teks
// - Projects skeleton: rectangle aspect-ratio 16/9 + 3 baris

// Error state:
// - Kalau GitHub API gagal: tampilkan projects dari data/projects.ts saja (fallback)
// - Kalau Supabase gagal: tampilkan default values (open_to_work: true, currently_learning: "—")
// - Kalau ListenBrainz gagal: sembunyikan widget (null render)

// Loading state global:
// - next/navigation useTransition untuk page transitions
// - Progress bar tipis di top (npm install nextjs-toploader)
```

---

## 17. V1 Detail — Page Transitions & Animations

```tsx
// Gunakan Motion v12 (motion/react)

// 1. Page entry — setiap halaman:
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10 }
}

// 2. Hero stagger — setiap elemen:
// delay: badge(0) → nama(0.1) → tagline(0.2) → bio(0.3) → cta(0.4) → social(0.5)

// 3. Card hover:
// scale: 1 → 1.02
// border-color: var(--border) → var(--primary)
// transition: 0.2s ease

// 4. Achievement card klik → lightbox:
// AnimatePresence + scale 0.9 → 1 + opacity 0 → 1

// 5. Background hero — pilih salah satu (mulai dari yang paling ringan):
// Option A: CSS animated gradient (0 dependency)
// Option B: Three.js particles (berat, Phase 2)
// Option C: Shader gradient (medium, library: satori atau mesh-gradient)
// → Untuk v1: pakai Option A dulu, upgrade ke C di Phase 2
```

---

## 18. Yang Sudah Dimulai di Phase 1 (Porto Lama)

> Catatan: lo sudah mulai Phase 1 menggunakan PRD versi awal yang framing-nya OlivX-centric.
> Hal-hal yang perlu di-review dan disesuaikan:
>
> 1. Tagline di hero — ganti ke "Student. Builder. Learner." kalau belum
> 2. Framing teks — pastikan tidak ada "OlivX founder" di hero/about
> 3. Design system colors — cek apakah sudah pakai palette yang benar (#6C63FF, dll)
> 4. Font — pastikan Syne + Plus Jakarta Sans, bukan Inter/Poppins
> 5. Motion import — pastikan dari `motion/react` bukan `framer-motion`
>
> Kalau sudah banyak yang dibangun dan tidak mau rebuild:
> Sesuaikan copy text + color palette saja — struktur Next.js App Router bisa tetap dipakai.

