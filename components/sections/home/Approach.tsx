"use client";

import { useRef, useState } from "react";
import { approachLayers } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";
import { LayerGlyph } from "./LayerGlyph";

/**
 * "Read the market" — sticky title + large visual on the left, the five layers
 * on the right. The active layer lights up as it crosses the viewport centre
 * and the visual cross-fades to match. Natural scrolling, no pinning.
 */
export function Approach() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const items = list.current?.querySelectorAll<HTMLElement>("[data-layer]");
      items?.forEach((el, i) =>
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (self) => self.isActive && setActive(i) }),
      );
    },
    { scope: list },
  );

  return (
    <MotionSection className="relative py-12 md:py-28" aria-label="How LiquidityX approaches the market">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionTitle eyebrow="Our approach" title={["Context before", "every decision."]} accentLine={1} size="md" />
          <div className="relative mt-10 hidden aspect-[5/3] overflow-hidden rounded-[22px] border border-white/[0.08] bg-[radial-gradient(100%_80%_at_50%_100%,rgba(82,120,255,0.18),transparent_60%),#0a0a0b] p-8 lg:block">
            {approachLayers.map((l, i) => (
              <div key={l.id} className={cn("absolute inset-8 transition-all duration-700 ease-[var(--ease-expo)]", i === active ? "scale-100 opacity-100 blur-0" : "scale-95 opacity-0 blur-md")}>
                <LayerGlyph id={l.id} className="h-full w-full" />
              </div>
            ))}
            <span className="absolute bottom-4 right-5 text-[11px] text-smoke">Illustrative</span>
          </div>
        </div>

        <ol ref={list} className="space-y-3">
          {approachLayers.map((l, i) => (
            <li
              key={l.id}
              data-layer
              className={cn(
                "rounded-[22px] border p-6 transition-all duration-700 ease-[var(--ease-expo)] sm:p-8",
                i === active ? "border-gold-500/40 bg-gold-500/[0.06] shadow-[0_20px_60px_-30px_rgba(82,120,255,0.6)]" : "border-white/[0.07] bg-white/[0.02]",
              )}
            >
              <div className="flex items-start gap-5">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full border text-sm font-bold transition-colors duration-500",
                    i === active ? "border-gold-400 bg-gold-500 text-white" : "border-white/15 text-mist",
                  )}
                >
                  {l.index}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{l.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{l.line}</p>
                  <LayerGlyph id={l.id} className="mt-5 w-full max-w-xs lg:hidden" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </MotionSection>
  );
}
