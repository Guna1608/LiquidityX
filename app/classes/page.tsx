import { enrolment, faq, schedule, whatsapp } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { BatchBanner } from "@/components/classes/BatchBanner";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { EnrolmentTerms } from "@/components/sections/EnrolmentTerms";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Schedule & Next Batch",
  description:
    "A new LiquidityX Academy batch starts on the 25th of every month (26th if the 25th is a Sunday). 15 teaching days, Monday to Saturday, starting 8:30 PM IST on Google Meet and Discord, taught in Tamil.",
  path: "/classes",
});

const steps = [
  { t: "Check the batch", d: "See the start date and the enrolment terms on this page." },
  { t: "Message us on WhatsApp", d: "We guide you through enrolment and payment for the upcoming batch." },
  { t: "Complete your details", d: "Share your name and contact details." },
  { t: "Join the classes", d: "Monday to Saturday, 8:30 PM IST, on Google Meet and Discord." },
];

const facts = [
  ["Course length", `${schedule.teachingDays} teaching days`],
  ["Classes", `${schedule.days} (${schedule.holiday})`],
  ["Start time", `${schedule.startTime} · session ${schedule.sessionTime}`],
  ["Platforms", schedule.platforms],
  ["Language", `${schedule.language} · conducted directly with the mentor`],
  ["Recordings", "Not provided — a short explanation of a missed lesson can be requested"],
];

export default function ClassesPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Schedule", path: "/classes" }}
        eyebrow="Schedule & batch"
        title={["A new batch", "every month."]}
        accentLine={1}
        intro={<p>Batches start on the 25th of every month (Monday the 26th if the 25th is a Sunday). Classes start at 8:30 PM IST, Monday to Saturday.</p>}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp.url(enrolment.whatsappMessage)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
            Enrol via WhatsApp
          </Button>
          <Button href="#schedule" size="lg" variant="ghost" icon={<ArrowRight size={16} />}>
            See the schedule
          </Button>
        </div>
      </PageHero>

      <MotionSection className="container-x">
        <div data-reveal="rise">
          <BatchBanner />
        </div>
      </MotionSection>

      <MotionSection id="schedule" className="scroll-mt-28 py-12 md:py-28" aria-label="Class schedule">
        <div className="container-x">
          <SectionTitle eyebrow="Class schedule" title={["Fifteen teaching days.", "Starting 8:30 PM IST."]} accentLine={1} />
          <div className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.02] px-6 pb-8 pt-2 sm:px-10" data-reveal="rise">
            <DayTimeline />
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group="0.08">
            {facts.map(([k, v]) => (
              <div key={k} data-reveal="rise" className="panel rounded-[22px] p-6">
                <dt className="text-xs text-smoke">{k}</dt>
                <dd className="mt-2 text-[15px] font-medium leading-snug text-bone">{v}</dd>
              </div>
            ))}
          </dl>
          <LearningJourney className="mt-14 md:mt-20" />
        </div>
      </MotionSection>

      <MotionSection className="py-12" aria-label="Enrolment terms">
        <div className="container-x" data-reveal="rise">
          <EnrolmentTerms />
        </div>
      </MotionSection>

      <MotionSection className="py-12 md:py-28" aria-label="How to join">
        <div className="container-x">
          <SectionTitle align="center" eyebrow="How to join" title={["Four simple steps."]} />
          <ol className="relative mt-9 md:mt-14 grid gap-4 md:grid-cols-4" data-reveal-group="0.1">
            <span aria-hidden className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent md:block" />
            {steps.map((s, i) => (
              <li key={s.t} data-reveal="rise" className="relative rounded-[22px] border border-white/[0.08] bg-[#0c0c0d] p-6 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 text-lg font-black text-gold-300 shadow-[0_0_30px_-6px_rgba(82,120,255,0.6)]">
                  {i + 1}
                </span>
                <p className="mt-5 text-lg font-bold">{s.t}</p>
                <p className="mt-1.5 text-sm text-mist">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      <MotionSection className="py-12 md:py-28" aria-label="Schedule questions">
        <div className="container-x max-w-3xl">
          <SectionTitle align="center" eyebrow="Questions" title={["About the batch"]} size="md" />
          <div className="mt-12" data-reveal="rise">
            <Accordion items={faq.slice(0, 5).map((f) => ({ q: f.q, a: f.a }))} defaultOpen={0} />
          </div>
        </div>
      </MotionSection>

      <CTA title={["Your place in", "the next batch."]} line="Message us on WhatsApp to enrol for the upcoming batch." message={enrolment.whatsappMessage} />
    </>
  );
}
