"use client";

import { useEffect, useRef, useState } from "react";
import { upcomingBatch } from "@/config/site";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";
import { CandleBackdrop } from "./CandleBackdrop";
import { cn } from "@/lib/cn";

/**
 * Layered hero composition: a glass "terminal" card with the live-printing
 * candle chart, surrounded by floating info cards. Layers move at different
 * depths with the pointer and drift on scroll. All market visuals are
 * illustrative (generated), and labelled so.
 */
function Float({ depth, className, children, delay = 0 }: { depth: number; className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <div data-layer={depth} data-delay={delay} className={cn("absolute will-change-transform", className)}>
      <div className="h-full motion-safe:animate-float" style={{ animationDelay: `${delay * 2}s`, animationDuration: `${6 + depth / 10}s` }}>
        {children}
      </div>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-[#0d0d0f]/85 p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl", className)}>{children}</div>
  );
}

function PriceTicker() {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setV((x) => x + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const up = v % 3 !== 1;
  return (
    <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-bold transition-colors duration-500", up ? "bg-up/15 text-up" : "bg-down/15 text-down")}>
      {up ? "▲ Buyers in control" : "▼ Sellers stepping in"}
    </span>
  );
}

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", el);

      // entrance: each layer flies in out of blur, staggered
      gsap.fromTo(
        layers,
        { opacity: 0, y: 50, scale: 0.9, filter: "blur(14px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", stagger: 0.12, delay: 0.5 },
      );

      // pointer parallax (desktop)
      if (!window.matchMedia("(pointer: coarse)").matches) {
        const setters = layers.map((l) => ({
          d: Number(l.dataset.layer),
          x: gsap.quickTo(l, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(l, "y", { duration: 0.9, ease: "power3.out" }),
        }));
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - (r.left + r.width / 2)) / r.width;
          const py = (e.clientY - (r.top + r.height / 2)) / r.height;
          setters.forEach((s) => {
            s.x(px * s.d);
            s.y(py * s.d);
          });
        };
        window.addEventListener("pointermove", move, { passive: true });
        // scroll drift
        layers.forEach((l) =>
          gsap.to(l.firstElementChild, { yPercent: -Number(l.dataset.layer) * 1.6, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } }),
        );
        return () => window.removeEventListener("pointermove", move);
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mx-auto aspect-[1/1.02] w-full max-w-[560px] [perspective:1400px] lg:aspect-[1/1.05]">
      {/* glow + rings */}
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.35),transparent)] blur-2xl" />
      <div aria-hidden className="absolute inset-[4%] rounded-full border border-white/[0.06]" />
      <div aria-hidden className="absolute inset-[16%] rounded-full border border-dashed border-gold-500/20 motion-safe:animate-[spin_60s_linear_infinite]" />

      {/* main terminal card */}
      <Float depth={14} className="inset-x-[6%] top-[16%] bottom-[18%]">
        <div className="relative h-full overflow-hidden rounded-[22px] border border-white/12 bg-[#09090a]/90 shadow-[0_40px_100px_-30px_rgba(0,0,0,1),0_0_80px_-30px_rgba(255,122,26,0.6)] backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[11px] font-medium text-bone">NQ Futures · 5m</span>
            <span className="ml-auto">
              <PriceTicker />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-10">
            <CandleBackdrop density={0.8} />
          </div>
          <span className="absolute bottom-2 right-3 text-[9px] text-smoke">Illustrative · simulated</span>
        </div>
      </Float>

      {/* next batch */}
      <Float depth={34} delay={0.2} className="left-0 top-[2%] sm:-left-[6%]">
        <Card className="w-[11.5rem]">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-gold-300">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400" />
              <span className="relative size-1.5 rounded-full bg-gold-400" />
            </span>
            Upcoming batch
          </p>
          <p className="mt-1.5 text-[13px] font-bold leading-tight">
            {upcomingBatch.startDate ? new Date(upcomingBatch.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Dates on WhatsApp"}
          </p>
          <p className="mt-0.5 text-[11px] text-smoke">15 days · weekday live</p>
        </Card>
      </Float>

      {/* live class */}
      <Float depth={46} delay={0.4} className="right-0 top-[4%] sm:-right-[4%]">
        <Card className="flex items-center gap-2.5 !rounded-full !py-2 !pl-2 !pr-4">
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-[12px] font-black text-ink">V</span>
          <span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold">
              <span className="size-1.5 animate-blink rounded-full bg-down" /> Live class
            </span>
            <span className="block text-[10px] text-smoke">with Vignesh</span>
          </span>
        </Card>
      </Float>

      {/* market profile */}
      <Float depth={28} delay={0.6} className="-left-[2%] bottom-[4%] hidden xs:block sm:-left-[8%]">
        <Card className="w-[10.5rem]">
          <p className="text-[10px] font-semibold text-mist">Market Profile</p>
          <div className="mt-2 space-y-[3px]">
            {[0.3, 0.5, 0.75, 1, 0.85, 0.55, 0.35].map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={cn("h-[5px] rounded-r-sm", i === 3 ? "bg-gold-300" : i > 1 && i < 5 ? "bg-gold-500/80" : "bg-white/15")} style={{ width: `${w * 100}%` }} />
                {i === 3 && <span className="text-[8px] font-bold text-gold-300">POC</span>}
              </div>
            ))}
          </div>
        </Card>
      </Float>

      {/* order flow */}
      <Float depth={40} delay={0.8} className="bottom-[2%] right-[2%] sm:-right-[6%]">
        <Card className="w-[11rem]">
          <p className="text-[10px] font-semibold text-mist">Order flow · delta</p>
          <div className="mt-2 flex h-10 items-end gap-[3px]">
            {[0.4, 0.7, 0.3, 0.9, 0.55, 1, 0.45, 0.8, 0.6, 0.95].map((h, i) => (
              <div
                key={i}
                className={cn("flex-1 origin-bottom rounded-t-[2px] motion-safe:animate-[delta_2.4s_ease-in-out_infinite]", i % 4 === 2 ? "bg-down/80" : "bg-up/80")}
                style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </Card>
      </Float>

      {/* risk plan */}
      <Float depth={52} delay={1} className="right-[10%] top-[44%] hidden sm:block lg:-right-[10%]">
        <Card className="w-[9.5rem]">
          <p className="text-[10px] font-semibold text-mist">Risk plan</p>
          <div className="mt-2 space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-smoke">Reward</span>
              <span className="font-bold text-up">2.0R</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-smoke">Risk</span>
              <span className="font-bold text-down">1.0R</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-gold-500 to-up" />
            </div>
          </div>
        </Card>
      </Float>
    </div>
  );
}
