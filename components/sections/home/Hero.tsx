import Link from "next/link";
import { curriculum, enrolment, headlines, hero, strategyInfo, whatsapp } from "@/config/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { MotionSection } from "@/components/motion/MotionSection";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar, WhatsApp } from "@/components/ui/Icons";
import { CandleBackdrop } from "@/components/visuals/CandleBackdrop";
import { HeroVisual } from "@/components/visuals/HeroVisual";

const stats = [
  { n: 15, l: "Teaching days" },
  { n: curriculum.length, l: "Modules" },
  { n: strategyInfo.count, l: "Strategies" },
  { n: 3, l: "Markets" },
];

/** What the course connects — each tile carries a tiny looping trading animation. */
const tiles = [
  {
    t: "Volume",
    d: "Where participation sat",
    viz: (
      <div className="flex h-6 items-end gap-[3px]">
        {[40, 75, 55, 100, 65, 85].map((h, i) => (
          <span key={i} className="w-[5px] origin-bottom rounded-t-[2px] bg-gold-400/80 motion-safe:animate-[delta_2.2s_ease-in-out_infinite]" style={{ height: `${h}%`, animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    ),
  },
  {
    t: "Market Profile",
    d: "Value, acceptance, rejection",
    viz: (
      <div className="flex h-6 flex-col justify-between">
        {[35, 60, 100, 70, 40].map((w, i) => (
          <span key={i} className="h-[3px] origin-left rounded-r-sm bg-gold-300/80 motion-safe:animate-[bar-grow_3s_ease-in-out_infinite]" style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    ),
  },
  {
    t: "Order Flow",
    d: "Aggression & absorption",
    viz: (
      <div className="flex h-6 items-center gap-[3px]">
        {["bg-up", "bg-down", "bg-up", "bg-up", "bg-down", "bg-up"].map((c, i) => (
          <span key={i} className={`h-full w-[5px] rounded-[2px] ${c} motion-safe:animate-[delta_1.8s_ease-in-out_infinite]`} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    ),
  },
  {
    t: "GEX Data",
    d: "Levels in context",
    viz: (
      <svg viewBox="0 0 60 24" className="h-6 w-full" aria-hidden>
        {[5, 12, 19].map((y, i) => (
          <line key={y} x1="0" x2="60" y1={y} y2={y} stroke="#8b5cf6" strokeOpacity="0.7" strokeDasharray="3 3" className="motion-safe:animate-[dash_2.4s_linear_infinite]" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
        <polyline points="0,18 10,14 18,16 28,8 38,11 48,5 60,9" fill="none" stroke="#a9b8ff" strokeWidth="1.5" />
      </svg>
    ),
  },
];

/**
 * One-screen hero: headline + approved supporting copy + CTAs on the left,
 * a layered trading visual on the right, drifting translucent boxes and live
 * candles behind. Everything fits within a single viewport on desktop.
 */
export function Hero() {
  return (
    <MotionSection className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-8 pt-24 lg:h-[100svh] lg:max-h-[960px] lg:pt-20" aria-label="Introduction">
      {/* backdrop: grid, glow, drifting boxes, faint live candles */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 tech-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
        <div className="absolute -right-[10%] top-[5%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(82,120,255,0.2),transparent)] blur-3xl" />
        <div className="absolute -left-[15%] bottom-0 h-[50%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.14),transparent)] blur-3xl" />
        {[
          "left-[6%] top-[22%] size-14 [animation-duration:14s]",
          "left-[44%] top-[14%] size-10 [animation-duration:11s] [animation-delay:-3s]",
          "left-[52%] bottom-[16%] size-16 [animation-duration:17s] [animation-delay:-6s]",
          "right-[5%] top-[30%] size-12 [animation-duration:13s] [animation-delay:-2s]",
          "left-[26%] bottom-[10%] size-8 [animation-duration:10s] [animation-delay:-5s]",
        ].map((c) => (
          <span key={c} className={`absolute rounded-xl border border-gold-400/20 bg-gradient-to-br from-gold-500/10 to-violet-500/10 backdrop-blur-[1px] motion-safe:animate-[box-drift_12s_ease-in-out_infinite] ${c}`} />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-[40%] opacity-25 [mask-image:linear-gradient(to_top,#000,transparent)]">
          <CandleBackdrop density={1.2} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
        {/* copy */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start" data-reveal="blur">
            <Link
              href="/classes"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-[12.5px] text-mist backdrop-blur transition-colors hover:border-gold-500/40"
            >
              <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[11px] font-semibold text-gold-300">Next batch</span>
              {hero.badge}
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <h1 className="mt-5 text-[clamp(2.1rem,4.2vw,3.7rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
            <TextReveal
              as="span"
              start="mount"
              delay={0.2}
              lines={[...headlines.hero]}
              accentLine={1}
              accentClassName="text-fade"
              className="block"
              srText={headlines.hero.join(" ")}
            />
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-mist lg:mx-0" data-reveal="rise" data-delay="0.9">
            {hero.supporting}
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start" data-reveal="rise" data-delay="1">
            <Button href={enrolment.checkoutHref ?? whatsapp.url(enrolment.whatsappMessage)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
              {hero.primaryCta}
            </Button>
            <Button href="/classes" size="lg" variant="ghost" icon={<Calendar size={17} />} iconPosition="start">
              Next batch &amp; schedule
            </Button>
          </div>

          {/* animated concept tiles */}
          <ul className="mx-auto mt-6 hidden max-w-xl grid-cols-4 gap-2 sm:grid lg:mx-0" data-reveal-group="0.1">
            {tiles.map((t) => (
              <li key={t.t} data-reveal="rise" className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 text-left transition-colors hover:border-gold-500/40 hover:bg-gold-500/[0.05]">
                {t.viz}
                <p className="mt-2 text-[12px] font-bold leading-tight">{t.t}</p>
                <p className="mt-0.5 text-[10.5px] leading-tight text-smoke">{t.d}</p>
              </li>
            ))}
          </ul>

          <dl className="mx-auto mt-4 hidden max-w-xl grid-cols-4 divide-x divide-white/[0.07] sm:grid lg:mx-0" data-reveal="rise" data-delay="1.2">
            {stats.map((s) => (
              <div key={s.l} className="px-2 text-center first:pl-0 lg:text-left">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-xl font-black tracking-tight">
                  <CountUp to={s.n} />
                </dd>
                <dd className="text-[11px] text-smoke">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* layered visual — height-capped so the hero stays within one screen */}
        <div className="relative mx-auto hidden aspect-[1/1.02] h-[min(68svh,560px)] lg:block">
          <HeroVisual />
        </div>
      </div>
    </MotionSection>
  );
}
