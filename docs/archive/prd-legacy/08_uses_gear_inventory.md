# 💻 PRD: Uses Gear Inventory (v1.0)

Halaman **Uses** adalah katalog kurasi dari perangkat keras, perangkat lunak, dan alat produktivitas yang digunakan dalam alur kerja sehari-hari.

---

## 🎨 Visi & Katalog Digital
Menampilkan transparansi alat kerja dengan estetika industri yang bersih dan informatif.

### 1. Typography & Branding
- **Visual**: Judul "Uses" menggunakan gradien linier dari warna `primary` ke `accent` untuk penekanan visual yang kuat.
- **Font**: Penggunaan font monospaced pada deskripsi alat untuk memperkuat kesan teknis.

### 2. Categorized Listing
Item dikelompokkan secara otomatis berdasarkan kategori dari database:
- **Hardware**: Ikon `Cpu` (Amber/Primary).
- **Software**: Ikon `Terminal` (Accent).
- **Workspace**: Ikon `Monitor` (White).
- **Default**: Ikon `Wrench` (Secondary).

---

## 🛠️ Fitur Kunci
1.  **Grouped Rendering**: Logika `reduce` untuk mengelompokkan item berdasarkan kategori secara dinamis di server-side.
2.  **Incremental Static Regeneration (ISR)**: Menggunakan `revalidate = 3600` untuk memastikan data diperbarui setiap jam tanpa mengorbankan kecepatan load page.
3.  **External Linking**: Tombol "Get it" yang mengarahkan pengguna ke produk atau dokumentasi alat terkait.
4.  **Glassmorphism List**: Kartu item menggunakan efek kaca dengan border transparan dan bayangan lembut saat di-hover.

---

## ⚙️ Spesifikasi Teknis
- **Data Persistence**: Tabel `uses_items` di Supabase dengan kolom `name`, `description`, `category`, dan `url`.
- **Icon Mapping**: Komponen `CategoryIcon` untuk visualisasi kategori yang konsisten.
- **Responsive Layout**: Deskripsi dan tombol "Get it" disusun secara horizontal pada desktop dan vertikal pada mobile.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Data Freshness**: Penambahan item baru di Supabase harus muncul di halaman dalam waktu maksimal 1 jam (efek caching).
- **Hover Feedback**: Shadow dan border color change harus terasa responsif.
- **Accessibility**: Tautan eksternal harus memiliki atribut `rel="noopener noreferrer"` untuk keamanan.
