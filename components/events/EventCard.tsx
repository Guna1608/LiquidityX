import Link from "next/link";
import type { LXEvent } from "@/config/site";
import { whatsapp } from "@/config/site";
import { Card } from "@/components/ui/Card";
import { WhatsApp } from "@/components/ui/Icons";

function dateParts(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase(),
    year: d.getFullYear(),
  };
}

/** 3D event card: lifts on hover, background grid drifts, date ignites. */
export function EventCard({ event }: { event: LXEvent }) {
  const { day, month, year } = dateParts(event.date);
  return (
    <Card as="article" tilt={8} className="h-full transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-2" innerClassName="flex h-full flex-col p-6 sm:p-7">
      <div aria-hidden className="absolute inset-0 tech-grid opacity-40 transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover/card:-translate-y-6 group-hover/card:scale-110" />
      <div className="relative flex items-start justify-between gap-4" data-depth="30">
        <div className="rounded-2xl border border-white/10 px-4 py-3 text-center transition-colors duration-500 group-hover/card:border-gold-300/70 group-hover/card:bg-gold-300/10">
          <p className="font-display text-3xl font-semibold leading-none transition-colors group-hover/card:text-gold-200">{day}</p>
          <p className="mt-1 text-[12px] font-medium text-mist">
            {month} {year}
          </p>
        </div>
        <span className="eyebrow">{event.category}</span>
      </div>
      <h3 className="relative mt-8 font-display text-xl font-medium tracking-tight" data-depth="22">
        <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {event.title}
        </Link>
      </h3>
      <p className="relative mt-1 font-mono text-xs text-gold-200/80">{event.time}</p>
      <p className="relative mt-3 text-sm leading-relaxed text-mist">{event.summary}</p>
      <a
        href={whatsapp.url(`Hi LiquidityX, I'd like to enquire about: ${event.title} (${event.date}).`)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-[3] mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm text-gold-200 hover:text-gold-100"
      >
        <WhatsApp size={16} /> Enquire on WhatsApp
      </a>
    </Card>
  );
}
