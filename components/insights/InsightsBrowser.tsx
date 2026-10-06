"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { insightCategories } from "@/config/site";
import type { Insight } from "@/config/insights";
import { cn } from "@/lib/cn";
import { InsightCard } from "./InsightCard";

/** Category filter + animated card grid. */
export function InsightsBrowser({ items }: { items: Insight[] }) {
  const [cat, setCat] = useState<string>("All");
  const filtered = cat === "All" ? items : items.filter((i) => i.category === cat);
  const cats = ["All", ...insightCategories];

  return (
    <div>
      <div role="tablist" aria-label="Filter by category" className="no-scrollbar -mx-[clamp(1rem,4.5vw,3.5rem)] flex gap-2 overflow-x-auto px-[clamp(1rem,4.5vw,3.5rem)] pb-2">
        {cats.map((c) => {
          const count = c === "All" ? items.length : items.filter((i) => i.category === c).length;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-300",
                cat === c ? "border-gold-300 bg-gold-300 text-ink" : "border-white/10 text-mist hover:border-gold-400/40 hover:text-bone",
              )}
            >
              {c} <span className="ml-1 font-mono text-[0.65rem] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((a, i) => (
            <motion.li
              key={a.slug}
              layout
              initial={{ opacity: 0, y: 30, rotateX: -12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            >
              <InsightCard insight={a} index={i} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {!filtered.length && (
        <p className="panel mt-6 rounded-2xl p-10 text-center text-mist">No articles in this category yet. New educational insights are being prepared.</p>
      )}
    </div>
  );
}
