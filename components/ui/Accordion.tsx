"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { Plus } from "./Icons";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: ReactNode; a: ReactNode };

/** Accessible disclosure list (WAI-ARIA accordion pattern) rendered as glass pills. */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-[22px] border transition-all duration-500",
              isOpen ? "border-gold-500/35 bg-gold-500/[0.05] shadow-[0_20px_50px_-30px_rgba(255,122,26,0.6)]" : "border-white/[0.08] bg-white/[0.03] hover:border-white/15",
            )}
          >
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
              >
                <span className="flex-1 text-[16px] font-medium tracking-tight text-bone sm:text-[17px]">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-expo)]",
                    isOpen ? "rotate-45 border-gold-400 bg-gold-500 text-white" : "border-white/15 text-mist",
                  )}
                >
                  <Plus size={15} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                  animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                  exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="max-w-3xl px-5 pb-6 text-[15px] leading-relaxed text-mist sm:px-7">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
