"use client";

import { useState } from "react";
import { marketConfig } from "@/config/site";
import { formatPct, formatPrice } from "@/lib/market/format";
import { useMarketQuotes } from "@/lib/market/useMarketData";
import { cn } from "@/lib/cn";
import { MarketChart } from "./MarketChart";
import { Sparkline } from "./Sparkline";

const allSymbols = marketConfig.instruments.map((i) => i.symbol);

/** /market — large chart with timeframe selector + grouped instrument boards. */
export function MarketDashboard() {
  const { data, error } = useMarketQuotes(allSymbols, { sparkline: true });
  const [symbol, setSymbol] = useState(marketConfig.instruments[0].symbol);
  const selected = marketConfig.instruments.find((i) => i.symbol === symbol)!;
  const demo = data?.mode === "demo";

  return (
    <div>
      {(demo || error) && (
        <div role="status" className="mb-8 flex flex-col gap-2 rounded-2xl border border-gold-500/40 bg-gold-600/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gold-100">
            <strong className="font-medium">Connect a market-data provider to enable live pricing.</strong>{" "}
            <span className="text-mist">Values below are simulated demo data — not live and not for trading.</span>
          </p>
          <code className="shrink-0 font-mono text-[0.68rem] text-smoke">MARKET_DATA_PROVIDER · TWELVEDATA_API_KEY</code>
        </div>
      )}

      <div className="panel rounded-[1.75rem] p-4 sm:p-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium text-smoke">{selected.name}</p>
            <p className="mt-1 font-display text-3xl font-medium tracking-tight sm:text-4xl">{selected.symbol}</p>
          </div>
          <label className="flex items-center gap-3 text-sm text-mist">
            <span className="sr-only sm:not-sr-only">Instrument</span>
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="h-10 rounded-full border border-white/10 bg-ink px-4 font-mono text-xs text-bone focus:border-gold-400/50 focus:outline-none"
            >
              {marketConfig.instruments.map((i) => (
                <option key={i.symbol} value={i.symbol}>
                  {i.symbol}
                </option>
              ))}
            </select>
          </label>
        </div>
        <MarketChart symbol={symbol} height={440} />
      </div>

      <div className="mt-16 space-y-14">
        {marketConfig.groups.map((g) => {
          const quotes = (data?.quotes ?? []).filter((q) => q.group === g.id);
          const instruments = marketConfig.instruments.filter((i) => i.group === g.id);
          return (
            <section key={g.id} aria-labelledby={`grp-${g.id}`}>
              <div className="mb-5 flex items-center gap-4">
                <h2 id={`grp-${g.id}`} className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                  {g.label}
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {instruments.map((inst) => {
                  const q = quotes.find((x) => x.symbol === inst.symbol);
                  const up = (q?.changePct ?? 0) >= 0;
                  const active = symbol === inst.symbol;
                  return (
                    <li key={inst.symbol}>
                      <button
                        type="button"
                        onClick={() => {
                          setSymbol(inst.symbol);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        aria-pressed={active}
                        className={cn(
                          "border-orbit panel group grid w-full grid-cols-[1fr_auto] items-center gap-4 rounded-2xl p-4 text-left transition-all duration-500 hover:-translate-y-0.5",
                          active && "border-gold-400/40",
                        )}
                        data-active={active ? "true" : undefined}
                      >
                        <span>
                          <span className="flex items-center gap-2 text-[12px] font-medium text-bone">
                            {inst.symbol}
                            <span className={cn("size-1.5 rounded-full", q?.session === "open" ? "bg-up" : "border border-smoke")} title="Session (estimated)" />
                          </span>
                          <span className="mt-2 block font-display text-xl tabular-nums">{formatPrice(q?.price ?? null, inst.decimals)}</span>
                          <span className={cn("mt-0.5 block font-mono text-xs tabular-nums", q?.changePct == null ? "text-smoke" : up ? "text-up" : "text-down")}>
                            {formatPct(q?.changePct ?? null)}
                            {demo && <span className="ml-2 text-[0.6rem] text-gold-400/70">DEMO</span>}
                          </span>
                        </span>
                        <Sparkline values={q?.sparkline ?? []} up={up} className="h-10 w-24" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
