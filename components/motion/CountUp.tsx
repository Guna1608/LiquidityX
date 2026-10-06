"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

/** Number that counts up once when scrolled into view. SSR renders the final value. */
export function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const obj = { v: 0 };
      el.textContent = `0${suffix}`;
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: () => void (el.textContent = `${Math.round(obj.v)}${suffix}`),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
