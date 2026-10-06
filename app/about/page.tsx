import { approachLayers, mentor, mentorship } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { PortraitFrame } from "@/components/sections/PortraitFrame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { LayerGlyph } from "@/components/sections/home/LayerGlyph";
import { GlowOrb } from "@/components/visuals/Glow";
import { CTA } from "@/components/sections/CTA";
import { whatsapp } from "@/config/site";

export const metadata = pageMetadata({
  title: "About Vignesh — Founder / Mentor",
  description: mentor.summary,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <MotionSection className="relative isolate overflow-hidden pb-20 pt-36 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 tech-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_30%_10%,#000,transparent)]" />
          <GlowOrb className="-right-40 top-10 size-[38rem]" intensity={0.3} />
        </div>
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div data-reveal="blur">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-mist">
                <span className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_#ff7a1a]" />
                About · {mentor.role}
              </span>
            </div>
            <TextReveal
              as="h1"
              start="mount"
              delay={0.1}
              lines={["Meet", mentor.name]}
              accentLine={1}
              className="mt-6 text-[clamp(3.2rem,10vw,8.5rem)] font-black leading-[0.9] tracking-[-0.055em]"
            />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist" data-reveal="rise" data-delay="0.4">
              {mentor.summary}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal="rise" data-delay="0.5">
              <Button href={whatsapp.url()} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
                Chat on WhatsApp
              </Button>
              <Button href="/mentorship" size="lg" variant="ghost" icon={<ArrowRight size={16} />}>
                The mentorship
              </Button>
            </div>
          </div>
          <div data-reveal="blur" data-delay="0.3">
            <PortraitFrame priority className="mx-auto max-w-[26rem]" />
          </div>
        </div>
      </MotionSection>

      <MotionSection className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionTitle eyebrow="Teaching approach" title={["Structure", "before strategy."]} accentLine={1} size="md" />
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist lg:pt-12" data-reveal="rise">
              <p>
                The mentorship is built in layers: first how the market moves, then where it finds value, where volume concentrates and who is acting — and
                only then how a strategy is applied with defined risk.
              </p>
              <p>{mentorship.heroLine}</p>
            </div>
          </div>
          <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-reveal-group="0.08">
            {approachLayers.map((l) => (
              <li key={l.id} className="panel rounded-[22px] p-5" data-reveal="rise">
                <LayerGlyph id={l.id} className="w-full" />
                <p className="mt-5 text-xs font-bold text-gold-300">{l.index}</p>
                <h3 className="mt-1 text-base font-bold">{l.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-smoke">{l.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      <MotionSection className="py-12">
        <div className="container-x grid gap-3 md:grid-cols-4" data-reveal-group="0.08">
          {mentorship.facts.map((f) => (
            <div key={f.label} className="panel rounded-[22px] p-6" data-reveal="rise">
              <p className="text-xs text-smoke">{f.label}</p>
              <p className="mt-2 text-xl font-bold tracking-tight">{f.value}</p>
            </div>
          ))}
        </div>
        {mentor.verifiedFacts.length > 0 && (
          <ul className="container-x mt-8 space-y-2 text-mist">
            {mentor.verifiedFacts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </MotionSection>

      <CTA title={["Learn with", "Vignesh."]} />
    </>
  );
}
