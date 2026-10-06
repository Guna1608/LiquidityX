import { riskDisclaimer } from "@/config/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trading Risk Disclaimer",
  description: "Trading involves substantial risk. LiquidityX provides education, not financial advice, and does not guarantee profits.",
  path: "/risk-disclaimer",
});

export default function RiskDisclaimerPage() {
  return (
    <LegalDocument
      eyebrow="Important"
      title={["Trading Risk", "Disclaimer"]}
      intro="Trading involves substantial risk. Please read this before enrolling or acting on anything you learn."
      sections={riskDisclaimer}
    />
  );
}
