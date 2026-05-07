# 🌿 PRD Visual: Jalinan Kenangan (The Archive) - v1.3 Final

> [!IMPORTANT]
> **Pemisahan Halaman (Network Optimization)**:
> - **`/archive`**: Halaman utama Bento Grid (Ringan, Tekstual, Foto Terkompresi).
> - **`/serenity`**: Halaman Imersif (Berat, 3D Scene, Pagar Kenangan, Animasi Gembok).

---

## 🎨 Visi & Desain: Fakta-Fiksi WIB
Ruang ini menggunakan siklus 24 jam Jakarta (WIB).

- **Siklus Cahaya**: Matahari Terbit (Kabut/Fajar), Terik (Siang), Senja (Jingga), Malam (Lampu Taman & Pagar menyala otomatis).
- **Asetika TV-UI**: Rounded `32px`, `backdrop-blur-2xl` (fallback ke solid pada low-end device).

---

## 🌐 Optimasi Jaringan & Pengalaman User
Memberikan transparansi kepada pengunjung tentang beratnya aset visual.

*   **WiFi Recommended**: Pada entri `/serenity`, sistem akan menampilkan pesan: *"WiFi Recommended: Anda akan memasuki ruang imersif 3D yang kaya akan detail visual (High Quality Assets)."*
*   **Loading Gateway**: Sederetan kutipan puitis (Paraphrased Tere Liye) muncul saat aset-aset berat (Three.js/High-Res textures) dimuat di latar belakang.
*   **Tech Stack Optimization**:
    - **Media**: Penggunaan format `AV1` untuk video dan `WebP/AVIF` untuk gambar.
    - **Lazy Loading**: Hanya memuat komponen 3D saat user sudah melewati gerbang entri `/serenity`.

---

## 🗝️ Fitur Ungkapan: Gembok Digital (The Rite of Release)
Skenario pelepasan memori ke jurang fiksi.

*   **Scene Buang Kunci**: Animasi interaktif di mana karakter/lengan user membuang kunci ke samudera awan setelah gembok terpasang di **Pagar Dataran Tinggi**.
*   **Kepadatan Gembok**: Gembok lama berubah menjadi bit cahaya puitis untuk menghemat draw call render.

---

## 🔐 Keamanan: Stealth Pixel Handshake
Akses owner tersembunyi yang tidak terdeteksi bot/AI crawler.

- **Mekanisme**: Satu titik pixel (atau elemen kecil dekorasi taman) yang membutuhkan interaksi spesifik (misal: Tap 3x + Long Press) untuk login sebagai Abelion.

---

## 📊 Mapping Arsitektur
| Path | Tujuan | Beban Jaringan |
| :--- | :--- | :--- |
| `/archive` | Life Log, Music, Meta Media | **Ringan** (4G Optimized) |
| `/serenity` | The Witness, Gembok, 3D Scene | **Berat** (WiFi Recommended) |

---

## 📅 Roadmap Implementasi (Re-Revised)
- **Phase 1**: Database Hardening & RLS Setup (Projects FIX). [DONE]
- **Phase 2**: Struktur Frontend `/archive` & Inisialisasi i18n.
- **Phase 3**: Pengembangan `/serenity` (3D Pagar & Key-Throw Animation).
- **Phase 4**: Telegram Webhook Integration & Media Compression.

---
**Status Dokumen: 🕋 Kiblat Perubahan (V1.3 Final - Network Optimized).**
