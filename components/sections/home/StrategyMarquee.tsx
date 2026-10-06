import Link from "next/link";
import { strategies, strategyNotice } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

function Row({ reverse = false }: { reverse?: boolean }) {
  const list = reverse ? [...strategies].reverse() : strategies;
  return (
    <div className="mask-fade-x group flex overflow-hidden">
      <ul
        className={`ticker-track flex w-max shrink-0 gap-3 pr-3 [--marquee-duration:55s] motion-safe:animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {[...list, ...list].map((s, i) => (
          <li key={i} aria-hidden={i >= list.length || undefined}>
            <Link
              href={`/strategies#${s.slug}`}
              tabIndex={i >= list.length ? -1 : undefined}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-3 pl-3 pr-6 transition-colors duration-300 hover:border-gold-500/50 hover:bg-gold-500/10"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white/[0.06] text-[12px] font-bold text-gold-300">{s.index}</span>
              <span className="whitespace-nowrap text-[15px] font-medium text-bone">{s.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StrategyMarquee() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Strategies">
      <div className="container-x">
        <SectionTitle
          align="center"
          eyebrow="Strategy application"
          title={["11 strategies.", "Taught in context."]}
          accentLine={1}
          intro={<p>{strategyNotice}</p>}
        />
      </div>
      <div className="mt-14 space-y-3" data-reveal="blur">
        <Row />
        <Row reverse />
      </div>
      <div className="mt-12 flex justify-center" data-reveal="fade">
        <Button href="/strategies" variant="ghost" icon={<ArrowRight size={16} />}>
          View all strategies
        </Button>
      </div>
    </MotionSection>
  );
}
