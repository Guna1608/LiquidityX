import { riskDisclaimer } from "@/config/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trading Risk Disclaimer",
  description: "Losses are part of trading. LiquidityX provides education to help you understand risk and manage losses; it is not financial advice and does not guarantee profits.",
  path: "/risk-disclaimer",
});

export default function RiskDisclaimerPage() {
  return (
    <LegalDocument
      eyebrow="Risk & education"
      title={["Trading Risk", "Disclaimer"]}
      intro="Losses are part of trading. This mentorship teaches you to understand risk, manage losses and build a more disciplined trading process. The education is designed to support better decisions; it cannot eliminate losses or guarantee profits."
      sections={riskDisclaimer}
    />
  );
}
