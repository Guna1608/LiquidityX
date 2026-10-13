"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";
import { cn } from "@/lib/cn";

/**
 * Device-style frame that starts tilted back in 3D and straightens as it
 * scrolls into view (scrubbed to scroll position).
 */
export function ScrollTilt({ children, className, from = 28 }: { children: ReactNode; className?: string; from?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!root.current || !card.current || prefersReducedMotion()) return;
      gsap.fromTo(
        card.current,
        { rotateX: from, scale: 0.9, y: 40 },
        { rotateX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 15%", scrub: 0.8 } },
      );
    },
    { scope: root },
  );
  return (
    <div ref={root} className={cn("[perspective:1400px]", className)}>
      <div ref={card} className="origin-top will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-2 shadow-[0_0_80px_-20px_rgba(255,122,26,0.35)] sm:p-3">{children}</div>
      </div>
    </div>
  );
}
