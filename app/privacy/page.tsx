import { privacyPolicy } from "@/config/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How LiquidityX Academy handles payments, registration details, analytics, WhatsApp enquiries and website assistant conversations (kept for 30 days).",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title={["Privacy", "Policy"]}
      intro="What we collect, why, and the choices you have. Written in plain language."
      sections={privacyPolicy}
    />
  );
}
