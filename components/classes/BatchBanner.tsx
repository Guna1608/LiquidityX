"use client";

import { useEffect, useState } from "react";
import { upcomingBatch, whatsapp } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Calendar, WhatsApp } from "@/components/ui/Icons";
import { GlowOrb } from "@/components/visuals/Glow";
import { cn } from "@/lib/cn";

function useCountdown(iso: string | null) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    if (!iso) return;
    const target = new Date(iso).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return left;
}

/**
 * Upcoming batch banner. Shows a live countdown once `upcomingBatch.startDate`
 * is set in config; until then: "Dates announced on WhatsApp".
 */
export function BatchBanner({ className }: { className?: string }) {
  const b = upcomingBatch;
  const left = useCountdown(b.startDate);
  const parts =
    left === null
      ? null
      : [
          ["Days", Math.floor(left / 86400000)],
          ["Hours", Math.floor((left / 3600000) % 24)],
          ["Min", Math.floor((left / 60000) % 60)],
          ["Sec", Math.floor((left / 1000) % 60)],
        ];
  const dateLabel = b.startDate
    ? new Date(b.startDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    : "Dates announced on WhatsApp";

  return (
    <div className={cn("relative isolate overflow-hidden rounded-[28px] border border-gold-500/30 bg-[#0c0b0a] p-6 sm:p-9", className)}>
      <GlowOrb className="-right-24 -top-32 -z-10 size-[26rem]" intensity={0.55} />
      <div aria-hidden className="absolute inset-0 -z-10 dot-grid opacity-30" />
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1 text-[12px] font-semibold text-gold-300">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400" />
              <span className="relative size-1.5 rounded-full bg-gold-400" />
            </span>
            Upcoming batch
          </span>
          <h3 className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.035em]">{b.name}</h3>
          <p className="mt-2 flex items-center gap-2 text-mist">
            <Calendar size={16} className="text-gold-400" /> {dateLabel}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-[13px]">
            {[b.schedule, b.platform, b.language, "15 days · live", ...(b.seats ? [b.seats] : [])].map((t) => (
              <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-bone/85">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5 lg:items-end">
          {parts && (
            <div className="grid grid-cols-4 gap-2" aria-label="Time until the batch starts">
              {parts.map(([k, v]) => (
                <div key={k as string} className="min-w-16 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center">
                  <p className="text-3xl font-black tabular-nums tracking-tight">{String(v).padStart(2, "0")}</p>
                  <p className="text-[11px] text-smoke">{k}</p>
                </div>
              ))}
            </div>
          )}
          <Button href={whatsapp.url("Hi LiquidityX, I'd like to reserve a seat in the next batch.")} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
            Reserve a seat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
