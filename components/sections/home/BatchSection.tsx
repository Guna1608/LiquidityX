import { schedule } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { BatchBanner } from "@/components/classes/BatchBanner";

const facts = [
  { k: "Classes", v: schedule.days, d: schedule.holiday },
  { k: "Starts at", v: schedule.startTime, d: `Session runs ${schedule.sessionTime}` },
  { k: "Platforms", v: schedule.platforms, d: "Directly with the mentor" },
  { k: "Language", v: schedule.language, d: "Beginner-friendly · age 18+" },
];

/** Next batch + schedule facts. Emphasises the 8:30 PM IST start time. */
export function BatchSection() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Next batch and schedule">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle eyebrow="Schedule" title={["A new batch", "every month."]} accentLine={1} intro={<p>Batches start on the 25th of every month, with classes at 8:30 PM IST.</p>} />
          <div data-reveal="fade">
            <Button href="/classes" variant="ghost" icon={<ArrowRight size={16} />}>
              Schedule &amp; batch details
            </Button>
          </div>
        </div>
        <div className="mt-12" data-reveal="rise">
          <BatchBanner />
        </div>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group="0.08">
          {facts.map((f) => (
            <div key={f.k} data-reveal="rise" className="panel rounded-[22px] p-6">
              <dt className="text-xs text-smoke">{f.k}</dt>
              <dd className="mt-2 text-xl font-bold tracking-tight">{f.v}</dd>
              <dd className="mt-1 text-sm text-mist">{f.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </MotionSection>
  );
}
