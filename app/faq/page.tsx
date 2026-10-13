import { faq } from "@/config/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "LiquidityX Academy FAQ — course structure, batch dates, 8:30 PM IST classes, fee, recordings, repeats, support and contact.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero crumb={{ name: "FAQ", path: "/faq" }} eyebrow="Questions" title={["Frequently", "asked."]} accentLine={1} intro={<p>Straight answers about the course, batches and enrolment terms. Anything else — message us on WhatsApp.</p>} />
      <MotionSection className="pb-12">
        <div className="container-x" data-reveal="rise">
          <Accordion items={faq.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </MotionSection>
      <CTA title={["Still have", "a question?"]} line="Message us on WhatsApp for a quick response." secondary={{ label: "Contact", href: "/contact" }} />
    </>
  );
}
