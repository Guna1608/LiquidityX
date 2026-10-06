import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "gold" | "cyan" | "neutral" | "warning";

const tones: Record<Tone, string> = {
  gold: "border-gold-400/30 bg-gold-400/[0.07] text-gold-200",
  cyan: "border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-200",
  neutral: "border-white/10 bg-white/[0.03] text-mist",
  warning: "border-gold-500/50 bg-gold-600/15 text-gold-100",
};

export function Badge({
  children,
  tone = "gold",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium backdrop-blur-sm",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-current" />
          <span className="relative size-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
