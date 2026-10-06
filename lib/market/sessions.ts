import type { MarketGroup } from "@/config/site";
import type { SessionStatus } from "./types";

/**
 * Approximate session clock (ignores exchange holidays). Used for the
 * "MARKETS LIVE" header indicator and per-instrument session badges —
 * it describes whether a market is in session, not whether our data is live.
 */
function partsIn(tz: string, d: Date) {
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false });
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday as string);
  const minutes = (Number(p.hour) % 24) * 60 + Number(p.minute);
  return { day, minutes };
}

const between = (m: number, a: number, b: number) => m >= a && m < b;

/** Spot FX: Sunday 17:00 to Friday 17:00 New York time. */
export function forexOpen(d = new Date()) {
  const { day, minutes } = partsIn("America/New_York", d);
  if (day === 6) return false;
  if (day === 0) return minutes >= 17 * 60;
  if (day === 5) return minutes < 17 * 60;
  return true;
}

export function sessionFor(group: MarketGroup, d = new Date()): SessionStatus {
  switch (group) {
    case "crypto":
      return "open";
    case "forex":
    case "commodities":
      return forexOpen(d) ? "open" : "closed";
    case "india": {
      const { day, minutes } = partsIn("Asia/Kolkata", d);
      return day >= 1 && day <= 5 && between(minutes, 9 * 60 + 15, 15 * 60 + 30) ? "open" : "closed";
    }
    case "global": {
      const { day, minutes } = partsIn("America/New_York", d);
      return day >= 1 && day <= 5 && between(minutes, 9 * 60 + 30, 16 * 60) ? "open" : "closed";
    }
  }
}
