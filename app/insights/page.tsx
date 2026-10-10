import { notFound } from "next/navigation";
import { listedInsights } from "@/config/insights";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { InsightsBrowser } from "@/components/insights/InsightsBrowser";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Articles",
  description: "Educational articles on market structure, volume, profile, order flow, trading psychology, risk management, futures and forex. No predictions, no buy/sell calls.",
  path: "/insights",
});

export default function InsightsPage() {
  // Nothing is listed until the owner has approved at least one article.
  if (listedInsights.length === 0) notFound();
  return (
    <>
      <PageHero
        crumb={{ name: "Articles", path: "/insights" }}
        eyebrow="Articles"
        title={["Understand,", "don't predict."]}
        accentLine={1}
        intro={<p>Educational explanations of how markets work. We don&apos;t publish predictions or tell anyone what to buy or sell.</p>}
      />
      <MotionSection className="py-10 md:py-24">
        <div className="container-x" data-reveal="fade">
          <InsightsBrowser items={listedInsights} />
        </div>
      </MotionSection>
      <CTA />
    </>
  );
}
