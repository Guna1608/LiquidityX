import type { ReactNode } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";

/** Section heading: pill eyebrow, blur-in title (optional accent line), intro. Place inside <MotionSection>. */
export function SectionTitle({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
  size = "lg",
  accentLine,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string[];
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "md" | "lg" | "xl";
  accentLine?: number;
  className?: string;
}) {
  const sizes = {
    md: "text-[clamp(2rem,4.2vw,3.4rem)]",
    lg: "text-[clamp(2.3rem,5.4vw,4.4rem)]",
    xl: "text-[clamp(2.8rem,8vw,6.5rem)]",
  };
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <div className={cn("flex", align === "center" && "justify-center")} data-reveal="blur">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-mist">
          <span className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_#ff7a1a]" />
          {index && <span className="text-smoke">{index}</span>}
          {eyebrow}
        </span>
      </div>
      <TextReveal
        as={as}
        lines={title}
        className={cn(sizes[size], "mt-5 font-bold leading-[1.02] tracking-[-0.04em] text-bone")}
        accentLine={accentLine}
      />
      {intro && (
        <div className={cn("mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mist", align === "center" && "mx-auto")} data-reveal="rise" data-delay="0.15">
          {intro}
        </div>
      )}
    </div>
  );
}
