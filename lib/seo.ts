import type { Metadata } from "next";
import { brand, classSessions, contact, faq, mentor, mentorship, socialLinks, testimonials, upcomingBatch, type ClassSession } from "@/config/site";

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
  const image = { url: ogImage({ title, eyebrow: eyebrow ?? brand.academy, subtitle: "15-day live Forex & Futures mentorship" }), width: 1200, height: 630, alt: `${title} — ${brand.academy}` };
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
  image: ogImage({ title: "Understand the market. Trade with clarity." }),
  email: contact.email,
  telephone: contact.phoneDisplay.replace(/\s/g, ""),
  sameAs: [socialLinks.instagram.url, socialLinks.telegram.url],
  founder: { "@type": "Person", name: mentor.name, jobTitle: mentor.role },
  knowsLanguage: ["en", "ta"],
  areaServed: "IN",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: contact.phoneDisplay.replace(/\s/g, ""),
      email: contact.email,
      availableLanguage: ["English", "Tamil"],
    },
  ],
  ...(testimonials.length && testimonials.some((t) => t.rating)
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (testimonials.filter((t) => t.rating).reduce((n, t) => n + (t.rating ?? 0), 0) / testimonials.filter((t) => t.rating).length).toFixed(1),
          reviewCount: testimonials.filter((t) => t.rating).length,
        },
      }
    : {}),
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
  courseWorkload: "P15D",
  inLanguage: "ta",
  instructor: { "@type": "Person", name: mentor.name },
  ...(upcomingBatch.startDate ? { startDate: upcomingBatch.startDate } : {}),
  courseSchedule: { "@type": "Schedule", repeatFrequency: "P1D", byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
};

export const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${brand.siteUrl}/mentorship#course`,
  name: "LiquidityX 15-Day Live Forex & Futures Trading Mentorship",
  description: `Live mentorship covering ${mentorship.learning.join(", ")} for Forex and Futures. Taught in Tamil.`,
  url: abs("/mentorship"),
  inLanguage: "ta",
  educationalLevel: "Beginner to intermediate",
  teaches: mentorship.learning,
  provider: org,
  hasCourseInstance: [instance],
  hasPart: classSessions.map((c) => ({ "@type": "Course", name: c.title, url: abs(`/classes/${c.slug}`) })),
};

export const classesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "LiquidityX live classes",
  itemListElement: classSessions.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/classes/${c.slug}`), name: c.title })),
};

export function classJsonLd(c: ClassSession) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${c.title} — LiquidityX live class`,
    description: `${c.summary} ${c.outcome}`,
    url: abs(`/classes/${c.slug}`),
    teaches: c.topics,
    inLanguage: "ta",
    provider: org,
    isPartOf: { "@id": `${brand.siteUrl}/mentorship#course` },
    hasCourseInstance: [instance],
  };
}

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
