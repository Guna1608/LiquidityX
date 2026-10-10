import type { Metadata } from "next";
import { brand } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/Hero";
import { MarketTicker } from "@/components/market/MarketTicker";
import { Features } from "@/components/sections/home/Features";
import { Approach } from "@/components/sections/home/Approach";
import { CurriculumStack } from "@/components/sections/home/CurriculumStack";
import { LockedStrategies } from "@/components/sections/LockedStrategies";
import { MentorSpotlight } from "@/components/sections/home/MentorSpotlight";
import { MarketPulse } from "@/components/market/MarketPulse";
import { FaqPreview, Pricing } from "@/components/sections/home/PricingFaq";
import { InsightsTeaser } from "@/components/sections/home/InsightsTeaser";
import { Principles } from "@/components/sections/home/Principles";
import { CTA } from "@/components/sections/CTA";
import { BatchSection } from "@/components/sections/home/BatchSection";
import { TerminalShowcase } from "@/components/sections/home/TerminalShowcase";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { VelocityMarquee } from "@/components/motion/Ambience";
import { JsonLd } from "@/components/ui/JsonLd";
import { courseJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Tamil Trading Mentorship — Forex, Futures & Indian Markets",
    description: brand.description,
    path: "/",
    keywords: ["forex trading course", "futures trading course", "indian markets course", "market profile course", "order flow course", "volume profile training", "GEX data"],
  }),
  title: { absolute: `${brand.academy} — Go Beyond Price. Understand the Market.` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={courseJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Hero />
      <MarketTicker />
      <TerminalShowcase />
      <BatchSection />
      <Features />
      <VelocityMarquee words={["Price & Time", "Volume", "Market Profile", "Order Flow", "GEX", "Risk"]} />
      <Approach />
      <CurriculumStack />
      <LockedStrategies />
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
