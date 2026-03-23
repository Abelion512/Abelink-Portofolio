---
description: Komprehensif Quality Audit (Automated Tests, HIG UI Check, & Build Verification)
---

Workflow ini dirancang untuk memastikan aplikasi memenuhi standar kualitas tinggi, kepatuhan Apple HIG, dan kesiapan produksi.

### 1. Automated Backend & Frontend Tests
Gunakan `testsprite` untuk menjalankan pengujian otomatis pada seluruh codebase.
// turbo
- Jalankan `testsprite_bootstrap` jika konfigurasi belum ada.
- Jalankan `testsprite_generate_code_and_execute` dengan server mode 'production'.

### 2. Apple HIG & Visual Audit
Gunakan `browser_subagent` untuk melakukan audit visual pada URL lokal (http://localhost:7000).
- **Cek Proporsi (Layout)**: Pastikan elemen utama (Hero, Sections) sudah rata tengah (*centered*) dan seimbang secara visual (tidak berat sebelah/rata kiri berlebihan).
- **Cek Apple HIG**: Verifikasi transparansi glassmorphism, sudut melengkung pada navigasi pill, dan tipografi modern (SF-like).
- **Cek Easter Eggs**: Pastikan interaksi hover (seperti pada Nama) tidak menyebabkan *layout shift* yang merusak komposisi.

### 3. Production Build Verification
Pastikan tidak ada error kompilasi atau masalah tipe data.
// turbo
- Jalankan `bun run build` pada direktori root.

### 4. GEO, AEO, & SEO Check
Optimalkan visibilitas untuk AI Search Engines (Gemini, GPT) dan Crawlers tradisional.
- **Skema JSON-LD**: Verifikasi keberadaan skema `Person` dan `WebSite` yang mendetail.
- **Meta Tags**: Cek Title, Description, dan OG Tags agar tetap informatif dan strategis.
- **Data Integrity (Backend Check)**: Pastikan seluruh halaman yang menarik data dari Supabase (Projects, Achievements) memuat konten dengan benar. Jika "No data found", cek konsistensi kolom database (contoh: `is_visible`).

### 5. Laporan Akhir & Dokumentasi
- **Artifact Generation**: Buat atau update `walkthrough.md` dengan screenshot hasil audit browser.
- **Docs Synchronization**: **WAJIB** buat salinan seluruh hasil audit (audit_report.md, status_checklist.md, dll.) ke direktori `docs/audit/` agar terdokumentasi secara permanen di repositori.
- **Status Summary**: Sertakan ringkasan status pengujian (Pass/Fail) dan rekomendasi perbaikan di bagian atas laporan.
