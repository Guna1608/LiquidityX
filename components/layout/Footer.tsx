import Link from "next/link";
import { brand, contact, navigation, socialLinks, whatsapp, youtubeInvite } from "@/config/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { Instagram, Mail, Telegram, WhatsApp, YouTube } from "@/components/ui/Icons";
import { MotionSection } from "@/components/motion/MotionSection";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <MotionSection as="footer" className="relative isolate overflow-hidden border-t border-white/[0.06] pb-28 pt-20 md:pb-10 md:pt-24">
      <div aria-hidden className="absolute bottom-[-30%] left-1/2 -z-10 h-[60%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(82,120,255,0.18),transparent)] blur-3xl" />
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5" data-reveal="rise">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="LiquidityX Academy — Home">
              <Wordmark className="text-xl" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">
              Trading education taught in Tamil — market context, volume, order flow and risk across Forex, Futures and Indian markets.
            </p>
            <div className="mt-7 flex gap-2">
              {[
                { href: whatsapp.url(), label: "WhatsApp", icon: <WhatsApp size={16} /> },
                { href: socialLinks.instagram.url, label: "Instagram", icon: <Instagram size={16} /> },
                { href: socialLinks.telegram.url, label: "Telegram", icon: <Telegram size={16} /> },
                { href: socialLinks.youtube.url, label: "YouTube", icon: <YouTube size={16} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/60 hover:text-gold-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="mt-4 max-w-sm text-[13px] text-smoke">{youtubeInvite}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4" data-reveal="rise" data-delay="0.05">
            <p className="mb-4 text-sm font-bold">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px]">
              {navigation.footer.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-mist transition-colors hover:text-bone">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3" data-reveal="rise" data-delay="0.1">
            <p className="mb-4 text-sm font-bold">Contact</p>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <a href={whatsapp.url()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-mist hover:text-bone">
                  <WhatsApp size={15} className="text-gold-400" /> {contact.whatsappDisplay}
                  <span className="text-[11px] text-smoke">(WhatsApp only)</span>
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="inline-flex items-center gap-2.5 break-all text-mist hover:text-bone">
                  <Mail size={15} className="shrink-0 text-gold-400" /> {contact.email}
                </a>
              </li>
            </ul>
            <p className="mb-3 mt-8 text-sm font-bold">Legal</p>
            <ul className="space-y-2 text-[14px]">
              {navigation.legal.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-mist hover:text-bone">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7" data-reveal="rise">
          <p className="text-sm font-bold">Risk warning</p>
          <p className="mt-2 text-[13px] leading-relaxed text-smoke">
            Trading Forex, Futures and other markets involves substantial risk and is not suitable for everyone. Content on this website is educational and is not financial
            advice. LiquidityX does not guarantee profits or any specific return. Past performance is not indicative of future results. Read the{" "}
            <Link href="/risk-disclaimer" className="text-mist underline decoration-gold-500/60 underline-offset-4 hover:text-bone">
              Trading Risk Disclaimer
            </Link>
            .
          </p>
        </div>

        <div aria-hidden className="mt-14 select-none opacity-[0.14]">
          <p className="text-center text-[clamp(3.5rem,15vw,13rem)] font-black leading-[0.8] tracking-[-0.06em] text-fade" data-reveal="blur">
            {brand.wordmark}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-[13px] text-smoke">
          <span>© {year} LiquidityX Academy. All rights reserved.</span>
          <span>Vignesh · Founder & Mentor</span>
        </div>
      </div>
    </MotionSection>
  );
}
