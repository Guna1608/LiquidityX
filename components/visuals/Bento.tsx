"use client";

import { useEffect, useMemo, useState } from "react";
import { curriculum, strategies } from "@/config/site";
import { useInView, seeded, r2 } from "@/lib/useInView";
import { cn } from "@/lib/cn";

/* Small animated UI illustrations for feature cards. Illustrative only. */

export function ProfileVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const rows = useMemo(() => {
    const rand = seeded(21);
    return Array.from({ length: 14 }, (_, i) => {
      const t = i / 13;
      return Math.round(2 + 12 * Math.exp(-Math.pow((t - 0.5) / 0.22, 2)) * (0.8 + rand() * 0.3));
    });
  }, []);
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-[5px] px-1">
      {rows.map((n, i) => (
        <div key={i} className="flex items-center gap-[4px]">
          <span className="w-8 text-right font-mono text-[9px] text-smoke">{(150 - i * 0.5).toFixed(1)}</span>
          {Array.from({ length: n }, (_, j) => (
            <span
              key={j}
              className={cn(
                "h-[9px] w-[11px] rounded-[2px] transition-all duration-500",
                Math.abs(i - 7) < 3 ? "bg-gold-400" : "bg-white/15",
                inView ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
              style={{ transitionDelay: `${(i * 14 + j) * 12}ms` }}
            />
          ))}
          {i === 6 && <span className="ml-1 rounded bg-gold-300 px-1 text-[8px] font-bold text-ink">POC</span>}
        </div>
      ))}
    </div>
  );
}

export function FootprintVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [inView]);
  const cols = 5;
  const rows = 8;
  const cells = useMemo(() => {
    const rand = seeded(tick + 5);
    return Array.from({ length: cols * rows }, () => [Math.round(rand() * 900), Math.round(rand() * 900)] as const);
  }, [tick]);
  return (
    <div ref={ref} className="grid h-full grid-cols-5 gap-1.5 font-mono text-[9px]">
      {cells.map(([b, a], i) => {
        const imb = a > b * 2.2 ? "up" : b > a * 2.2 ? "down" : null;
        return (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between rounded-md px-1.5 transition-colors duration-500",
              imb === "up" ? "bg-up/20 text-up" : imb === "down" ? "bg-down/20 text-down" : "bg-white/[0.04] text-smoke",
            )}
          >
            <span>{b}</span>
            <span className="opacity-40">×</span>
            <span>{a}</span>
          </div>
        );
      })}
    </div>
  );
}

export function LiveClassVisual() {
  return (
    <div className="relative grid h-full grid-cols-[1.6fr_1fr] gap-2">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0c]">
        <svg viewBox="0 0 200 110" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
          <polyline points="0,80 20,72 35,76 55,52 70,58 90,40 110,46 130,30 150,38 175,20 200,26" fill="none" stroke="#ffbd7d" strokeWidth="1.4" />
          <line x1="0" x2="200" y1="58" y2="58" stroke="#ff7a1a" strokeOpacity="0.5" strokeDasharray="3 4" />
        </svg>
        <span className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-bone backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-down" />
            <span className="relative size-1.5 rounded-full bg-down" />
          </span>
          Live class
        </span>
        <span className="absolute bottom-2 left-2 text-[9px] text-mist">Screen share · Market Profile</span>
      </div>
      <div className="grid grid-rows-3 gap-2">
        {["Vignesh", "You", "+ batch"].map((n, i) => (
          <div key={n} className="relative grid place-items-center overflow-hidden rounded-xl border border-white/10 bg-[#0e0e10]">
            <span
              className={cn(
                "grid size-8 place-items-center rounded-full text-[11px] font-bold",
                i === 0 ? "bg-gradient-to-br from-gold-300 to-gold-600 text-ink ring-2 ring-gold-400/50 ring-offset-2 ring-offset-[#0e0e10]" : "bg-white/10 text-mist",
              )}
            >
              {n[0] === "+" ? "+" : n[0]}
            </span>
            <span className="absolute bottom-1 left-1.5 text-[8px] text-smoke">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiskVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const rings = [
    { r: 46, p: 0.72, c: "#5fd39a", label: "Reward" },
    { r: 34, p: 0.36, c: "#ff9d4a", label: "Risk" },
    { r: 22, p: 0.18, c: "#ff6a4d", label: "Max loss" },
  ];
  return (
    <div ref={ref} className="flex h-full items-center justify-center gap-6">
      <svg viewBox="0 0 110 110" className="size-32 -rotate-90" aria-hidden>
        {rings.map((g) => {
          const len = 2 * Math.PI * g.r;
          return (
            <g key={g.r}>
              <circle cx="55" cy="55" r={g.r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
              <circle
                cx="55"
                cy="55"
                r={g.r}
                fill="none"
                stroke={g.c}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={r2(len)}
                strokeDashoffset={inView ? r2(len * (1 - g.p)) : r2(len)}
                style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)" }}
              />
            </g>
          );
        })}
      </svg>
      <ul className="space-y-2 text-[11px]">
        {rings.map((g) => (
          <li key={g.label} className="flex items-center gap-2 text-mist">
            <span className="size-2 rounded-full" style={{ background: g.c }} />
            {g.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StrategyStackVisual() {
  const list = [...strategies, ...strategies];
  return (
    <div className="relative h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]">
      <ul className="animate-[strategy-scroll_26s_linear_infinite] space-y-2">
        {list.map((s, i) => (
          <li key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
            <span className="font-mono text-[10px] text-gold-300">{s.index}</span>
            <span className="text-[13px] font-medium text-bone">{s.name}</span>
            <span className="ml-auto text-[10px] text-smoke">{s.area}</span>
          </li>
        ))}
      </ul>
      <style>{`@keyframes strategy-scroll{to{transform:translateY(-50%)}}`}</style>
    </div>
  );
}

export function CurriculumVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center">
      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/10" />
      <div
        className="absolute left-[11px] top-3 w-px bg-gradient-to-b from-gold-300 to-gold-600 transition-[height] duration-[2s] ease-[var(--ease-expo)]"
        style={{ height: inView ? "calc(100% - 24px)" : "0%" }}
      />
      <ol className="space-y-2.5">
        {curriculum.map((m, i) => (
          <li
            key={m.index}
            className={cn("flex items-center gap-3 transition-all duration-700", inView ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")}
            style={{ transitionDelay: `${i * 140}ms` }}
          >
            <span className="relative z-[1] grid size-6 place-items-center rounded-full border border-gold-400/50 bg-ink text-[9px] font-bold text-gold-200">{m.index}</span>
            <span className="text-[13px] text-bone">{m.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
