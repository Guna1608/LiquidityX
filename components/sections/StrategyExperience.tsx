"use client";

import { useEffect, useMemo, useState } from "react";
import { strategies, strategyNotice, whatsapp, type Strategy } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { Card } from "@/components/ui/Card";
import { WhatsApp } from "@/components/ui/Icons";
import { seeded, r2 } from "@/lib/useInView";
import { cn } from "@/lib/cn";

/** Abstract per-strategy sketch: price path + two reference levels. Illustrative, no rules. */
function Sketch({ s, active }: { s: Strategy; active: boolean }) {
  const pts = useMemo(() => {
    const rand = seeded(Number(s.index) * 31);
    let y = 40;
    return Array.from({ length: 26 }, (_, i) => {
      y += (rand() - 0.5) * 12 - (y - 40) * 0.12;
      return `${i * 8},${r2(y)}`;
    }).join(" ");
  }, [s.index]);
  return (
    <svg viewBox="0 0 200 80" className="h-24 w-full" aria-hidden preserveAspectRatio="none">
      <line x1="0" x2="200" y1="24" y2="24" stroke="#ff9d4a" strokeOpacity="0.35" strokeDasharray="3 4" />
      <line x1="0" x2="200" y1="58" y2="58" stroke="#ffffff" strokeOpacity="0.15" strokeDasharray="3 4" />
      <polyline
        points={pts}
        fill="none"
        stroke={active ? "#ffbd7d" : "rgba(255,255,255,0.45)"}
        strokeWidth="1.6"
        style={{ transition: "stroke 0.4s", filter: active ? "drop-shadow(0 0 6px rgba(255,122,26,0.7))" : undefined }}
      />
    </svg>
  );
}

/** The 11 strategies as an animated card grid with deep-link support. */
export function StrategyExperience() {
  const [hover, setHover] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const slug = decodeURIComponent(location.hash.replace("#", ""));
    if (!strategies.some((s) => s.slug === slug)) return;
    setTarget(slug);
    const t = setTimeout(() => document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <MotionSection className="pb-20" aria-label="The 11 strategies">
      <div className="container-x">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group="0.06">
          {strategies.map((s) => {
            const active = hover === s.slug || target === s.slug;
            return (
              <Card
                key={s.slug}
                as="li"
                id={s.slug}
                tilt={7}
                data-reveal="rise"
                className="scroll-mt-28"
                innerClassName={cn("h-full p-6 transition-colors", target === s.slug && "border-gold-500/50")}
                onPointerEnter={() => setHover(s.slug)}
                onPointerLeave={() => setHover(null)}
              >
                <div className="flex items-center justify-between" data-depth="14">
                  <span className={cn("grid size-10 place-items-center rounded-full text-sm font-bold transition-colors duration-500", active ? "bg-gold-500 text-white" : "bg-white/[0.06] text-gold-300")}>
                    {s.index}
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-mist">{s.area}</span>
                </div>
                <h2 className="mt-8 text-2xl font-bold tracking-tight" data-depth="24">
                  {s.name}
                </h2>
                <div className="mt-4" data-depth="18">
                  <Sketch s={s} active={active} />
                </div>
                <p className="mt-3 text-[13px] text-smoke">Rules and examples taught live in the mentorship.</p>
              </Card>
            );
          })}
          <li data-reveal="rise" className="flex flex-col justify-between rounded-[1.25rem] border border-gold-500/30 bg-[linear-gradient(160deg,rgba(255,122,26,0.18),rgba(255,122,26,0.03))] p-6">
            <p className="text-lg font-bold">Want to learn these in context?</p>
            <p className="mt-2 text-sm text-mist">{strategyNotice}</p>
            <a
              href={whatsapp.url("Hi LiquidityX, I'd like to know more about the strategies taught in the mentorship.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-medium text-white hover:brightness-110"
            >
              <WhatsApp size={16} /> Ask on WhatsApp
            </a>
          </li>
        </ol>
      </div>
    </MotionSection>
  );
}
