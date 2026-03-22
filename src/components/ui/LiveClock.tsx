"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function LiveClock() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const interval = setInterval(() => {
      const wibTime = new Date().toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      setTime(`${wibTime} WIB`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-text-secondary bg-surface/30 px-3 py-1.5 rounded-full border border-border/50 select-none">
      <Clock size={12} className="text-primary hidden md:block" />
      <span>{time}</span>
    </div>
  );
}
