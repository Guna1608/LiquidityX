"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { useGSAP } from "@/lib/motion/gsap";
import { reveal, type RevealType } from "@/lib/motion/presets";

/**
 * Declarative scroll-reveal host. Any descendant with
 * `data-reveal="rise|fade|clip|mask|rotate3d|scale|depth"` animates as it
 * enters the viewport. `data-delay` (seconds) offsets individual items, and
 * `data-reveal-group` children stagger together off the group's trigger.
 */
type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function MotionSection<T extends ElementType = "section">({ as, children, className, ...rest }: Props<T>) {
  // polymorphic tag: typed as the default element for JSX purposes
  const Tag = (as ?? "section") as "section";
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const handled = new Set<Element>();

      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>(":scope > [data-reveal]"));
        items.forEach((i) => handled.add(i));
        if (!items.length) return;
        const type = (items[0].dataset.reveal as RevealType) || "rise";
        reveal(items, type, { trigger: group, stagger: Number(group.dataset.revealGroup) || 0.09 });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (handled.has(el)) return;
        reveal(el, (el.dataset.reveal as RevealType) || "rise", { trigger: el, delay: Number(el.dataset.delay ?? 0) });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
