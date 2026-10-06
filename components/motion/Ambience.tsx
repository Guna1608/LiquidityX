"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

/** Thin orange reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!bar.current) return;
    gsap.set(bar.current, { scaleX: 0 });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
    });
  });
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[90] h-[2px]">
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-[0_0_12px_rgba(255,122,26,0.9)]" />
    </div>
  );
}

/** Soft warm spotlight that trails the cursor (desktop, motion-safe only). */
export function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      el.style.opacity = "1";
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const leave = () => void (el.style.opacity = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] -ml-[260px] -mt-[260px] size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.09),transparent)] opacity-0 transition-opacity duration-500 max-lg:hidden"
    />
  );
}

/**
 * Giant outlined text band. Drifts continuously; scroll velocity speeds it up
 * and skews it, then it eases back — the "motion" accent between sections.
 */
export function VelocityMarquee({ words }: { words: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const t = track.current;
      if (!t || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const loop = gsap.to(t, { xPercent: -50, ease: "none", duration: 40, repeat: -1 });
      const skewTo = gsap.quickTo(t, "skewX", { duration: 0.5, ease: "power3.out" });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = 1 + Math.min(6, Math.abs(v) / 300);
          gsap.to(loop, {
            timeScale: v < 0 ? -boost : boost,
            duration: 0.25,
            overwrite: true,
            onComplete: () => void gsap.to(loop, { timeScale: 1, duration: 1.2, overwrite: true }),
          });
          skewTo(gsap.utils.clamp(-12, 12, v / -150));
          gsap.delayedCall(0.2, () => skewTo(0));
        },
      });
      return () => {
        loop.kill();
        st.kill();
      };
    },
    { scope: root },
  );

  const row = [...words, ...words];
  return (
    <div ref={root} aria-hidden className="relative overflow-hidden border-y border-white/[0.06] py-6 sm:py-8">
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span
                  className={
                    i % 2
                      ? "px-6 text-[clamp(2.6rem,7vw,6rem)] font-black leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.2px_rgba(255,255,255,0.28)]"
                      : "px-6 text-[clamp(2.6rem,7vw,6rem)] font-black leading-none tracking-[-0.04em] text-gold"
                  }
                >
                  {w}
                </span>
                <span className="size-3 rotate-45 rounded-[3px] bg-gold-500 shadow-[0_0_14px_#ff7a1a]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
