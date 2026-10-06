import type { Instrument } from "@/config/site";
import type { HistoryPoint, HistoryRange, MarketDataProvider, ProviderQuote } from "../types";

/**
 * Twelve Data (https://twelvedata.com) — free tier available with an API key.
 * Symbol coverage depends on the plan; unsupported symbols render as "—".
 */
const BASE = "https://api.twelvedata.com";

const intervals: Record<HistoryRange, { interval: string; outputsize: number }> = {
  "1D": { interval: "5min", outputsize: 96 },
  "5D": { interval: "30min", outputsize: 80 },
  "1M": { interval: "2h", outputsize: 132 },
  "6M": { interval: "1day", outputsize: 126 },
  "1Y": { interval: "1day", outputsize: 252 },
};

type TDQuote = { close?: string; change?: string; percent_change?: string; status?: string };
type TDSeries = { values?: { datetime: string; close: string }[]; status?: string };

async function td<T>(path: string, params: Record<string, string>, revalidate: number): Promise<T | null> {
  const key = process.env.TWELVEDATA_API_KEY;
  if (!key) return null;
  const qs = new URLSearchParams({ ...params, apikey: key });
  try {
    const res = await fetch(`${BASE}/${path}?${qs}`, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const num = (v?: string) => (v === undefined || v === "" || Number.isNaN(Number(v)) ? null : Number(v));

async function series(inst: Instrument, range: HistoryRange): Promise<HistoryPoint[]> {
  const { interval, outputsize } = intervals[range];
  const data = await td<TDSeries>(
    "time_series",
    { symbol: inst.providerSymbol, interval, outputsize: String(outputsize), timezone: "UTC", order: "ASC" },
    range === "1D" ? 120 : 1800,
  );
  if (!data?.values) return [];
  return data.values
    .map((v) => ({
      time: Math.floor(Date.parse(`${v.datetime.length <= 10 ? `${v.datetime}T00:00:00` : v.datetime.replace(" ", "T")}Z`) / 1000),
      value: Number(v.close),
    }))
    .filter((p) => Number.isFinite(p.time) && Number.isFinite(p.value));
}

export const twelveDataProvider: MarketDataProvider = {
  id: "twelvedata",
  label: "Twelve Data",
  mode: "delayed",
  async getQuotes(instruments, opts) {
    const out = new Map<string, ProviderQuote>();
    const symbols = instruments.map((i) => i.providerSymbol);
    const raw = await td<Record<string, TDQuote> | TDQuote>("quote", { symbol: symbols.join(",") }, 60);
    const bySymbol: Record<string, TDQuote> =
      instruments.length === 1 ? { [symbols[0]]: (raw ?? {}) as TDQuote } : ((raw ?? {}) as Record<string, TDQuote>);

    const sparks = opts?.sparkline
      ? await Promise.all(instruments.map((i) => series(i, "1D").then((s) => s.filter((_, k) => k % 4 === 0).map((p) => p.value))))
      : instruments.map(() => [] as number[]);

    instruments.forEach((inst, idx) => {
      const q = bySymbol[inst.providerSymbol];
      const ok = !!q && q.status !== "error";
      out.set(inst.symbol, {
        price: ok ? num(q.close) : null,
        change: ok ? num(q.change) : null,
        changePct: ok ? num(q.percent_change) : null,
        sparkline: sparks[idx],
      });
    });
    return out;
  },
  getHistory: series,
};
