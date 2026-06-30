# 💓 PRD: Dashboard Pulse (v1.0)

Halaman **Dashboard** (Abelink Pulse) adalah pusat monitoring sistem yang menampilkan aktivitas terbaru dan status real-time dari "mesin" portofolio.

---

## 🎨 Visi & Interaktivitas Live
Halaman ini dirancang untuk memberikan kesan sistem yang "hidup" dan terus berdetak melalui sinkronisasi data real-time.

### 1. Header & System Status
- **Komponen**: `@/app/dashboard/page.tsx`
- **Visual**: 
  - **Node Status Indicator**: Menampilkan jumlah node aktif (simulasi) untuk estetika "Network Core".
  - **Text Gradient**: Penggunaan `.text-gradient` pada judul "Pulse".

### 2. Status Bento Grid (Real-time Sync)
Mengkonsumsi data dari tabel `settings` Supabase:
- **Availability**: Badge status ketersediaan kolaborasi (`open_to_work`).
- **Building**: Menampilkan judul proyek yang sedang dikembangkan secara aktif.
- **Now Playing**: Menampilkan trek yang sedang diputar (integrasi Spotify placeholder/manual).

---

## 🛠️ Fitur Kunci
1.  **Recent Activity Feed**: Menampilkan gabungan (merge) data terbaru dari Proyek dan Achievement.
2.  **Date Sorting**: Logika pengurutan otomatis berdasarkan waktu rilis (`created_at`).
3.  **System Insights**: Panel informasi yang menampilkan fokus pembelajaran (`currently_learning`) dan pesan sistem.
4.  **Animated Presence**: Stagger animation pada feed item untuk kenyamanan visual saat data termuat.

---

## ⚙️ Spesifikasi Teknis
- **Data Fetching**: 
  - Menggunakan `Promise.all` untuk mengambil data `settings`, `projects`, dan `achievements` secara paralel.
  - State management lokal menggunakan React `useState`.
- **Skeleton/Loading**: Implementasi spinner kustom "Syncing System..." untuk transisi data.
- **Data Shape**: Interface `Setting` dan `FeedItem` untuk type-safety pada TypeScript.
- **Responsive Layout**: Sidebar Insights berpindah ke bawah pada tampilan mobile (Lg: col-span-5 grid).

---

## 📊 Metrik Kesuksesan (Audit target)
- **Data Consistency**: Data di Dashboard harus sinkron 1:1 dengan halaman Proyek dan Achievement.
- **Sync Speed**: Total waktu fetch data paralel harus < 500ms (optimasi query Supabase diperlukan).
- **Zero-State Handling**: Tampilan yang tetap rapi meskipun tidak ada aktivitas baru terdeteksi.
