import Link from "next/link";
import { notFound } from "next/navigation";
import { events, whatsapp } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { GridFallback } from "@/components/3d/Fallbacks";

export const dynamicParams = false;

export function generateStaticParams() {
  // Next requires at least one param for a static dynamic segment; a sentinel keeps the build valid with no events.
  return events.length ? events.map((e) => ({ slug: e.slug })) : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) return { robots: { index: false } };
  return pageMetadata({ title: e.title, description: e.summary, path: `/events/${e.slug}` });
}

/** Cinematic event detail. */
export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();
  const d = new Date(`${e.date}T00:00:00`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationEvent",
          name: e.title,
          startDate: e.date,
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          description: e.summary,
          organizer: { "@type": "Organization", name: "LiquidityX Academy" },
        }}
      />
      <MotionSection className="relative isolate overflow-hidden pb-24 pt-36 md:pt-48">
        <div className="absolute inset-0 -z-10">
          <GridFallback glow="right" />
        </div>
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Link href="/events" className="text-[12px] font-medium text-mist hover:text-gold-200">
              ← Events
            </Link>
            <div className="mt-8 flex gap-3" data-reveal="fade">
              <Badge>{e.category}</Badge>
              {e.status === "past" && <Badge tone="neutral">Past</Badge>}
            </div>
            <TextReveal as="h1" start="mount" lines={[e.title]} mode="words" className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]" />
            <p className="mt-8 max-w-xl text-lg text-mist" data-reveal="rise">
              {e.summary}
            </p>
          </div>
          <div className="panel rounded-3xl p-8 text-center" data-reveal="rotate3d">
            <p className="font-display text-7xl font-semibold leading-none text-gold">{d.toLocaleDateString("en-IN", { day: "2-digit" })}</p>
            <p className="mt-2 text-xs font-medium text-mist">{d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
            <p className="mt-4 font-mono text-sm text-gold-200">{e.time}</p>
            {e.location && <p className="mt-1 text-sm text-mist">{e.location}</p>}
          </div>
        </div>
      </MotionSection>
      {e.body && (
        <MotionSection className="pb-16">
          <div className="container-x max-w-3xl space-y-5 text-[1.05rem] leading-relaxed text-bone/85">
            {e.body.map((p) => (
              <p key={p} data-reveal="rise">
                {p}
              </p>
            ))}
          </div>
        </MotionSection>
      )}
      <div className="container-x pb-28">
        <Button href={whatsapp.url(`Hi LiquidityX, I'd like to enquire about: ${e.title} (${e.date}).`)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
          Enquire on WhatsApp
        </Button>
      </div>
    </>
  );
}
