import { enrolment, mentorship, pricing, whatsapp } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { NextBatchDate } from "@/components/classes/NextBatchDate";
import { cn } from "@/lib/cn";

/**
 * Glowing fee card. The fee comes from `pricing.currentFee` (owner-managed).
 * Online checkout is only offered once `enrolment.checkoutHref` is set — i.e.
 * after a payment gateway is configured and tested. Until then enrolment is
 * arranged on WhatsApp and nothing implies a working checkout.
 */
export function FeePanel({ className }: { className?: string }) {
  const fee = pricing.currentFee;
  const open = enrolment.registrationOpen;
  const checkout = enrolment.checkoutHref && open ? enrolment.checkoutHref : null;
  const amount = fee?.amount.toLocaleString("en-IN");
  return (
    <div className={cn("relative mx-auto w-full max-w-md", className)}>
      <div aria-hidden className="absolute -inset-px rounded-[30px] bg-[linear-gradient(180deg,rgba(255,157,74,0.9),rgba(255,122,26,0.15)_40%,rgba(255,255,255,0.06))]" />
      <div className="relative overflow-hidden rounded-[29px] bg-[#0b0b0c] p-7 sm:p-9">
        <div aria-hidden className="absolute -top-32 left-1/2 h-64 w-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.55),transparent)] blur-2xl" />
        <div className="relative text-center">
          <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-bone">15-day curriculum · Taught in Tamil</span>
          {fee ? (
            <p className="mt-6 text-6xl font-black tracking-[-0.05em]">₹{amount}</p>
          ) : (
            <p className="mt-6 text-[2rem] font-black leading-[1.05] tracking-[-0.04em]">Message us for the current fee</p>
          )}
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-mist">{pricing.note}</p>
        </div>
        <NextBatchDate className="relative mt-6" />
        <ul className="relative mt-6 space-y-2">
          {mentorship.included.map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[14px] leading-snug text-bone/90">
              <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden>
                <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
        <div className="relative mt-8">
          <Button href={checkout ?? whatsapp.url(enrolment.whatsappMessage)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start" className="w-full" magnetic={false}>
            {checkout ? `Enrol — pay ₹${amount}` : open ? "Enrol via WhatsApp" : "Registration closed — ask on WhatsApp"}
          </Button>
          <p className="mt-3 text-center text-xs text-smoke">No class recordings · Read the terms before paying</p>
        </div>
      </div>
    </div>
  );
}
