"use client";

import type { Quote } from "@/lib/market/types";
import { formatChange, formatPct, formatPrice } from "@/lib/market/format";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { Sparkline } from "./Sparkline";

/** Market Pulse tile — tilts into 3D on hover, opens a detail chart on click. */
export function MarketCard({
  label,
  quote,
  secondary,
  demo,
  onOpen,
}: {
  label: string;
  quote: Quote | null;
  secondary?: Quote | null;
  demo: boolean;
  onOpen?: () => void;
}) {
  const up = (quote?.changePct ?? 0) >= 0;
  return (
    <Card as="article" tilt={10} className="h-full" innerClassName="p-5 sm:p-6">
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-[3] rounded-[1.25rem]"
        aria-label={`Open ${quote?.symbol ?? label} detailed chart${demo ? " (simulated demo data)" : ""}`}
      />
      <div className="preserve-3d relative flex h-full flex-col">
        <div className="flex items-center justify-between" data-depth="18">
          <span className="eyebrow">{label}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[12px] font-medium",
              quote?.session === "open" ? "text-up" : "text-smoke",
            )}
            title="Session status estimated from the trading clock"
          >
            <span className={cn("size-1.5 rounded-full", quote?.session === "open" ? "bg-up" : "border border-smoke")} />
            {quote?.session === "open" ? "In session" : "Closed"}
          </span>
        </div>

        <div className="mt-6" data-depth="34">
          <p className="text-[12px] font-medium text-mist">{quote?.symbol ?? "—"}</p>
          <p className="mt-1 font-display text-[1.75rem] font-medium tabular-nums tracking-tight text-bone sm:text-[2rem]">
            {formatPrice(quote?.price ?? null, quote?.decimals)}
          </p>
          <p className={cn("mt-1 font-mono text-[0.8rem] tabular-nums", quote?.changePct == null ? "text-smoke" : up ? "text-up" : "text-down")}>
            {formatChange(quote?.change ?? null, quote?.decimals)} <span className="opacity-70">({formatPct(quote?.changePct ?? null)})</span>
          </p>
        </div>

        <div className="mt-5" data-depth="22">
          <Sparkline values={quote?.sparkline ?? []} up={up} className="h-12 w-full" />
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          {secondary ? (
            <span className="font-mono text-[0.68rem] text-mist">
              {secondary.symbol} <span className="tabular-nums text-bone">{formatPrice(secondary.price, secondary.decimals)}</span>
            </span>
          ) : (
            <span className="text-[12px] font-medium text-smoke">{demo ? "Demo / Simulated" : "May be delayed"}</span>
          )}
          <span className="grid size-8 place-items-center rounded-full border border-white/10 text-gold-200 transition-all duration-500 group-hover/card:rotate-45 group-hover/card:border-gold-400/50">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Card>
  );
}
