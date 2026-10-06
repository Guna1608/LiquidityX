import { classSessions, faq, upcomingBatch, whatsapp } from "@/config/site";
import { classesJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { BatchBanner } from "@/components/classes/BatchBanner";
import { ClassCard } from "@/components/classes/ClassCard";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Upcoming Live Classes — Forex & Futures",
  description:
    "Six live classes in every LiquidityX batch: Market Foundations, Market Profile, Volume Profiles, Order Flow, Strategy Application and Risk & Review. Weekday classes on Google Meet or Discord.",
  path: "/classes",
});

const steps = [
  { t: "Message on WhatsApp", d: "Tell us you're interested in the next batch." },
  { t: "Get batch details", d: "Dates, timings and fee are shared directly." },
  { t: "Join the live classes", d: "Weekday sessions on Google Meet or Discord." },
  { t: "Practise & review", d: "Support and follow-up learning through the batch." },
];

export default function ClassesPage() {
  return (
    <>
      <JsonLd data={classesJsonLd} />
      <PageHero
        crumb={{ name: "Classes", path: "/classes" }}
        eyebrow="Upcoming classes"
        title={["Live classes.", "Built in order."]}
        accentLine={1}
        intro={<p>Every batch runs six live classes — from how markets work to strategy and risk. {upcomingBatch.schedule}, {upcomingBatch.platform.toLowerCase()}.</p>}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp.url("Hi LiquidityX, I'd like to reserve a seat in the next batch.")} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
            Reserve a seat
          </Button>
          <Button href="#schedule" size="lg" variant="ghost" icon={<ArrowRight size={16} />}>
            See the schedule
          </Button>
        </div>
      </PageHero>

      <div className="container-x">
        <div data-reveal="rise">
          <BatchBanner />
        </div>
      </div>

      <MotionSection id="schedule" className="scroll-mt-28 py-20 md:py-28" aria-label="Class schedule">
        <div className="container-x">
          <SectionTitle eyebrow="Class schedule" title={["Six classes.", "Fifteen live days."]} accentLine={1} />
          <div className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.02] px-6 pb-8 pt-2 sm:px-10" data-reveal="rise">
            <DayTimeline />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group="0.08">
            {classSessions.map((c) => (
              <div key={c.slug} data-reveal="rotate3d">
                <ClassCard c={c} />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="py-20 md:py-28" aria-label="How to join">
        <div className="container-x">
          <SectionTitle align="center" eyebrow="How to join" title={["Four simple steps."]} />
          <ol className="relative mt-14 grid gap-4 md:grid-cols-4" data-reveal-group="0.1">
            <span aria-hidden className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent md:block" />
            {steps.map((s, i) => (
              <li key={s.t} data-reveal="rise" className="relative rounded-[22px] border border-white/[0.08] bg-[#0c0c0d] p-6 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 text-lg font-black text-gold-300 shadow-[0_0_30px_-6px_rgba(255,122,26,0.6)]">
                  {i + 1}
                </span>
                <p className="mt-5 text-lg font-bold">{s.t}</p>
                <p className="mt-1.5 text-sm text-mist">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      <MotionSection className="py-20 md:py-28" aria-label="Class questions">
        <div className="container-x max-w-3xl">
          <SectionTitle align="center" eyebrow="Questions" title={["About the classes"]} size="md" />
          <div className="mt-12" data-reveal="rise">
            <Accordion items={faq.slice(0, 5).map((f) => ({ q: f.q, a: f.a }))} defaultOpen={0} />
          </div>
        </div>
      </MotionSection>

      <CTA title={["Your seat in", "the next batch."]} line="Batch dates, timings and fee are shared directly on WhatsApp." message="Hi LiquidityX, I'd like to reserve a seat in the next batch." />
    </>
  );
}
