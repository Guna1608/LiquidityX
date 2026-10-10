import type { ReactNode } from "react";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";

type Item = { t: string; d: string; viz: ReactNode };

const bars = (hs: number[], cls = "bg-gold-400/80") => (
  <div className="flex h-12 items-end gap-1">
    {hs.map((h, i) => (
      <span key={i} className={`w-2 origin-bottom rounded-t-[3px] ${cls} motion-safe:animate-[delta_2.2s_ease-in-out_infinite]`} style={{ height: `${h}%`, animationDelay: `${i * 0.16}s` }} />
    ))}
  </div>
);

const items: Item[] = [
  { t: "Volume", d: "See where participation concentrated — and where it was thin.", viz: bars([40, 75, 55, 100, 65, 85, 50]) },
  {
    t: "Market Profile",
    d: "Read value, acceptance and rejection to build market context.",
    viz: (
      <div className="flex h-12 flex-col justify-between">
        {[35, 60, 100, 70, 40].map((w, i) => (
          <span key={i} className="h-1.5 origin-left rounded-r-sm bg-gold-300/80 motion-safe:animate-[bar-grow_3s_ease-in-out_infinite]" style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    ),
  },
  {
    t: "Order Flow",
    d: "Interpret executed activity, aggression and absorption.",
    viz: (
      <div className="flex h-12 items-center gap-1">
        {["bg-up", "bg-down", "bg-up", "bg-up", "bg-down", "bg-up", "bg-up"].map((c, i) => (
          <span key={i} className={`h-full w-2 rounded-[3px] ${c} motion-safe:animate-[delta_1.8s_ease-in-out_infinite]`} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    ),
  },
  {
    t: "GEX Data",
    d: "Bring GEX levels into the same picture as price and volume.",
    viz: (
      <svg viewBox="0 0 80 48" className="h-12 w-full" aria-hidden>
        {[8, 24, 40].map((y, i) => (
          <line key={y} x1="0" x2="80" y1={y} y2={y} stroke="#8b5cf6" strokeOpacity="0.8" strokeDasharray="4 4" className="motion-safe:animate-[dash_2.4s_linear_infinite]" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
        <polyline points="0,38 12,30 24,34 38,16 50,22 64,8 80,14" fill="none" stroke="#a9b8ff" strokeWidth="2" />
      </svg>
    ),
  },
  { t: "15-day curriculum", d: "A structured path from market foundations to risk and review.", viz: bars([20, 32, 44, 56, 68, 80, 92], "bg-violet-400/80") },
  {
    t: "Taught directly in Tamil",
    d: "Live with the mentor, Monday to Saturday from 8:30 PM IST.",
    viz: <p className="flex h-12 items-center text-3xl font-black text-gold-300">தமிழ்</p>,
  },
  {
    t: "Risk-aware process",
    d: "Build risk controls, protect capital and review every decision.",
    viz: (
      <div className="flex h-12 flex-col justify-center gap-2">
        <span className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-2/3 origin-left rounded-full bg-gradient-to-r from-gold-500 to-violet-500 motion-safe:animate-[bar-grow_3s_ease-in-out_infinite]" />
        </span>
        <span className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-1/3 origin-left rounded-full bg-gradient-to-r from-gold-500 to-violet-500 motion-safe:animate-[bar-grow_3s_ease-in-out_0.4s_infinite]" />
        </span>
      </div>
    ),
  },
  {
    t: "Forex, Futures & Indian markets",
    d: "Context and process that carry across the markets you trade.",
    viz: (
      <div className="flex h-12 items-center gap-2">
        {["FX", "FUT", "IN"].map((m, i) => (
          <span key={m} className="grid size-10 place-items-center rounded-xl border border-gold-400/30 bg-gold-500/10 text-[11px] font-bold text-gold-200 motion-safe:animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
            {m}
          </span>
        ))}
      </div>
    ),
  },
];

/** Cards that break the hero promise into its parts — each with a tiny looping animation. */
export function LearnCards() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="What you will connect">
      <div className="container-x">
        <SectionTitle
          align="center"
          eyebrow="What you learn"
          title={["Connect the data.", "Build the process."]}
          accentLine={1}
          intro={
            <p>
              Learn to connect Volume, Market Profile, Order Flow and GEX data through a structured 15-day curriculum taught directly in Tamil. Build market context and a risk-aware
              trading process across Forex, Futures and Indian markets.
            </p>
          }
        />
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group="0.07">
          {items.map((it) => (
            <li key={it.t} data-reveal="rise">
              <Card tilt={6} className="h-full" innerClassName="flex h-full flex-col p-6">
                <div data-depth="18">{it.viz}</div>
                <h3 className="mt-6 text-lg font-bold tracking-tight" data-depth="24">
                  {it.t}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-mist">{it.d}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-smoke">Visuals are illustrative and do not show real market data.</p>
      </div>
    </MotionSection>
  );
}
