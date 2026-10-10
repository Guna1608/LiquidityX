"use client";

import { whatsapp } from "@/config/site";
import { WhatsApp } from "@/components/ui/Icons";

/**
 * Desktop: compact circular action above the chatbot that expands to
 * "Message us on WhatsApp" on hover/focus. Mobile: full-width sticky bottom CTA.
 */
export function WhatsAppFloat() {
  return (
    <>
      <a
        href={whatsapp.url()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="wa-float group fixed bottom-[6.25rem] right-6 z-[70] hidden h-12 items-center overflow-hidden rounded-full border border-gold-400/30 bg-ink/80 pl-3.5 pr-3.5 text-gold-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-[padding,border-color] duration-500 ease-[var(--ease-expo)] hover:border-gold-300/70 hover:pr-5 focus-visible:pr-5 md:flex"
      >
        <WhatsApp size={20} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:ml-2.5 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-40 group-focus-visible:opacity-100">
          Message us on WhatsApp
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-gold-400/20 bg-ink/85 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
        <a
          href={whatsapp.url()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#2447d8,#5278ff_55%,#8b5cf6)] text-[0.95rem] font-medium text-white"
        >
          <WhatsApp size={18} />
          {whatsapp.cta}
        </a>
      </div>
    </>
  );
}
