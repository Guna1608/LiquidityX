import Link from "next/link";
import { MotionSection } from "@/components/motion/MotionSection";

const principles = [
  { k: "Education, not signals", v: "We teach how to read structure. We don't send buy/sell calls or personalised advice." },
  { k: "Risk first", v: "Risk and capital protection are taught as part of every strategy — not as an afterthought." },
  { k: "Professional Trading Education", v: "Explore professional trading approaches through personalised teaching, practical examples and structured strategies. Build the understanding to develop your own informed, risk-aware trading process." },
];

/** Trust layer — what LiquidityX stands for, stated plainly. */
export function Principles() {
  return (
    <MotionSection className="relative py-10 md:py-24" aria-label="Principles">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.06] md:grid-cols-3" data-reveal-group="0.12">
          {principles.map((p, i) => (
            <div key={p.k} data-reveal="fade" className="relative bg-ink/95 p-7 sm:p-9">
              <span className="font-mono text-[0.65rem] text-gold-300">0{i + 1}</span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-tight">{p.k}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{p.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-smoke" data-reveal="fade">
          Please read our{" "}
          <Link href="/risk-disclaimer" className="text-mist underline decoration-gold-500/50 underline-offset-4 hover:text-gold-200">
            Trading Risk Disclaimer
          </Link>{" "}
          before enrolling.
        </p>
      </div>
    </MotionSection>
  );
}
