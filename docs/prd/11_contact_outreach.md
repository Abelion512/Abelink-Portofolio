# ✉️ PRD: Contact Outreach (v1.0)

Halaman **Contact** adalah gerbang komunikasi utama untuk kolaborasi, pertanyaan teknis, atau sapaan profesional.

---

## 🎨 Visi & Konektivitas
Menyediakan antarmuka yang ramah, profesional, dan sangat mudah diakses untuk memulai percakapan.

### 1. Contact Methods Grid
- **Komponen**: `@/app/contact/page.tsx`
- **Design Elements**:
  - **Spotlight Interaction**: Setiap kanal kontak menggunakan `SpotlightCard` untuk feedback visual dinamis.
  - **Brand Colors**: Menggunakan warna asli brand (Blue untuk Email, Pink untuk Instagram, Navy untuk LinkedIn) sebagai aksen cahaya.
  - **Elevated Hover**: Kartu bergeser ke atas (`-translate-y-2`) saat di-hover untuk memberikan kesan kedalaman.

### 2. High-Conversion CTA
- **Visual**: Blok besar dengan gradien linier dan ikon `Send` berukuran besar yang transparan di latar belakang.
- **Copywriting**: Pesan persuasif "Ready to start a new project?" untuk mendorong konversi pengunjung menjadi klien/kolaborator.

---

## 🛠️ Fitur Kunci
1.  **Multi-Channel Access**: Integrasi langsung ke Email (mailto), Instagram, LinkedIn, dan GitHub.
2.  **Glossy Styling**: Penggunaan sistem `glass` dan `backdrop-blur` pada seluruh elemen kartu dan CTA.
3.  **Shadow Glow**: Tombol "Send me a message" memiliki efek bayangan bercahaya (`glow`) saat di-hover.
4.  **Entrance Animation**: Sinkronisasi delay konten dengan `onAnimationComplete` dari judul halaman.

---

## ⚙️ Spesifikasi Teknis
- **Icon Library**: Lucid-react (Mail, Instagram, Linkedin, Github, Send).
- **Responsive Grid**: Adaptasi layout dari 4 kolom (Lg) menjadi 2 kolom (Md) dan 1 kolom (Mobile).
- **Z-Index Management**: Layering yang tepat untuk memastikan ikon dekoratif di latar belakang tidak menghalangi interaksi tombol utama.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Clickability**: Seluruh area kartu harus dapat diklik (mengarah ke tautan terkait).
- **Responsiveness**: Transisi grid harus mulus pada berbagai ukuran layar perangkat selular.
- **Visual Balance**: Keseimbangan antara teks judul yang besar dan grid ikon di bawahnya.
