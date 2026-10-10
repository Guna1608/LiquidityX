import { cn } from "@/lib/cn";

/** Glowing horizon arc — the warm "sunrise" under the hero headline. */
export function Horizon({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0", className)}>
      <div className="absolute left-1/2 top-0 aspect-[2.6/1] w-[170%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(82,120,255,0.55),rgba(82,120,255,0.18)_45%,transparent_72%)] blur-2xl sm:w-[130%]" />
      <div className="absolute left-1/2 top-[6%] aspect-[2.6/1] w-[150%] -translate-x-1/2 rounded-[50%] border-t border-gold-200/70 shadow-[0_-10px_60px_rgba(127,147,255,0.55)] sm:w-[112%]" />
      <div className="absolute left-1/2 top-[6.5%] aspect-[2.6/1] w-[150%] -translate-x-1/2 rounded-[50%] bg-ink sm:w-[112%]" />
    </div>
  );
}

/** Soft animated orb of light — used behind CTAs and feature panels. */
export function GlowOrb({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute animate-orb rounded-full", className)} style={{ opacity: intensity }}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#eef0ff_0%,#a9b8ff_12%,#5278ff_32%,rgba(224,94,9,0.35)_55%,transparent_70%)] blur-xl" />
    </div>
  );
}

/** Ambient page backdrop: faint grid, top glow, grain. */
export function Ambient({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 tech-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />
      <div className="absolute left-1/2 top-[-30%] h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(82,120,255,0.16),transparent)] blur-3xl" />
    </div>
  );
}
