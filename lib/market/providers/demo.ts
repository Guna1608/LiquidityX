import type { Instrument } from "@/config/site";
import type { HistoryPoint, HistoryRange, MarketDataProvider, ProviderQuote } from "../types";

/**
 * DEMO provider — deterministic simulated random walks.
 * Output is always flagged `mode: "demo"` and labelled "MARKET DATA DEMO" in the UI.
 */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rangeSpec: Record<HistoryRange, { points: number; stepSec: number; vol: number }> = {
  "1D": { points: 96, stepSec: 300, vol: 0.0012 },
  "5D": { points: 120, stepSec: 1800, vol: 0.0025 },
  "1M": { points: 132, stepSec: 3 * 3600, vol: 0.004 },
  "6M": { points: 126, stepSec: 86400, vol: 0.009 },
  "1Y": { points: 252, stepSec: 86400, vol: 0.009 },
};

function walk(inst: Instrument, range: HistoryRange): HistoryPoint[] {
  const spec = rangeSpec[range];
  const bucket = Math.floor(Date.now() / (5 * 60 * 1000));
  const rand = rng(hash(`${inst.symbol}:${range}:${range === "1D" ? bucket : Math.floor(bucket / 288)}`));
  const end = Math.floor(Date.now() / 1000 / spec.stepSec) * spec.stepSec;
  const pts: HistoryPoint[] = [];
  let v = inst.demoBase * (0.96 + rand() * 0.08);
  let drift = (rand() - 0.5) * spec.vol * 0.3;
  for (let i = spec.points - 1; i >= 0; i--) {
    if (i % 24 === 0) drift = (rand() - 0.5) * spec.vol * 0.3;
    v = v * (1 + drift + (rand() - 0.5) * 2 * spec.vol);
    pts.push({ time: end - i * spec.stepSec, value: Number(v.toFixed(inst.decimals)) });
  }
  return pts;
}

export const demoProvider: MarketDataProvider = {
  id: "demo",
  label: "Simulated demo data",
  mode: "demo",
  async getQuotes(instruments) {
    const out = new Map<string, ProviderQuote>();
    for (const inst of instruments) {
      const series = walk(inst, "1D");
      const first = series[0].value;
      const last = series[series.length - 1].value;
      const change = last - first;
      out.set(inst.symbol, {
        price: last,
        change: Number(change.toFixed(inst.decimals)),
        changePct: Number(((change / first) * 100).toFixed(2)),
        sparkline: series.filter((_, i) => i % 4 === 0).map((p) => p.value),
      });
    }
    return out;
  },
  async getHistory(instrument, range) {
    return walk(instrument, range);
  },
};
