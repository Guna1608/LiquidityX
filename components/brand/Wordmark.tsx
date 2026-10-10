import { useId } from "react";
import { cn } from "@/lib/cn";

/** Brand mark: a violet gradient tile holding an "L" whose foot rises into a breakout candle. */
export function LogoMark({ size = 34, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id={`lm-${id}`} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2447d8" />
          <stop offset="0.55" stopColor="#5278ff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#lm-${id})`} />
      <path d="M12 8v21h9" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="24.5" y="15" width="5.4" height="14" rx="1.6" fill="#fff" />
      <path d="M27.2 10.5V15M27.2 29v3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="31.5" cy="9" r="2" fill="#e9d5ff" />
    </svg>
  );
}

/** Logo lock-up: mark + text wordmark. */
export function Wordmark({ className, compact = false, markSize }: { className?: string; compact?: boolean; markSize?: number; id?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize ?? (compact ? 32 : 36)} />
      <span className="font-extrabold tracking-tight text-bone">
        Liquidity<span className="text-gold">X</span>
        <span className={cn("ml-1 font-medium text-mist", compact && "hidden xs:inline")}>Academy</span>
      </span>
    </span>
  );
}
