"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/constants/nav";

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === "/";

  // Find the matching nav item for current sub-page
  const currentPage = NAV_ITEMS.find((item) => item.href === pathname);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 lg:hidden">
      <nav className="flex items-center gap-1 p-1.5 glass-liquid rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Home — always */}
        <Link
          href="/"
          aria-label="Home"
          className={`relative p-3.5 rounded-full transition-all active-haptic-sm ${
            isHome
              ? "text-primary bg-primary/10 border border-primary/20"
              : "text-text-secondary"
          }`}
        >
          <Home size={22} strokeWidth={isHome ? 2.5 : 2} />
        </Link>

        {/* Dynamic current page — only on sub-pages, replaces Search */}
        {!isHome && currentPage && (
          <div className="relative p-3.5 rounded-full text-primary bg-primary/10 border border-primary/20 flex items-center gap-2">
            {currentPage.icon && <currentPage.icon size={18} />}
            <span className="text-[10px] font-bold uppercase tracking-wider pr-0.5">
              {currentPage.label.replace("nav.", "")}
            </span>
          </div>
        )}
      </nav>
    </div>
  );
}
