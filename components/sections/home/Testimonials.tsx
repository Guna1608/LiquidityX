import Image from "next/image";
import { socialLinks, testimonials, whatsapp, type Testimonial } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Instagram, WhatsApp } from "@/components/ui/Icons";
import { GlowOrb } from "@/components/visuals/Glow";

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5 text-gold-400" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4" fill={i < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2" aria-hidden>
          <path d="M10 1.8 12.5 7l5.7.6-4.3 3.8 1.2 5.6L10 14.2 4.9 17l1.2-5.6L1.8 7.6 7.5 7 10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[min(84vw,24rem)] shrink-0 flex-col rounded-[22px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-6">
      {t.rating && <Stars n={t.rating} />}
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-bone/90">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {t.photo ? (
          <Image src={t.photo} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
        ) : (
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-bold text-ink">{t.name[0]}</span>
        )}
        <span>
          <span className="block text-sm font-bold">{t.name}</span>
          {t.detail && <span className="block text-xs text-smoke">{t.detail}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Student reviews. Renders only real entries from `config/site.ts → testimonials`.
 * While empty, shows a designed invitation instead of fabricated quotes.
 */
export function Testimonials() {
  const has = testimonials.length > 0;
  return (
    <MotionSection className="relative overflow-hidden py-20 md:py-28" aria-label="Student reviews">
      <div className="container-x">
        <SectionTitle align="center" eyebrow="Student reviews" title={["What our students", "say."]} accentLine={1} />
      </div>

      {has ? (
        <div className="mt-14 space-y-4" data-reveal="blur">
          {[0, 1].map((row) => (
            <div key={row} className="mask-fade-x flex overflow-hidden">
              <div className={`ticker-track flex w-max gap-4 pr-4 [--marquee-duration:70s] motion-safe:animate-marquee ${row ? "[animation-direction:reverse]" : ""}`}>
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div key={i} aria-hidden={i >= testimonials.length || undefined}>
                    <ReviewCard t={t} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container-x mt-14">
          <div className="relative isolate mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0b0c] p-8 text-center sm:p-14" data-reveal="scale">
            <GlowOrb className="-bottom-40 left-1/2 -z-10 size-[30rem] -translate-x-1/2" intensity={0.4} />
            <div className="mx-auto flex w-fit -space-x-3" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="grid size-12 place-items-center rounded-full border-2 border-[#0b0b0c] bg-[linear-gradient(135deg,#2a2a2e,#151517)] text-gold-300 motion-safe:animate-float"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <svg viewBox="0 0 20 20" className="size-5" fill="currentColor">
                    <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H3Z" />
                  </svg>
                </span>
              ))}
            </div>
            <p className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">Student stories are being collected.</p>
            <p className="mx-auto mt-3 max-w-lg text-mist">
              We only publish genuine reviews from real students, with their permission. Studied with LiquidityX? We&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={whatsapp.url("Hi LiquidityX, I'd like to share a review of the mentorship.")} icon={<WhatsApp size={16} />} iconPosition="start">
                Share your review
              </Button>
              <Button href={socialLinks.instagram.url} variant="ghost" icon={<Instagram size={16} />} iconPosition="start">
                See us on Instagram
              </Button>
            </div>
          </div>
        </div>
      )}
    </MotionSection>
  );
}
