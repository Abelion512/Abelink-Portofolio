# Security Review — Data Integrity & Asset Protection

### Summary
Audit keamanan fokus pada integritas data Supabase dan perlindungan hak cipta aset (sertifikat). Konfigurasi RLS (Row Level Security) telah diterapkan untuk mencegah akses tidak sah, dan proteksi UI telah dipasang untuk mempersulit pencurian aset visual.

---

### ✅ Keunggulan (What's Secure)
- **Supabase RLS**: Tabel `creation` telah dikonfigurasi dengan kebijakan RLS yang hanya mengizinkan akses `SELECT` publik untuk data yang ditandai `is_visible = true`.
- **Environment Isolation**: Kunci sensitif `SUPABASE_SERVICE_ROLE_KEY` tetap berada di server/env lokal dan tidak bocor ke klien.
- **Visual Protection**: Modal sertifikat memiliki proteksi `onContextMenu` (klik kanan) dan `draggable={false}` untuk mencegah pengunduhan langsung oleh pengguna umum.
- **Secure Preview Badge**: Penanda visual "Secure Preview" memberikan rasa aman bagi pemilik portofolio.

---

### 🟡 Warning
- **Public URL Disclosure**: Meskipun klik kanan dinonaktifkan, URL gambar mentah masih dapat ditemukan melalui *Network Tab* (DevTools). Ini adalah limitasi umum browser, namun penggunaan *Signed URLs* bisa dipertimbangkan di masa depan.
- **Database Backup**: Pastikan tabel-tabel baru di Supabase masuk dalam skema migrasi lokal untuk pemulihan bencana yang cepat.

---

### 🔵 Suggestion
- **Rate Limiting**: Jika API route digunakan, terapkan limitasi untuk mencegah scraping data secara massal.
- **CSP Headers**: Pastikan Content Security Policy (CSP) membatasi subdomain Supabase agar tidak ada pemuatan skrip dari origin luar yang tidak dikenal.

---

### Priority Fixes
1. Jalankan migrasi `setup_creation_table.sql` untuk mengaktifkan RLS pada tabel baru.
2. Tinjau kembali akses publik pada bucket Storage Supabase (jika sertifikat disimpan di sana).
