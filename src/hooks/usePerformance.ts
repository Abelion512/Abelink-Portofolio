"use client";

import { useState, useEffect } from "react";

export type PerformanceTier = "low" | "mid" | "high";

interface NetworkInformation extends EventTarget {
  readonly effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  readonly saveData: boolean;
}

declare global {
  // Extend Navigator with non-standard connection and deviceMemory properties
  interface Navigator {
    readonly connection?: NetworkInformation;
    readonly deviceMemory?: number;
  }
}

interface PerformanceState {
  tier: PerformanceTier;
  isSlowNetwork: boolean;
  prefersReducedMotion: boolean;
  mounted: boolean;
}

export function usePerformance() {
  const [state, setState] = useState<PerformanceState>({
    tier: "mid",
    isSlowNetwork: false,
    prefersReducedMotion: false,
    mounted: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = navigator.connection;

    const updateAllInfo = () => {
      const isSlow = conn
        ? conn.effectiveType === "2g" ||
          conn.effectiveType === "3g" ||
          conn.saveData
        : false;
      const motion = mediaQuery.matches;

      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      let newTier: PerformanceTier = "mid";

      if (cores <= 2 || memory <= 2) newTier = "low";
      else if (cores >= 8 && memory >= 8) newTier = "high";

      setState({
        mounted: true,
        isSlowNetwork: isSlow,
        prefersReducedMotion: motion,
        tier: newTier,
      });
    };

    updateAllInfo();
    mediaQuery.addEventListener("change", updateAllInfo);
    if (conn) conn.addEventListener("change", updateAllInfo);

    return () => {
      mediaQuery.removeEventListener("change", updateAllInfo);
      if (conn) conn.removeEventListener("change", updateAllInfo);
    };
  }, []);

  const lowPowerMode =
    state.mounted && (state.isSlowNetwork || state.tier === "low");

  return {
    ...state,
    lowPowerMode,
  };
}
