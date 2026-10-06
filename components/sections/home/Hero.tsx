import Link from "next/link";
import { curriculum, hero, strategies, whatsapp } from "@/config/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { MotionSection } from "@/components/motion/MotionSection";
import { WordCycler } from "@/components/motion/WordCycler";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar, WhatsApp } from "@/components/ui/Icons";
import { CandleBackdrop } from "@/components/visuals/CandleBackdrop";
import { HeroVisual } from "@/components/visuals/HeroVisual";

/** Selling points — every one is an approved programme fact. */
const points = [
  { t: "Live classes, taught in Tamil", d: "Learn in real time with the mentor — no pre-recorded videos." },
  { t: "A structured 15-day path", d: "Market Dynamics → Profile → Volume → Order Flow → Strategy → Risk." },
  { t: `${strategies.length} strategies, taught in context`, d: "Applied after structure, with risk defined first." },
  { t: "Forex & Futures together", d: "Weekday classes on Google Meet or Discord, with follow-up support." },
];

const stats = [
  { n: 15, l: "Live days" },
  { n: curriculum.length, l: "Live classes" },
  { n: strategies.length, l: "Strategies" },
  { n: 2, l: "Markets" },
];

function Check() {
  return (
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-300 ring-1 ring-gold-500/40">
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * Hero: rotating headline phrase, value proposition, animated selling points,
 * dual CTA, count-up proof chips — beside a layered, parallax trading visual.
 */
export function Hero() {
  return (
    <MotionSection className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40" aria-label="Introduction">
      {/* backdrop: grid, warm glow, faint live candles */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 tech-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
        <div className="absolute -right-[10%] top-[5%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.18),transparent)] blur-3xl" />
        <div className="absolute -left-[20%] bottom-0 h-[50%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.08),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] opacity-25 [mask-image:linear-gradient(to_top,#000,transparent)]">
          <CandleBackdrop density={1.2} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* copy */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start" data-reveal="blur">
            <Link
              href="/classes"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-[13px] text-mist backdrop-blur transition-colors hover:border-gold-500/40"
            >
              <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[11px] font-semibold text-gold-300">New batch</span>
              {hero.badge}
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <h1 className="mt-7 text-[clamp(2.5rem,6vw,4.9rem)] font-bold leading-[1.02] tracking-[-0.045em]">
            <TextReveal as="span" start="mount" delay={0.2} lines={["Learn to read"]} className="block" srText="Learn to read the market — Market Profile, Order Flow and Volume — and trade with clarity." />
            <span className="block" data-reveal="blur" data-delay="0.55">
              <WordCycler words={["the market.", "Market Profile.", "Order Flow.", "Volume.", "market structure."]} />
            </span>
            <TextReveal as="span" start="mount" delay={0.75} lines={["Trade with clarity."]} accentLine={0} accentClassName="text-fade" className="block" />
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mist lg:mx-0" data-reveal="rise" data-delay="0.9">
            {hero.supporting}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start" data-reveal="rise" data-delay="1">
            <Button href={whatsapp.url()} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
              {hero.primaryCta}
            </Button>
            <Button href="/classes" size="lg" variant="ghost" icon={<Calendar size={17} />} iconPosition="start">
              View upcoming classes
            </Button>
          </div>

          <ul className="mx-auto mt-9 grid max-w-xl gap-3 text-left sm:grid-cols-2 lg:mx-0" data-reveal-group="0.1">
            {points.map((p) => (
              <li key={p.t} data-reveal="rise" className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-colors hover:border-gold-500/30 hover:bg-gold-500/[0.04]">
                <Check />
                <span>
                  <span className="block text-[14px] font-bold leading-snug">{p.t}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-smoke">{p.d}</span>
                </span>
              </li>
            ))}
          </ul>

          <dl className="mx-auto mt-10 grid max-w-xl grid-cols-4 divide-x divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-white/[0.02] py-4 lg:mx-0" data-reveal="rise" data-delay="1.2">
            {stats.map((s) => (
              <div key={s.l} className="px-2 text-center">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-2xl font-black tracking-tight sm:text-3xl">
                  <CountUp to={s.n} />
                </dd>
                <dd className="mt-0.5 text-[11px] text-smoke sm:text-xs">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* layered visual */}
        <div className="relative">
          <HeroVisual />
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="mt-14 hidden justify-center lg:flex" data-reveal="fade" data-delay="1.4">
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/15 pt-2">
          <span className="h-2 w-1 rounded-full bg-gold-400 motion-safe:animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
        </span>
      </div>
    </MotionSection>
  );
}
