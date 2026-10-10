import { listedInsights } from "@/config/insights";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { InsightCard } from "@/components/insights/InsightCard";

/** Renders only approved, published articles — nothing at all while none exist. */
export function InsightsTeaser() {
  if (listedInsights.length === 0) return null;
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Articles">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Articles" title={["Education,", "not predictions."]} accentLine={1} size="lg" />
          <div className="flex flex-col items-start gap-4 md:items-end" data-reveal="fade">
            <Button href="/insights" variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
              All articles
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3" data-reveal-group="0.1">
          {listedInsights.slice(0, 3).map((a, i) => (
            <div key={a.slug} data-reveal="rotate3d">
              <InsightCard insight={a} index={i} />
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
