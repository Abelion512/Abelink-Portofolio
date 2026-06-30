# 🌿 PRD Visual: Jalinan Kenangan (The Archive) - [PAJANGAN VISUAL / NON-IMPLEMENTASI]

**STATUS: VISION ONLY.** Jalinan Kenangan adalah ruang imersif yang berfungsi sebagai **Pajangan (Display)** untuk mendemonstrasikan visi desain dan kapabilitas visual portofolio. Modul ini tidak dimaksudkan untuk diimplementasikan secara fungsional dalam pengembangan saat ini.

---

## 🎨 Visi & Desain: Fakta-Fiksi WIB
Ruang ini menggunakan siklus 24 jam Jakarta (WIB) untuk mengatur pencahayaan dan suasana UI secara dinamis.

### 1. Pemisahan Halaman (Network Optimization)
- **`/archive` (The Bento Grid)**: 
  - Halaman utama berbentuk grid (Bento-style).
  - Ringan, tekstual, dengan foto yang terkompresi secara cerdas.
  - Berfungsi sebagai kurasi cepat untuk pencarian memori.
- **`/serenity` (Immersive World)**: 
  - Ruang 3D imersif (berat).
  - Pagar Kenangan, Animasi Gembok, dan detail visual High-Quality.
  - **WiFi Recommended**: Sebelum masuk, tampilkan pesan ramah (familiar): *"Gunakan WiFi untuk pengalaman terbaik. Anda akan memasuki ruang imersif 3D yang kaya akan detail visual (High Quality Assets)."*

### 2. Siklus Cahaya & Estetika
- **Jakarta Time (WIB)**: Matahari Terbit (Fajar), Terik (Siang), Senja (Jingga), Malam (Lampu Taman menyala).
- **Glassmorphism**: Desain "Apple-like" dengan `backdrop-blur-2xl` dan radius sudut `32px`.

---

## 🛠️ Fitur Kunci
1.  **LifeLog Grid**: Sistem kartu bento yang melacak musik, film, dan momen personal secara visual.
2.  **Witness Certificate (Saksi)**: Pengunjung dapat mengklaim sertifikat digital dengan nomor urut unik sebagai bukti telah mengunjungi arsip.
3.  **Memoire Locking**: Fitur penguncian memori tertentu dengan "Gembok Digital" yang memerlukan interaksi khusus.
4.  **Loading Gateway**: Sederetan kutipan puitis (Paraphrased Tere Liye & others).
    - Mekanisme: Tampilkan satu kutipan acak saat aset berat (Three.js) dimuat.
    - Atribusi: Nama pengarang/source wajib dicantumkan di **pojok kanan bawah kecil** (e.g., *— source by Tere Liye*).
5.  **Granular Lazy Loading**: Sistem hanya akan memuat komponen 3D atau aset yang benar-benar akan dilewati atau dilihat oleh user pada saat itu, untuk menghemat resource dan mempercepat loading awal.

---

## ⚙️ Spesifikasi Visual (Showcase Only)
- **Concept Integration**: Menunjukkan integrasi konseptual antara Bun runtime dan UI imersif.
- **Visual Mockup**: Representasi statis/pajangan dari elemen Three.js.
- **Documentation Purpose**: Sebagai bukti kemampuan perencanaan teknis dan desain interaktif tingkat lanjut.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Performance**: Skoring Lighthouse > 90 pada rute `/archive`.
- **Engagement**: Terbitnya sertifikat "Saksi" untuk pengunjung yang melakukan interaksi eksplorasi.
- **Atmosphere**: Transisi warna latar belakang yang akurat sesuai dengan waktu lokal di Jakarta.
