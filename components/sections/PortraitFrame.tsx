import Image from "next/image";
import { mentor } from "@/config/site";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

/**
 * Mentor card. Until the owner supplies a real portrait this is a clean,
 * name-based layout — no silhouette, no invented imagery and no "portrait
 * missing" message. When `mentor.portrait` is set, the photo is shown instead.
 */
export function PortraitFrame({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Card tilt={7} className={cn("aspect-[4/5] w-full", className)} innerClassName="!rounded-[1.75rem] bg-graphite">
      <div className="absolute inset-0 tech-grid opacity-60" data-depth="0" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(255,122,26,0.2),transparent_70%)]" />

      {mentor.portrait ? (
        <Image
          src={mentor.portrait}
          alt={`${mentor.name}, ${mentor.role}, LiquidityX Academy`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-10" data-depth="28">
          <p className="eyebrow">Founder &amp; Mentor</p>
          <p className="mt-4 text-[clamp(3rem,9vw,4.6rem)] font-black leading-[0.95] tracking-[-0.05em] text-bone">{mentor.name}</p>
          <p className="mt-2 text-sm text-mist">LiquidityX Academy</p>
          <dl className="mt-10 grid grid-cols-1 gap-3">
            {[
              ["Trading", mentor.tradingExperience],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <dt className="text-xs text-smoke">{k} experience</dt>
                <dd className="mt-1 text-xl font-bold text-gold-200">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-4 rounded-[1.25rem] border border-gold-400/25" data-depth="44" />
      {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 right-3 border-b border-r", "bottom-3 left-3 border-b border-l"].map((c) => (
        <span key={c} aria-hidden className={cn("pointer-events-none absolute size-6 border-gold-300", c)} data-depth="54" />
      ))}

      {mentor.portrait && (
        <div className="absolute inset-x-6 bottom-6" data-depth="60">
          <p className="font-display text-2xl font-medium">{mentor.name}</p>
          <p className="eyebrow mt-1">{mentor.role}</p>
        </div>
      )}
    </Card>
  );
}
