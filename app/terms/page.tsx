import { termsAndConditions } from "@/config/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the LiquidityX Academy website and enrolling in the course: fee, batches, missed classes, repeats, batch transfers and the no-refund policy.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title={["Terms &", "Conditions"]}
      intro="The terms that apply when you use this website and when you pay for and join the LiquidityX Academy course."
      sections={termsAndConditions}
    />
  );
}
