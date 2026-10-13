"use client";

import { useRef } from "react";
import { curriculum } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

/**
 * Sticky stacking cards — each module pins near the top and the previous
 * one scales back and dims as the next slides over it.
 */
export function CurriculumStack({ index, showHeading = true }: { index?: string; showHeading?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root.current);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.firstElementChild, {
          scale: 0.92,
          filter: "brightness(0.35)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <MotionSection className="relative py-12 md:py-28" aria-label="Curriculum">
      <div className="container-x">
        {showHeading && (
          <SectionTitle
            align="center"
            index={index}
            eyebrow="Curriculum"
            title={["Seven modules.", "One structured path."]}
            accentLine={1}
            intro={<p>Seven curriculum modules, covered across the 15 teaching days — from how markets work to strategy and risk, in the order you need to learn them.</p>}
          />
        )}
        <div ref={root} className="mx-auto mt-9 md:mt-14 max-w-4xl">
          {curriculum.map((m, i) => (
            <div key={m.index} data-stack-card className="sticky pb-4" style={{ top: `calc(6.5rem + ${i * 14}px)` }}>
              <article className="relative origin-top overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d0f] p-7 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] sm:p-10">
                <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.22),transparent)]" />
                <div className="relative grid gap-8 sm:grid-cols-[auto_1fr]">
                  <span className="text-6xl font-black leading-none tracking-[-0.05em] text-gold sm:text-7xl">{m.index}</span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{m.title}</h3>
                    <p className="mt-2 text-mist">{m.summary}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
