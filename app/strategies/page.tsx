import { strategies } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { StrategyExperience } from "@/components/sections/StrategyExperience";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Strategies",
  description: `The ${strategies.length} strategies taught in the LiquidityX mentorship: ${strategies.map((s) => s.name).join(", ")}.`,
  path: "/strategies",
});

export default function StrategiesPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Strategies", path: "/strategies" }}
        eyebrow={`Strategy archive · ${strategies.length} setups`}
        title={["Eleven strategies.", "One process."]}
        accentLine={1}
        intro={
          <p>
            Each strategy is taught live, in context — after market structure, profile, volume and order flow. Rules, thresholds and examples stay inside the mentorship.
            No strategy guarantees a result.
          </p>
        }
      />
      <StrategyExperience />
      <CTA title={["Learn them", "in context."]} message="Hi LiquidityX, I'd like to know more about the strategies taught in the mentorship." />
    </>
  );
}
