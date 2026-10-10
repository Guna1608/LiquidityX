"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";
import { CandleLoader } from "@/components/brand/CandleLoader";
import { useLenis } from "./SmoothScroll";

/**
 * Route transition with a trading-candle loader:
 * the page blurs out under a dark curtain, candles print while the next
 * route loads (shown for at least MIN_MS so it reads), then the curtain lifts.
 * Internal link clicks are intercepted globally, so plain <Link>/<a> just work.
 */
const MIN_MS = 650;

const labelFor = (path: string) => {
  if (path.startsWith("/classes")) return "Loading upcoming classes…";
  if (path.startsWith("/strategies")) return "Loading strategies…";
  if (path.startsWith("/market")) return "Loading market data…";
  if (path.startsWith("/insights")) return "Loading insights…";
  if (path.startsWith("/mentorship")) return "Loading the mentorship…";
  return "Loading market structure…";
};

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const overlay = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<{ started: number; timeout: ReturnType<typeof setTimeout> } | null>(null);

  // first-visit intro (Netflix-style): shown once, remembered in localStorage
  useEffect(() => {
    const html = document.documentElement;
    try {
      localStorage.setItem("lx-seen", "1");
    } catch {
      /* private mode */
    }
    const t = setTimeout(() => {
      html.classList.add("lx-ready");
      html.classList.remove("lx-intro");
    }, 4200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || url.pathname.startsWith("/api")) return;
      if (prefersReducedMotion() || busy.current) return;

      e.preventDefault();
      busy.current = true;
      const text = label.current?.querySelector("[role=status] span.text-mist");
      if (text) text.textContent = labelFor(url.pathname);
      cover().then(() => {
        pending.current = { started: performance.now(), timeout: setTimeout(uncover, 4000) };
        router.push(url.pathname + url.search + url.hash);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    if (pending.current) {
      const { started, timeout } = pending.current;
      clearTimeout(timeout);
      pending.current = null;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      setTimeout(uncover, wait);
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function cover() {
    const el = overlay.current;
    const main = document.getElementById("main");
    if (!el) return Promise.resolve();
    gsap.killTweensOf(el);
    gsap.set(el, { visibility: "visible" });
    if (main) gsap.to(main, { filter: "blur(10px)", opacity: 0.4, scale: 0.985, duration: 0.35, ease: "power2.out" });
    return gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }).then(() => undefined);
  }

  function uncover() {
    const el = overlay.current;
    const main = document.getElementById("main");
    if (!el) return;
    if (main) gsap.fromTo(main, { filter: "blur(10px)", opacity: 0, scale: 1.01 }, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", clearProps: "filter,transform,opacity" });
    gsap.to(el, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(el, { visibility: "hidden" });
        busy.current = false;
      },
    });
  }

  return (
    <>
      {children}
      <div ref={overlay} data-transition-overlay aria-hidden className="pointer-events-none invisible fixed inset-0 z-[95] grid place-items-center bg-ink/92 backdrop-blur-md">
        <div ref={label}>
          <CandleLoader />
        </div>
      </div>
    </>
  );
}
