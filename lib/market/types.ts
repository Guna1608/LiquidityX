import type { Instrument, MarketGroup } from "@/config/site";

/**
 * live    — provider declares real-time data
 * delayed — third-party data that may be delayed (default for real providers)
 * demo    — simulated values, never presented as live
 */
export type DataMode = "live" | "delayed" | "demo";

export type SessionStatus = "open" | "closed";

export type Quote = {
  symbol: string;
  name: string;
  group: MarketGroup;
  price: number | null;
  change: number | null;
  changePct: number | null;
  /** Estimated from the trading-session clock, not from the data feed. */
  session: SessionStatus;
  decimals: number;
  sparkline: number[];
};

export type QuotesResponse = {
  mode: DataMode;
  provider: string;
  providerLabel: string;
  generatedAt: string;
  quotes: Quote[];
};

export type HistoryRange = "1D" | "5D" | "1M" | "6M" | "1Y";
export const historyRanges: HistoryRange[] = ["1D", "5D", "1M", "6M", "1Y"];

export type HistoryPoint = { time: number; value: number };

export type HistoryResponse = {
  mode: DataMode;
  provider: string;
  providerLabel: string;
  symbol: string;
  range: HistoryRange;
  points: HistoryPoint[];
};

export type ProviderQuote = Pick<Quote, "price" | "change" | "changePct" | "sparkline">;

/**
 * Implement this to plug in any market-data source. Providers run on the
 * server only so API keys never reach the browser.
 */
export interface MarketDataProvider {
  id: string;
  label: string;
  mode: DataMode;
  getQuotes(instruments: Instrument[], opts?: { sparkline?: boolean }): Promise<Map<string, ProviderQuote>>;
  getHistory(instrument: Instrument, range: HistoryRange): Promise<HistoryPoint[]>;
}
