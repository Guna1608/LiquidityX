import { whatsapp } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Calendar, WhatsApp } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/** Shown whenever there are no owner-published events — never invent events. */
export function EventsEmptyState({ compact = false, label }: { compact?: boolean; label?: string }) {
  return (
    <div className={cn("panel relative overflow-hidden rounded-[2rem] text-center", compact ? "px-6 py-14" : "px-6 py-20 md:py-28")}>
      <div aria-hidden className="absolute inset-0 tech-grid opacity-50 [mask-image:radial-gradient(55%_60%_at_50%_50%,#000,transparent)]" />
      <div aria-hidden className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/15" />
      <div aria-hidden className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-cyan-400/15" />
      <div className="relative">
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold-400/40 text-gold-200">
          <Calendar size={22} />
        </span>
        {label && <p className="eyebrow mt-6">{label}</p>}
        <p className={cn("mx-auto mt-5 max-w-md font-display font-medium tracking-tight", compact ? "text-2xl" : "text-[clamp(1.8rem,4vw,2.8rem)]")}>
          New masterclasses are being <span className="text-gold">prepared.</span>
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm text-mist">Dates are announced directly. Message us to be notified when the next session opens.</p>
        <div className="mt-8 flex justify-center">
          <Button href={whatsapp.url("Hi LiquidityX, please notify me about upcoming masterclasses and events.")} icon={<WhatsApp size={17} />} iconPosition="start">
            Get Updates on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
