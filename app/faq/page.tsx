import { faq } from "@/config/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "LiquidityX mentorship FAQ — recordings, class format, duration, Forex & Futures, enrolment and contact.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero crumb={{ name: "FAQ", path: "/faq" }} eyebrow="Questions" title={["Frequently", "asked."]} accentLine={1} intro={<p>Straight answers about the mentorship. Anything else — ask on WhatsApp.</p>} />
      <MotionSection className="pb-12">
        <div className="container-x" data-reveal="rise">
          <Accordion items={faq.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </MotionSection>
      <CTA title={["Still have", "a question?"]} line="Ask your question directly on WhatsApp — we usually reply quickly." secondary={{ label: "Contact", href: "/contact" }} />
    </>
  );
}
