import { insights, insightsDraftNotice } from "@/config/insights";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { InsightsBrowser } from "@/components/insights/InsightsBrowser";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { MarketTicker } from "@/components/market/MarketTicker";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Market Insights",
  description: "Educational insights on market structure, volume, profile, order flow, trading psychology, risk management, futures and forex. No predictions, no buy/sell calls.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Market Insights", path: "/insights" }}
        eyebrow="Market insights"
        title={["Understand,", "don't predict."]}
        accentLine={1}
        intro={<p>Educational explanations of how markets work. We don't publish predictions or tell anyone what to buy or sell.</p>}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Badge tone="warning">{insightsDraftNotice}</Badge>
          <Button href="/market" variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
            Market view
          </Button>
        </div>
      </PageHero>
      <MarketTicker />
      <MotionSection className="py-16 md:py-24">
        <div className="container-x" data-reveal="fade">
          <InsightsBrowser items={insights} />
        </div>
      </MotionSection>
      <CTA />
    </>
  );
}
