export function formatPrice(v: number | null, decimals = 2) {
  if (v === null || !Number.isFinite(v)) return "—";
  return v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatChange(v: number | null, decimals = 2) {
  if (v === null || !Number.isFinite(v)) return "—";
  const s = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${v >= 0 ? "+" : "−"}${s}`;
}

export function formatPct(v: number | null) {
  if (v === null || !Number.isFinite(v)) return "—";
  return `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}%`;
}

export const modeLabel = {
  live: "LIVE DATA",
  delayed: "MARKET DATA · MAY BE DELAYED",
  demo: "MARKET DATA DEMO",
} as const;
