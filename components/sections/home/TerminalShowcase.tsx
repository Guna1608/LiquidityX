import { hero } from "@/config/site";
import { MotionSection } from "@/components/motion/MotionSection";
import { ScrollTilt } from "@/components/motion/ScrollTilt";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DashboardMock } from "@/components/visuals/DashboardMock";
import { Horizon } from "@/components/visuals/Glow";

/** "See the market the way we teach it" — the terminal mockup straightens as you scroll. */
export function TerminalShowcase() {
  return (
    <MotionSection className="relative overflow-hidden py-20 md:py-28" aria-label="Inside the classroom">
      <div className="container-x">
        <SectionTitle
          align="center"
          eyebrow="Inside the classroom"
          title={["See the market", "the way we teach it."]}
          accentLine={1}
          intro={<p>Price, value area, volume profile, order flow and a risk plan — read together, on one screen, in every live class.</p>}
        />
      </div>
      <div className="relative mt-16">
        <Horizon className="top-[6%] h-full" />
        <div className="container-x relative">
          <div data-reveal="blur">
            <ScrollTilt>
              <DashboardMock />
            </ScrollTilt>
          </div>
          <p className="mt-4 text-center text-[12px] text-smoke">{hero.visualLabel}</p>
        </div>
      </div>
    </MotionSection>
  );
}
