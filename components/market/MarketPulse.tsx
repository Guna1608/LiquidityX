"use client";

import { useCallback, useState } from "react";
import { marketConfig } from "@/config/site";
import { useMarketQuotes } from "@/lib/market/useMarketData";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { DataModeBadge } from "./DataModeBadge";
import { MarketCard } from "./MarketCard";
import { MarketChart } from "./MarketChart";

const pulseSymbols = Array.from(new Set(marketConfig.pulse.flatMap((p) => p.symbols)));

export function MarketPulse() {
  const { data } = useMarketQuotes(pulseSymbols, { sparkline: true });
  const [openSymbol, setOpenSymbol] = useState<string | null>(null);
  const close = useCallback(() => setOpenSymbol(null), []);
  const find = (s: string) => data?.quotes.find((q) => q.symbol === s) ?? null;
  const demo = data?.mode === "demo";

  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Market Pulse">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow" data-reveal="fade">
              02 — Market Pulse
            </p>
            <TextReveal as="h2" lines={["MARKET PULSE"]} className="mt-5 text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.03em]" />
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end" data-reveal="fade">
            <DataModeBadge mode={data?.mode ?? null} provider={data?.providerLabel} />
            <p className="max-w-xs text-sm text-mist md:text-right">{marketConfig.disclaimer}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group="0.1">
          {marketConfig.pulse.map((p) => {
            const [primary, second] = p.symbols;
            return (
              <div key={p.id} data-reveal="rotate3d">
                <MarketCard label={p.label} quote={find(primary)} secondary={second ? find(second) : null} demo={demo} onOpen={() => setOpenSymbol(primary)} />
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center" data-reveal="fade">
          <Button href="/market" variant="ghost" icon={<ArrowRight size={16} />}>
            Open market view
          </Button>
        </div>
      </div>

      <Dialog open={!!openSymbol} onClose={close} title={openSymbol ? `${openSymbol} — market visualization` : "Market"}>
        {openSymbol && <MarketChart symbol={openSymbol} height={360} />}
        <p className="mt-4 text-xs text-smoke">{marketConfig.disclaimer} Not personalised financial advice.</p>
      </Dialog>
    </MotionSection>
  );
}
