import type { Metadata } from "next";
import { brand, contact, faq, mentor, mentorship, pricing, schedule, socialLinks } from "@/config/site";

/** Absolute URL helper. */
export const abs = (path = "/") => `${brand.siteUrl}${path === "/" ? "" : path}`;

/** Branded OG image URL for any page (served by app/og/route.tsx). */
export function ogImage({ title, eyebrow, subtitle }: { title: string; eyebrow?: string; subtitle?: string }) {
  const qs = new URLSearchParams({ title, ...(eyebrow ? { eyebrow } : {}), ...(subtitle ? { subtitle } : {}) });
  return `${brand.siteUrl}/og?${qs.toString()}`;
}

/**
 * Complete per-page metadata: title, description, canonical, hreflang,
 * keywords, Open Graph (with a generated 1200×630 image) and Twitter card.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  eyebrow,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  eyebrow?: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = abs(path);
  const image = { url: ogImage({ title, eyebrow: eyebrow ?? brand.academy, subtitle: "15-day curriculum · Taught in Tamil" }), width: 1200, height: 630, alt: `${title} — ${brand.academy}` };
  return {
    title,
    description,
    keywords: [...keywords, ...brand.keywords],
    alternates: { canonical: url, languages: { "en-IN": url, "x-default": url } },
    openGraph: { title: `${title} · ${brand.academy}`, description, url, siteName: brand.academy, locale: brand.locale, type, images: [image] },
    twitter: { card: "summary_large_image", title: `${title} · ${brand.academy}`, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const org = { "@type": "EducationalOrganization", "@id": `${brand.siteUrl}/#organization`, name: brand.academy, url: brand.siteUrl } as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  ...org,
  alternateName: brand.name,
  description: brand.description,
  logo: { "@type": "ImageObject", url: `${brand.siteUrl}/icon.svg` },
  image: ogImage({ title: brand.tagline }),
  email: contact.email,
  sameAs: [socialLinks.instagram.url, socialLinks.telegram.url, socialLinks.youtube.url],
  founder: { "@type": "Person", name: mentor.name, jobTitle: mentor.role },
  knowsLanguage: ["en", "ta"],
  areaServed: "IN",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contact.email,
      availableLanguage: ["English", "Tamil"],
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${brand.siteUrl}/#website`,
  name: brand.academy,
  url: brand.siteUrl,
  inLanguage: "en-IN",
  publisher: { "@id": `${brand.siteUrl}/#organization` },
};

const instance = {
  "@type": "CourseInstance",
  courseMode: "Online",
  courseWorkload: `P${schedule.teachingDays}D`,
  inLanguage: "ta",
  instructor: { "@type": "Person", name: mentor.name },
  // The batch start date is recalculated monthly (25th, or Monday 26th) and is shown on the page, not hard-coded here.
  courseSchedule: { "@type": "Schedule", repeatFrequency: "P1D", byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], startTime: "20:30", scheduleTimezone: "Asia/Kolkata" },
  ...(pricing.currentFee ? { offers: { "@type": "Offer", price: pricing.currentFee.amount, priceCurrency: pricing.currentFee.currency } } : {}),
};

export const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${brand.siteUrl}/mentorship#course`,
  name: "LiquidityX 15-Day Trading Mentorship (Tamil)",
  description: `Structured 15-day curriculum covering ${mentorship.learning.join(", ")} across Forex, Futures and Indian markets. Taught in Tamil.`,
  url: abs("/mentorship"),
  inLanguage: "ta",
  educationalLevel: "Beginner",
  teaches: mentorship.learning,
  provider: org,
  hasCourseInstance: [instance],
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

/** BreadcrumbList for inner pages (Home is prepended). */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
