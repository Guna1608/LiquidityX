"use client";

import { useEffect, useState } from "react";
import { marketConfig } from "@/config/site";
import type { HistoryRange, HistoryResponse, QuotesResponse } from "./types";

/** Polls quotes from the server route, pausing while the tab is hidden. */
export function useMarketQuotes(symbols: string[], opts: { sparkline?: boolean } = {}) {
  const [data, setData] = useState<QuotesResponse | null>(null);
  const [error, setError] = useState(false);
  const key = symbols.join("|");
  const sparkline = !!opts.sparkline;

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    const load = async () => {
      if (document.hidden) return;
      try {
        const qs = new URLSearchParams({ symbols: key.split("|").join(","), sparkline: sparkline ? "1" : "0" });
        const res = await fetch(`/api/market/quotes?${qs}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as QuotesResponse;
        if (!cancelled) {
          setData(json);
          setError(false);
        }
      } catch (e) {
        if (!cancelled && (e as Error).name !== "AbortError") setError(true);
      }
    };
    load();
    const id = setInterval(load, marketConfig.refreshMs);
    document.addEventListener("visibilitychange", load);
    return () => {
      cancelled = true;
      ctrl.abort();
      clearInterval(id);
      document.removeEventListener("visibilitychange", load);
    };
  }, [key, sparkline]);

  return { data, error, loading: !data && !error };
}

export function useMarketHistory(symbol: string, range: HistoryRange) {
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetch(`/api/market/history?${new URLSearchParams({ symbol, range })}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: HistoryResponse | null) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        if ((e as Error).name !== "AbortError") setLoading(false);
      });
    return () => ctrl.abort();
  }, [symbol, range]);

  return { data, loading };
}
