import Link from "next/link";
import type { ClassSession } from "@/config/site";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight } from "@/components/ui/Icons";
import { MiniCandles } from "@/components/visuals/MiniCandles";
import { cn } from "@/lib/cn";

const levelTone: Record<ClassSession["level"], string> = {
  Foundation: "text-up border-up/30 bg-up/10",
  Core: "text-gold-300 border-gold-500/30 bg-gold-500/10",
  Applied: "text-down border-down/30 bg-down/10",
};

/** Class session card: animated mini-chart header, level chip, topic count, link to detail page. */
export function ClassCard({ c, className }: { c: ClassSession; className?: string }) {
  return (
    <Card as="article" tilt={8} className={cn("h-full", className)} innerClassName="flex h-full flex-col p-2">
      <div className="relative h-36 overflow-hidden rounded-[16px] border border-white/[0.06] bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,122,26,0.16),transparent_60%),#0a0a0b]">
        <MiniCandles seed={Number(c.index) * 11} className="absolute inset-x-3 bottom-3 top-8" />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-bone backdrop-blur">Class {c.index}</span>
        <span className={cn("absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[11px] font-medium", levelTone[c.level])}>{c.level}</span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5" data-depth="18">
        <h3 className="text-xl font-bold tracking-tight">
          <Link href={`/classes/${c.slug}`} className="after:absolute after:inset-0 after:z-[3] after:content-['']">
            {c.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-[14px] text-mist">{c.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-[13px]">
          <span className="text-smoke">
            {c.topics.length} topics · Live
          </span>
          <span className="grid size-9 place-items-center rounded-full border border-white/10 text-gold-300 transition-all duration-500 group-hover/card:rotate-45 group-hover/card:border-gold-500 group-hover/card:bg-gold-500 group-hover/card:text-white">
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Card>
  );
}
