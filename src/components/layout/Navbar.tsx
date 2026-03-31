"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command as CmdIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useLangStore } from "@/store/languageStore";
import { NAV_ITEMS } from "@/constants/nav";
import LiveClock from "@/components/ui/LiveClock";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { lang, setLang, t } = useLangStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter main nav items for desktop (Primary items)
  const mainNav = NAV_ITEMS.slice(0, 5);

  const isProjectDetail = pathname?.startsWith("/projects/") && pathname !== "/projects";

  if (isProjectDetail) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-300 ${
        scrolled
          ? "bg-base/90 backdrop-blur-xl border-b border-border/50 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      {/* Left: Branding & Clock */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex flex-col group py-2">
          <span className="font-display font-bold text-2xl tracking-tight text-text-primary group-hover:text-primary transition-colors">
            Ihsanuddin Salav
          </span>
        </Link>
        <div className="hidden md:block">
          <LiveClock />
        </div>
      </div>

      {/* Center: Desktop Nav */}
      <div className="hidden lg:flex items-center gap-1 bg-surface/60 backdrop-blur-md p-1.5 rounded-2xl border border-border/60 shadow-lg">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              pathname === item.href
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "text-text-primary/80 hover:text-text-primary hover:bg-surface/80"
            }`}
          >
            {mounted
              ? t(item.label)
              : item.label.includes("home")
                ? "Home"
                : item.label.split(".").pop()}
          </Link>
        ))}

        {/* Command Palette Trigger Icon */}
        <button
          onClick={() =>
            window.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            )
          }
          className="p-2 ml-1 text-text-secondary hover:text-primary transition-colors"
          title="Search (⌘K)"
        >
          <CmdIcon size={18} />
        </button>
      </div>

      {/* Right: Language & About */}
      <div className="hidden lg:flex items-center justify-end gap-6 min-w-50">
        {mounted && (
          <div className="flex items-center border border-border/50 rounded-full overflow-hidden bg-surface/40">
            {(["en", "id"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase transition-all ${
                  lang === l
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        <Link
          href="/about"
          className="text-xs font-mono text-primary hover:underline hover:text-primary-light transition-colors whitespace-nowrap"
        >
          {mounted ? t("nav.about") : "About"}
        </Link>
      </div>

      {/* Mobile Header (Minimal) */}
      <div className="flex items-center gap-3 lg:hidden">
        {mounted && (
          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            className="flex items-center justify-center p-2 text-text-secondary hover:text-primary rounded-full bg-surface/40 border border-border/50"
          >
            <span className="text-xs font-mono font-bold uppercase">
              {lang}
            </span>
          </button>
        )}
        <button
          onClick={() =>
            window.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            )
          }
          className="p-2 text-text-secondary"
        >
          <CmdIcon size={20} />
        </button>
      </div>
    </motion.nav>
  );
}
