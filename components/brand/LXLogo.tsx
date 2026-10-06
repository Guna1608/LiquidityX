"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * LX monogram — provisional primary mark.
 * The L's base flows directly into the X's lower-left leg; the liquidity dot
 * sits at the X crossing. Corner brackets frame it like a chart viewport.
 *
 * Paths carry `pathLength=1` so any consumer can stroke-draw them with
 * stroke-dashoffset (intro, footer) without measuring.
 */
export const LX_PATHS = {
  l: "M18 16V46H30",
  x1: "M30 16L46 46",
  x2: "M46 16L30 46",
  corners: ["M6 16V6H16", "M48 6H58V16", "M58 48V58H48", "M16 58H6V48"],
};

export function LXLogo({
  size = 36,
  className,
  title = "LiquidityX",
  framed = true,
  interactive = true,
  strokeWidth = 3,
}: {
  size?: number;
  className?: string;
  title?: string;
  framed?: boolean;
  interactive?: boolean;
  strokeWidth?: number;
}) {
  const id = useId().replace(/:/g, "");
  const grad = `lx-g-${id}`;
  const cornerOffsets = ["-1.5px,-1.5px", "1.5px,-1.5px", "1.5px,1.5px", "-1.5px,1.5px"];

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={cn("overflow-visible", interactive && "group/lx", className)}
    >
      <defs>
        <linearGradient id={grad} x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff3e6" />
          <stop offset="0.35" stopColor="#ffbd7d" />
          <stop offset="0.7" stopColor="#ff7a1a" />
          <stop offset="1" stopColor="#ffdcb5" />
        </linearGradient>
      </defs>
      {framed &&
        LX_PATHS.corners.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            data-lx="corner"
            fill="none"
            stroke="#ffbd7d"
            strokeOpacity={0.55}
            strokeWidth={1.4}
            className="transition-transform duration-700 ease-[var(--ease-expo)] [transform-box:fill-box]"
            style={{ ["--o" as string]: cornerOffsets[i] }}
          />
        ))}
      <g
        fill="none"
        stroke={`url(#${grad})`}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="transition-transform duration-700 ease-[var(--ease-expo)]"
      >
        <path data-lx="stroke" d={LX_PATHS.l} pathLength={1} />
        <path data-lx="stroke" d={LX_PATHS.x1} pathLength={1} />
        <path data-lx="stroke" d={LX_PATHS.x2} pathLength={1} />
      </g>
      <circle data-lx="dot" cx="38" cy="31" r="2.1" fill="#fff3e6" className="origin-center [transform-box:fill-box]" />
    </svg>
  );
}

export function LXWordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LXLogo size={compact ? 30 : 36} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-semibold tracking-[0.18em] text-bone">LIQUIDITYX</span>
        {!compact && <span className="mt-1 font-mono text-[0.55rem] tracking-[0.5em] text-gold-300/80">ACADEMY</span>}
      </span>
    </span>
  );
}
