import { NextResponse } from "next/server";
import { getQuotes } from "@/lib/market/provider";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const symbols = url.searchParams.get("symbols")?.split(",").filter(Boolean).slice(0, 30);
  const sparkline = url.searchParams.get("sparkline") === "1";
  const data = await getQuotes(symbols, sparkline);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}
