"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@/lib/motion/gsap";
import { parallax } from "@/lib/motion/presets";

/** Scroll-linked vertical drift. Use sparingly on imagery and large type. */
export function Parallax({ children, amount = 90, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (ref.current) parallax(ref.current, amount);
    },
    { scope: ref, dependencies: [amount] },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
