-- Changelog with compact business language + markdown content
DELETE FROM public.changelog_entries;

INSERT INTO public.changelog_entries (version, title, content, date, type) VALUES
('v1.1.0', 'Integrasi AI Multi-Provider',
  'AI chatbot kini mendukung berbagai penyedia **OpenAI**, **OpenRouter**, **Groq**, dan **Gemini**.\n\nCukup ubah 3 variabel di file `.env`:\n- `AI_BASE_URL`\n- `AI_API_KEY`\n- `AI_MODEL`',
  '2026-06-28', 'minor'),

('v1.0.2', 'Perbaikan Sinkronisasi Data',
  'Memperbaiki error pada **guestbook**, **tampilan proyek**, dan **galeri kreasi**.\n\nData kini konsisten di semua halaman tanpa perlu reload.',
  '2026-06-25', 'patch'),

('v1.0.1', 'Keamanan & Performa',
  'Kontrol akses data **diperketat**. Halaman dimuat **lebih cepat**. Animasi **lebih halus**.',
  '2026-06-29', 'patch'),

('v1.0.0', 'Peluncuran Portofolio Baru',
  'Desain ulang total dengan **teknologi terbaru**.\n\n**Fitur baru:**\n- Asisten AI **cerdas**\n- Dashboard **langsung**\n- Kartu nama **digital**\n- Buku tamu dengan **login sosial**',
  '2026-06-30', 'major')
ON CONFLICT DO NOTHING;
