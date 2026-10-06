import { termsAndConditions } from "@/config/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the LiquidityX Academy website and information about mentorship enrolment.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title={["Terms &", "Conditions"]}
      intro="The terms that apply when you use this website and when you enquire about the LiquidityX mentorship."
      sections={termsAndConditions}
    />
  );
}
