import { cn } from "@/lib/cn";

/**
 * Static, GPU-free stand-ins for low-tier devices / reduced motion / WebGL loss.
 * They keep the same art direction (grid, gold profile, cyan levels) so the
 * page composition doesn't change when 3D is unavailable.
 */
export function GridFallback({ className, glow = "center" }: { className?: string; glow?: "center" | "right" | "bottom" }) {
  const pos = glow === "right" ? "70% 45%" : glow === "bottom" ? "50% 100%" : "50% 40%";
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-x-[-20%] bottom-[-10%] h-[70%] tech-grid opacity-70 [mask-image:linear-gradient(to_top,#000,transparent)]"
        style={{ transform: "perspective(700px) rotateX(62deg)", transformOrigin: "50% 100%" }}
      />
      <div className="absolute inset-0" style={{ background: `radial-gradient(60% 50% at ${pos}, rgba(214,174,99,0.12), transparent 70%)` }} />
    </div>
  );
}

export function ProfileFallback({ className }: { className?: string }) {
  const rows = Array.from({ length: 22 }, (_, i) => {
    const t = i / 21;
    const w = Math.exp(-Math.pow((t - 0.45) / 0.18, 2)) + 0.55 * Math.exp(-Math.pow((t - 0.8) / 0.08, 2));
    return Math.max(0.08, w);
  });
  return (
    <div className={cn("absolute inset-0", className)}>
      <GridFallback glow="right" />
      <svg viewBox="0 0 400 300" className="absolute right-[4%] top-1/2 h-[70%] max-h-[520px] -translate-y-1/2 opacity-80" aria-hidden>
        <rect x="40" y="20" width="320" height="260" fill="none" stroke="#ffbd7d" strokeOpacity="0.25" />
        {rows.map((w, i) => (
          <rect key={i} x="40" y={30 + i * 11.2} width={w * 170} height="6" fill={Math.abs(i - 9) < 5 ? "#ffbd7d" : "#6e2c05"} opacity={Math.abs(i - 9) < 5 ? 0.85 : 0.45} />
        ))}
        {[80, 140, 210].map((y) => (
          <line key={y} x1="40" x2="360" y1={y} y2={y} stroke="#8ea3b8" strokeOpacity="0.5" strokeDasharray="4 4" />
        ))}
        <polyline
          fill="none"
          stroke="#fff3e6"
          strokeWidth="1.4"
          points="40,190 70,170 95,182 120,140 150,150 175,120 205,132 230,98 260,110 290,84 320,96 360,70"
        />
      </svg>
    </div>
  );
}
