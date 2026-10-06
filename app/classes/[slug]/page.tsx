import Link from "next/link";
import { notFound } from "next/navigation";
import { classSessions, upcomingBatch, whatsapp } from "@/config/site";
import { breadcrumbJsonLd, classJsonLd, pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar, WhatsApp } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { ClassCard } from "@/components/classes/ClassCard";
import { MiniCandles } from "@/components/visuals/MiniCandles";
import { GlowOrb } from "@/components/visuals/Glow";
import { CTA } from "@/components/sections/CTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return classSessions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/classes/[slug]">) {
  const { slug } = await params;
  const c = classSessions.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: `Class ${c.index}: ${c.title} — Live Trading Class`,
    description: `${c.summary} ${c.outcome} Live class in the LiquidityX 15-day Forex & Futures mentorship.`,
    path: `/classes/${c.slug}`,
  });
}

export default async function ClassPage({ params }: PageProps<"/classes/[slug]">) {
  const { slug } = await params;
  const i = classSessions.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = classSessions[i];
  const prev = classSessions[i - 1];
  const next = classSessions[i + 1];
  const others = classSessions.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={classJsonLd(c)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Classes", path: "/classes" }, { name: c.title, path: `/classes/${c.slug}` }])} />

      <MotionSection className="relative isolate overflow-hidden pb-16 pt-36 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 tech-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000,transparent)]" />
          <GlowOrb className="-right-40 -top-20 size-[36rem]" intensity={0.3} />
        </div>
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="text-[13px] text-smoke" data-reveal="fade">
            <Link href="/classes" className="hover:text-bone">
              Classes
            </Link>{" "}
            / <span className="text-mist">{c.title}</span>
          </nav>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-mist" data-reveal="blur">
                <span className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_#ff7a1a]" /> Class {c.index} · {c.level}
              </span>
              <TextReveal as="h1" start="mount" delay={0.1} lines={[c.title]} className="mt-6 text-[clamp(2.8rem,8vw,6.6rem)] font-black leading-[0.95] tracking-[-0.05em]" />
              <p className="mt-6 max-w-xl text-lg text-mist" data-reveal="rise" data-delay="0.3">
                {c.summary} {c.outcome}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal="rise" data-delay="0.4">
                <Button href={whatsapp.url(`Hi LiquidityX, I'd like to join the next batch (Class ${c.index}: ${c.title}).`)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
                  Reserve a seat
                </Button>
                <Button href="/classes" size="lg" variant="ghost" icon={<Calendar size={17} />} iconPosition="start">
                  All classes
                </Button>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-[24px] border border-white/[0.08] bg-[radial-gradient(120%_90%_at_50%_100%,rgba(255,122,26,0.18),transparent_60%),#0a0a0b] p-5 sm:h-72" data-reveal="blur" data-delay="0.2">
              <MiniCandles seed={Number(c.index) * 11} count={30} className="absolute inset-5" />
              <span className="absolute bottom-3 right-4 text-[11px] text-smoke">Illustrative</span>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight" data-reveal="rise">
              What this class covers
            </h2>
            <ol className="mt-8 space-y-3" data-reveal-group="0.06">
              {c.topics.map((t, k) => (
                <li key={t} data-reveal="rise" className="group flex items-center gap-5 rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-5 py-4 transition-colors hover:border-gold-500/40 hover:bg-gold-500/[0.05]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-sm font-bold text-gold-300 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                    {k + 1}
                  </span>
                  <span className="text-[16px] font-medium">{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="h-fit space-y-3 lg:sticky lg:top-28" data-reveal="rotate3d">
            <div className="rounded-[24px] border border-white/[0.08] bg-[#0c0c0d] p-6">
              <p className="text-sm font-bold">Class format</p>
              <dl className="mt-4 space-y-3 text-[14px]">
                {[
                  ["Batch", upcomingBatch.startDate ? new Date(upcomingBatch.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "Dates announced on WhatsApp"],
                  ["Schedule", upcomingBatch.schedule],
                  ["Platform", upcomingBatch.platform],
                  ["Language", upcomingBatch.language],
                  ["Recordings", "Not provided — classes are live"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                    <dt className="text-smoke">{k}</dt>
                    <dd className="text-right text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-[24px] border border-gold-500/30 bg-gold-500/[0.06] p-6">
              <p className="text-sm font-bold text-gold-100">You&apos;ll be able to</p>
              <p className="mt-2 text-[15px] text-bone/90">{c.outcome}</p>
            </div>
          </aside>
        </div>
      </MotionSection>

      <MotionSection className="py-10">
        <div className="container-x grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`/classes/${prev.slug}`} className="group rounded-[22px] border border-white/[0.08] p-6 transition-colors hover:border-white/20" data-reveal="rise">
              <span className="text-xs text-smoke">← Previous class</span>
              <p className="mt-1 text-xl font-bold group-hover:text-gold-200">
                {prev.index} · {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/classes/${next.slug}`} className="group rounded-[22px] border border-white/[0.08] p-6 text-right transition-colors hover:border-white/20" data-reveal="rise">
              <span className="text-xs text-smoke">Next class →</span>
              <p className="mt-1 text-xl font-bold group-hover:text-gold-200">
                {next.index} · {next.title}
              </p>
            </Link>
          )}
        </div>
      </MotionSection>

      <MotionSection className="py-16">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight" data-reveal="rise">
              More classes in this batch
            </h2>
            <Link href="/classes" className="hidden items-center gap-1 text-sm text-mist hover:text-bone sm:inline-flex">
              All classes <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3" data-reveal-group="0.08">
            {others.map((o) => (
              <div key={o.slug} data-reveal="rise">
                <ClassCard c={o} />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <CTA title={["Learn this", "live."]} message={`Hi LiquidityX, I'd like to join the next batch (Class ${c.index}: ${c.title}).`} />
    </>
  );
}
