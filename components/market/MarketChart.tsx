"use client";

import { useEffect, useRef, useState } from "react";
import { AreaSeries, ColorType, CrosshairMode, LineStyle, createChart, type IChartApi, type ISeriesApi, type UTCTimestamp } from "lightweight-charts";
import { historyRanges, type HistoryRange } from "@/lib/market/types";
import { useMarketHistory } from "@/lib/market/useMarketData";
import { cn } from "@/lib/cn";
import { DataModeBadge } from "./DataModeBadge";

/**
 * Technical area chart (TradingView Lightweight Charts, Apache-2.0).
 * Demo series are overlaid with a persistent "SIMULATED DEMO SERIES" label.
 */
export function MarketChart({
  symbol,
  initialRange = "1D",
  height = 420,
  className,
  showControls = true,
}: {
  symbol: string;
  initialRange?: HistoryRange;
  height?: number;
  className?: string;
  showControls?: boolean;
}) {
  const [range, setRange] = useState<HistoryRange>(initialRange);
  const { data, loading } = useMarketHistory(symbol, range);
  const box = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const series = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    if (!box.current) return;
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains") || "monospace";
    const c = createChart(box.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#6c727e",
        fontFamily: mono,
        fontSize: 11,
        attributionLogo: true,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.035)" },
        horzLines: { color: "rgba(255,255,255,0.035)" },
      },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)", scaleMargins: { top: 0.15, bottom: 0.1 } },
      timeScale: { borderColor: "rgba(255,255,255,0.08)", timeVisible: true, secondsVisible: false },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: { color: "rgba(231,201,131,0.45)", style: LineStyle.Dashed, labelBackgroundColor: "#6e2c05" },
        horzLine: { color: "rgba(231,201,131,0.45)", style: LineStyle.Dashed, labelBackgroundColor: "#6e2c05" },
      },
      handleScroll: { mouseWheel: false, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false },
      handleScale: { mouseWheel: false, pinch: true, axisPressedMouseMove: true },
    });
    series.current = c.addSeries(AreaSeries, {
      lineColor: "#ffbd7d",
      topColor: "rgba(231,201,131,0.28)",
      bottomColor: "rgba(231,201,131,0.0)",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
      crosshairMarkerBackgroundColor: "#fff3e6",
    });
    chart.current = c;
    return () => {
      c.remove();
      chart.current = null;
      series.current = null;
    };
  }, []);

  useEffect(() => {
    if (!series.current || !chart.current) return;
    const pts = data?.points ?? [];
    series.current.setData(pts.map((p) => ({ time: p.time as UTCTimestamp, value: p.value })));
    chart.current.applyOptions({ timeScale: { timeVisible: range === "1D" || range === "5D" || range === "1M" } });
    chart.current.timeScale().fitContent();
  }, [data, range]);

  const empty = !loading && (!data || data.points.length === 0);

  return (
    <div className={cn("relative", className)}>
      {showControls && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div role="radiogroup" aria-label="Chart timeframe" className="inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1">
            {historyRanges.map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={range === r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] tracking-wider transition-colors sm:px-4",
                  range === r ? "bg-gold-300 text-ink" : "text-mist hover:text-bone",
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <DataModeBadge mode={data?.mode ?? null} provider={data?.providerLabel} />
        </div>
      )}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink/40" style={{ height }}>
        <div ref={box} className="absolute inset-0" />
        {data?.mode === "demo" && (
          <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="font-mono text-[clamp(0.8rem,2.4vw,1.4rem)] text-gold-300/15">SIMULATED DEMO SERIES</span>
          </div>
        )}
        {(loading || empty) && (
          <div className="absolute inset-0 grid place-items-center bg-ink/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-mist">{loading ? "Loading series…" : "No data available for this instrument from the current provider."}</p>
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {data ? `${symbol} chart, range ${range}, ${data.mode === "demo" ? "simulated demo data" : "provider data, may be delayed"}.` : ""}
      </p>
    </div>
  );
}
