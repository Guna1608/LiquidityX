import { NextResponse } from "next/server";
import { getHistory } from "@/lib/market/provider";
import { historyRanges, type HistoryRange } from "@/lib/market/types";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const symbol = url.searchParams.get("symbol") ?? "";
  const rangeParam = (url.searchParams.get("range") ?? "1D") as HistoryRange;
  const range = historyRanges.includes(rangeParam) ? rangeParam : "1D";
  const data = await getHistory(symbol, range);
  if (!data) return NextResponse.json({ error: "Unknown symbol" }, { status: 404 });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" },
  });
}
