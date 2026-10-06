"use client";

import { useEffect, useState } from "react";
import { forexOpen } from "@/lib/market/sessions";
import { cn } from "@/lib/cn";

/**
 * "● MARKETS LIVE" — reflects whether the global FX session is open,
 * computed from the trading clock. It says nothing about our data feed.
 */
export function MarketStatus({ className }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(forexOpen());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return <span className={cn("inline-block h-4 w-28", className)} aria-hidden />;

  return (
    <span
      className={cn("inline-flex items-center gap-2 text-[12px] font-medium", open ? "text-up" : "text-smoke", className)}
      title="Global FX session status, estimated from the trading clock (not a data feed)."
    >
      <span className="relative flex size-1.5">
        {open && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-up" />}
        <span className={cn("relative size-1.5 rounded-full", open ? "bg-up" : "border border-smoke")} />
      </span>
      {open ? "Markets live" : "Markets closed"}
      <span className="sr-only"> — global FX session status</span>
    </span>
  );
}
