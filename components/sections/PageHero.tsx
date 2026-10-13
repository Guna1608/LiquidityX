import type { ReactNode } from "react";
import { MotionSection } from "@/components/motion/MotionSection";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Inner-page opener: centered pill eyebrow, blur-in title, intro, optional actions, warm top glow. */
export function PageHero({
  eyebrow,
  title,
  accentLine,
  intro,
  children,
  className,
  align = "center",
  crumb,
}: {
  eyebrow: string;
  title: string[];
  accentLine?: number;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "center" | "left";
  /** Adds BreadcrumbList structured data for this page. */
  crumb?: { name: string; path: string };
}) {
  const center = align === "center";
  return (
    <MotionSection className={cn("relative isolate overflow-hidden pb-8 pt-28 md:pb-20 md:pt-48", className)}>
      {crumb && <JsonLd data={breadcrumbJsonLd([crumb])} />}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 tech-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000,transparent)]" />
        <div className="absolute left-1/2 top-[-35%] h-[80%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,0.2),transparent)] blur-3xl" />
      </div>
      <div className={cn("container-x", center && "text-center")}>
        <div className={cn("flex", center && "justify-center")} data-reveal="blur">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-mist">
            <span className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_#ff7a1a]" />
            {eyebrow}
          </span>
        </div>
        <TextReveal
          as="h1"
          start="mount"
          delay={0.1}
          lines={title}
          accentLine={accentLine}
          className={cn("mt-6 text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.98] tracking-[-0.045em]", center && "mx-auto max-w-4xl")}
        />
        {intro && (
          <div className={cn("mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-mist sm:text-lg", center && "mx-auto")} data-reveal="rise" data-delay="0.45">
            {intro}
          </div>
        )}
        {children && (
          <div className={cn("mt-9 flex", center && "justify-center")} data-reveal="rise" data-delay="0.55">
            {children}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
