"use client";

/**
 * Tiny analytics facade. Sends to whatever is loaded (GA4 gtag, GTM dataLayer,
 * Meta Pixel) — and silently does nothing when analytics is off or not consented.
 */
type W = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
};

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.gtag?.("event", event, params);
  w.dataLayer?.push({ event, ...params });
  if (w.fbq) {
    if (event === "generate_lead") w.fbq("track", "Lead", params);
    else if (event === "contact") w.fbq("track", "Contact", params);
    else w.fbq("trackCustom", event, params);
  }
}

/** Classify an outbound/contact link for lead tracking. */
export function classifyLink(href: string): { event: string; channel: string } | null {
  if (href.includes("wa.me/")) return { event: "generate_lead", channel: "whatsapp" };
  if (href.startsWith("tel:")) return { event: "contact", channel: "phone" };
  if (href.startsWith("mailto:")) return { event: "contact", channel: "email" };
  if (href.includes("instagram.com")) return { event: "social_click", channel: "instagram" };
  if (href.includes("t.me/")) return { event: "social_click", channel: "telegram" };
  return null;
}
