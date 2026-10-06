import { privacyPolicy } from "@/config/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How LiquidityX Academy handles information from website visitors, WhatsApp enquiries and chatbot interactions.",
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
