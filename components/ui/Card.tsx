"use client";

import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

/**
 * Premium surface with 3D pointer tilt, a light sheen that follows the cursor,
 * depth layering (children with `data-depth` float above the plane) and a
 * border that responds to hover. Tilt is skipped on touch / reduced motion.
 */
type CardProps<T extends ElementType> = {
  as?: T;
  tilt?: number;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: "gold" | "cyan";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Card<T extends ElementType = "div">({
  as,
  tilt = 8,
  children,
  className,
  innerClassName,
  glow = "gold",
  ...rest
}: CardProps<T>) {
  // polymorphic tag: typed as the default element for JSX purposes
  const Tag = (as ?? "div") as "div";
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || tilt === 0) return;
      if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
      const inner = el.querySelector<HTMLElement>("[data-card-inner]");
      if (!inner) return;
      const rx = gsap.quickTo(inner, "rotationX", { duration: 0.7, ease: "power3.out" });
      const ry = gsap.quickTo(inner, "rotationY", { duration: 0.7, ease: "power3.out" });
      const depthEls = gsap.utils.toArray<HTMLElement>("[data-depth]", el);
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        rx((0.5 - py) * tilt);
        ry((px - 0.5) * tilt);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        depthEls.forEach((d) => {
          const z = Number(d.dataset.depth ?? 20);
          gsap.to(d, { x: (px - 0.5) * z * 0.6, y: (py - 0.5) * z * 0.6, z, duration: 0.7, ease: "power3.out" });
        });
      };
      const leave = () => {
        rx(0);
        ry(0);
        depthEls.forEach((d) => gsap.to(d, { x: 0, y: 0, z: 0, duration: 1, ease: "power3.out" }));
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref, dependencies: [tilt] },
  );

  return (
    <Tag ref={ref} className={cn("group/card relative [perspective:1200px]", className)} {...rest}>
      <div
        data-card-inner
        className={cn(
          "panel preserve-3d relative h-full overflow-hidden rounded-[1.25rem] transition-[border-color,box-shadow] duration-700",
          glow === "gold" ? "hover:border-gold-400/35" : "hover:border-cyan-400/30",
          "hover:shadow-[0_40px_120px_-50px_rgba(139,92,246,0.35)]",
          innerClassName,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background:
              glow === "gold"
                ? "radial-gradient(520px circle at var(--mx,50%) var(--my,0%), rgba(231,201,131,0.13), transparent 45%)"
                : "radial-gradient(520px circle at var(--mx,50%) var(--my,0%), rgba(147,227,236,0.11), transparent 45%)",
          }}
        />
        {children}
      </div>
    </Tag>
  );
}
