import { curriculum, headlines } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CurriculumStack } from "@/components/sections/home/CurriculumStack";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Curriculum",
  description:
    "The LiquidityX curriculum has seven modules taught across 15 teaching days: Market Foundations, Market Profile, Volume Profiles, Order Flow, GEX Data Analysis, Strategy Application and Risk & Review.",
  path: "/learning",
});

export default function LearningPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Curriculum", path: "/learning" }}
        eyebrow="Curriculum"
        title={[...headlines.learning]}
        accentLine={1}
        intro={
          <p>
            {curriculum.length} curriculum modules, taught directly in Tamil across 15 teaching days — each building on the last, so every decision is read in context. The modules are
            not {curriculum.length} separate classes.
          </p>
        }
      />
      <CurriculumStack showHeading={false} />
      <CTA />
    </>
  );
}
