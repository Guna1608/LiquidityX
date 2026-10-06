"use client";

import { useRef, useState, type RefObject } from "react";
import { ScrollTrigger, useGSAP } from "./gsap";

/**
 * Scroll progress (0..1) of a tall section whose inner stage is CSS-sticky.
 * Returns a ref (read every frame by 3D scenes, no re-renders) and the
 * current step index (re-renders only when the step changes).
 */
export function useStickyProgress(target: RefObject<HTMLElement | null>, steps: number, enabled = true) {
  const progress = useRef(0);
  const [index, setIndex] = useState(0);
  const last = useRef(0);

  useGSAP(
    () => {
      if (!enabled || !target.current) return;
      const st = ScrollTrigger.create({
        trigger: target.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progress.current = self.progress;
          const i = Math.min(steps - 1, Math.round(self.progress * (steps - 1)));
          if (i !== last.current) {
            last.current = i;
            setIndex(i);
          }
        },
      });
      return () => st.kill();
    },
    { dependencies: [enabled, steps] },
  );

  return { progress, index };
}

/** Scroll the page so a sticky section shows step `i`. */
export function scrollToStep(section: HTMLElement, i: number, steps: number, lenis?: { scrollTo: (y: number, o?: object) => void } | null) {
  const top = section.getBoundingClientRect().top + window.scrollY;
  const range = section.offsetHeight - window.innerHeight;
  const y = top + (range * i) / Math.max(1, steps - 1);
  if (lenis) lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
