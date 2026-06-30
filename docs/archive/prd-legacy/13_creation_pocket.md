# 🎬 PRD: Creation Pocket (v1.0)

Halaman **Creation** adalah galeri kurasi momen, tutorial, dan inspirasi dari platform eksternal (TikTok) yang dikelola langsung dari basis data personal.

---

## 🎨 Visi & Kurasi Digital
Memberikan akses ke inspirasi eksternal dengan antarmuka yang kohesif dan interaktif.

### 1. Header & Konteks
- **Komponen**: `@/app/creation/page.tsx`
- **Branding**: Menggunakan font **Syne** yang tebal dan modern untuk judul "Favorite Creation".
- **Visual**: Pendekatan desain kartu vertikal (9:16) mengikuti aspek rasio konten mobile.

### 2. Live Synchronization
- **Realtime Updates**: Menggunakan `supabase.channel` untuk mendengarkan perubahan pada tabel `creation`. Konten akan diperbarui secara otomatis (Insert/Update/Delete) tanpa perlu memuat ulang halaman.
- **Loading Skeleton**: `CreationSkeleton` memberikan umpan balik visual instan selama data sedang diambil dari jaringan.

---

## 🛠️ Fitur Kunci
1.  **Dynamic Filtering**: Chip filter yang diekstrak secara otomatis dari kategori yang tersedia di database.
2.  **TikTok Integration**: Penggunaan komponen `TikTokCard` untuk embedding video yang aman dan tertata.
3.  **Layout Animation**: Peralihan antar kategori menggunakan `AnimatePresence` dan `layout` dari Framer Motion untuk pergerakan kartu yang halus.
4.  **Privacy/Visibility Filter**: Hanya menampilkan item dengan flag `is_visible: true`.

---

## ⚙️ Spesifikasi Teknis
- **Data Model (Supabase)**:
  - `title`, `embed_url`, `category`, `cover_image`, `is_visible`.
- **Performance**: Realtime subscription dinonaktifkan saat komponen unmount untuk menghemat sumber daya.
- **Styling**: Background kartu ultra-gelap (`#0a0a0c`) dengan border tipis dan efek bayangan pijar (`shadow-primary/10`).

---

## 📊 Metrik Kesuksesan (Audit target)
- **Realtime Latency**: Penambahan data di Supabase dashboard harus tercermin di halaman dalam < 1 detik.
- **Filter Accuracy**: Filter "all" harus menggabungkan seluruh item, dan filter spesifik harus akurat menyaring kategori.
- **Embed Stability**: Video TikTok harus ter-load dengan benar di dalam kontainer yang memiliki radius sudut `3xl`.
