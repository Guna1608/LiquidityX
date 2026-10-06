import { curriculum, strategies } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { CountUp } from "@/components/motion/CountUp";
import { GlowOrb } from "@/components/visuals/Glow";
import { cn } from "@/lib/cn";

/** Facts only — every number here comes from the approved programme details. */
const stats = [
  { n: 15, s: "", label: "Days of live mentorship", sub: "Weekday classes" },
  { n: strategies.length, s: "", label: "Named strategies", sub: "Taught in context" },
  { n: curriculum.length, s: "", label: "Structured modules", sub: "Foundations to risk" },
  { n: 2, s: "", label: "Markets", sub: "Forex & Futures" },
];

export function Stats() {
  return (
    <MotionSection className="relative py-20 md:py-28" aria-label="Programme at a glance">
      <div className="container-x">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group="0.1">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal="rise"
              className={cn(
                "group relative overflow-hidden rounded-[22px] p-6 sm:p-7",
                i === 0 ? "bg-[linear-gradient(160deg,#ff8a2a,#c94c05)] text-white" : "panel",
              )}
            >
              {i === 0 && <GlowOrb className="-right-16 -top-16 size-56 mix-blend-screen" intensity={0.6} />}
              <p className={cn("relative text-[clamp(3rem,6vw,4.4rem)] font-black leading-none tracking-[-0.05em]", i === 0 ? "text-white" : "text-bone")}>
                <CountUp to={s.n} suffix={s.s} />
              </p>
              <p className={cn("relative mt-10 text-[15px] font-medium", i === 0 ? "text-white" : "text-bone")}>{s.label}</p>
              <p className={cn("relative mt-1 text-sm", i === 0 ? "text-white/75" : "text-smoke")}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
