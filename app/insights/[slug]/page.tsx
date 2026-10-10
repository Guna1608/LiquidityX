import Link from "next/link";
import { notFound } from "next/navigation";
import { articleByline, insights, listedInsights, showDrafts } from "@/config/insights";
import { brand } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { Badge } from "@/components/ui/Badge";
import { InsightCard } from "@/components/insights/InsightCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTA } from "@/components/sections/CTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = insights.find((i) => i.slug === slug);
  if (!a || (a.draft && !showDrafts)) return {};
  return { ...pageMetadata({ title: a.title, description: a.summary, path: `/insights/${a.slug}`, type: "article" }), robots: a.draft ? { index: false, follow: false } : undefined };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = insights.find((i) => i.slug === slug);
  // Unapproved drafts are not public: they 404 unless drafts are explicitly enabled for preview.
  if (!article || (article.draft && !showDrafts)) notFound();
  const pool = showDrafts ? insights : listedInsights;
  const related = pool.filter((i) => i.slug !== slug && i.category === article.category).concat(pool.filter((i) => i.slug !== slug)).slice(0, 3);
  const unique = Array.from(new Map(related.map((r) => [r.slug, r])).values()).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          author: { "@type": "Person", name: "Vignesh", jobTitle: "Founder & Mentor" },
          publisher: { "@type": "Organization", name: brand.academy },
          ...(article.date ? { datePublished: article.date } : {}),
        }}
      />
      <MotionSection as="article" className="pb-16 pt-36 md:pt-44">
        <div className="container-x max-w-4xl">
          <Link href="/insights" className="text-[12px] font-medium text-mist hover:text-gold-200" data-reveal="fade">
            ← Articles
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal="fade">
            <Badge>{article.category}</Badge>
            {article.draft && <Badge tone="warning">Draft preview — not public</Badge>}
          </div>
          <TextReveal as="h1" start="mount" lines={[article.title]} mode="words" className="mt-8 text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]" />
          <p className="mt-6 text-lg text-mist" data-reveal="rise" data-delay="0.3">
            {article.summary}
          </p>
          <p className="mt-6 text-[12px] font-medium text-smoke" data-reveal="fade">
            {articleByline}
            <span aria-hidden> · </span>
            {article.date ? `${article.date} · ` : ""}
            {article.readMinutes} min read
          </p>
          <div aria-hidden className="mt-10 h-px bg-gradient-to-r from-gold-400/60 via-white/10 to-transparent" data-reveal="clip" />
          <div className="mt-10 space-y-7 text-[1.06rem] leading-[1.8] text-bone/85">
            {article.body.map((b, i) => (
              <div key={i} data-reveal="rise">
                {b.heading && <h2 className="mb-3 font-display text-2xl font-medium tracking-tight text-bone">{b.heading}</h2>}
                {b.text && <p>{b.text}</p>}
                {b.list && (
                  <ul className={`${b.text ? "mt-4 " : ""}list-none space-y-2.5`}>
                    {b.list.map((li) => (
                      <li key={li} className="relative pl-6 before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-3 before:bg-gold-400">
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="mt-14 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-sm text-smoke">
            Educational content only — not financial advice and not a recommendation to buy or sell. Trading involves substantial risk.{" "}
            <Link href="/risk-disclaimer" className="text-mist underline underline-offset-4">
              Risk disclaimer
            </Link>
            .
          </p>
        </div>
      </MotionSection>
      <MotionSection className="py-16">
        <div className="container-x">
          <p className="eyebrow mb-8">Keep reading</p>
          <div className="grid gap-4 md:grid-cols-3" data-reveal-group="0.1">
            {unique.map((r, i) => (
              <div key={r.slug} data-reveal="rise">
                <InsightCard insight={r} index={i} />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>
      <CTA />
    </>
  );
}
