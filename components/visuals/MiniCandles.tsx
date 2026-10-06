"use client";

import { useMemo } from "react";
import { useInView, seeded, r2 } from "@/lib/useInView";
import { cn } from "@/lib/cn";

/** Small candlestick sparkline whose candles rise in sequence when scrolled into view. Illustrative. */
export function MiniCandles({ seed = 3, count = 22, className }: { seed?: number; count?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>("0px", true);
  const candles = useMemo(() => {
    const rand = seeded(seed);
    let p = 50;
    return Array.from({ length: count }, () => {
      const o = p;
      const c = p + (rand() - 0.46) * 14;
      p = c;
      return { o, c, h: Math.max(o, c) + rand() * 6, l: Math.min(o, c) - rand() * 6 };
    });
  }, [seed, count]);
  const min = Math.min(...candles.map((c) => c.l));
  const max = Math.max(...candles.map((c) => c.h));
  const y = (v: number) => r2(100 - ((v - min) / (max - min)) * 100);

  return (
    <div ref={ref} className={cn("flex items-stretch gap-[3px]", className)} aria-hidden>
      {candles.map((k, i) => {
        const up = k.c >= k.o;
        return (
          <div key={i} className="relative flex-1">
            <div
              className={cn("absolute left-1/2 w-px -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-expo)]", up ? "bg-up/70" : "bg-down/70")}
              style={{ top: `${y(k.h)}%`, bottom: `${100 - y(k.l)}%`, transform: `translateX(-50%) scaleY(${inView ? 1 : 0})`, transitionDelay: `${i * 35}ms` }}
            />
            <div
              className={cn("absolute inset-x-0 rounded-[2px] transition-transform duration-700 ease-[var(--ease-expo)]", up ? "bg-up" : "bg-down")}
              style={{
                top: `${y(Math.max(k.o, k.c))}%`,
                bottom: `${100 - y(Math.min(k.o, k.c))}%`,
                minHeight: 2,
                transform: `scaleY(${inView ? 1 : 0})`,
                transitionDelay: `${i * 35 + 80}ms`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
