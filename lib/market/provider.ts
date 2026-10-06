import "server-only";
import { marketConfig, type Instrument } from "@/config/site";
import { demoProvider } from "./providers/demo";
import { twelveDataProvider } from "./providers/twelvedata";
import { sessionFor } from "./sessions";
import type { HistoryRange, HistoryResponse, MarketDataProvider, ProviderQuote, QuotesResponse } from "./types";

/** Resolve the configured provider. Falls back to the clearly-labelled demo provider. */
export function getProvider(): MarketDataProvider {
  const id = process.env.MARKET_DATA_PROVIDER?.toLowerCase();
  if (id === "twelvedata" && process.env.TWELVEDATA_API_KEY) return twelveDataProvider;
  return demoProvider;
}

export function findInstruments(symbols?: string[]): Instrument[] {
  if (!symbols?.length) return marketConfig.instruments;
  return marketConfig.instruments.filter((i) => symbols.includes(i.symbol));
}

export async function getQuotes(symbols?: string[], sparkline = false): Promise<QuotesResponse> {
  const provider = getProvider();
  const instruments = findInstruments(symbols);
  let data = new Map<string, ProviderQuote>();
  try {
    data = await provider.getQuotes(instruments, { sparkline });
  } catch {
    /* render empty values rather than failing the page */
  }
  return {
    mode: provider.mode,
    provider: provider.id,
    providerLabel: provider.label,
    generatedAt: new Date().toISOString(),
    quotes: instruments.map((i) => {
      const q = data.get(i.symbol);
      return {
        symbol: i.symbol,
        name: i.name,
        group: i.group,
        decimals: i.decimals,
        session: sessionFor(i.group),
        price: q?.price ?? null,
        change: q?.change ?? null,
        changePct: q?.changePct ?? null,
        sparkline: q?.sparkline ?? [],
      };
    }),
  };
}

export async function getHistory(symbol: string, range: HistoryRange): Promise<HistoryResponse | null> {
  const inst = marketConfig.instruments.find((i) => i.symbol === symbol);
  if (!inst) return null;
  const provider = getProvider();
  let points: HistoryResponse["points"] = [];
  try {
    points = await provider.getHistory(inst, range);
  } catch {
    points = [];
  }
  return { mode: provider.mode, provider: provider.id, providerLabel: provider.label, symbol, range, points };
}
