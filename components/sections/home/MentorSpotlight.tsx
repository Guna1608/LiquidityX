import { mentor } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { PortraitFrame } from "@/components/sections/PortraitFrame";
import { GlowOrb } from "@/components/visuals/Glow";

export function MentorSpotlight() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Meet the mentor">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0b0b0c] p-6 sm:p-10 lg:p-14">
          <GlowOrb className="-bottom-40 -left-40 size-[34rem]" intensity={0.35} />
          <div className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal="blur">
              <PortraitFrame className="mx-auto max-w-sm" />
            </div>
            <div>
              <SectionTitle eyebrow={mentor.role} title={["Meet", "Vignesh."]} accentLine={1} size="lg" intro={<p>{mentor.summary}</p>} />
              <dl className="mt-10 grid gap-3 sm:grid-cols-3" data-reveal-group="0.08">
                {[
                  ["Trading experience", mentor.tradingExperience],
                  ["Teaching experience", mentor.teachingExperience],
                  ["Teaches in", "Tamil"],
                ].map(([k, v]) => (
                  <div key={k} data-reveal="rise" className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <dt className="text-xs text-smoke">{k}</dt>
                    <dd className="mt-1 text-[15px] font-medium text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10" data-reveal="rise">
                <Button href="/about" variant="ghost" icon={<ArrowRight size={16} />}>
                  About the mentor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
