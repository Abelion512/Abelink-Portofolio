-- Changelog entry for security hardening & code cleanup
INSERT INTO changelog_entries (version, title, content, date, type)
VALUES (
  '1.0.1',
  'Security Hardening & Code Cleanup',
  E'Perbaikan keamanan dan pembersihan basis kode:\n\n- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy\n- Gitignore diperbarui: .Jules/, .remember/, docs/references/*\n- Menghapus 32 file sampah dari repositori (~8MB)\n- README diperbarui dengan stack terkini\n- Modal pencapaian: tampilan gambar penuh tanpa terpotong',
  '2026-06-30',
  'patch'
);
