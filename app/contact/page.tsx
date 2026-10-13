import type { ReactNode } from "react";
import { contact, socialLinks, whatsapp, youtubeInvite } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Instagram, Mail, Telegram, WhatsApp, YouTube } from "@/components/ui/Icons";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Message LiquidityX Academy on WhatsApp (+91 88700 01201) for a quick response, or find us by email, Instagram, Telegram and YouTube.",
  path: "/contact",
});

type Channel = { label: string; value: string; href: string; icon: ReactNode; cta: string; primary?: boolean };

const channels: Channel[] = [
  { label: "WhatsApp (messages only)", value: contact.whatsappDisplay, href: whatsapp.url(), icon: <WhatsApp size={20} />, cta: "WhatsApp", primary: true },
  { label: "Email", value: contact.email, href: contact.emailHref, icon: <Mail size={20} />, cta: "Email" },
  { label: "Instagram", value: socialLinks.instagram.handle, href: socialLinks.instagram.url, icon: <Instagram size={20} />, cta: "Instagram" },
  { label: "Telegram", value: socialLinks.telegram.handle, href: socialLinks.telegram.url, icon: <Telegram size={20} />, cta: "Telegram" },
];

export default function ContactPage() {
  return (
    <MotionSection className="relative isolate overflow-hidden pb-24 pt-36 md:pt-44">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow" data-reveal="fade">
            Contact
          </p>
          <TextReveal
            as="h1"
            start="mount"
            lines={["Let's Talk", "Trading", "Education."]}
            accentLine={2}
            className="mt-7 text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
          <p className="mt-8 max-w-lg text-mist" data-reveal="rise" data-delay="0.3">
            {contact.responseLine} Ask about the next batch, the course or enrolment. The number is for WhatsApp messages only — we do not take phone calls.
          </p>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2" data-reveal-group="0.08">
            {channels.map((c) => (
              <li key={c.label} data-reveal="rotate3d">
                <Card as="div" tilt={7} glow={c.primary ? "gold" : "cyan"} className="h-full" innerClassName={c.primary ? "border-gold-400/30 p-5" : "p-5"}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="relative z-[3] flex h-full flex-col gap-6 after:absolute after:inset-0 after:content-['']"
                    aria-label={`${c.cta}: ${c.value}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className={c.primary ? "text-gold-200" : "text-cyan-200"}>{c.icon}</span>
                      <ArrowUpRight size={16} className="text-mist transition-transform duration-500 group-hover/card:rotate-45 group-hover/card:text-gold-200" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-medium text-smoke">{c.label}</span>
                      <span className="mt-1.5 block break-all font-display text-lg font-medium text-bone">{c.value}</span>
                    </span>
                  </a>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-24" data-reveal="rise">
          <div className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0b0c] p-8 sm:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.3),transparent)]" />
            <span className="grid size-12 place-items-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300">
              <YouTube size={22} />
            </span>
            <p className="mt-6 text-2xl font-bold tracking-tight">YouTube</p>
            <p className="mt-2 text-mist">{youtubeInvite}</p>
            <a
              href={socialLinks.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-medium text-white hover:brightness-110"
            >
              <YouTube size={16} /> Subscribe on YouTube
            </a>
            <p className="mt-4 text-xs text-smoke">{socialLinks.youtube.handle}</p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
