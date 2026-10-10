"use client";

import { schedule } from "@/config/site";
import { useBatch } from "./useBatch";
import { cn } from "@/lib/cn";

/** Compact "next batch" block: adjusted start date, start time and registration state. */
export function NextBatchDate({ className }: { className?: string }) {
  const b = useBatch(30_000);
  return (
    <div className={cn("rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left", className)} aria-live="polite">
      <p className="text-xs text-smoke">Next batch starts</p>
      <p className="mt-1 text-[15px] font-bold text-bone">{b ? b.dateLabel : "Calculating date…"}</p>
      <p className="mt-0.5 text-xs text-mist">
        {schedule.startTime}
        {b && !b.registrationOpen ? " · Registration closed for this batch" : b ? " · Registration open until the batch starts" : ""}
      </p>
      {b?.adjustmentNote && <p className="mt-1 text-xs text-gold-200">{b.adjustmentNote}</p>}
    </div>
  );
}
