import { useId } from "react";

export function Sparkline({ values, up, className, height = 44 }: { values: number[]; up: boolean; className?: string; height?: number }) {
  const id = useId().replace(/:/g, "");
  if (values.length < 2) {
    return (
      <svg viewBox={`0 0 120 ${height}`} className={className} aria-hidden preserveAspectRatio="none">
        <line x1="0" x2="120" y1={height / 2} y2={height / 2} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 4" />
      </svg>
    );
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 120, height - 4 - ((v - min) / span) * (height - 8)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  const color = up ? "#5fd39a" : "#ff6a4d";
  return (
    <svg viewBox={`0 0 120 ${height}`} className={className} aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id={`s-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d}L120,${height}L0,${height}Z`} fill={`url(#s-${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
