# 🛠️ PRD: Tech Stack Core (v1.0)

Halaman **Stack** menyajikan tinjauan komprehensif tentang teknologi, framework, dan alat yang digunakan dalam membangun ekosistem Abelink.

---

## 🎨 Visi & Estetika Teknik
Menonjolkan identitas teknis melalui visual yang modern, terorganisir, dan interaktif.

### 1. Categorization System
Teknologi dikelompokkan ke dalam 4 pilar utama:
- **Frontend Architecture**: Fokus pada UI/UX dan performa client-side.
- **Backend & Systems**: Fokus pada data, API, dan server-side logic.
- **Intelligence & Automation**: Fokus pada integrasi AI dan efisiensi workflow.
- **Infrastructure**: Fokus pada deployment, keamanan, dan arsitektur sistem operasi.

### 2. Spotlight Interaction
- **Komponen**: `SpotlightCard.tsx`
- **Visual**: Setiap kategori memiliki kartu dengan efek cahaya (`spotlight`) yang mengikuti kursor pengguna, memberikan kedalaman visual pada layout statis.
- **Color Coding**: Penggunaan warna aksen spesifik (Biru, Hijau, Ungu, Amber) untuk membedakan pilar teknologi secara intuitif.

---

## 🛠️ Fitur Kunci
1.  **Pill-shaped Tags**: Daftar teknologi ditampilkan dalam tag pill yang rapi dengan font monospaced.
2.  **Interactive Hover States**: Border dan teks berubah warna saat di-hover, memberikan feedback visual langsung.
3.  **Modern Iconography**: Penggunaan ikon SVG yang bersih dan konsisten dengan pilar kategori.
4.  **Entrance Stagger**: Grid kategori muncul secara bertahap setelah judul halaman selesai beranimasi.

---

## ⚙️ Spesifikasi Teknis
- **Structural Component**: Menggunakan `motion.div` untuk mengatur visibilitas awal.
- **UI Architecture**: Dibangun di atas sistem desain global dengan variabel CSS Tailwind v4 untuk transparansi (`white/5`, `white/10`).
- **Responsive Grid**: Layout 2 kolom pada desktop yang otomatis menjadi 1 kolom pada perangkat seluler.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Legibility**: Teks pada tag pill harus tetap terbaca jelas di atas background transparan.
- **Hover Performance**: Efek *spotlight* harus berjalan mulus (60fps) tanpa menyebabkan lag pada browser.
- **Categorical Accuracy**: Pemisahan teknologi harus logis dan mencerminkan stack sesungguhnya yang digunakan dalam proyek.
