import type { DataMode } from "@/lib/market/types";
import { modeLabel } from "@/lib/market/format";
import { Badge } from "@/components/ui/Badge";

/** Every market surface states exactly what kind of data it is showing. */
export function DataModeBadge({ mode, provider, className }: { mode: DataMode | null; provider?: string; className?: string }) {
  if (!mode) return <Badge tone="neutral" className={className}>Loading data…</Badge>;
  if (mode === "demo")
    return (
      <Badge tone="warning" className={className}>
        {modeLabel.demo} · simulated, not live
      </Badge>
    );
  if (mode === "delayed")
    return (
      <Badge tone="neutral" className={className}>
        {provider ? `via ${provider} · ` : ""}may be delayed
      </Badge>
    );
  return (
    <Badge tone="cyan" dot className={className}>
      {modeLabel.live}
    </Badge>
  );
}
