"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { contact, navigation, socialLinks, whatsapp } from "@/config/site";
import { MarketStatus } from "@/components/market/MarketStatus";
import { useLenis } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/** Full-screen cinematic navigation panel for tablet and mobile. */
export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a,button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("a")?.focus(), 350);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, lenis, onClose]);

  const items = [...navigation.primary, { label: "Contact", href: "/contact" }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[75] overflow-y-auto bg-ink lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.6rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
          transition={{ duration: 0.75, ease }}
        >
          <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_60%_at_80%_10%,#000,transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-gold-400/10 blur-3xl" />
          <div className="container-x relative flex min-h-full flex-col pb-10 pt-24">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {items.map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className="overflow-hidden border-b border-white/[0.06]">
                      <motion.div
                        initial={{ y: "110%", rotate: 3 }}
                        animate={{ y: 0, rotate: 0 }}
                        exit={{ y: "-110%", transition: { duration: 0.3, delay: 0 } }}
                        transition={{ duration: 0.8, ease, delay: 0.18 + i * 0.05 }}
                        className="origin-left"
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-baseline gap-4 py-4 sm:py-5"
                        >
                          <span className="font-mono text-[0.65rem] text-gold-400/70">{String(i + 1).padStart(2, "0")}</span>
                          <span
                            className={cn(
                              "font-display text-[clamp(1.9rem,8vw,3.4rem)] font-medium leading-none tracking-tight transition-colors",
                              active ? "text-gold" : "text-bone group-hover:text-gold-200",
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.55 }}
              className="mt-auto grid gap-6 pt-10"
            >
              <a
                href={whatsapp.url()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2447d8,#5278ff_55%,#8b5cf6)] font-medium text-white"
              >
                {whatsapp.cta}
              </a>
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[0.7rem] tracking-wider text-mist">
                <span>WhatsApp {contact.whatsappDisplay}</span>
                <div className="flex gap-5">
                  <a href={socialLinks.instagram.url} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  <a href={socialLinks.telegram.url} target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                  <a href={socialLinks.youtube.url} target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </div>
              </div>
              <MarketStatus />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
