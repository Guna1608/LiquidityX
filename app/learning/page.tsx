import { curriculum } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CurriculumStack } from "@/components/sections/home/CurriculumStack";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Learning / Curriculum",
  description:
    "The LiquidityX curriculum: Market Foundations, Market Profile, Volume Profiles (FRVP, RTH, ETH, Session, Periodic, Visible Range, Delta), Order Flow, Strategy Application and Risk & Review.",
  path: "/learning",
});

export default function LearningPage() {
  const total = curriculum.reduce((n, m) => n + m.topics.length, 0);
  return (
    <>
      <PageHero
        crumb={{ name: "Learning", path: "/learning" }}
        eyebrow="Learning / Curriculum"
        title={["From the auction", "to the trade."]}
        accentLine={1}
        intro={<p>Six modules, taught live, each building on the last — so every strategy is read in context.</p>}
      />
      <CurriculumStack />
      <MotionSection className="py-20 md:py-28">
        <div className="container-x">
          <SectionTitle eyebrow={`${total} topics`} title={["Every topic,", "in order."]} accentLine={1} size="md" />
          <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-reveal-group="0.06">
            {curriculum.map((m) => (
              <article key={m.index} className="panel rounded-[22px] p-7" data-reveal="rise">
                <div className="flex items-baseline justify-between">
                  <span className="text-5xl font-black tracking-[-0.05em] text-gold">{m.index}</span>
                  <span className="text-xs text-smoke">{m.topics.length} topics</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{m.title}</h3>
                <p className="mt-1.5 text-sm text-mist">{m.summary}</p>
                <ul className="mt-6 space-y-2 text-sm text-bone/90">
                  {m.topics.map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-gold-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>
      <CTA />
    </>
  );
}
