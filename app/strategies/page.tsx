import { headlines, strategyInfo } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { LockedStrategies } from "@/components/sections/LockedStrategies";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Strategies",
  description: `${strategyInfo.line} Strategy names and rules are shared in class, not published online.`,
  path: "/strategies",
});

export default function StrategiesPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Strategies", path: "/strategies" }}
        eyebrow={`${strategyInfo.count} strategies · Locked`}
        title={[...headlines.strategies]}
        accentLine={1}
        intro={
          <p>
            Strategies are taught after market context, volume and order flow — connecting context, confluence and execution through structured setups. Their names and rules are
            shared inside the mentorship only.
          </p>
        }
      />
      <LockedStrategies showLink={false} showHeading={false} />
      <CTA title={["Learn them", "in context."]} message="Hi LiquidityX, I'd like to know more about the mentorship." />
    </>
  );
}
