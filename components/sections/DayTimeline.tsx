"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

/**
 * The 15-day timeline — a single gold line that resolves into fifteen ticks.
 * (Continues the "line" page transition into /mentorship.)
 */
export function DayTimeline({ days = 15 }: { days?: number }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo("[data-tl-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut" })
        .fromTo("[data-tl-tick]", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.6, stagger: 0.04, ease: "expo.out" }, "-=0.8")
        .fromTo("[data-tl-label]", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative pt-10" role="img" aria-label={`${days}-day live mentorship timeline`}>
      <div data-tl-line className="h-px origin-left bg-gradient-to-r from-gold-200 via-gold-400 to-cyan-400 shadow-[0_0_18px_rgba(231,201,131,0.6)]" />
      <div className="absolute inset-x-0 top-10 flex justify-between">
        {Array.from({ length: days }, (_, i) => (
          <span
            key={i}
            data-tl-tick
            className={`block w-px origin-top ${i === 0 || i === days - 1 ? "h-6 bg-gold-200" : "h-3 bg-white/30"}`}
          />
        ))}
      </div>
      <div className="mt-9 flex justify-between text-[12px] font-medium text-mist">
        <span data-tl-label>Day 1</span>
        <span data-tl-label className="hidden sm:inline">Weekday live classes</span>
        <span data-tl-label>Day {days}</span>
      </div>
    </div>
  );
}
