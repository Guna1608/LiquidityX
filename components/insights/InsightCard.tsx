import Link from "next/link";
import type { Insight } from "@/config/insights";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight } from "@/components/ui/Icons";

export function InsightCard({ insight, index }: { insight: Insight; index?: number }) {
  return (
    <Card as="article" tilt={6} className="h-full" innerClassName="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3" data-depth="14">
        <span className="eyebrow">{insight.category}</span>
        {insight.draft && <Badge tone="warning">Draft</Badge>}
      </div>
      {index !== undefined && (
        <span aria-hidden className="pointer-events-none absolute -right-2 top-6 text-[7rem] font-black leading-none tracking-[-0.06em] text-white/[0.03]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3 className="mt-8 text-xl font-bold leading-snug tracking-tight" data-depth="26">
        <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 after:z-[3] after:content-['']">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-mist">{insight.summary}</p>
      <div className="mt-auto flex items-center justify-between pt-8 text-[13px] text-smoke">
        <span>{insight.date ?? "Draft"} · {insight.readMinutes} min read</span>
        <span className="inline-flex items-center gap-1.5 text-gold-200 transition-transform duration-500 group-hover/card:translate-x-1">
          Read more <ArrowUpRight size={13} />
        </span>
      </div>
    </Card>
  );
}
