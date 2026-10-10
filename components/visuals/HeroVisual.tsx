"use client";

import { useEffect, useRef, useState } from "react";
import { useBatch } from "@/components/classes/useBatch";
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
  const batch = useBatch(60_000);

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
    <div ref={root} className="relative h-full w-full [perspective:1400px]">
      {/* glow + rings */}
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(82,120,255,0.35),transparent)] blur-2xl" />
      <div aria-hidden className="absolute inset-[4%] rounded-full border border-white/[0.06]" />
      <div aria-hidden className="absolute inset-[16%] rounded-full border border-dashed border-gold-500/20 motion-safe:animate-[spin_60s_linear_infinite]" />

      {/* main terminal card */}
      <Float depth={14} className="inset-x-[6%] top-[16%] bottom-[18%]">
        <div className="relative h-full overflow-hidden rounded-[22px] border border-white/12 bg-[#09090a]/90 shadow-[0_40px_100px_-30px_rgba(0,0,0,1),0_0_80px_-30px_rgba(82,120,255,0.6)] backdrop-blur-xl">
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
            Next batch
          </p>
          <p className="mt-1.5 text-[13px] font-bold leading-tight">
            {batch ? batch.dateLabel.split(", ")[1].replace(/ \d{4}$/, "") : "—"}
          </p>
          <p className="mt-0.5 text-[11px] text-smoke">15 days · 8:30 PM IST</p>
        </Card>
      </Float>

      {/* mentor */}
      <Float depth={46} delay={0.4} className="right-0 top-[3%] sm:-right-[4%]">
        <Card className="flex items-center gap-3 !rounded-2xl !py-2.5 !pl-2.5 !pr-5">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-violet-500 text-[15px] font-black text-white">V</span>
          <span>
            <span className="flex items-center gap-1.5 text-[13px] font-bold">
              Vignesh <span className="size-1.5 animate-blink rounded-full bg-up" />
            </span>
            <span className="block text-[10.5px] text-smoke">Founder &amp; Mentor · Tamil</span>
          </span>
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

    </div>
  );
}
