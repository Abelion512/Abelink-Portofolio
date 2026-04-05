# 🤖 PRD: AI Assistant Widget (v1.0)

**AI Assistant (ChatWidget)** adalah asisten virtual berbasis LLM yang tersedia di seluruh halaman untuk membantu pengunjung memahami portofolio lebih dalam.

---

## 🎨 Visi & Interaksi Cerdas
Menghadirkan pendamping digital yang cerdas dengan antarmuka yang ramah dan responsif.

### 1. Floating Interface
- **Komponen**: `@/components/chat/ChatWidget.tsx`
- **Visual**: 
  - **Toggle Button**: Tombol melayang di pojok kanan bawah dengan indikator status "Active" (pulsating dot).
  - **Spring Animation**: Jendela chat terbuka dengan efek pegas (`spring`) dan blur transisi untuk kesan kedalaman.
  - **Glass Container**: Menggunakan `backdrop-blur-xl` dan `bg-surface/30` agar menyatu dengan latar belakang halaman.

### 2. Conversational UI
- **Avatar System**: Pembeda visual antara pesan `user` (primary background) dan `assistant` (surface background dengan ikon Sparkles).
- **Markdown Support**: Mendukung perernderaan teks tebal, daftar, dan blok kode melalui `react-markdown`.
- **Typing Indicator**: Animasi tiga titik memantul (`bounce`) saat AI sedang memproses jawaban.

---

## 🛠️ Fitur Kunci
1.  **Contextual Greeting**: Pesan pembuka otomatis yang disesuaikan dengan bahasa sistem.
2.  **History Management**: Fitur "Clear Chat" untuk menghapus riwayat percakapan secara lokal.
3.  **Auto-Scroll**: Fokus otomatis ke pesan terbaru setiap kali ada pembaruan konten.
4.  **Error Recovery**: Pesan fallback jika koneksi ke API `/api/chat` terputus.

---

## ⚙️ Spesifikasi Teknis
- **Backend Communication**: Menggunakan `fetch` ke route API internal.
- **State Management**: React `useState` untuk menyimpan array `Message` dan status loading.
- **Iconography**: Gabungan ikon Lucid-react (Sparkles, Send, Trash2, X, MessageCircle).
- **Z-Index Positioning**: Ditetapkan pada `z-999` untuk memastikan widget selalu berada di atas elemen konten lainnya.

---

## 📊 Metrik Kesuksesan (Audit target)
- **Response Latency**: UI harus menunjukkan status loading dalam < 100ms setelah pesan dikirim.
- **Memory Integrity**: Riwayat pesan harus tetap terjaga selama sesi browser aktif kecuali dihapus secara manual.
- **Visual Consistency**: Desain gelembung chat harus mengikuti radius sudut `2.5rem` sesuai standar sistem.
