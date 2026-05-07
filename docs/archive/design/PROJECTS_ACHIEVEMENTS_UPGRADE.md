# 🎨 Projects & Achievements Upgrade Plan

**Reference:** [Satria Bahari Portfolio](file:///media/abelion/Isaf/ican/project/Web/Abelink-Portofolio/public/Addictions/satriabahari.my.id-main.zip)  
**Date:** 2026-03-31  
**Objective:** Mengadopsi struktur detail yang kaya dan elemen visual premium dari referensi, serta melakukan improvisasi untuk Abelink Portfolio.

---

## 🏆 1. Achievements (Popup Modal Upgrade)

### Improvements to Adopt:
- **Rich Metadata**: Menambahkan informasi Penerbit (*Issuer*), Tanggal Terbit (*Issue Date*), dan Kategori.
- **Side-by-side Layout**: Gambar sertifikat di kiri (60%) dan detail di kanan (40%) pada desktop.
- **MDX Description**: Mendukung deskripsi panjang dengan formatting.
- **Gallery Filters**: Menambahkan filter kategori (e.g., "Software Engineering", "AI", "Cloud") dan tipe (e.g., "Certificate", "Award").

### Abelink Improvisations:
- **Deep Glassmorphism**: Menggunakan `backdrop-blur-3xl` dan `bg-surface/80` yang lebih pekat dibanding referensi.
- **Interactivity**: Menambahkan tombol "Verify Credential" yang menonjol dengan animasi gradient pulse.
- **Mobile First**: Memastikan transisi dari grid ke modal menggunakan Framer Motion `layoutId` untuk efek *shared element transition*.

---

## 🚀 2. Projects (Detail Page Implementation)

### Improvements to Adopt:
- **Dedicated Detail Page**: Navigasi ke `/projects/[slug]` alih-alih langsung ke URL eksternal.
- **Tech Stack Tooltips**: Menampilkan ikon teknologi dengan tooltip nama framework.
- **MDX Case Study**: Setiap proyek memiliki konten MDX yang menjelaskan tantangan, solusi, dan hasil.
- **Featured Badge**: Penanda visual untuk proyek unggulan dengan ikon pin.

### Abelink Improvisations:
- **Floating Action Bar**: Navigasi sticky di bagian bawah halaman detail untuk akses cepat ke Demo/GitHub.
- **Dynamic Content Sections**: Memisahkan "Role", "Timeline", dan "Tech Stack" dalam grid yang bersih di bagian atas halaman.
- **Image Gallery**: Mendukung banyak gambar (Carousel) jika tersedia di database, bukan hanya satu banner.

---

## 🛠️ Technical Implementation

### Data Schema (Supabase)
Pastikan kolom berikut tersedia dan diisi:
- **Projects**: `slug`, `content` (MDX), `is_featured`, `role`, `timeline`.
- **Achievements**: `issuer`, `issue_date`, `category`, `type`.

### Components to Create/Modify:
1.  **[MODIFY]** `src/components/ui/AchievementModal.tsx`: Layout side-by-side & metadata.
2.  **[NEW]** `src/app/projects/[slug]/page.tsx`: Halaman detail proyek.
3.  **[MODIFY]** `src/components/sections/ProjectsGrid.tsx`: Tambahkan badge "Featured" dan link internal.
4.  **[NEW]** `src/components/ui/SpotlightCard.tsx`: Efek spotlight pada hover (improvisasi dari referensi).

---

## 📋 Roadmap

### Phase 1: Achievements (Today)
- [ ] Implementasi metadata (Issuer, Date) di `AchievementModal.tsx`.
- [ ] Finalisasi layout side-by-side premium.
- [ ] Penambahan filter pada grid achievements.

### Phase 2: Projects (Tomorrow)
- [ ] Setup routing dynamic `/projects/[slug]`.
- [ ] Pembuatan template halaman detail proyek.
- [ ] Sinkronisasi data Supabase (content MDX).

### Phase 3: Visual Polish
- [ ] Integrasi SpotlightCard ke seluruh grid.
- [ ] Audit responsivitas mobile (Fase Cleaning Service).

---

**Status:** Drafted for Approval 🚀
