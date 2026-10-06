import { events, type LXEvent } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventCard } from "@/components/events/EventCard";
import { EventsEmptyState } from "@/components/events/EventsEmptyState";
import { CTA } from "@/components/sections/CTA";

export const metadata = pageMetadata({
  title: "Events & Masterclasses",
  description: "Upcoming LiquidityX masterclasses, events and special sessions. Enquire on WhatsApp.",
  path: "/events",
});

const groups: { id: string; title: string; filter: (e: LXEvent) => boolean }[] = [
  { id: "masterclasses", title: "Upcoming Masterclasses", filter: (e) => e.status === "upcoming" && e.category === "Masterclass" },
  { id: "events", title: "Upcoming Events", filter: (e) => e.status === "upcoming" && e.category === "Event" },
  { id: "special", title: "Special Sessions", filter: (e) => e.category === "Special Session" && e.status === "upcoming" },
  { id: "past", title: "Past Events", filter: (e) => e.status === "past" },
];

export default function EventsPage() {
  const any = events.length > 0;
  return (
    <>
      <PageHero crumb={{ name: "Events", path: "/events" }} eyebrow="Events & masterclasses" title={["Live,", "in session."]} accentLine={1} intro={<p>Masterclasses, events and special sessions — announced here and on WhatsApp.</p>} />

      {!any ? (
        <MotionSection className="pb-12">
          <div className="container-x" data-reveal="scale">
            <EventsEmptyState />
          </div>
          <div className="container-x mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4" data-reveal-group="0.06">
            {groups.map((g) => (
              <div key={g.id} className="bg-ink/95 p-5" data-reveal="fade">
                <p className="font-display text-base font-medium">{g.title}</p>
                <p className="mt-1 text-[12px] font-medium text-smoke">None announced</p>
              </div>
            ))}
          </div>
        </MotionSection>
      ) : (
        groups.map((g, i) => {
          const list = events.filter(g.filter);
          return (
            <MotionSection key={g.id} className="py-14">
              <div className="container-x">
                <SectionTitle index={String(i + 1).padStart(2, "0")} eyebrow="Events" title={[g.title]} size="md" />
                {list.length ? (
                  <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group="0.08">
                    {list.map((e) => (
                      <div key={e.slug} data-reveal="rotate3d">
                        <EventCard event={e} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-8 text-sm text-smoke" data-reveal="fade">
                    Nothing announced yet.
                  </p>
                )}
              </div>
            </MotionSection>
          );
        })
      )}

      <CTA title={["Be first", "to know."]} line="Get new masterclass announcements straight on WhatsApp." message="Hi LiquidityX, please notify me about upcoming masterclasses and events." />
    </>
  );
}
