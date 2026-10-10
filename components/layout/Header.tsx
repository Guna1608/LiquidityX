"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { navigation, whatsapp } from "@/config/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Floating pill navigation (glass), darkens on scroll. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <a href="#main" className="sr-only z-[120] rounded-full bg-gold-400 px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <motion.header
        initial={{ y: -40, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[80] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1180px] items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 transition-all duration-500 ease-[var(--ease-expo)] sm:pl-5",
            scrolled || menuOpen ? "border-white/10 bg-[#0c0c0d]/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl" : "border-white/[0.06] bg-white/[0.03] backdrop-blur-md",
          )}
        >
          <Link href="/" aria-label="LiquidityX Academy — Home" className="relative z-[2] flex shrink-0 items-center gap-2.5">
            <Wordmark compact markSize={30} id="wh" className="text-[16px]" />
          </Link>

          <LayoutGroup id="nav">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {navigation.primary.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative block whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300",
                          active ? "text-bone" : "text-mist hover:text-bone",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.08]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </LayoutGroup>

          <div className="relative z-[2] flex items-center gap-2">
            <Button href={whatsapp.url()} size="sm" icon={<WhatsApp size={15} />} iconPosition="start" className="hidden sm:inline-flex">
              Message us on WhatsApp
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={cn("absolute left-0 h-[1.5px] w-4 rounded bg-bone transition-all duration-500", menuOpen ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[1.5px] w-4 rounded bg-bone transition-all duration-500", menuOpen ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
