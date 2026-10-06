"use client";

import { gsap, ScrollTrigger } from "./gsap";

/**
 * Centralised scroll-animation vocabulary. Every reveal in the site goes
 * through `reveal()` so timing, easing and reduced-motion handling stay
 * consistent. Components never hand-roll their own entrance tweens.
 */
export type RevealType = "fade" | "rise" | "blur" | "clip" | "mask" | "rotate3d" | "scale" | "depth" | "draw";

type From = gsap.TweenVars;

const presets: Record<RevealType, { from: From; to: From }> = {
  fade: { from: { opacity: 0 }, to: { opacity: 1, duration: 1.2, ease: "power2.out" } },
  // default: soft rise out of blur (reference-style)
  rise: { from: { opacity: 0, y: 36, filter: "blur(10px)" }, to: { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" } },
  blur: { from: { opacity: 0, filter: "blur(18px)", scale: 1.04 }, to: { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.3, ease: "power3.out" } },
  clip: {
    from: { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" },
    to: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
  },
  mask: { from: { opacity: 0, yPercent: 40, filter: "blur(10px)" }, to: { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 1.1 } },
  rotate3d: {
    from: { opacity: 0, rotateX: -18, y: 50, filter: "blur(8px)", transformPerspective: 1200, transformOrigin: "50% 100%" },
    to: { opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
  },
  scale: { from: { opacity: 0, scale: 0.94, filter: "blur(8px)" }, to: { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" } },
  depth: { from: { opacity: 0, z: -200, transformPerspective: 1200 }, to: { opacity: 1, z: 0, duration: 1.3 } },
  draw: { from: { strokeDashoffset: 1 }, to: { strokeDashoffset: 0, duration: 1.8, ease: "power3.inOut" } },
};

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type RevealOptions = {
  trigger?: Element | null;
  start?: string;
  stagger?: number;
  delay?: number;
  /** Tie progress to scroll position instead of playing once. */
  scrub?: boolean | number;
  once?: boolean;
};

export function reveal(targets: gsap.TweenTarget, type: RevealType = "rise", opts: RevealOptions = {}) {
  const { from, to } = presets[type];
  if (prefersReducedMotion()) {
    gsap.set(targets, { clearProps: "transform,clipPath,filter", opacity: 1 });
    return null;
  }
  return gsap.fromTo(targets, from, {
    ...to,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0.08,
    scrollTrigger: opts.trigger
      ? {
          trigger: opts.trigger,
          start: opts.start ?? "top 84%",
          end: opts.scrub ? "bottom 60%" : undefined,
          scrub: opts.scrub ?? false,
          once: opts.scrub ? false : opts.once ?? true,
        }
      : undefined,
  });
}

/** Parallax a target vertically by `amount` px across its scroll range. */
export function parallax(target: Element, amount = 80, trigger?: Element) {
  if (prefersReducedMotion()) return null;
  return gsap.fromTo(
    target,
    { y: -amount / 2 },
    {
      y: amount / 2,
      ease: "none",
      scrollTrigger: { trigger: trigger ?? target, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}

/** Progress (0..1) of a pinned scroll section, written into a mutable ref for 3D scenes. */
export function scrollProgress(
  trigger: Element,
  onUpdate: (p: number) => void,
  opts: { pin?: boolean | Element; end?: string; start?: string } = {},
) {
  return ScrollTrigger.create({
    trigger,
    start: opts.start ?? "top top",
    end: opts.end ?? "bottom bottom",
    pin: opts.pin ?? false,
    scrub: true,
    onUpdate: (self) => onUpdate(self.progress),
  });
}
