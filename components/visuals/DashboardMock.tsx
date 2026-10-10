"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView, seeded, r2 } from "@/lib/useInView";
import { cn } from "@/lib/cn";

/**
 * Animated trading-terminal illustration (the site's hero "asset").
 * Everything here is generated, illustrative geometry — no real prices,
 * and it is labelled as such inside the frame.
 */
type Candle = { o: number; h: number; l: number; c: number; v: number };

const W = 640;
const H = 300;

function makeCandles(n: number, seed: number): Candle[] {
  const rand = seeded(seed);
  const out: Candle[] = [];
  let p = 150;
  for (let i = 0; i < n; i++) {
    const drift = Math.sin(i / 9) * 1.6 + (rand() - 0.48) * 6;
    const o = p;
    const c = p + drift;
    const h = Math.max(o, c) + rand() * 4;
    const l = Math.min(o, c) - rand() * 4;
    out.push({ o, h, l, c, v: 0.25 + rand() * 0.75 });
    p = c;
  }
  return out;
}

function useLiveCandles(active: boolean) {
  const [candles, setCandles] = useState(() => makeCandles(56, 7));
  useEffect(() => {
    if (!active) return;
    let tick = 0;
    const rand = seeded(99);
    const id = setInterval(() => {
      tick++;
      setCandles((prev) => {
        const next = prev.slice();
        const last = { ...next[next.length - 1] };
        last.c = last.c + (rand() - 0.5) * 3.2;
        last.h = Math.max(last.h, last.c);
        last.l = Math.min(last.l, last.c);
        last.v = Math.min(1, last.v + 0.04);
        next[next.length - 1] = last;
        if (tick % 8 === 0) {
          next.shift();
          next.push({ o: last.c, h: last.c + 0.5, l: last.c - 0.5, c: last.c, v: 0.2 });
        }
        return next;
      });
    }, 450);
    return () => clearInterval(id);
  }, [active]);
  return candles;
}

function Chart({ candles }: { candles: Candle[] }) {
  const { min, max } = useMemo(() => {
    let mn = Infinity;
    let mx = -Infinity;
    candles.forEach((c) => {
      mn = Math.min(mn, c.l);
      mx = Math.max(mx, c.h);
    });
    return { min: mn - 4, max: mx + 4 };
  }, [candles]);
  const y = (v: number) => r2(H - 40 - ((v - min) / (max - min)) * (H - 70));
  const step = W / candles.length;
  // VWAP-style smoothed line
  let acc = 0;
  let vol = 0;
  const vwap = candles.map((c, i) => {
    acc += ((c.h + c.l + c.c) / 3) * c.v;
    vol += c.v;
    return `${i ? "L" : "M"}${r2(i * step + step / 2)},${y(acc / vol)}`;
  });
  const last = candles[candles.length - 1];
  const vaTop = y(min + (max - min) * 0.66);
  const vaBot = y(min + (max - min) * 0.38);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="dm-va" x1="0" x2="1">
          <stop offset="0" stopColor="#5278ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#5278ff" stopOpacity="0.09" />
          <stop offset="1" stopColor="#5278ff" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="dm-vol" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0.2, 0.4, 0.6, 0.8].map((g) => (
        <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.05)" />
      ))}
      <rect x="0" y={vaTop} width={W} height={vaBot - vaTop} fill="url(#dm-va)" />
      <line x1="0" x2={W} y1={(vaTop + vaBot) / 2} y2={(vaTop + vaBot) / 2} stroke="#7f93ff" strokeOpacity="0.5" strokeDasharray="4 5" />
      {candles.map((c, i) => {
        const x = r2(i * step + step / 2);
        const up = c.c >= c.o;
        const col = up ? "#5fd39a" : "#ff6a4d";
        const top = Math.min(y(c.o), y(c.c));
        const h = Math.max(1.2, Math.abs(y(c.o) - y(c.c)));
        return (
          <g key={i}>
            <rect x={r2(x - step * 0.3)} y={r2(H - c.v * 34)} width={r2(step * 0.6)} height={r2(c.v * 34)} fill="url(#dm-vol)" />
            <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeOpacity="0.85" strokeWidth="1" />
            <rect x={r2(x - step * 0.32)} y={r2(top)} width={r2(step * 0.64)} height={r2(h)} rx="0.8" fill={col} fillOpacity={up ? 0.9 : 0.85} />
          </g>
        );
      })}
      <path d={vwap.join("")} fill="none" stroke="#a9b8ff" strokeWidth="1.6" />
      <line x1="0" x2={W} y1={y(last.c)} y2={y(last.c)} stroke="#fff" strokeOpacity="0.25" strokeDasharray="2 4" />
      <g transform={`translate(${W - 4},${y(last.c)})`}>
        <rect x="-40" y="-9" width="40" height="18" rx="4" fill={last.c >= last.o ? "#5fd39a" : "#ff6a4d"} />
        <text x="-31" y="3.5" fontSize="9" fill="#050505" fontFamily="var(--font-jetbrains)" fontWeight="700">
          SIM
        </text>
      </g>
    </svg>
  );
}

function Profile({ active }: { active: boolean }) {
  const rows = useMemo(() => {
    const rand = seeded(3);
    return Array.from({ length: 22 }, (_, i) => {
      const t = i / 21;
      return r2(Math.max(0.08, Math.exp(-Math.pow((t - 0.45) / 0.2, 2)) + 0.45 * Math.exp(-Math.pow((t - 0.82) / 0.07, 2))) * (0.75 + rand() * 0.3));
    });
  }, []);
  const poc = rows.indexOf(Math.max(...rows));
  return (
    <div className="flex h-full flex-col justify-center gap-[3px]">
      {rows.map((w, i) => (
        <div key={i} className="flex items-center">
          <div
            className={cn("h-[5px] rounded-r-sm transition-[width] duration-[1.4s] ease-[var(--ease-expo)]", i === poc ? "bg-gold-300" : Math.abs(i - poc) < 5 ? "bg-gold-500/80" : "bg-white/15")}
            style={{ width: active ? `${w * 100}%` : "0%", transitionDelay: `${i * 30}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

function OrderFlow({ active }: { active: boolean }) {
  const [seed, setSeed] = useState(1);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeed((s) => s + 1), 900);
    return () => clearInterval(id);
  }, [active]);
  const cells = useMemo(() => {
    const rand = seeded(seed * 13);
    return Array.from({ length: 7 * 6 }, () => r2(rand()));
  }, [seed]);
  return (
    <div className="grid h-full grid-cols-6 gap-[3px]">
      {cells.map((v, i) => (
        <div
          key={i}
          className="rounded-[2px] transition-colors duration-700"
          style={{ background: v > 0.86 ? "rgba(169,184,255,0.95)" : i % 2 ? `rgba(95,211,154,${r2(0.08 + v * 0.45)})` : `rgba(255,106,77,${r2(0.08 + v * 0.4)})` }}
        />
      ))}
    </div>
  );
}

export function DashboardMock({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>("200px");
  const candles = useLiveCandles(inView);
  const watch = ["NQ", "ES", "GC", "EUR/USD", "XAU/USD", "NIFTY"];

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-[20px] border border-white/10 bg-[#09090a] text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_50px_120px_-30px_rgba(0,0,0,0.9)]", className)}>
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-bold tracking-tight text-bone">LiquidityX</span>
        <div className="hidden gap-1 sm:flex">
          {["NQ · 5m", "Market Profile", "Order Flow"].map((t, i) => (
            <span key={t} className={cn("rounded-md px-2.5 py-1 text-[10px]", i === 0 ? "bg-white/[0.07] text-bone" : "text-smoke")}>
              {t}
            </span>
          ))}
        </div>
        <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-smoke">Illustrative</span>
      </div>

      <div className="grid grid-cols-[1fr] gap-px bg-white/[0.04] md:grid-cols-[150px_1fr_130px]">
        {/* watchlist */}
        <div className="hidden bg-[#09090a] p-3 md:block">
          <p className="mb-2 text-[10px] font-medium text-smoke">Watchlist</p>
          <ul className="space-y-1.5">
            {watch.map((s, i) => {
              const rand = seeded(i + 4);
              const pts = Array.from({ length: 12 }, (_, k) => `${k * 5},${r2(10 + Math.sin(k * 0.8 + i) * 4 + (rand() - 0.5) * 5)}`).join(" ");
              const up = i % 3 !== 1;
              return (
                <li key={s} className={cn("flex items-center justify-between rounded-md px-2 py-1.5", i === 0 && "bg-white/[0.05]")}>
                  <span className="text-[10px] font-medium text-bone">{s}</span>
                  <svg viewBox="0 0 55 20" className="h-3.5 w-12">
                    <polyline points={pts} fill="none" stroke={up ? "#5fd39a" : "#ff6a4d"} strokeWidth="1.2" />
                  </svg>
                </li>
              );
            })}
          </ul>
        </div>

        {/* chart */}
        <div className="relative bg-[#09090a] p-3">
          <div className="mb-1 flex items-center gap-3 text-[10px]">
            <span className="font-medium text-bone">Nasdaq Futures</span>
            <span className="text-smoke">5m</span>
            <span className="flex items-center gap-1 text-gold-300">
              <span className="h-0.5 w-3 bg-gold-300" /> VWAP
            </span>
            <span className="flex items-center gap-1 text-smoke">
              <span className="h-2 w-3 bg-gold-500/20" /> Value area
            </span>
          </div>
          <div className="h-[200px] sm:h-[260px]">
            <Chart candles={candles} />
          </div>
        </div>

        {/* profile */}
        <div className="hidden bg-[#09090a] p-3 md:block">
          <p className="mb-2 text-[10px] font-medium text-smoke">Volume profile</p>
          <div className="h-[250px]">
            <Profile active={inView} />
          </div>
        </div>
      </div>

      {/* bottom modules */}
      <div className="grid grid-cols-3 gap-px border-t border-white/[0.06] bg-white/[0.04]">
        <div className="bg-[#09090a] p-3">
          <p className="mb-2 text-[10px] font-medium text-smoke">Order flow</p>
          <div className="h-12 sm:h-16">
            <OrderFlow active={inView} />
          </div>
        </div>
        <div className="bg-[#09090a] p-3">
          <p className="mb-2 text-[10px] font-medium text-smoke">Delta</p>
          <div className="flex h-12 items-end gap-[3px] sm:h-16">
            {Array.from({ length: 18 }, (_, i) => {
              const v = r2(Math.abs(Math.sin(i * 1.7)) * 0.9 + 0.1);
              return <div key={i} className={cn("flex-1 rounded-t-[2px]", i % 3 === 1 ? "bg-down/70" : "bg-up/70")} style={{ height: `${v * 100}%` }} />;
            })}
          </div>
        </div>
        <div className="bg-[#09090a] p-3">
          <p className="mb-2 text-[10px] font-medium text-smoke">Risk plan</p>
          <div className="flex h-12 flex-col justify-center gap-1.5 sm:h-16">
            {[
              ["Target", "w-[80%]", "bg-up/60"],
              ["Entry", "w-[55%]", "bg-gold-300"],
              ["Stop", "w-[30%]", "bg-down/70"],
            ].map(([k, w, c]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="w-9 text-[9px] text-smoke">{k}</span>
                <div className={cn("h-1 rounded-full", w, c)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
