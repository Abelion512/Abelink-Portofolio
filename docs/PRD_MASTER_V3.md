# PRD MASTER V4 — Abelink Portfolio
**Single Source of Truth | Last Updated: 2026-05-16 (rev.4 — 25 comments processed)**
**Status: ACTIVE**

---

## 0. Identitas & Konteks

| Field | Value |
|---|---|
| **Nama Asli** | Ihsanuddin Salav |
| **Nama Publik** | Abelion |
| **Jurusan** | Sistem Informasi |
| **Universitas** | Universitas Siber Muhammadiyah Yogyakarta (PJJ/online) |
| **Bahasa default** | English (EN), toggle ke Bahasa Indonesia |

### Persona & Nama Map

| Nama | Fungsi | Konteks |
|---|---|---|
| **Ihsanuddin Salav** | Nama asli | Tampilan hero, dokumen formal |
| **Abelion** | Handle publik / online identity | Platform sosial, tagline informal |
| **Abelink** | Persona AI — jalur teknis | Penjelasan teknikal, kode, arsitektur |
| **Cybill** | Persona AI — jalur sosial/bisnis | Guestbook, percakapan umum |
| **Hermes** | AI assistant pribadi di laptop (tool internal) | **Bukan bagian portfolio ini sama sekali** |

> **Catatan penting**: Abelink & Cybill adalah dua mode persona AI di portfolio ini. Mereka TIDAK diterapkan ke Hermes — Hermes punya persona-nya sendiri dan bukan bagian dari sistem ini.

---

## 1. Arsitektur Dua Dunia

```
abelink.dev/
│
├── /                    → PORTFOLIO WORLD (publik, deploy online)
├── /about
├── /projects
├── /achievements
├── /stack
├── /guestbook
├── /card
│
└── /serenity/           → SERENITY WORLD (privat — localhost only)
    ├── /serenity/world      (3D "gembok digital" space — implement PALING TERAKHIR)
    └── /serenity/archive    (ruang kenangan 360° — local only)
```

> **Keputusan final arsitektur**:
> - Portfolio World = deploy ke Vercel, publik
> - Serenity World = **localhost only**, tidak di-deploy online. Privacy jauh lebih terjaga, tidak perlu auth kompleks.
> - `/dashboard` = dihapus dari scope publik — data real-time hanya untuk diri sendiri via localhost

---

## 2. Design System

### 2.1 Visual
- **Panduan**: Apple HIG
- **Estetika**: Liquid Glass
- **Prinsip**: Clarity > Delight > Depth

### 2.2 Referensi Liquid Glass (FREE ONLY)

| Sumber | Link | Catatan |
|---|---|---|
| Demo interaktif | https://editor.glass/ | Playground untuk eksperimen |
| **Repo utama** | https://github.com/rdev/liquid-glass-react | **Paling direkomendasikan** |
| Apple docs | https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass | Referensi konsep resmi |
| Vision Pro UI Kit | https://github.com/jetstyle/Apple-Vision-Pro-UI-Kit | Referensi visual komponen |
| HIG Designer | https://github.com/axiaoge2/Apple-Hig-Designer | Referensi pattern HIG |

> [!IMPORTANT]
> **Free-only constraint**: Semua library, API, dan service yang digunakan harus free tier atau open source. Tidak ada pembayaran apapun.

### 2.3 Color Palette
```css
--color-base:           #0a0a0f;   /* Deep Obsidian */
--color-surface:        #12121e;   /* Elevated Layer 1 */
--color-surface-high:   #1a1a2e;   /* Elevated Layer 2 */
--color-primary:        #6C63FF;   /* Royal Purple */
--color-accent:         #00D4AA;   /* Mint Teal */
--color-gold:           #C9A84C;   /* Premium Gold */
--color-text-primary:   #F0F0F5;
--color-text-secondary: #9999BB;
--color-text-muted:     #5A5A7A;
```

### 2.4 Tipografi
| Role | Font |
|---|---|
| Display / Heading | `Syne` |
| Body | `Inter` / `Plus Jakarta Sans` |
| Monospace | `JetBrains Mono` / `Geist Mono` |

### 2.5 Liquid Glass CSS
```css
backdrop-filter: blur(24px) saturate(180%);
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.08);
```
Referensi: `src/app/globals.css → .glass-liquid`

---

## 3. Tech Stack

> [!NOTE]
> Verifikasi versi stable terbaru sebelum implementasi. **Free tier only** untuk semua service.

| Layer | Technology | Target |
|---|---|---|
| Framework | Next.js | App Router — verifikasi stable |
| Styling | Tailwind CSS | v4 — verifikasi stable |
| Animation | Motion (Framer Motion) | latest stable |
| Database | Supabase (free tier) | latest stable |
| **Media Storage** | **Supabase Storage (free tier)** | Gambar + video thumbnail |
| **Video embed** | **TikTok embed** (jika favorites bisa di-embed) | Investigasi dulu — lihat §4.3 |
| State | Zustand | latest stable |
| Query | TanStack Query | v5 |
| 3D | React Three Fiber | Jangan install dulu — Phase terakhir |
| Package Manager | **Bun** (wajib) | latest stable |
| Deployment | Vercel (free tier) | Portfolio World only |

### Stack Kategori Lengkap (untuk halaman `/stack`)

| Kategori | Tools |
|---|---|
| **Frontend** | Next.js, Tailwind CSS v4, Motion |
| **Backend & Database** | Supabase, API routes |
| **AI & Automation** | Gemini API, Claude API, 9Router (LLM routing), Hermes (personal AI), MCP |
| **Dev Tools** | AG (Antigravity), Claude Code, Trae, Zed, Cursor |
| **Version Control** | Git, GitHub, GitHub Gist |
| **Productivity** | Notion, Obsidian, Slack |
| **Monitoring** | Sentry, Wakatime |
| **Deployment & Hosting** | Vercel, domain |

> **Catatan metodologi belajar**: AI-assisted + trial error + pengalaman langsung + formal (kuliah PJJ) + non-formal. Ini ditulis jujur, bukan disembunyikan.

---

## 4. Halaman Portfolio World — Spesifikasi

### 4.1 Home (`/`)

**Brief desain hero**: Visitor punya pertanyaan nyata saat pertama kali buka portfolio:
- *Siapa kamu?*
- *Apa benefit dari saya mengenalmu?*
- *Orang seperti apa karakternya?*
- *Kenapa saya harus tertarik?*

Hero harus menjawab ini, bukan sekadar nama + tagline.

**Keputusan:**
- Nama di hero: **Ihsanuddin Salav** (nama asli)
- Tagline: **`"masih hidup saja sudah oke"`**

> [!NOTE]
> **Konteks tagline**: Ini bukan pasrah. Ini statement realistis dari orang yang hidup di Indonesia — negara dengan korupsi sistemik, hukum yang bisa dibeli, dan sistem yang tidak selalu berpihak pada rakyat biasa. "Masih hidup saja sudah oke" adalah pengakuan jujur atas kompleksitas itu, bukan kelemahan. Jangan ubah ini.

- Dynamic status: bisa diubah bebas via Supabase — no-code, tanpa deploy ulang

**Aturan konten**: Tidak ada redundansi. Satu komponen = satu tujuan.

**Konten:**
- Hero dengan nama, tagline, dynamic status
- Featured projects (3 terbaru) — tarik dari Supabase
- Quick nav

### 4.2 About (`/about`)

**Tujuan**: Siapa Ihsanuddin Salav sebagai manusia.

**Konten:**
- Foto asli (sudah ada, customizable via Supabase toggle)
- Bio realistis — belajar dari mana saja: AI, pengalaman, formal, non-formal
- Status: junior dengan zero pengalaman industri, tapi terus berkembang
- Aktivitas hidup di luar coding:
  - Kuliah online (PJJ) — Universitas Siber Muhammadiyah Yogyakarta
  - Organisasi: Al-Irsyad Al-Islamiyyah
  - Olahraga, rawat diri
  - Nonton: drama China, drama Korea, donghua
  - Game: Mobile Legends, Township, SuperStar SM, SuperStar STARSHIP, Honor of Kings, Devices Tycoon
  - Manajemen waktu (ongoing learning)
- Timeline: pendidikan, proyek solo yang pernah dikerjakan
  - **Lembaranz**: bisa dicantumkan, tapi dengan catatan jujur bahwa core concept-nya masih dalam perbaikan
- **CV/Resume**: File ada di `docs/references/Ihsanuddin_Salav-CV.pdf` — ini CV customer service, bukan CV teknis. Action item: buat CV teknis baru sebelum Phase 2. Jangan blok implementasi `/about` karena ini.

### 4.3 Projects (`/projects`)

**Status saat ini**: Semua proyek masih solo. Belum ada kolaborasi.
Tertarik ikut event coding (contoh: Google Vibe Coding with AI Studio) — cek di Google Developer events untuk event yang sedang buka.

**Konten per proyek:**
- Nama, deskripsi, tech stack tags
- Status: `completed` / `in-progress` / `archived`
- Link: GitHub + Live demo
- Gambar/screenshot/video (opsional)

**Arsitektur storage (free-only):**
- DB (`projects` table): metadata, nama, deskripsi, URL media
- Gambar: **Supabase Storage bucket** (free tier) — simpan URL di DB
- Video:
  - **TikTok embed** (jika video ada di TikTok): prioritaskan ini — tidak perlu download, tidak makan storage
  - **Investigasi dulu**: apakah TikTok favorites/saved video bisa di-embed? Jika tidak bisa, fallback ke upload ke Supabase Storage
  - Estimasi: 30+ file campuran foto & video

> [!NOTE]
> TikTok embed adalah solusi paling efisien untuk video — zero storage cost, zero bandwidth cost dari pihak kita. Yang perlu diteliti adalah apakah video favorit TikTok bisa di-embed secara publik atau hanya video yang kamu upload sendiri.

### 4.4 Achievements (`/achievements`)

**Konten:**
- Sertifikat yang bisa didownload: tampilkan gambar + link verifikasi
- Badge online tanpa file (contoh: Google Skills / Credly): tampilkan screenshot + link URL badge yang bisa diverifikasi langsung
- Penghargaan, partisipasi event

### 4.5 Stack (`/stack`)

Gunakan tabel kategori dari §3 di atas. Ditulis jujur termasuk metodologi belajar.

> **Catatan soal 9Router & Hermes**: Ini adalah tools internal yang kamu build/gunakan. Masuk ke kategori "AI & Automation" — bukan disembunyikan, tapi dikontekstualisasikan dengan benar (tools pribadi, bukan produk portfolio utama).

### 4.6 Guestbook (`/guestbook`)

**Keputusan: Wall/Card format.**

**Alasan**: Portfolio dikunjungi sporadis, bukan real-time. Wall/card memungkinkan visitor melihat semua pesan sekaligus, Cybill bisa "stempel" respons kecil di tiap kartu. Lebih berkesan seperti papan kenangan, lebih cocok untuk konteks ini dibanding bubble chat yang terasa awkward tanpa respons real-time.

**Implementasi:**
- Grid kartu — setiap entri visitor muncul sebagai kartu
- Cybill memberi respons singkat di bawah tiap kartu
- **Data source**: Supabase table `guestbook`

### 4.7 Digital ID Card (`/card`)

**Keputusan: Portfolio World saja.**

Tujuan `/card` adalah shareable identity — logikanya ada di space publik. Serenity itu privat, `/card` di sana tidak relevan karena tidak ada yang bisa lihat.

**Konsep**: Representasi visual identitas — seperti kartu fisik (KTP, kartu bank) tapi digital. Bisa dibagikan via link atau screenshot.

---

## 5. AI — Abelink & Cybill

### Dua Persona
| Persona | Nama | Konteks aktif |
|---|---|---|
| Teknis / IPA | **Abelink** | Penjelasan kode, arsitektur, teknikal |
| Sosial / Bisnis | **Cybill** | Guestbook, percakapan umum |

**Penting**: Ini bukan Hermes. Hermes = tool laptop terpisah dengan persona-nya sendiri.

### Tone (berlaku untuk keduanya)
- Berpendidikan tapi santai
- Berbicara dengan data — ada bukti, ada referensi
- Tidak kaku, tidak Gen Z cringe
- Tidak mengklaim Abelion sebagai sesuatu yang bukan dirinya

### Keamanan
- AI tidak boleh membocorkan data internal atau sistem
- Hanya expose informasi yang memang dimaksudkan publik

### Implementasi Teknis
- **Lokasi**: Widget global — muncul di **semua halaman Portfolio World**
- **Backend**: RAG + LLM API (free tier)
- **LLM routing**: 9Router tunneling dipertimbangkan — tapi ada limitasi: offline saat laptop tertutup. Analogi valid: seperti manusia dengan jam kerja, bisa buka tutup.
- **Fallback chain**: Jika 9Router/API tidak tersedia → respons statis yang masuk akal
- **Knowledge base**: Supabase (proyek, pencapaian, info about) — hanya data publik yang di-expose
- **GitHub API**: Menggunakan **token** (Personal Access Token) — bukan OAuth. Token disimpan di environment variable server-side, tidak di-expose ke client.

### Writing/Notes Widget
- **TBD** = *To Be Determined* — artinya belum diputuskan. Source untuk widget "writing" di dashboard belum dipilih (bisa Notion, Obsidian export, atau sistem custom).
- **Update**: Karena `/dashboard` dipindah ke localhost-only, ini tidak urgent untuk Phase 1-2.

---

## 6. Serenity World — Visi (Local Only)

> [!CAUTION]
> Serenity World = **localhost only**. Tidak di-deploy online. Jangan implementasi apapun di sini sebelum Portfolio World selesai dan live.

### 6.1 Gerbang (`/serenity`)
- Estetika berbeda dari Portfolio World
- WIB light cycle — visual berubah sesuai waktu Indonesia
- Mekanisme akses: tidak perlu auth kompleks karena local-only

### 6.2 Archive — Ruang Kenangan 360° (`/serenity/archive`)

**Konsep**: Ruangan yang didesain semirip mungkin dengan ruang kenangan fisik — dari bayi sampai sekarang. Semua ada: piala, sertifikat, foto, benda kenangan. Bisa disentuh dan dilihat 360 derajat. Bukan tentang relationship (seperti Exchange), tapi tentang **tumbuh kembang dan kenangan pribadi**.

**Format**: 3D immersive room, mirip konsep Roblox tapi lebih personal dan kuratif. Bento Grid untuk tampilan 2D fallback.

> [!CAUTION]
> **Privasi**: Local-only adalah keputusan final. Tidak perlu justifikasi lebih lanjut.

### 6.3 World — Gembok Digital (`/serenity/world`)

**Konsep "gembok digital"**: Seperti tradisi membeli gembok, menguncinya, dan membuang kuncinya ke jurang — simbol komitmen abadi yang tidak bisa dibuka lagi. Di sini, ini adalah ruang 3D immersive untuk hal-hal yang "dikunci selamanya" — kenangan, ikrar, momen yang tidak perlu diubah.

**Implementasi**: React Three Fiber. **Paling terakhir** — paling kompleks dari semua fitur.

---

## 7. Roadmap Implementasi

### Phase 1 — Foundation (SEKARANG)
- [ ] Audit kode — identifikasi sisa Jules/Hermes era
- [ ] Perbaiki Hero: nama Ihsanuddin Salav, tagline baru, dynamic status
- [ ] `/about` — konten baru, realistis, game list lengkap, Lembaranz dengan catatan
- [ ] `/projects` — setup Supabase Storage, investigasi TikTok embed
- [ ] `/achievements` — handle dua tipe: sertifikat file & badge online
- [ ] Navbar: bersih, responsive, i18n toggle
- [ ] Setup Liquid Glass dari `github.com/rdev/liquid-glass-react`

### Phase 2 — Polish
- [ ] `/guestbook` — Wall/Card format + Cybill AI response
- [ ] `/stack` — kategori lengkap + tools jujur
- [ ] `/card` — digital ID card (Portfolio World)
- [ ] Command palette (⌘K)
- [ ] SEO & metadata per halaman
- [ ] Cybill AI: setup RAG + LLM routing + 9Router consideration
- [ ] Buat CV teknis baru (action item terpisah)
- [ ] Cek Google Developer events untuk event vibe coding

### Phase 3 — Serenity (Setelah Portfolio live)
- [ ] Finalisasi planning Serenity
- [ ] `/serenity` gateway (localhost)
- [ ] `/serenity/archive` — 3D room kenangan (localhost)

### Phase 4 — Immersive (Jangka Panjang)
- [ ] `/serenity/world` — Gembok Digital 3D (localhost, implementasi terakhir)

---

## 8. Keputusan Final

> [!IMPORTANT]
> Tidak boleh diubah tanpa diskusi eksplisit.

| Keputusan | Status |
|---|---|
| Bun sebagai package manager | ✅ Final |
| Tailwind v4 | ✅ Final |
| **Free-only constraint** — semua service, library, API | ✅ Final |
| Nama di hero: **Ihsanuddin Salav** | ✅ Final |
| Foto: foto asli, customizable via Supabase | ✅ Final |
| Tagline: **"masih hidup saja sudah oke"** | ✅ Final |
| Cybill muncul di **semua halaman** Portfolio World | ✅ Final |
| Storage gambar: Supabase Storage bucket (free) | ✅ Final |
| Storage video: TikTok embed (prioritas) atau Supabase Storage | ✅ Final |
| EN default + ID toggle | ✅ Final |
| Hermes = tool internal, tidak ada hubungan dengan portfolio | ✅ Final |
| Serenity World = **localhost only**, tidak di-deploy | ✅ Final |
| `/dashboard` = localhost only, tidak di scope publik | ✅ Final |
| Guestbook format: **Wall/Card** | ✅ Final |
| `/card` = Portfolio World saja | ✅ Final |
| `/serenity/pocket` + `/serenity/archive` = digabung | ✅ Final |
| `/serenity/world` = implementasi terakhir | ✅ Final |
| GitHub API = Personal Access Token (server-side) | ✅ Final |
| Serenity dikerjakan setelah Portfolio World selesai | ✅ Final |

---

## 9. AI Model — Rekomendasi untuk Phase 1

**Konteks**: Kamu concern soal rate limit Claude dan mempertimbangkan 9Router.

**Rekomendasiku:**

| Skenario | Model | Alasan |
|---|---|---|
| Iterasi cepat, refactor, audit | **Gemini 3.0 Flash** | Limit longgar, cepat, cocok untuk pekerjaan repetitif |
| Keputusan arsitektur, konten nuanced | **Claude Sonnet 4.5** via AG | Terbaik untuk reasoning kompleks |
| Jika limit AG habis | **9Router → Claude Code** | Fallback, tapi setup lebih kompleks |

**Tentang ganti akun AG**: Tidak disarankan — melanggar ToS dan tidak sustainable.

**Tentang 9Router ke Claude Code**: Bisa jadi fallback yang bagus saat AG limit habis, tapi overhead setup-nya real. Untuk Phase 1 yang masih di level foundation, Gemini Flash + Claude Sonnet via AG sudah lebih dari cukup.

---

## 10. Open Questions — Masih Perlu Investigasi

> [!NOTE]
> Bukan blocking, tapi perlu diteliti sebelum implementasi fitur terkait.

**Q1 — TikTok embed**: Apakah video yang di-*favorites*/disave di TikTok bisa di-embed secara publik? Atau hanya video yang kamu upload sendiri? Perlu test langsung.

**Q2 — Event Google Vibe Coding**: Cek di https://developers.google.com/events atau search "Google Vibe Coding with AI Studio 2026" untuk jadwal event aktif.

**Q3 — CV Teknis**: `docs/references/Ihsanuddin_Salav-CV.pdf` adalah CV customer service — tidak relevan untuk portfolio teknis. Perlu dibuat CV baru sebelum Phase 2 deploy.

---

## 11. Referensi Kritis

- **Visual referensi**: `docs/references/Liquid_Glass.mp4`
- **Liquid Glass repo**: https://github.com/rdev/liquid-glass-react
- **CSS foundation**: `src/app/globals.css`
- **Layout root**: `src/app/layout.tsx`
- **CV file**: `docs/references/Ihsanuddin_Salav-CV.pdf`
- **PRD legacy**: `docs/archive/prd-legacy/` (read-only)
- **History**: `.Jules/history.md`
