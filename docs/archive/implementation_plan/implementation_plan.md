# Implementation Plan - Projects & Achievements Upgrade

Mengadopsi pola dari Satria Bahari Portfolio dengan improvisasi untuk Abelink Portfolio.

## User Review Required

> [!IMPORTANT]
> - **Routing**: Saya akan menambahkan rute baru `/projects/[slug]`. Pastikan data di Supabase sudah memiliki kolom `slug` yang unik.
> - **MDX Content**: Konten proyek akan dirender menggunakan `react-markdown`. Anda perlu mengisi kolom `content` di tabel `projects` dengan format Markdown/MDX.
> - **Database Schema**: Saya akan mengasumsi kolom baru (`issuer`, `issue_date`, `category` untuk Achievements; `slug`, `content`, `role`, `timeline` untuk Projects) sudah ada atau akan ditambahkan.

## Proposed Changes

### Component Enhancements

#### [NEW] [SpotlightCard.tsx](file:///media/abelion/Isaf/ican/project/Web/Abelink-Portofolio/src/components/ui/SpotlightCard.tsx)
- Komponen pembungkus kartu dengan efek gradien yang mengikuti kursor (improvisasi dari referensi).

#### [MODIFY] [AchievementModal.tsx](file:///media/abelion/Isaf/ican/project/Web/Abelink-Portofolio/src/components/ui/AchievementModal.tsx)
- Update layout menjadi side-by-side (2 kolom) pada desktop.
- Tambahkan tampilan metadata: Issuer, Date, Category.
- Integrasi `react-markdown` untuk deskripsi prestasi.

#### [MODIFY] [ProjectsGrid.tsx](file:///media/abelion/Isaf/ican/project/Web/Abelink-Portofolio/src/components/sections/ProjectsGrid.tsx)
- Ubah link dari eksternal menjadi internal `/projects/[slug]`.
- Tambahkan badge "Featured" untuk proyek terpilih.
- Gunakan `SpotlightCard` untuk visual yang lebih dinamis.

### New Pages & Routing

#### [NEW] [projects/[slug]/page.tsx](file:///media/abelion/Isaf/ican/project/Web/Abelink-Portofolio/src/app/projects/[slug]/page.tsx)
- Halaman detail proyek yang menampilkan:
    - Banner image besar.
    - Info grid (Role, Timeline, Tech Stack).
    - Konten utama (Markdown).
    - Floating Action Bar untuk Demo & GitHub.

### Data & Logic

#### [MODIFY] [useData.ts](file:///media/abelion/Isaf/ican/project/Web/Abelink-Portofolio/src/hooks/useData.ts)
- Perbarui interface `Project` dan `Achievement` dengan field baru.
- Tambahkan hook baru `useProjectBySlug(slug: string)` untuk fetching detail proyek.

## Open Questions

- Apakah Anda ingin saya membuat file migrasi SQL untuk menambahkan kolom baru di Supabase?
- Untuk `SpotlightCard`, apakah Anda ingin warna spotlight statis (misalnya Primary) atau dinamis mengikuti warna dominan cover image?

## Verification Plan

### Automated Tests
- `bun run lint` untuk memastikan tidak ada kesalahan tipe data baru.
- Cek routing `/projects/[slug]` dengan slug dummy.

### Manual Verification
- Buka modal Achievement dan pastikan layout 2 kolom berfungsi di desktop.
- Navigasi ke halaman detail proyek dan cek rendering Markdown.
- Verifikasi responsivitas mobile pada halaman detail baru.
