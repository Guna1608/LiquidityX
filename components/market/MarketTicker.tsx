"use client";

import { marketConfig } from "@/config/site";
import { formatPct, formatPrice, modeLabel } from "@/lib/market/format";
import { useMarketQuotes } from "@/lib/market/useMarketData";
import type { Quote } from "@/lib/market/types";
import { cn } from "@/lib/cn";

function Item({ q, dup = false }: { q: Pick<Quote, "symbol" | "price" | "changePct" | "decimals">; dup?: boolean }) {
  const up = (q.changePct ?? 0) >= 0;
  const has = q.changePct !== null;
  return (
    <li
      aria-hidden={dup || undefined}
      className={cn(
        "flex shrink-0 snap-start items-baseline gap-3 px-6 font-mono text-[0.78rem] sm:px-8",
        dup && "pointer-coarse:hidden motion-reduce:hidden",
      )}
    >
      <span className=" text-bone">{q.symbol}</span>
      <span className="tabular-nums text-mist">{formatPrice(q.price, q.decimals)}</span>
      <span className={cn("tabular-nums", !has ? "text-smoke" : up ? "text-up" : "text-down")}>
        {has && <span aria-hidden>{up ? "▲" : "▼"} </span>}
        {formatPct(q.changePct)}
      </span>
      <span aria-hidden className="ml-3 h-3 w-px self-center bg-white/10" />
    </li>
  );
}

/**
 * Continuous market strip. Pauses on hover/focus. Touch devices and
 * reduced-motion users get a native horizontal swipe instead of the marquee.
 * The data mode is always stated on the left — demo data is never "live".
 */
export function MarketTicker({ className }: { className?: string }) {
  const { data, error } = useMarketQuotes(marketConfig.tickerSymbols);
  const quotes: Pick<Quote, "symbol" | "price" | "changePct" | "decimals">[] =
    data?.quotes ?? marketConfig.tickerSymbols.map((s) => ({ symbol: s, price: null, changePct: null, decimals: 2 }));
  const mode = data?.mode;

  return (
    <section aria-label="Market ticker" className={cn("relative border-y border-white/[0.06] bg-ink/70 backdrop-blur-md", className)}>
      <div className="flex items-stretch">
        <div className="relative z-[2] flex shrink-0 items-center gap-2 border-r border-white/[0.06] bg-ink px-4 py-3 sm:px-5">
          <span
            className={cn(
              "size-1.5 rounded-full",
              mode === "live" ? "bg-cyan-300" : mode === "delayed" ? "bg-mist" : "bg-gold-400",
              mode === "live" && "animate-blink",
            )}
          />
          <span className="text-[12px] font-medium text-gold-200 sm:text-[0.62rem]">
            {error ? "DATA UNAVAILABLE" : mode === "demo" ? modeLabel.demo : mode === "delayed" ? "DELAYED" : mode === "live" ? "LIVE" : "LOADING"}
          </span>
        </div>
        <div className="no-scrollbar mask-fade-x relative min-w-0 flex-1 snap-x overflow-x-auto pointer-fine:overflow-hidden motion-reduce:overflow-x-auto">
          <ul
            className="ticker-track flex w-max py-3 [--marquee-duration:70s] pointer-fine:animate-marquee motion-reduce:!animate-none"
            aria-label={mode === "demo" ? "Simulated demo market values" : "Market values"}
          >
            {quotes.map((q) => (
              <Item key={q.symbol} q={q} />
            ))}
            {/* duplicate for a seamless loop — hidden from assistive tech */}
            {quotes.map((q) => (
              <Item key={`${q.symbol}-dup`} q={q} dup />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
