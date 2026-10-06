import Link from "next/link";
import { legal } from "@/config/site";
import type { LegalSection } from "@/config/legal";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";

/** Shared layout for Privacy, Terms and Risk Disclaimer: sticky TOC + readable column. */
export function LegalDocument({
  eyebrow,
  title,
  intro,
  sections,
  requiresReview = true,
}: {
  eyebrow: string;
  title: string[];
  intro: string;
  sections: LegalSection[];
  requiresReview?: boolean;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={<p>{intro}</p>}>
        <div className="flex flex-wrap gap-3 text-[12px] font-medium text-smoke">
          <span>Last updated · {legal.lastUpdated}</span>
          {requiresReview && (
            <span className="rounded-full border border-gold-500/50 bg-gold-600/15 px-3 py-1 text-gold-100">{legal.reviewNotice}</span>
          )}
        </div>
      </PageHero>

      <MotionSection className="pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow mb-5">Contents</p>
              <ol className="space-y-2.5 border-l border-white/[0.07] text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-mist transition-colors hover:border-gold-300 hover:text-bone">
                      <span className="mr-2 font-mono text-[0.65rem] text-smoke">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-3xl">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-white/[0.07] py-10 first:border-t-0 first:pt-0" data-reveal="fade">
                <h2 className="flex items-baseline gap-4 font-display text-[1.45rem] font-medium tracking-tight sm:text-[1.7rem]">
                  <span className="font-mono text-xs text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.review && (
                  <p className="mt-4 rounded-xl border border-gold-500/40 bg-gold-600/10 px-4 py-3 text-sm text-gold-100">
                    <strong className="font-medium">Owner / legal review required:</strong> {s.review}
                  </p>
                )}
                <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-mist">
                  {s.body.map((b, j) =>
                    typeof b === "string" ? (
                      <p key={j}>{b}</p>
                    ) : (
                      <ul key={j} className="list-none space-y-2.5">
                        {b.list.map((li) => (
                          <li key={li} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-gold-400">
                            {li}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
            <p className="mt-6 border-t border-white/[0.07] pt-8 text-sm text-smoke">
              Related:{" "}
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms & Conditions", "/terms"],
                ["Trading Risk Disclaimer", "/risk-disclaimer"],
              ].map(([l, h], i) => (
                <span key={h}>
                  {i > 0 && " · "}
                  <Link href={h} className="text-mist underline decoration-gold-500/40 underline-offset-4 hover:text-gold-200">
                    {l}
                  </Link>
                </span>
              ))}
            </p>
          </article>
        </div>
      </MotionSection>
    </>
  );
}
