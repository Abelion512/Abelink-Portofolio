"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Command as CmdIcon, ChevronLeft } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import { useCommandStore } from "@/store/useCommandStore";
import { NAV_ITEMS } from "@/constants/nav";
import LiveClock from "@/components/ui/LiveClock";

const spring = { type: "spring" as const, damping: 28, stiffness: 300 };
const fadeSlide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { setIsOpen: setCommandOpen } = useCommandStore();
  const { lang, setLang, t } = useLangStore();

  const handleBack = () => {
    const isInternal = document.referrer.includes(window.location.origin);
    if (isInternal && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const mainNav = NAV_ITEMS.filter((item) =>
    ["/", "/projects", "/achievements", "/stack", "/about"].includes(item.href),
  );

  const currentPage = NAV_ITEMS.find((item) => item.href === pathname);
  // Fallback label for routes not in NAV_ITEMS
  const pageLabel = currentPage
    ? t(currentPage.label)
    : pathname.startsWith("/projects/") ? "Case Study"
    : pathname === "/card" ? "Digital Card"
    : pathname === "/creation" ? "Creation"
    : pathname === "/changelog" ? "Changelog"
    : pathname === "/uses" ? "Uses"
    : pathname === "/guestbook" ? "Guestbook"
    : pathname === "/contact" ? "Contact"
    : pathname === "/chat" ? "AI Chat"
    : pathname === "/dashboard" ? "Dashboard"
    : "";
  const isHome = pathname === "/";

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-1200 w-full px-4 md:px-6 py-6 h-auto pointer-events-none flex items-start justify-center gap-3"
    >
      {/* 1. Leading Pill Group */}
      <motion.div
        layout
        transition={spring}
        className="flex items-center h-12 p-1.5 rounded-2xl glass-liquid pointer-events-auto border-white/10 shadow-lg shadow-black/20"
      >
        <AnimatePresence mode="wait">
          {!isHome ? (
            <motion.div
              key="page-context"
              {...fadeSlide}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-full border border-white/5">
                <button
                  onClick={handleBack}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-text-secondary transition-all hover:bg-white/10 hover:text-text-primary active-haptic-sm"
                  aria-label="Go back"
                >
                  <ChevronLeft size={18} />
                </button>
                <Link
                  href="/"
                  className="hidden sm:flex items-center gap-2 group px-2"
                >
                  <div className="relative w-7 h-7 rounded-lg bg-linear-to-br from-primary to-blue-600 flex items-center justify-center overflow-hidden shadow-lg">
                    <span className="text-[10px] font-black text-white tracking-tighter">
                      S
                    </span>
                  </div>
                  <span className="text-xs font-display font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                    Salav
                  </span>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="brand-context"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 px-1 glass-liquid rounded-full border border-white/5 shadow-2xl h-12"
            >
              <Link
                href="/"
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 active-haptic transition-all group"
              >
                <span className="font-display font-bold text-lg tracking-tight text-text-primary group-hover:text-primary">
                  Salav
                </span>
              </Link>
              <div className="hidden md:block h-4 w-px bg-white/10 mx-1" />
              <div className="hidden md:block opacity-60 scale-90">
                <LiveClock />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. Center Pill */}
      <motion.div
        layout
        transition={spring}
        className="flex items-center h-12 p-1.5 rounded-2xl glass-liquid pointer-events-auto border-white/10 shadow-lg shadow-black/20"
      >
        <AnimatePresence mode="wait">
          {!isHome && pageLabel ? (
            <motion.div
              key={pageLabel}
              {...fadeSlide}
              transition={{ duration: 0.25 }}
              className="px-6 flex items-center"
            >
              <span className="font-display font-bold text-sm tracking-widest text-primary uppercase">
                {pageLabel}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="nav-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-0.5"
            >
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all duration-300 active-haptic-sm flex items-center gap-2 ${
                      isActive
                        ? "text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    } ${item.href === "/about" ? "hidden lg:flex" : "flex"}`}
                  >
                    {item.icon && (
                      <span className="md:hidden">
                        <item.icon size={16} />
                      </span>
                    )}
                    <span className="hidden md:block">{t(item.label)}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-dot"
                        transition={spring}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. Trailing Pill */}
      <motion.div
        layout
        transition={spring}
        className="flex items-center h-12 px-2 rounded-2xl glass-liquid pointer-events-auto border-white/10 shadow-lg shadow-black/20"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 h-9 md:min-w-35 rounded-xl hover:bg-white/5 text-text-secondary/60 hover:text-text-primary active-haptic-sm transition-all"
            title="Search (⌘K)"
          >
            <CmdIcon size={16} />
            <span className="hidden md:block text-[12px] font-medium grow text-left">
              {t("search.placeholder") || "Search"}
            </span>
            <kbd className="hidden md:block text-[10px] opacity-40 font-mono bg-white/10 px-1.5 py-0.5 rounded border border-white/10 leading-none">
              ⌘K
            </kbd>
          </button>

          <div className="w-px h-4 bg-white/10 hidden md:block" />

          <div className="flex items-center h-9">
            {(["en", "id"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 h-full flex items-center justify-center text-[10px] font-bold uppercase transition-all rounded-lg active-haptic-sm ${
                  lang === l
                    ? "text-primary scale-110"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
