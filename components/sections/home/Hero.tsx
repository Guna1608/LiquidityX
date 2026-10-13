import Link from "next/link";
import { enrolment, headlines, hero, whatsapp } from "@/config/site";
import { WordCycler } from "@/components/motion/WordCycler";
import { TextReveal } from "@/components/motion/TextReveal";
import { MotionSection } from "@/components/motion/MotionSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar, WhatsApp } from "@/components/ui/Icons";
import { CandleBackdrop } from "@/components/visuals/CandleBackdrop";
import { HeroVisual } from "@/components/visuals/HeroVisual";

/**
 * One-screen hero: headline + approved supporting copy + CTAs on the left,
 * a layered trading visual on the right, drifting translucent boxes and live
 * candles behind. Everything fits within a single viewport on desktop.
 */
export function Hero() {
  return (
    <MotionSection className="relative isolate flex min-h-[100svh] items-start overflow-hidden pb-28 pt-24 sm:items-center sm:pb-10 lg:pt-24" aria-label="Introduction">
      {/* backdrop: grid, glow, drifting boxes, faint live candles */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 tech-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
        <div className="absolute -right-[10%] top-[5%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.2),transparent)] blur-3xl" />
        <div className="absolute -left-[15%] bottom-0 h-[50%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.14),transparent)] blur-3xl" />
        {[
          "left-[6%] top-[22%] size-14 [animation-duration:14s]",
          "left-[52%] bottom-[16%] size-16 [animation-duration:17s] [animation-delay:-6s]",
          "right-[5%] top-[30%] size-12 [animation-duration:13s] [animation-delay:-2s]",
        ].map((c) => (
          <span key={c} className={`absolute rounded-xl border border-gold-400/20 bg-gradient-to-br from-gold-500/10 to-gold-500/10 backdrop-blur-[1px] motion-safe:animate-[box-drift_12s_ease-in-out_infinite] ${c}`} />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-[40%] opacity-25 [mask-image:linear-gradient(to_top,#000,transparent)]">
          <CandleBackdrop density={1.2} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x grid w-full items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* copy */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start" data-reveal="blur">
            <Link
              href="/classes"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] leading-snug sm:py-1 sm:pl-1 sm:pr-3 sm:text-[12.5px] text-mist backdrop-blur transition-colors hover:border-gold-500/40"
            >
              <span className="hidden whitespace-nowrap rounded-full bg-gold-500/15 px-2 py-0.5 text-[11px] font-semibold text-gold-300 sm:inline">Next batch</span>
              <span className="sm:hidden">Starts 8:30 PM IST · Taught in Tamil</span>
              <span className="hidden sm:inline">{hero.badge}</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <h1 className="mt-[clamp(1rem,3.2svh,2rem)] text-[clamp(2.1rem,min(4.6vw,7.4svh),4rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
            <TextReveal
              as="span"
              start="mount"
              delay={0.2}
              lines={[...headlines.hero]}
              accentLine={1}
              accentClassName="text-shimmer"
              className="block"
              srText={headlines.hero.join(" ")}
            />
          </h1>

          <p className="mt-[clamp(0.6rem,2svh,1.25rem)] text-[clamp(1.05rem,min(1.8vw,3svh),1.45rem)] font-semibold text-bone/90" data-reveal="rise" data-delay="0.8">
            Master <WordCycler className="justify-items-center lg:justify-items-start" words={["Volume.", "Market Profile.", "Order Flow.", "GEX data.", "Risk control."]} />
          </p>

          <p className="mx-auto mt-[clamp(0.6rem,2svh,1.25rem)] max-w-xl text-[clamp(0.95rem,2.2svh,1.05rem)] leading-relaxed text-mist lg:mx-0" data-reveal="rise" data-delay="0.9">
            {hero.supporting}
          </p>

          <div className="mx-auto mt-[clamp(1.25rem,3.5svh,2.5rem)] flex w-full max-w-xs flex-col items-stretch gap-3 sm:mx-0 sm:max-w-none sm:flex-row sm:items-center sm:justify-center lg:justify-start" data-reveal="rise" data-delay="1">
            <Button href={enrolment.checkoutHref ?? whatsapp.url(enrolment.whatsappMessage)} size="lg" className="w-full sm:w-auto" icon={<WhatsApp size={18} />} iconPosition="start">
              {hero.primaryCta}
            </Button>
            <Button href="/classes" size="lg" variant="ghost" className="w-full sm:w-auto" icon={<Calendar size={17} />} iconPosition="start">
              Next batch &amp; schedule
            </Button>
          </div>

          <p className="mt-[clamp(0.75rem,2.5svh,2rem)] hidden items-center gap-3 text-[13px] text-smoke sm:flex lg:justify-start" data-reveal="fade" data-delay="1.2">
            <span className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_10px_#ff7a1a]" />
            Monday to Saturday · 8:30 PM IST · Taught in Tamil
          </p>
        </div>

        {/* layered visual — height-capped so the hero stays within one screen */}
        <div className="relative mx-auto hidden aspect-[1/1.02] h-[min(64svh,540px)] lg:block">
          <HeroVisual />
        </div>
      </div>
    </MotionSection>
  );
}
