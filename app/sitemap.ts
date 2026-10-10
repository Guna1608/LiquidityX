import type { MetadataRoute } from "next";
import { brand } from "@/config/site";
import { listedInsights } from "@/config/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.siteUrl;
  const now = new Date();
  const routes: [string, number][] = [
    ["", 1],
    ["/about", 0.8],
    ["/mentorship", 0.9],
    ["/classes", 0.9],
    ["/strategies", 0.7],
    ["/learning", 0.8],
    ["/market", 0.4],
    ["/faq", 0.7],
    ["/contact", 0.7],
    ["/privacy", 0.3],
    ["/terms", 0.3],
    ["/risk-disclaimer", 0.4],
    // Articles are listed only once at least one has been approved.
    ...(listedInsights.length ? ([["/insights", 0.7]] as [string, number][]) : []),
  ];
  return [
    ...routes.map(([p, priority]) => ({ url: `${base}${p}`, lastModified: now, priority })),
    ...listedInsights.map((i) => ({ url: `${base}/insights/${i.slug}`, lastModified: i.date ? new Date(i.date) : now, priority: 0.6 })),
  ];
}
