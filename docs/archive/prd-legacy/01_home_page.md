# 🏠 PRD: Home Page (v1.0)

Halaman utama adalah gerbang pertama yang merepresentasikan identitas **Ihsanuddin Salav** sebagai Creative Developer & AI Builder.

---

## 🎨 Visi & Interaksi Terpusat
Halaman ini dirancang untuk memberikan "First Impression" yang imersif melalui perpaduan antara tipografi statis dan latar belakang dinamis.

### 1. Hero Section (Pusat Perhatian)
- **Komponen**: `@/components/sections/Hero.tsx`
- **Visual Utama**: 
  - **3D Background**: Menggunakan `HeroScene` (Three.js) yang memvisualisasikan elemen geometris atau abstrak yang responsif terhadap mouse.
  - **Easter Egg Name**: Interaksi tersembunyi pada nama "Ihsanuddin Salav".
  - **Typing Animation**: Menampilkan role dinamis (Fullstack Developer, AI Enthusiast, dll) untuk menunjukkan spektrum keahlian.

### 2. Live Data Integration (Supabase)
Mengkonsumsi tabel `settings` untuk menampilkan status terkini secara real-time:
- **Status Badge**: Menampilkan ketersediaan kolaborasi (`open_to_work`).
- **Learning Track**: Menampilkan teknologi yang sedang dipelajari (`currently_learning`).

---

## 🛠️ Fitur Kunci
1.  **Status Terbuka/Tutup**: Badge dinamis dengan animasi pulse untuk menarik perhatian klien/kolaborator.
2.  **Multilingual Support**: Header selaras dengan store bahasa (`hero.greeting`, `hero.tagline`, dll).
3.  **Social Connectivity**: Akses cepat ke GitHub, Instagram, dan Email.
4.  **Implicit Navigation**: Tombol CTA "Lihat Karya" yang memandu pengguna ke halaman Proyek.
5.  **Scroll Indicator**: Petunjuk visual bagi pengguna untuk mengeksplorasi konten lebih dalam.

---

## ⚙️ Spesifikasi Teknis
- **Server-Side Data**: Fetching data `settings` menggunakan server component untuk SEO dan performa.
- **Incremental Static Regeneration (ISR)**: Revalidasi setiap 60 detik untuk memastikan data status tetap segar tanpa mengorbankan kecepatan load.
- **Hydration Safety**: Implementasi `mounted` state check untuk mencegah mismatch antara server-rendered HTML dan client-side hydration (terutama pada komponen 3D).
- **Iconography**: Lucide React (Github, Instagram, Mail, ArrowRight, ChevronDown).

---

## 📊 Metrik Kesuksesan (Audit target)
- **LCP (Largest Contentful Paint)**: Di bawah 1.5 detik meskipun menggunakan 3D assets.
- **Interaction to Next Paint (INP)**: Animasi transisi harus mulus pada perangkat mobile.
- **Conversion**: Laju klik pada tombol "Lihat Karya".
