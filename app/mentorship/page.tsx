import { enrolment, faq, headlines, mentorship, whatsapp } from "@/config/site";
import { courseJsonLd, pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { FeePanel } from "@/components/sections/FeePanel";
import { EnrolmentTerms } from "@/components/sections/EnrolmentTerms";
import { PageHero } from "@/components/sections/PageHero";
import { CurriculumStack } from "@/components/sections/home/CurriculumStack";
import { LiveClassVisual } from "@/components/visuals/Bento";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "The Mentorship — Read the Market. Build Your Own Edge.",
  description:
    "A structured 15-day curriculum taught directly in Tamil: Market Foundations, Market Profile, Volume Profiles, Order Flow, Strategy Application and Risk & Review. Monday to Saturday, 8:30 PM IST, on Google Meet and Discord.",
  path: "/mentorship",
});

const includes = [
  { k: "Taught directly in Tamil", v: "Classes are conducted live with the mentor." },
  { k: "Forex, Futures and Indian markets", v: "Context, volume and risk read across the markets taught." },
  { k: "Monday to Saturday, 8:30 PM IST", v: "Sunday is a holiday. The session runs until about 9:45 PM IST." },
  { k: "Google Meet and Discord", v: "Join from a laptop or desktop." },
  { k: "Indicators, GEX data and workspaces", v: "Shared during classes, with lifetime access to the supplied items." },
  { k: "Lifetime doubt-clearing", v: "On WhatsApp, Discord and Telegram." },
];

export default function MentorshipPage() {
  return (
    <>
      <JsonLd data={courseJsonLd} />
      <PageHero
        crumb={{ name: "Mentorship", path: "/mentorship" }}
        eyebrow="The mentorship"
        title={[...headlines.mentorship]}
        accentLine={1}
        intro={<p>{mentorship.heroLine}</p>}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp.url(enrolment.whatsappMessage)} size="lg" icon={<WhatsApp size={18} />} iconPosition="start">
            {mentorship.cta}
          </Button>
          <Button href="/learning" size="lg" variant="ghost" icon={<ArrowRight size={16} />}>
            See the curriculum
          </Button>
        </div>
      </PageHero>

      <div className="container-x pb-10">
        <div className="mx-auto max-w-4xl rounded-[24px] border border-white/[0.08] bg-white/[0.02] px-6 pb-8 pt-2 sm:px-10" data-reveal="rise">
          <DayTimeline />
        </div>
      </div>

      <MotionSection className="py-20 md:py-28">
        <div className="container-x">
          <SectionTitle align="center" eyebrow="What's included" title={["Taught live,", "directly by Vignesh."]} accentLine={1} />
          <div className="mt-14 grid gap-3 lg:grid-cols-12">
            <Card tilt={4} data-reveal="rise" className="lg:col-span-5" innerClassName="flex h-full flex-col p-2">
              <div className="h-64 rounded-[16px] border border-white/[0.06] bg-[#0a0a0b] p-4 lg:h-80">
                <LiveClassVisual />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold">Learn in real time</h3>
                <p className="mt-2 text-mist">Every class is live with the mentor — ask, practise and review together.</p>
              </div>
            </Card>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7" data-reveal-group="0.06">
              {includes.map((i) => (
                <Card key={i.k} tilt={6} data-reveal="rise" innerClassName="h-full p-6">
                  <h3 className="text-lg font-bold">{i.k}</h3>
                  <p className="mt-1.5 text-sm text-mist">{i.v}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2" data-reveal-group="0.08">
            <div className="rounded-[22px] border border-gold-500/30 bg-gold-500/[0.06] p-6" data-reveal="rise">
              <h3 className="text-lg font-bold text-gold-100">No class recordings</h3>
              <p className="mt-2 text-sm text-mist">Recordings are not provided. If you miss a class, you can request a short explanation of the missed lesson.</p>
            </div>
            <div className="rounded-[22px] border border-gold-500/30 bg-gold-500/[0.06] p-6" data-reveal="rise">
              <h3 className="text-lg font-bold text-gold-100">Support after the course</h3>
              <p className="mt-2 text-sm text-mist">
                Lifetime doubt-clearing support is available. Additional live trading sessions are occasional and depend on the mentor&apos;s availability — they are not a guaranteed
                benefit.
              </p>
            </div>
          </div>
        </div>
      </MotionSection>

      <CurriculumStack />

      <MotionSection className="py-20 md:py-28">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Before you enrol" title={["Common", "questions."]} accentLine={1} size="md" />
            <div className="mt-10" data-reveal="rise">
              <Accordion items={faq.slice(0, 8).map((f) => ({ q: f.q, a: f.a }))} defaultOpen={null} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28" data-reveal="rotate3d">
            <FeePanel />
          </div>
        </div>
        <div className="container-x mt-14" data-reveal="rise">
          <EnrolmentTerms />
        </div>
      </MotionSection>

      <CTA title={["Join the", "next batch."]} secondary={{ label: "Strategies", href: "/strategies" }} message={enrolment.whatsappMessage} />
    </>
  );
}
