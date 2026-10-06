import { faq, mentorship } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { FeePanel } from "@/components/sections/FeePanel";

export function Pricing() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Mentorship fee">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Pricing" title={["One mentorship.", "Fully live."]} accentLine={1} intro={<p>{mentorship.heroLine}</p>} />
          <ul className="mt-10 grid max-w-md gap-3 sm:grid-cols-2" data-reveal-group="0.07">
            {mentorship.facts.map((f) => (
              <li key={f.label} data-reveal="rise" className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-xs text-smoke">{f.label}</p>
                <p className="mt-1 text-[15px] font-medium">{f.value}</p>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="rotate3d">
          <FeePanel />
        </div>
      </div>
    </MotionSection>
  );
}

export function FaqPreview() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Frequently asked questions">
      <div className="container-x max-w-3xl">
        <SectionTitle align="center" eyebrow="FAQ" title={["Frequently asked questions"]} size="md" />
        <div className="mt-12" data-reveal="rise">
          <Accordion items={faq.slice(0, 5).map((f) => ({ q: f.q, a: f.a }))} defaultOpen={null} />
        </div>
        <div className="mt-10 flex justify-center" data-reveal="fade">
          <Button href="/faq" variant="ghost" icon={<ArrowRight size={16} />}>
            All questions
          </Button>
        </div>
      </div>
    </MotionSection>
  );
}
