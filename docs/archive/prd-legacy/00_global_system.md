# 🌐 PRD: Global System & Design Foundation (v1.0)

Dokumen ini mendefinisikan standar global, sistem desain, dan arsitektur teknis dasar yang menyatukan seluruh halaman di **Abelink Portofolio**.

---

## 🎨 Visi & Estetika (Apple HIG Focused)
Sistem ini diaudit dan diimplementasikan secara ketat mengikuti **Apple Human Interface Guidelines (HIG)** untuk memberikan pengalaman yang premium, bersih, dan intuitif. Fokus utama adalah pada **Glassmorphism**, hirarki visual yang jelas, dan mikro-interaksi yang halus.

### 1. Palet Warna (Tailwind v4)
- **Base/Background**: `#0a0a0f` (Deep Obsidian)
- **Surface**: `#12121e` / `#1a1a2e` (Elevated Layers)
- **Primary**: `#6C63FF` (Royal Purple - Trust & Tech)
- **Accent**: `#00D4AA` (Mint Teal - Life & Energy)
- **Gold**: `#C9A84C` (Premium - Achievements)
- **Text**: Primary (`#F0F0F5`), Secondary (`#9999BB`)

### 2. Tipografi (Google Fonts)
- **Display**: `Syne` (Bold, Modern, Art-focused)
- **Body**: `Plus Jakarta Sans` (Readable, Professional)
- **Mono**: `JetBrains Mono` (Technical, Clean)

---

## 🏗️ Arsitektur Navigasi
Sistem navigasi dirancang untuk meminimalkan friksi dan memberikan kesan "Seamless".

### 1. Floating Pill Navbar (Apple Style)
- **Komponen**: `@/components/layout/Navbar.tsx`
- **Fitur**: 
  - `backdrop-blur-xl` untuk efek kaca.
  - State tracking untuk active route.
  - **Language Switcher (i18n)**: Tersemat di sisi kanan pill.
  - **CMD+K Search Trigger**: Akses cepat ke seluruh fitur.

### 2. Command Palette (Omnisearch)
- **Komponen**: `@/components/ui/CommandPalette.tsx`
- **Logic**: Menggunakan `cmdk` library. Memungkinkan navigasi keyboard-first.
- **Mobile Accessibility**: Mengingat perangkat mobile tidak memiliki tombol Ctrl/Cmd, logo atau komponen visual CMD+K pada navbar harus dapat diklik/di-tap secara langsung sebagai trigger untuk membuka interface pencarian.

---

## 🌍 Strategi i18n & State
- **Library**: Custom Implementation via `Zustand`.
- **Store**: `src/store/languageStore.ts`
- **Workflow**: 
  - Key-Value dictionary (`id.ts` & `en.ts`).
  - Persist middleware untuk menyimpan preferensi bahasa di local storage.

---

## 🛠️ Stack Teknologi Inti
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (Pure CSS Configuration)
- **Animation**: Motion (Framer Motion)
- **Database/Backend**: Supabase (Realtime, Edge Functions, Auth)
- **State Management**: Zustand
- **Querying**: TanStack Query (React Query)

---

## 🔒 Keamanan & Performa
- **Optimasi Gambar**: Penggunaan komponen `next/image` dengan format WebP/AVIF.
- **Analytics**: Vercel Analytics terintegrasi di Root Layout.
- **Back-to-Top**: Micro-interaction untuk navigasi vertikal yang panjang.
