import { cn } from "@/lib/cn";

/**
 * Proposed 15-day learning journey. The day ranges and wording are an owner-supplied
 * layout proposal, not a separately confirmed teaching timetable. Private strategy
 * names and rules are intentionally absent.
 */
const stages = [
  { days: "Days 1 to 3", title: "Build Your Foundation", body: "Understand how buyers, sellers and auctions shape the market." },
  { days: "Days 4 to 6", title: "Read the Market and Build Context", body: "Connect market dynamics and Market Profile to prepare possible scenarios." },
  {
    days: "Days 7 to 9",
    title: "Identify Meaningful Zones",
    body: "Explore Fixed Range, Session, RTH, ETH, Periodic and Visible Range Volume Profiles. Learn which profile to use and where to focus attention.",
  },
  {
    days: "Days 10 to 12",
    title: "See What Happens Inside the Zone",
    body: "Use ATAS and Deepcharts examples to study how price and volume interact through aggression, absorption and Order Flow.",
  },
  {
    days: "Days 13 to 15",
    title: "Connect the Complete Process",
    body: "Bring together profiles, Order Flow, GEX, strategies and risk. Explore the mentor’s deeper insights and how to adapt as market conditions change.",
  },
];

export function LearningJourney({ className }: { className?: string }) {
  return (
    <div className={cn("mt-10", className)}>
      <div className="text-center" data-reveal="rise">
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Your 15-Day Learning Journey</h3>
        <p className="mx-auto mt-3 max-w-xl text-mist">Learn the thinking behind six years of market experience.</p>
      </div>

      <ol className="relative mt-8 grid gap-4 lg:grid-cols-5" data-reveal-group="0.08">
        {/* connector: horizontal on desktop, vertical on mobile */}
        <span aria-hidden className="absolute bottom-6 left-[1.65rem] top-6 w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent lg:hidden" />
        <span aria-hidden className="absolute left-6 right-6 top-[2.2rem] hidden h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent lg:block" />
        {stages.map((s, i) => (
          <li key={s.title} data-reveal="rise" className="relative flex gap-4 lg:block">
            <span className="relative z-10 grid size-[3.3rem] shrink-0 place-items-center rounded-full border border-gold-500/40 bg-[#0b0b0c] text-sm font-black text-gold-300 shadow-[0_0_30px_-6px_rgba(255,122,26,0.6)] lg:mx-auto">
              {i + 1}
            </span>
            <div className="panel flex-1 rounded-[22px] p-5 lg:mt-4">
              <p className="text-xs font-medium text-gold-300">{s.days}</p>
              <p className="mt-1.5 text-[15px] font-bold leading-snug text-bone">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-mist" data-reveal="fade">
        Learn from Vignesh’s six years of market experience, then practise, review and develop the knowledge into your own trading skill.
      </p>
    </div>
  );
}
