"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, Search } from "lucide-react";
import { useCommandStore } from "@/store/useCommandStore";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { setIsOpen: setCommandOpen } = useCommandStore();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 lg:hidden">
      <nav className="flex items-center gap-1 p-1.5 glass-liquid rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Home */}
        <Link
          href="/"
          className={`relative p-3.5 rounded-full transition-all active:scale-95 ${
            pathname === "/"
              ? "text-primary bg-primary/10 border border-primary/20"
              : "text-text-secondary"
          }`}
        >
          <Home size={22} strokeWidth={pathname === "/" ? 2.5 : 2} />
        </Link>

        {/* Projects */}
        <Link
          href="/projects"
          className={`relative p-3.5 rounded-full transition-all active:scale-95 ${
            pathname === "/projects"
              ? "text-primary bg-primary/10 border border-primary/20"
              : "text-text-secondary"
          }`}
        >
          <FolderOpen
            size={22}
            strokeWidth={pathname === "/projects" ? 2.5 : 2}
          />
        </Link>

        {/* Search (⌘K) */}
        <button
          onClick={() => setCommandOpen(true)}
          className="relative p-3.5 rounded-full text-text-secondary active:scale-95 hover:text-text-primary"
        >
          <Search size={22} strokeWidth={2} />
        </button>
      </nav>
    </div>
  );
}
