import { mentorship, pricing, whatsapp } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/**
 * Glowing pricing card. Shows the confirmed fee only when
 * `pricing.currentFee` is set — otherwise "Contact for current fee".
 */
export function FeePanel({ className }: { className?: string }) {
  const fee = pricing.currentFee;
  const included = [...mentorship.learning, "Weekday live classes", "Support & follow-up learning"];
  return (
    <div className={cn("relative mx-auto w-full max-w-md", className)}>
      <div aria-hidden className="absolute -inset-px rounded-[30px] bg-[linear-gradient(180deg,rgba(255,157,74,0.9),rgba(255,122,26,0.15)_40%,rgba(255,255,255,0.06))]" />
      <div className="relative overflow-hidden rounded-[29px] bg-[#0b0b0c] p-7 sm:p-9">
        <div aria-hidden className="absolute -top-32 left-1/2 h-64 w-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.55),transparent)] blur-2xl" />
        <div className="relative text-center">
          <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-bone">15-day live mentorship</span>
          {fee ? (
            <p className="mt-6 text-6xl font-black tracking-[-0.05em]">₹{fee.amount.toLocaleString("en-IN")}</p>
          ) : (
            <p className="mt-6 text-[2.6rem] font-black leading-[1.02] tracking-[-0.04em]">
              Contact for
              <br />
              current fee
            </p>
          )}
          <p className="mt-3 text-sm text-mist">{pricing.note}</p>
        </div>
        <ul className="relative mt-8 space-y-2">
          {included.map((t) => (
            <li key={t} className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[14px] text-bone/90">
              <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-gold-400" aria-hidden>
                <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
        <div className="relative mt-8">
          <Button
            href={whatsapp.url("Hi LiquidityX, I'd like to know the current mentorship fee and next batch.")}
            size="lg"
            icon={<WhatsApp size={18} />}
            iconPosition="start"
            className="w-full"
            magnetic={false}
          >
            {mentorship.cta}
          </Button>
          <p className="mt-3 text-center text-xs text-smoke">No class recordings · Taught in Tamil</p>
        </div>
      </div>
    </div>
  );
}
