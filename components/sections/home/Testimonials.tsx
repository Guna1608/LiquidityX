import Image from "next/image";
import { testimonials, type Testimonial } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="w-[min(84vw,22rem)] shrink-0 overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0c0c0d]">
      {t.image ? (
        // Owner-supplied WhatsApp screenshot, already cleaned (no phone numbers or profile photos).
        <Image src={t.image} alt={`Student review: ${t.quote}`} width={640} height={800} className="h-auto w-full" sizes="(min-width: 640px) 22rem, 84vw" />
      ) : (
        <blockquote className="p-6 text-[15px] leading-relaxed text-bone/90">&ldquo;{t.quote}&rdquo;</blockquote>
      )}
      {t.name && <figcaption className="border-t border-white/[0.06] px-5 py-3 text-sm font-medium text-mist">{t.name}</figcaption>}
    </figure>
  );
}

/**
 * Genuine student reviews (cleaned WhatsApp screenshots). Renders nothing at
 * all until real reviews are added to `testimonials` — no placeholders, no
 * invented quotes, ratings or student counts.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <MotionSection className="relative overflow-hidden py-12 md:py-28" aria-label="Student reviews">
      <div className="container-x">
        <SectionTitle align="center" eyebrow="Student reviews" title={["What our students", "say."]} accentLine={1} />
      </div>
      <div className="no-scrollbar mt-9 md:mt-14 flex snap-x gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pb-4 lg:justify-center" data-reveal="blur">
        {testimonials.map((t, i) => (
          <div key={i} className="snap-start">
            <ReviewCard t={t} />
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
