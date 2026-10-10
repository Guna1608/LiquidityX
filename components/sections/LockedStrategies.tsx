import { headlines, strategyInfo } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Lock } from "@/components/ui/Icons";

/**
 * Visually locked strategy section. Deliberately contains NO strategy names,
 * categories, rules or descriptions — the tiles are purely decorative
 * (aria-hidden), numbered and locked. Only the count is public.
 */
export function LockedStrategies({ showLink = true, showHeading = true }: { showLink?: boolean; showHeading?: boolean }) {
  const tiles = Array.from({ length: strategyInfo.count }, (_, i) => String(i + 1).padStart(2, "0"));
  return (
    <MotionSection className="relative py-12 md:py-28" aria-label="Strategies — locked">
      <div className="container-x">
        {showHeading ? (
          <SectionTitle
            align="center"
            eyebrow="Strategy application"
            title={[...headlines.strategies]}
            accentLine={1}
            intro={<p>{strategyInfo.line}</p>}
          />
        ) : (
          <p className="text-center text-xl font-bold tracking-tight text-bone" data-reveal="rise">
            {strategyInfo.line}
          </p>
        )}
        <p className="sr-only">{strategyInfo.count} strategies are taught inside the mentorship. Their names and rules are not published online.</p>
        <ul aria-hidden className="mx-auto mt-9 md:mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" data-reveal-group="0.05">
          {tiles.map((n) => (
            <li
              key={n}
              data-reveal="rise"
              className="relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0c0c0d] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-smoke">{n}</span>
                <span className="grid size-8 place-items-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Lock size={15} />
                </span>
              </div>
              <div className="mt-6 space-y-2">
                <span className="block h-3 w-4/5 rounded-full bg-white/[0.07]" />
                <span className="block h-2 w-3/5 rounded-full bg-white/[0.04]" />
                <span className="block h-2 w-2/5 rounded-full bg-white/[0.04]" />
              </div>
              <p className="mt-5 text-[12px] font-medium text-gold-300/80">Locked</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-mist">{strategyInfo.notice}</p>
        {showLink && (
          <div className="mt-8 flex justify-center" data-reveal="fade">
            <Button href="/strategies" variant="ghost" icon={<ArrowRight size={16} />}>
              About the strategies
            </Button>
          </div>
        )}
      </div>
    </MotionSection>
  );
}
