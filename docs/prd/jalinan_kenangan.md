# PRD: Jalinan Kenangan (The Archive)

## 🌿 Filosofi & Visi
Mengubah fokus dari "rindu/masa lalu" menjadi "Energi Positif & Inspirasi". Ruang ini adalah arsip perjalanan hidup yang memberikan kekuatan bagi siapa pun yang menemukannya.

### Fitur Utama:
1.  **Gembok Digital (The Positivity Lock)**:
    - Pengunjung dapat menulis pesan positif atau doa.
    - Setelah dikirim, pesan "dikunci" (tidak bisa diubah) dan kunci dibuang secara visual.
    - Melambangkan melepaskan beban dan menyimpan kebaikan.
2.  **Saksi Kehadiran (Visitor Certificate)**:
    - Menghitung pengunjung unik (Saksi ke-n).
    - Logika deteksi IP di sisi server (Supabase Edge Function).
    - Desain sertifikat premium yang bisa di-share.
3.  **Bento Grid Media (The Showcase)**:
    - **TikTok**: Video pilihan dengan credit username yang jelas.
    - **Fancams**: Fokus pada IVE dan Heart2Hearts (H2H) per member.
    - **Musik**: Real-time stats dari Last.fm (`abelionz`).
4.  **Serenity Mode (Time-aware UI)**:
    - Tema latar belakang berubah dinamis mengikuti waktu lokal pengunjung.
    - Suasana tenang dan damai untuk membaca arsip.

## 🔒 Keamanan & Akses
- **Hidden Entrance**: Klik foto profil 5x untuk membuka akses ke `/serenity`.
- **Owner Bypass**: URL `/serenity?owner=true` memberikan hak akses penuh dan menyimpan flag di `LocalStorage`.
- **Security Check**: Jika URL bocor, sistem akan meminta "Secret Handshake" (kombinasi klik/gestur rahasia) yang bisa dikonfigurasi via Supabase.

## 🛠️ Integrasi Teknis
- **Runtime**: Bun (Wajib).
- **Frontend**: Next.js 15+ (App Router).
- **Backend**: Supabase (Database + Edge Functions for Telegram Webhook).
- **External API**: 
    - Last.fm (Music Tracking).
    - GitHub (Auto Changelog via `use cache`).
- **Sync**: Telegram Bot -> Supabase Edge Functions (24/7 Sync).

## 📊 Data Mapping (Machine Learning Style)
- **Phase 1: Collection**: Data mentah masuk via Telegram/n8n.
- **Phase 2: Cleaning**: Filter manual/otomatis oleh Abelion.
- **Phase 3: Evaluation**: Hanya data berkualitas yang tampil di `/serenity`.

## 📂 Migration Notes
- Dokumen lama di `@/docs` dipindahkan ke `/docs/archive/`.
- File `.env.local` harus mencakup `LASTFM_API_KEY` dan `TELEGRAM_BOT_TOKEN`.
