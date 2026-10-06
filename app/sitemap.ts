import type { MetadataRoute } from "next";
import { brand, classSessions, events } from "@/config/site";
import { insights } from "@/config/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.siteUrl;
  const now = new Date();
  const routes: [string, number][] = [
    ["", 1],
    ["/about", 0.8],
    ["/mentorship", 0.9],
    ["/classes", 0.9],
    ["/strategies", 0.8],
    ["/learning", 0.8],
    ["/insights", 0.7],
    ["/market", 0.5],
    ["/events", 0.6],
    ["/faq", 0.7],
    ["/contact", 0.7],
    ["/privacy", 0.3],
    ["/terms", 0.3],
    ["/risk-disclaimer", 0.4],
  ];
  return [
    ...routes.map(([p, priority]) => ({ url: `${base}${p}`, lastModified: now, priority })),
    // draft articles are noindex until published
    ...insights.filter((i) => !i.draft).map((i) => ({ url: `${base}/insights/${i.slug}`, lastModified: i.date ? new Date(i.date) : now, priority: 0.6 })),
    ...classSessions.map((c) => ({ url: `${base}/classes/${c.slug}`, lastModified: now, priority: 0.8, changeFrequency: "weekly" as const })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, lastModified: now, priority: 0.5 })),
  ];
}
