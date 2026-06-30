# 📁 PRD: Projects System (v1.0)

Sistem **Projects** adalah inti dari portofolio, yang berfungsi sebagai galeri dinamis untuk menampilkan karya dan studi kasus teknis.

---

## 🎨 Visi & Pengalaman Pengguna
Memberikan pengalaman membaca studi kasus yang bersih, berwibawa, dan teknis namun tetap estetis.

### 1. Halaman Utama Proyek (`/projects`)
- **Komponen**: `@/app/projects/page.tsx` & `ProjectsGrid.tsx`.
- **Fitur**:
  - **Dynamic Fetching**: Mengambil data dari tabel `projects` di Supabase.
  - **Empty State**: Menampilkan pesan "Blueprint in Progress" jika belum ada data.
  - **Loading Logic**: Spinner kustom dengan font mono untuk kesan "processing".

### 2. Detail Proyek (`/projects/[slug]`)
- **Visual**: 
  - **Dynamic Background Glow**: Warna background berpijar menyesuaikan `dominantColor` dari masing-masing proyek.
  - **Glassmorphism Article**: Konten diletakkan di atas kartu kaca tebal untuk keterbacaan maksimal.
- **Struktur Konten**: Mendukung Markdown (`react-markdown`) untuk format teknis yang kaya.

---

## 🛠️ Fitur Kunci
1.  **Metadata Sidebar**: Menampilkan Role, Timeline, dan Tech Stack secara terpisah dari narasi utama.
2.  **Floating Actions**: Tombol melayang untuk akses cepat ke Demo Live atau Source Code (GitHub).
3.  **Project Navbar**: Navigasi khusus di dalam halaman detail yang memiliki branding minimalis dan tombol kembali.
4.  **Markdown Styling**: Kustomisasi elemen Markdown (h1-h6, code, blockquote) agar serasi dengan sistem desain global.

---

## ⚙️ Spesifikasi Teknis
- **Data Model (Supabase)**:
  - `name`, `slug`, `description`, `content` (Markdown).
  - `cover_image`, `dominant_color`.
  - `tech` (Array), `github_url`, `live_url`.
  - `role`, `timeline`.
- **Hooks**: `useProjects` dan `useProjectBySlug` untuk manajemen state server.
- **Rendering**: Menggunakan Dynamic Route `[slug]` untuk efisiensi URL.
- **Navigation**: Tombol kembali (`ArrowLeft`) untuk memudahkan user keluar dari deep-dive studi kasus.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Content Fidelity**: Konten Markdown harus ter-render dengan *spacing* dan *padding* yang sempurna.
- **Color Sync**: Warna pijar background harus benar-benar selaras dengan gambar sampul yang diunggah.
- **Interaction**: Tombol "Live Demo" dan "View Source" harus responsif dan membuka tab baru.
