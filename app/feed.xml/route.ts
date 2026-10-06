import { brand } from "@/config/site";
import { insights } from "@/config/insights";

/** RSS feed of published Market Insights (drafts are excluded). */
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = insights
    .filter((i) => !i.draft)
    .map(
      (i) => `<item><title>${esc(i.title)}</title><link>${brand.siteUrl}/insights/${i.slug}</link><guid>${brand.siteUrl}/insights/${i.slug}</guid><description>${esc(i.summary)}</description>${i.date ? `<pubDate>${new Date(i.date).toUTCString()}</pubDate>` : ""}<category>${esc(i.category)}</category></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(brand.academy)} — Market Insights</title><link>${brand.siteUrl}/insights</link><description>Educational insights on market structure, volume, profile and order flow.</description><language>en-in</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600" } });
}
