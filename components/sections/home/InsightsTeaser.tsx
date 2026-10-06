import { insights, insightsDraftNotice } from "@/config/insights";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "@/components/ui/Icons";
import { InsightCard } from "@/components/insights/InsightCard";

export function InsightsTeaser() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Market insights">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Market insights" title={["Education,", "not predictions."]} accentLine={1} size="lg" />
          <div className="flex flex-col items-start gap-4 md:items-end" data-reveal="fade">
            <Badge tone="warning">{insightsDraftNotice}</Badge>
            <Button href="/insights" variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
              All insights
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3" data-reveal-group="0.1">
          {insights.slice(0, 3).map((a, i) => (
            <div key={a.slug} data-reveal="rotate3d">
              <InsightCard insight={a} index={i} />
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
