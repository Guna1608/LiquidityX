"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Decorative, continuously "printing" candlestick chart drawn on canvas.
 * Candles form one by one and the chart glides left; a glowing VWAP-style
 * line follows price. Purely illustrative (generated, not market data).
 * Runs only while visible; static frame for reduced motion.
 */
type C = { o: number; h: number; l: number; c: number; born: number };

export function CandleBackdrop({ className, density = 1 }: { className?: string; density?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let candleW = 14;
    let gap = 7;
    let candles: C[] = [];
    let price = 0;
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const make = (t: number): C => {
      const o = price;
      const drift = Math.sin(t / 2400) * 0.7 + (rand() - 0.49) * 3.4;
      const c = o + drift;
      price = c;
      return { o, c, h: Math.max(o, c) + rand() * 2.2, l: Math.min(o, c) - rand() * 2.2, born: t };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      candleW = w < 640 ? 9 : 14 * density;
      gap = w < 640 ? 5 : 7;
      const n = Math.ceil(w / (candleW + gap)) + 2;
      price = 0;
      candles = Array.from({ length: n }, (_, i) => make(-((n - i) * 1000)));
    };
    resize();
    window.addEventListener("resize", resize);

    let offset = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const PERIOD = 900; // ms per candle

    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!reduce) offset += (dt / PERIOD) * (candleW + gap);
      const step = candleW + gap;
      while (offset >= step) {
        offset -= step;
        candles.shift();
        candles.push(make(now));
      }
      // live wiggle on the forming candle
      const cur = candles[candles.length - 1];
      if (!reduce) {
        cur.c += (Math.random() - 0.5) * 0.6;
        cur.h = Math.max(cur.h, cur.c);
        cur.l = Math.min(cur.l, cur.c);
      }

      let min = Infinity;
      let max = -Infinity;
      for (const k of candles) {
        min = Math.min(min, k.l);
        max = Math.max(max, k.h);
      }
      const pad = (max - min) * 0.25 + 1;
      const y = (v: number) => h * 0.92 - ((v - (min - pad)) / (max - min + pad * 2)) * h * 0.78;

      ctx.clearRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.035)";
      ctx.lineWidth = 1;
      for (let gy = 0; gy < 6; gy++) {
        const yy = Math.round((h / 6) * gy) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(w, yy);
        ctx.stroke();
      }

      // candles
      const vw: [number, number][] = [];
      let acc = 0;
      candles.forEach((k, i) => {
        const x = i * step - offset;
        const up = k.c >= k.o;
        const age = Math.min(1, (now - k.born) / 500);
        const grow = reduce ? 1 : 1 - Math.pow(1 - age, 3);
        const top = y(Math.max(k.o, k.c));
        const bot = y(Math.min(k.o, k.c));
        const mid = (top + bot) / 2;
        const bodyH = Math.max(1.5, (bot - top) * grow);
        ctx.strokeStyle = up ? "rgba(95,211,154,0.55)" : "rgba(255,106,77,0.55)";
        ctx.beginPath();
        ctx.moveTo(x + candleW / 2, mid - (mid - y(k.h)) * grow);
        ctx.lineTo(x + candleW / 2, mid + (y(k.l) - mid) * grow);
        ctx.stroke();
        ctx.fillStyle = up ? "rgba(95,211,154,0.5)" : "rgba(255,106,77,0.48)";
        ctx.fillRect(x, mid - bodyH / 2, candleW, bodyH);
        acc = i === 0 ? (k.h + k.l + k.c) / 3 : acc * 0.9 + ((k.h + k.l + k.c) / 3) * 0.1;
        vw.push([x + candleW / 2, y(acc)]);
      });

      // glowing average line
      ctx.save();
      ctx.shadowColor = "rgba(82,120,255,0.9)";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = "rgba(127,147,255,0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      vw.forEach(([x, yy], i) => (i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy)));
      ctx.stroke();
      ctx.restore();

      // price tag on the forming candle
      const ly = y(cur.c);
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.beginPath();
      ctx.moveTo(0, ly);
      ctx.lineTo(w, ly);
      ctx.stroke();
      ctx.setLineDash([]);

      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(el);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={canvas} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />;
}
