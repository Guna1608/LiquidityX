"use client";

import { enrolment, schedule, seatNotice, whatsapp } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Calendar, WhatsApp } from "@/components/ui/Icons";
import { GlowOrb } from "@/components/visuals/Glow";
import { cn } from "@/lib/cn";
import { useBatch } from "./useBatch";

/**
 * Upcoming-batch banner. The date is calculated automatically in Asia/Kolkata:
 * the 25th of the month (Monday the 26th if the 25th is a Sunday), starting
 * 8:30 PM IST. The countdown is to the actual start, which is also the
 * registration cut-off.
 */
export function BatchBanner({ className }: { className?: string }) {
  const b = useBatch();
  const left = b?.msLeft ?? null;
  const parts =
    left === null
      ? null
      : [
          ["Days", Math.floor(left / 86400000)],
          ["Hours", Math.floor((left / 3600000) % 24)],
          ["Min", Math.floor((left / 60000) % 60)],
          ["Sec", Math.floor((left / 1000) % 60)],
        ];
  const open = b?.registrationOpen ?? true;
  const checkout = enrolment.checkoutHref && open ? enrolment.checkoutHref : null;

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
            Next batch
          </span>
          <h3 className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {b ? b.dateLabel : "Calculating batch date…"}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-mist">
            <Calendar size={16} className="text-gold-400" /> Classes start at <strong className="font-bold text-bone">{schedule.startTime}</strong>
          </p>
          {b?.adjustmentNote && <p className="mt-2 text-sm text-gold-200">{b.adjustmentNote}</p>}
          <p className="mt-2 text-sm text-smoke">
            {open ? "Registration stays open until the batch starts." : "Registration for this batch is closed. Message us on WhatsApp about the following batch."}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-[13px]">
            {[`${schedule.teachingDays} teaching days`, schedule.days, schedule.platforms, `Taught in ${schedule.language}`].map((t) => (
              <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-bone/85">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5 lg:items-end">
          {parts && open && (
            <div className="grid grid-cols-4 gap-2" aria-label="Time until the batch starts and registration closes">
              {parts.map(([k, v]) => (
                <div key={k as string} className="min-w-16 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center">
                  <p className="text-3xl font-black tabular-nums tracking-tight">{String(v).padStart(2, "0")}</p>
                  <p className="text-[11px] text-smoke">{k}</p>
                </div>
              ))}
            </div>
          )}
          {open && <p className="text-xs text-smoke lg:text-right">{seatNotice.banner}</p>}
          <Button href={checkout ?? whatsapp.url(enrolment.whatsappMessage)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
            {checkout ? "Enrol now" : open ? "Enrol via WhatsApp" : "Ask about the next batch"}
          </Button>
        </div>
      </div>
    </div>
  );
}
