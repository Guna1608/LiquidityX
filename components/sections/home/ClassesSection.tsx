"use client";

import { useRef } from "react";
import { classSessions } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { BatchBanner } from "@/components/classes/BatchBanner";
import { ClassCard } from "@/components/classes/ClassCard";
import { gsap, useGSAP } from "@/lib/motion/gsap";

/**
 * Upcoming classes. Desktop: the section pins and the class cards travel
 * horizontally with scroll. Mobile / reduced motion: native swipe row.
 */
export function ClassesSection() {
  const pinWrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current;
        const w = pinWrap.current;
        if (!t || !w) return;
        const distance = () => t.scrollWidth - w.clientWidth;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: w, start: "center center", end: () => `+=${distance()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        // each card swings in from a slight 3D angle as it enters the frame
        gsap.utils.toArray<HTMLElement>("[data-class-card]", t).forEach((card) =>
          gsap.fromTo(
            card,
            { rotateY: -18, scale: 0.92, opacity: 0.5 },
            { rotateY: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "left 65%", scrub: true } },
          ),
        );
      });
      return () => mm.revert();
    },
    { scope: pinWrap },
  );

  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Upcoming classes">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle eyebrow="Upcoming classes" title={["Six live classes.", "One complete batch."]} accentLine={1} />
          <div data-reveal="fade">
            <Button href="/classes" variant="ghost" icon={<ArrowRight size={16} />}>
              View all classes
            </Button>
          </div>
        </div>
        <div className="mt-12" data-reveal="rise">
          <BatchBanner />
        </div>
      </div>

      <div ref={pinWrap} className="relative mt-6 overflow-hidden lg:flex lg:h-[min(36rem,80vh)] lg:items-center">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pb-4 [perspective:1400px] lg:w-max lg:overflow-visible lg:pb-0 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
        >
          {classSessions.map((c) => (
            <div key={c.slug} data-class-card className="w-[82vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem]">
              <ClassCard c={c} />
            </div>
          ))}
          <div className="flex w-[82vw] max-w-[22rem] shrink-0 snap-start flex-col justify-center rounded-[1.25rem] border border-dashed border-white/15 p-8 sm:w-[22rem]">
            <p className="text-2xl font-bold tracking-tight">See the full schedule</p>
            <p className="mt-2 text-mist">Every class, topic and outcome — in order.</p>
            <div className="mt-6">
              <Button href="/classes" icon={<ArrowRight size={16} />}>
                All classes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
