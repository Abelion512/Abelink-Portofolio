# 🪪 PRD: Digital Card ID (v1.0)

Halaman **Card** adalah kartu nama digital minimalis yang dirancang untuk berbagi kontak secara cepat dan elegan melalui QR Code atau Web Share API.

---

## 🎨 Visi & Estetika Premium
Menghadirkan sensasi fisik kartu metalik ke dalam ruang digital dengan detail visual yang tinggi.

### 1. Visual Architecture
- **Komponen**: `@/app/card/page.tsx`
- **Design Elements**:
  - **Silver Border Glow**: Efek pijar perak pada tepi kartu menggunakan gradien `neutral-400` ke `neutral-500`.
  - **Metallic Inner Stroke**: Stroke bagian dalam yang memberikan kesan kedalaman fisik.
  - **Glossy Overlay**: Lapisan reflektif transparan untuk mensimulasikan material kaca/plastik premium.
  - **Anti-Copy Overlay**: Lapisan transparan di atas konten untuk mencegah seleksi teks dan klik kanan yang tidak diinginkan.

### 2. Branding Focus
- **Initials Badge**: Blok inisial "IS" dengan kerangka `backdrop-blur-md` dan tipografi tebal.
- **Micro-bio**: Deskripsi singkat peran dan lokasi untuk impresi profesional instan.

---

## 🛠️ Fitur Kunci
1.  **Web Share API**: Tombol berbagi di pojok kanan atas yang memicu aplikasi berbagi bawaan perangkat (Mobile/Desktop).
2.  **QR Code Synthesis**: QR Code dinamis yang mengarah kembali ke URL kartu digital untuk kemudahan pemindaian fisik.
3.  **Click-to-Social**: Ikon media sosial yang interaktif dengan efek skala (`hover:scale-110`) dan transisi warna.
4.  **No-Copy Protocol**: Penonaktifan menu konteks (`onContextMenu`) dan overlay untuk melindungi integritas desain kartu.

---

## ⚙️ Spesifikasi Teknis
- **Libraries**: `qrcode.react` untuk pembuatan QR Code di sisi client.
- **Framer Motion**: Digunakan untuk animasi masuk kartu dengan kurva `ease: [0.16, 1, 0.3, 1]` yang sangat halus (Apple-style smoothness).
- **Responsive Sizing**: Kartu dibatasi pada lebar maksimal `max-w-sm` agar tetap terlihat seperti kartu fisik yang proporsional di layar besar maupun kecil.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Scanning Reliability**: QR Code harus terbaca dengan cepat oleh scanner standar.
- **Share Implementation**: Fitur share harus berfungsi dengan baik pada browser yang mendukung Web Share API.
- **Visual Fidelity**: Efek reflektif dan gradien metalik tidak boleh terlihat pecah atau murahan.
