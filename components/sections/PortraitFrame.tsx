import Image from "next/image";
import { mentor } from "@/config/site";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

/**
 * Mentor portrait with layered depth (mouse parallax through Card), gold
 * outline and corner brackets. Until the owner supplies a photo, a designed
 * line-art placeholder is shown and clearly labelled.
 */
export function PortraitFrame({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Card tilt={7} className={cn("aspect-[4/5] w-full", className)} innerClassName="!rounded-[1.75rem] bg-graphite">
      <div className="absolute inset-0 tech-grid opacity-60" data-depth="0" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(214,174,99,0.18),transparent_70%)]" />

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
        <div className="absolute inset-0" data-depth="28" role="img" aria-label="Portrait placeholder — photo to be supplied by LiquidityX">
          <svg viewBox="0 0 400 500" className="absolute inset-x-0 bottom-0 h-[88%] w-full" aria-hidden>
            <defs>
              <linearGradient id="pf-g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ffdcb5" stopOpacity="0.95" />
                <stop offset="1" stopColor="#6e2c05" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#pf-g)" strokeWidth="1.3">
              <ellipse cx="200" cy="170" rx="62" ry="76" />
              <path d="M150 232c-10 22-12 36-12 46M250 232c10 22 12 36 12 46" />
              <path d="M60 500c6-110 56-170 140-178 84 8 134 68 140 178" />
              <path d="M138 278c18 22 40 32 62 32s44-10 62-32" strokeOpacity="0.6" />
            </g>
            <g stroke="#8ea3b8" strokeOpacity="0.35" strokeDasharray="3 5">
              <line x1="0" x2="400" y1="170" y2="170" />
              <line x1="200" x2="200" y1="60" y2="500" />
            </g>
          </svg>
        </div>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-4 rounded-[1.25rem] border border-gold-400/25" data-depth="44" />
      {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 right-3 border-b border-r", "bottom-3 left-3 border-b border-l"].map((c) => (
        <span key={c} aria-hidden className={cn("pointer-events-none absolute size-6 border-gold-300", c)} data-depth="54" />
      ))}

      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4" data-depth="60">
        <div>
          <p className="font-display text-2xl font-medium">{mentor.name}</p>
          <p className="eyebrow mt-1">{mentor.role}</p>
        </div>
        {!mentor.portrait && <span className="text-[12px] font-medium text-smoke">Portrait to be supplied</span>}
      </div>
    </Card>
  );
}
