-- Compact business-language changelog
DELETE FROM public.changelog_entries;

INSERT INTO public.changelog_entries (version, title, content, date, type) VALUES
('v1.1.0', 'Integrasi AI Multi-Provider',
  'AI chatbot kini mendukung berbagai penyedia seperti OpenAI, OpenRouter, Groq, dan Gemini. Konfigurasi cukup ubah file environment.',
  '2026-06-28', 'minor'),

('v1.0.2', 'Perbaikan Sinkronisasi Data',
  'Memperbaiki error pada guestbook, tampilan proyek, dan galeri kreasi. Data kini konsisten di semua halaman.',
  '2026-06-25', 'patch'),

('v1.0.1', 'Keamanan & Performa',
  'Kontrol akses data diperketat. Halaman dimuat lebih cepat. Animasi lebih halus.',
  '2026-06-29', 'patch'),

('v1.0.0', 'Peluncuran Portofolio Baru',
  'Desain ulang total. Fitur baru: asisten AI, dashboard langsung, kartu nama digital, dan buku tamu dengan login sosial.',
  '2026-06-30', 'major')
ON CONFLICT DO NOTHING;
