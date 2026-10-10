import { whatsapp } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { GlowOrb } from "@/components/visuals/Glow";

/** Conversion card with a slowly drifting sun-orb of light. */
export function CTA({
  title = ["Ready to read", "the market clearly?"],
  line = "Message us on WhatsApp to hear about the next batch.",
  secondary = { label: "Explore the mentorship", href: "/mentorship" },
  message,
}: {
  title?: string[];
  line?: string;
  secondary?: { label: string; href: string } | null;
  message?: string;
}) {
  return (
    <MotionSection className="relative py-12 md:py-28">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0b0b0c] px-6 py-20 text-center sm:px-12 md:py-28" data-reveal="scale">
          <GlowOrb className="-bottom-[55%] -left-[10%] -z-10 aspect-square w-[70%]" />
          <GlowOrb className="-right-[25%] -top-[70%] -z-10 aspect-square w-[55%]" intensity={0.35} />
          <div aria-hidden className="absolute inset-0 -z-10 dot-grid opacity-40 [mask-image:radial-gradient(60%_70%_at_50%_50%,#000,transparent)]" />
          <TextReveal as="h2" lines={title} accentLine={title.length - 1} className="mx-auto max-w-3xl text-[clamp(2.3rem,6vw,4.8rem)] font-bold leading-[1] tracking-[-0.045em]" />
          <p className="mx-auto mt-6 max-w-lg text-lg text-mist" data-reveal="rise">
            {line}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" data-reveal="rise" data-delay="0.1">
            <Button href={whatsapp.url(message)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
              {whatsapp.cta}
            </Button>
            {secondary && (
              <Button href={secondary.href} size="lg" variant="ghost" icon={<ArrowRight size={16} />}>
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
