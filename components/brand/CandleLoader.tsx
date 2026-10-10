import { cn } from "@/lib/cn";

/**
 * Trading-style loader: candles print one after another (with wicks),
 * a price line glides over them and a progress rail fills.
 * Pure CSS animation so it runs instantly, even before JS is idle.
 */
const CANDLES = [
  { h: 34, y: 40, up: true },
  { h: 22, y: 30, up: false },
  { h: 40, y: 18, up: true },
  { h: 26, y: 26, up: false },
  { h: 46, y: 8, up: true },
  { h: 30, y: 14, up: true },
  { h: 52, y: 0, up: true },
];

export function CandleLoader({ label = "Loading market structure…", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)} role="status" aria-live="polite">
      <div className="relative h-[92px] w-[176px]">
        {CANDLES.map((c, i) => (
          <div key={i} className="absolute bottom-0 w-[14px]" style={{ left: i * 24, height: 92 }}>
            <span
              className={cn("lx-candle-wick absolute left-1/2 w-px -translate-x-1/2", c.up ? "bg-up" : "bg-down")}
              style={{ bottom: c.y - 6, height: c.h + 12, animationDelay: `${i * 0.11}s` }}
            />
            <span
              className={cn("lx-candle absolute inset-x-0 rounded-[3px]", c.up ? "bg-up shadow-[0_0_14px_rgba(95,211,154,0.5)]" : "bg-down shadow-[0_0_14px_rgba(255,106,77,0.5)]")}
              style={{ bottom: c.y, height: c.h, animationDelay: `${i * 0.11}s` }}
            />
          </div>
        ))}
        <svg viewBox="0 0 176 92" className="lx-candle-line absolute inset-0 overflow-visible" aria-hidden>
          <polyline points="7,40 31,48 55,34 79,44 103,22 127,26 151,6" fill="none" stroke="#7f93ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        </svg>
      </div>
      <div className="mt-7 flex items-center gap-2.5">
        <span className="text-[13px] font-medium text-mist">{label}</span>
      </div>
      <div className="mt-4 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
        <div className="lx-candle-rail h-full w-full origin-left rounded-full bg-gradient-to-r from-gold-600 to-gold-300" />
      </div>
    </div>
  );
}
