"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Device capability tiers drive 3D complexity:
 *  - high: desktop with a capable GPU → full scenes
 *  - mid:  tablets / phones / small laptops → simplified scenes, fewer particles
 *  - low:  no WebGL, reduced motion, save-data, very weak hardware → CSS fallbacks
 */
export type Tier = "high" | "mid" | "low";

export type DeviceInfo = {
  ready: boolean;
  tier: Tier;
  isMobile: boolean;
  isTouch: boolean;
  reducedMotion: boolean;
  webgl: boolean;
};

const initial: DeviceInfo = { ready: false, tier: "low", isMobile: false, isTouch: false, reducedMotion: false, webgl: false };

const DeviceContext = createContext<DeviceInfo>(initial);

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function detect(): DeviceInfo {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const isMobile = window.innerWidth < 768;
  const webgl = hasWebGL();
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const weak = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2 || nav.connection?.saveData === true;

  let tier: Tier = "high";
  if (!webgl || reducedMotion || weak) tier = "low";
  else if (isTouch || window.innerWidth < 1100) tier = "mid";

  return { ready: true, tier, isMobile, isTouch, reducedMotion, webgl };
}

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [info, setInfo] = useState<DeviceInfo>(initial);

  useEffect(() => {
    const update = () => setInfo(detect());
    update();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(update, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <DeviceContext.Provider value={info}>{children}</DeviceContext.Provider>;
}

export const useDevice = () => useContext(DeviceContext);

/** Scale a count by device tier (e.g. particles). */
export function byTier<T>(tier: Tier, values: { high: T; mid: T; low: T }) {
  return values[tier];
}
