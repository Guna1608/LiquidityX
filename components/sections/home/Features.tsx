import type { ReactNode } from "react";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { CurriculumVisual, FootprintVisual, LiveClassVisual, ProfileVisual, RiskVisual, StrategyStackVisual } from "@/components/visuals/Bento";
import { cn } from "@/lib/cn";

type Item = { title: string; body: string; visual: ReactNode; span: string };

const items: Item[] = [
  { title: "Taught directly in Tamil", body: "Monday to Saturday on Google Meet and Discord, starting 8:30 PM IST — you learn with the mentor in real time.", visual: <LiveClassVisual />, span: "lg:col-span-7" },
  { title: "Read Market Profile", body: "Read value, acceptance and rejection to build market context.", visual: <ProfileVisual />, span: "lg:col-span-5" },
  { title: "Order flow and GEX data", body: "Interpret executed activity, aggression and absorption alongside GEX data.", visual: <FootprintVisual />, span: "lg:col-span-4" },
  { title: "11 strategies, locked", body: "Including scalping setups — taught inside the mentorship, in class.", visual: <StrategyStackVisual />, span: "lg:col-span-4" },
  { title: "Risk & review", body: "Build risk controls, protect capital and review your trading decisions.", visual: <RiskVisual />, span: "lg:col-span-4" },
];

function Feature({ item }: { item: Item }) {
  return (
    <Card tilt={5} data-reveal="rise" className={cn("h-full", item.span)} innerClassName="flex h-full flex-col p-2">
      <div className="relative h-56 overflow-hidden rounded-[16px] border border-white/[0.06] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,122,26,0.12),transparent_60%),#0a0a0b] p-4 sm:h-60">
        {item.visual}
      </div>
      <div className="px-4 pb-4 pt-5">
        <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-mist">{item.body}</p>
      </div>
    </Card>
  );
}

/** Bento grid of what the mentorship covers, each card with an animated UI illustration. */
export function Features() {
  return (
    <MotionSection className="relative py-12 md:py-28" aria-label="What you will learn">
      <div className="container-x">
        <SectionTitle
          align="center"
          eyebrow="Why LiquidityX"
          title={["Everything you need", "to read the market."]}
          accentLine={1}
          intro={<p>A structured process — from how auctions work to context, confluence and a risk-aware approach of your own.</p>}
        />
        <div className="mt-9 md:mt-14 grid gap-3 lg:grid-cols-12" data-reveal-group="0.08">
          {items.map((it) => (
            <Feature key={it.title} item={it} />
          ))}
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-12">
          <Card tilt={4} className="lg:col-span-12" innerClassName="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_1.1fr]">
            <div data-reveal="rise">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Seven modules, in order.</h3>
              <p className="mt-3 max-w-md text-mist">Each module builds on the last, across the 15 teaching days — so you understand the context behind each decision rather than memorising setups.</p>
            </div>
            <div className="h-64 rounded-[16px] border border-white/[0.06] bg-[#0a0a0b] p-5" data-reveal="blur">
              <CurriculumVisual />
            </div>
          </Card>
        </div>
      </div>
    </MotionSection>
  );
}
