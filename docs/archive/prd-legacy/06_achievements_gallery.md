# 🏆 PRD: Achievements Gallery (v1.0)

Halaman **Achievements** berfungsi sebagai bukti kompetensi dan pengakuan profesional melalui sertifikasi dan penghargaan.

---

## 🎨 Visi & Presentasi Kredensial
Memberikan kesan prestisius dan terverifikasi pada setiap pencapaian yang ditampilkan.

### 1. Entrance Experience
- **Komponen**: `FloatingTitle.tsx`
- **Visual**: Judul halaman muncul dengan animasi "Floating" yang elegan sebelum konten utama di-render.
- **Micro-interaction**: State `isReady` memastikan grid hanya muncul setelah animasi judul selesai.

### 2. Status States (System Feedback)
- **Loading State**: Spinner berwarna amber (`amber-500`) dengan teks "Processing Credentials..." untuk kesan verifikasi keamanan.
- **Empty State**: Ilustrasi minimalis "Achievements Pending" jika data belum tersedia di database.
- **Error State**: Pesan "Protocol Error" jika terjadi kegagalan koneksi ke Supabase.

---

## 🛠️ Fitur Kunci
1.  **Achievements Grid**: Layout responsif yang menampilkan kartu pencapaian secara teratur.
2.  **Credential Linking**: Setiap item mendukung tautan ke bukti fisik/sertifikat (`credential_url`).
3.  **Real-time Data**: Menggunakan custom hook `useAchievements` untuk pengambilan data asinkron.
4.  **Staggered Fade-in**: Konten masuk dengan durasi 1 detik untuk transisi yang mulus.

---

## ⚙️ Spesifikasi Teknis
- **Data Model (Supabase)**:
  - `title`, `issuer`, `date`, `credential_url`, `description`.
  - `image_url` (opsional untuk badge/sertifikat).
- **Navigation Integration**: Tombol CTA ke "Case Studies" pada kondisi data kosong untuk menjaga retensi user.
- **Z-Index Management**: Penggunaan `relative z-10` untuk memastikan konten berada di atas elemen dekoratif background.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Visual Hierarchy**: Kemudahan dalam membedakan antara judul pencapaian dan penerbit (issuer).
- **Link Integrity**: Seluruh tautan sertifikat harus valid dan membuka di tab baru (`target="_blank"`).
- **Animation Fluidity**: Animasi `FloatingTitle` tidak boleh menghambat akses konten utama terlalu lama.
