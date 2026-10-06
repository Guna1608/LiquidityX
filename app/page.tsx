import type { Metadata } from "next";
import { brand } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/Hero";
import { MarketTicker } from "@/components/market/MarketTicker";
import { Features } from "@/components/sections/home/Features";
import { Approach } from "@/components/sections/home/Approach";
import { CurriculumStack } from "@/components/sections/home/CurriculumStack";
import { StrategyMarquee } from "@/components/sections/home/StrategyMarquee";
import { MentorSpotlight } from "@/components/sections/home/MentorSpotlight";
import { MarketPulse } from "@/components/market/MarketPulse";
import { FaqPreview, Pricing } from "@/components/sections/home/PricingFaq";
import { InsightsTeaser } from "@/components/sections/home/InsightsTeaser";
import { Principles } from "@/components/sections/home/Principles";
import { CTA } from "@/components/sections/CTA";
import { ClassesSection } from "@/components/sections/home/ClassesSection";
import { TerminalShowcase } from "@/components/sections/home/TerminalShowcase";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { VelocityMarquee } from "@/components/motion/Ambience";
import { JsonLd } from "@/components/ui/JsonLd";
import { courseJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Live Forex & Futures Trading Mentorship",
    description: brand.description,
    path: "/",
    keywords: ["live trading classes", "forex trading course", "futures trading course", "market profile course", "order flow course", "volume profile training"],
  }),
  title: { absolute: `${brand.academy} — Live Forex & Futures Trading Mentorship` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={courseJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Hero />
      <MarketTicker />
      <TerminalShowcase />
      <ClassesSection />
      <Features />
      <VelocityMarquee words={["Market Structure", "Volume", "Market Profile", "Order Flow", "Strategy", "Risk"]} />
      <Approach />
      <CurriculumStack />
      <StrategyMarquee />
      <MentorSpotlight />
      <Testimonials />
      <MarketPulse />
      <Pricing />
      <InsightsTeaser />
      <FaqPreview />
      <Principles />
      <CTA />
    </>
  );
}
