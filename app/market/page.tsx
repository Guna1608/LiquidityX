import { marketConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { MarketTicker } from "@/components/market/MarketTicker";
import { MarketDashboard } from "@/components/market/MarketDashboard";

export const metadata = pageMetadata({
  title: "Market",
  description: "Indian markets, global indices, forex and commodities — an educational market view. Informational use only.",
  path: "/market",
});

export default function MarketPage() {
  return (
    <>
      <PageHero crumb={{ name: "Market", path: "/market" }} eyebrow="Market view" title={["MARKET", "VIEW"]} accentLine={1} intro={<p>Educational / informational use only. Not personalised financial advice.</p>} />
      <MarketTicker />
      <MotionSection className="py-14 md:py-20">
        <div className="container-x" data-reveal="fade">
          <MarketDashboard />
          <p className="mt-12 text-xs text-smoke">
            {marketConfig.disclaimer} Market data may be delayed or provided by third parties. Session status is estimated from the trading clock and ignores exchange holidays.
          </p>
        </div>
      </MotionSection>
    </>
  );
}
