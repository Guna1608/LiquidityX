import { cn } from "@/lib/cn";

/**
 * Text-based brand treatment. The final logo is not available yet, so the
 * brand is shown as a clean wordmark — no invented mark or symbol.
 */
export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("font-bold tracking-tight text-bone", className)}>
      LiquidityX
      <span className={cn("font-medium text-mist", compact && "hidden xs:inline")}> Academy</span>
    </span>
  );
}
