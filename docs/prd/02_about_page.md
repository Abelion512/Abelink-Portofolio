# 🧑‍🚀 PRD: About Page (v1.0)

Halaman **About** berfungsi sebagai narasi personal yang menghubungkan keahlian teknis dengan visi kreatif Ihsanuddin Salav.

---

## 🎨 Visi & Naratif
Halaman ini dirancang untuk bercerita ("Storytelling") dengan transisi yang halus dan elemen visual yang "pop".

### 1. Narasi Personal
- **Komponen**: `@/app/about/page.tsx`
- **Konten**: Menggunakan i18n (`about.p1`, `about.p2`) untuk menjelaskan latar belakang sebagai mahasiswa Rekayasa Perangkat Lunak yang berfokus pada AI.
- **Efek**: `motion.p` dengan stagger animation untuk kenyamanan membaca.

### 2. Tech Core Highlight
- **Komponen**: `SpotlightCard`
- **Visual**: Kartu interaktif yang mengikuti pergerakan kursor (Spotlight effect).
- **Isi**: Menampilkan stack utama secara ringkas (Next.js 16, TypeScript, n8n, Supabase, Docker, Linux).

---

## 📸 Fitur Khunci: Visual Missions & Collabs
Bagian ini adalah elemen pembeda yang menampilkan sisi kreatif di luar kode.

### 1. VTuber Collaboration Gallery
- **Deskripsi**: Menampilkan kartu kolaborasi visual dengan agensi atau individu (misal: Neon Chronicles, Synapse Agency).
- **Interaktivitas**: 
  - **Media Popup**: Klik pada kartu untuk memperbesar gambar atau memutar video (An Yu-jin MP4).
  - **Hover State**: Efek translasi ke atas dan shadow primary glow.
  - **Auto-Play Video**: Video MP4 diputar otomatis tanpa suara (muted) di dalam grid.

### 2. Floating Title
- **Komponen**: `FloatingTitle`
- **Tujuan**: Memberikan konteks halaman yang elegan saat transisi masuk.

---

## ⚙️ Spesifikasi Teknis
- **Media Handling**: Komponen `next/image` untuk gambar dan tag `video` HTML5 standar untuk aset MP4.
- **Modal System**: `MediaPopup` menggunakan portal atau z-index tinggi untuk overlay media yang imersif.
- **Accessibility**: Penggunaan tag `alt` pada media dan struktur heading yang logis (`h2`, `h3`, `h4`).
- **Performance**: Gambar VTuber menggunakan `unoptimized` jika diperlukan beban cepat dari sumber eksternal, namun idealnya menggunakan optimasi Next.js.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Visual Fidelity**: Kualitas render video (`An_Yu-jin.mp4`) harus tajam tanpa merusak FPS scroll.
- **Popup Response**: Delay pembukaan modal harus < 100ms.
- **Mobile Readability**: Teks biografi harus tetap nyaman dibaca dalam kontras tinggi.
