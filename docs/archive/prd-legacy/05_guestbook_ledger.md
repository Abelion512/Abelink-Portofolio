# 📒 PRD: Guestbook Ledger (v1.0)

Halaman **Guestbook** adalah ruang interaksi publik di mana pengunjung dapat meninggalkan pesan yang terverifikasi.

---

## 🎨 Visi & Keamanan Interaksi
Ruang ini menggabungkan estetika desain yang bersih dengan sistem keamanan untuk menjaga kualitas konten.

### 1. Header & Konteks
- **Komponen**: `@/app/guestbook/page.tsx`
- **Visual**: Judul besar "The Guestbook" dengan penekanan pada tipografi kursif/italics untuk kesan personal.

### 2. Autentikasi & Anti-Spam
- **Social Login**: Pengguna wajib login via GitHub atau Google menggunakan Supabase Auth sebelum dapat menulis pesan.
- **Cooldown Logic**: Implementasi waktu tunggu 6 detik antar pengiriman pesan untuk mencegah *spamming*.
- **Shield Badge**: Indikator "Authenticated" muncul saat user berhasil login.

---

## 🛠️ Fitur Kunci
1.  **PII Masking**: Fungsi `blurPII` secara otomatis menyembunyikan email dan nomor telepon dari pesan publik untuk menjaga privasi.
2.  **HTML Sanitization**: Pembersihan tag HTML dari pesan untuk mencegah serangan XSS.
3.  **Optimistic UI**: Pesan baru langsung muncul di daftar setelah dikirim tanpa perlu refresh halaman.
4.  **Staggered Animation**: Daftar pesan muncul dengan efek *fade-in* dan *scale* yang halus menggunakan Framer Motion.

---

## ⚙️ Spesifikasi Teknis
- **Data Persistence**: Tabel `guestbook` di Supabase dengan kolom `user_name`, `message`, `user_id`, dan `created_at`.
- **Server Actions/Cache**: Menggunakan `revalidate = 0` pada entri page untuk memastikan data selalu segar (fresh).
- **Internationalization**: Mendukung lokalisasi pesan error dan placeholder melalui `useLangStore`.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Security**: Tidak ada teks mentah (raw HTML) yang ter-render di halaman.
- **Privacy**: Informasi sensitif (email/telepon) harus berhasil disensor sebelum masuk ke database.
- **Performance**: Transisi antara kondisi "Not Signed In" dan "Message Form" harus mulus tanpa *layout shift*.
