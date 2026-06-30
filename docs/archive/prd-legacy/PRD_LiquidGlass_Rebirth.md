# PRD: Abelink Portofolio - Liquid Glass & Real-Life Rebirth
**Status**: Draft / Planning Mode
**Version**: 2026.05.15
**Owner**: Abelion Lavv

## 1. Visi & Tujuan
Mengubah portofolio dari "AI-Generated Template" menjadi "Personal Agentic Interface". Menghapus kesan kaku dan menggantinya dengan identitas visual **Liquid Glass (Apple HIG 2025/2026)** serta narasi operasional manusia nyata (Abelink).

## 2. Core Identity (The Operator)
*   **Persona**: "Hardware-Conscious Agentic Systems Engineer".
*   **Vibe**: Terse, teknis, transparan terhadap kendala (RAM, HDD, Battery), dan fokus pada efisiensi (RTK Token logic).
*   **Visual Standard**: Apple Human Interface Guidelines (HIG). Fokus pada:
    *   Continuous Corners (Squircles).
    *   Hierarchical Materials (Ultra-thin to Thick blurs).
    *   Semantic Vibrancy (Opacity-based colors).

## 3. High-Architecture Planning

### A. Visual Layer (Liquid Glass Engine)
*   **Token Radius**: 
    *   Outer: `48px` (Main Containers).
    *   Inner: `32px` (Cards/Widgets).
    *   Action: `22px` (Buttons).
*   **Material Specs**:
    *   Blur: `40px` (Thick), `20px` (Regular).
    *   Saturation: `180%`.
    *   Contrast: `125%`.
*   **Typography**: SF Pro Display (System Stack) with `tracking-tight`.

### B. Functional Layer (Real-Life Proof)
*   **System Pulse Widget**: Integrasi status real-time (Location: Surabaya, Battery: 60% threshold, Current Task: via n8n/Supabase).
*   **Hardware Disclosure**: Section khusus spesifikasi infra (Oracle ARM, Isaf/Data HDD storage).
*   **Iteration Logs**: Mengganti deskripsi proyek statis dengan timeline perbaikan diri (V0.1 -> V1.0).

## 4. Roadmap Implementasi

### Phase 1: Foundations (Immediate)
1.  **CSS Tokens Update**: Injeksi variabel Liquid Glass ke `globals.css`.
2.  **Typography**: Migrasi ke SF Pro system stack.
3.  **Global Radius**: Overhaul `rounded` values di seluruh komponen.

### Phase 2: Hero & Identity
1.  **Hero Copy Overhaul**: Hapus AI-fluff ("Builder. Learner"). Gunakan narasi teknis Abelink.
2.  **Floating Island Nav**: Refactor navigation bar menjadi Apple-style dock.

### Phase 3: Dynamic Data (Real-Life)
1.  **Supabase Bridge**: Setup status tracker untuk Surabaya Time & Battery.
2.  **Dashboard Refactor**: Implementasi "ZStack" depth pattern.

---
*Document created by Hermes Agent based on session May 15, 2026.*
