"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";
import { cn } from "@/lib/cn";

/**
 * Cinematic word reveal: each word rises out of a soft blur, staggered.
 * The full sentence is exposed to assistive tech once; split spans are
 * presentational only.
 */
type Props = {
  as?: ElementType;
  /** Each array item renders as its own line. */
  lines: (string | ReactNode)[];
  mode?: "lines" | "words";
  start?: "scroll" | "mount";
  delay?: number;
  stagger?: number;
  className?: string;
  /** Index of a line that receives `accentClassName`. */
  accentLine?: number;
  accentClassName?: string;
  srText?: string;
};

export function TextReveal({
  as = "h2",
  lines,
  mode = "words",
  start = "scroll",
  delay = 0,
  stagger,
  className,
  accentLine,
  accentClassName = "text-gold",
  srText,
}: Props) {
  const Tag = as as "h2";
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inners = el.querySelectorAll<HTMLElement>(".split-inner");
      if (prefersReducedMotion()) {
        gsap.set(inners, { opacity: 1, filter: "none", yPercent: 0 });
        return;
      }
      const vars: gsap.TweenVars = {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: stagger ?? (mode === "words" ? 0.07 : 0.14),
        delay,
      };
      gsap.set(inners, { opacity: 0, yPercent: 35, filter: "blur(14px)" });
      if (start === "mount") gsap.to(inners, vars);
      else gsap.to(inners, { ...vars, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    },
    { scope: ref },
  );

  const plain = srText ?? lines.filter((l): l is string => typeof l === "string").join(" ");

  return (
    <Tag ref={ref} data-split className={className}>
      {plain && <span className="sr-only">{plain}</span>}
      <span aria-hidden={plain ? true : undefined}>
        {lines.map((line, i) => {
          const accent = i === accentLine ? accentClassName : undefined;
          if (mode === "lines" || typeof line !== "string")
            return (
              <span key={i} className="split-line">
                <span className={cn("split-inner", accent)}>{line}</span>
              </span>
            );
          const words = line.split(" ");
          return (
            <span key={i} className="split-line">
              {words.map((w, j) => (
                <span key={j} className="split-word">
                  <span className={cn("split-inner", accent)}>{w}</span>
                  {j < words.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
