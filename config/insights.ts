import type { InsightCategory } from "./site";

/**
 * DRAFT / DEMO educational articles.
 * General educational explanations only — no predictions, no buy/sell calls.
 * Every article is flagged `draft: true` and the UI labels it as such until
 * LiquidityX reviews and publishes it.
 */
export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  summary: string;
  /** null while in draft — no fabricated publish dates. */
  date: string | null;
  readMinutes: number;
  draft: boolean;
  body: { heading?: string; text: string }[];
};

export const insights: Insight[] = [
  {
    slug: "what-is-market-profile",
    title: "What is Market Profile?",
    category: "Profile",
    summary: "A way of organising price and time to see where a market spent effort — and where it found value.",
    date: null,
    readMinutes: 4,
    draft: true,
    body: [
      { text: "Market Profile organises trading activity by price and time. Instead of only asking where price went, it asks where price spent time — the areas the market accepted and the areas it rejected." },
      { heading: "Value and context", text: "Prices where the market spent the most time form a value area. Comparing today's activity with prior value helps a trader describe context: is the market balancing, or is it trying to find new value?" },
      { heading: "Why it matters for learning", text: "Profile gives structure to what can otherwise look like random movement. It is a framework for describing the market — not a signal by itself." },
    ],
  },
  {
    slug: "understanding-order-flow",
    title: "Understanding Order Flow",
    category: "Order Flow",
    summary: "Order flow looks at executed transactions to understand which side is acting with urgency.",
    date: null,
    readMinutes: 5,
    draft: true,
    body: [
      { text: "Every trade has a buyer and a seller. Order flow studies which side initiated the transaction — the aggressor — and how the resting liquidity responded." },
      { heading: "Aggression and absorption", text: "When aggressive orders keep hitting a price but the price does not move, liquidity may be absorbing them. When aggression moves price easily, liquidity may be thin. Reading these interactions takes practice and context." },
      { heading: "Context first", text: "Order flow is most useful when read against structure — profile, volume and key reference levels — rather than in isolation." },
    ],
  },
  {
    slug: "volume-profile-types",
    title: "Volume Profiles: Session, Range and Fixed",
    category: "Volume",
    summary: "Different volume-profile tools answer different questions about where participation happened.",
    date: null,
    readMinutes: 5,
    draft: true,
    body: [
      { text: "A volume profile shows how much volume traded at each price over a chosen window. The window you choose changes the question you are asking." },
      { heading: "Common windows", text: "Session profiles summarise a single trading session. Fixed-range profiles summarise a manually selected range. Visible-range profiles summarise whatever is on screen. Periodic profiles repeat over a fixed period such as a day or week." },
      { heading: "High and low volume", text: "High-volume areas show where the market was comfortable transacting. Low-volume areas show where price moved quickly with little participation." },
    ],
  },
  {
    slug: "risk-before-reward",
    title: "Risk Before Reward",
    category: "Risk Management",
    summary: "Why defining risk first is the foundation of a structured trading process.",
    date: null,
    readMinutes: 3,
    draft: true,
    body: [
      { text: "Every trade idea can be wrong. Defining in advance how much you are willing to lose — and where the idea is invalidated — keeps a single outcome from damaging your capital." },
      { heading: "Position size follows risk", text: "A common educational approach is to decide the risk per trade first, then size the position so that the planned loss matches that risk." },
      { heading: "Review", text: "Reviewing trades — including well-executed losses — builds a process that does not depend on any single result." },
    ],
  },
  {
    slug: "discipline-and-process",
    title: "Discipline Is a Process, Not a Mood",
    category: "Trading Psychology",
    summary: "Checklists, journals and rules reduce the number of decisions made under pressure.",
    date: null,
    readMinutes: 3,
    draft: true,
    body: [
      { text: "Emotional decisions often come from making too many choices in the moment. A written process moves those choices to calmer times." },
      { heading: "Tools that help", text: "A pre-session checklist, a trade journal and clear rules for when not to trade are simple ways to support consistent behaviour." },
    ],
  },
  {
    slug: "forex-and-futures-structure",
    title: "Forex and Futures: How the Markets Differ",
    category: "Futures",
    summary: "A plain-language look at how forex and futures markets are structured.",
    date: null,
    readMinutes: 4,
    draft: true,
    body: [
      { text: "Futures are standardised contracts traded on exchanges, which publish centralised volume. Spot forex is largely traded over the counter through a network of liquidity providers." },
      { heading: "Why it matters for analysis", text: "Volume-based tools behave differently depending on whether volume is centralised. Understanding the data you are looking at is part of reading the market responsibly." },
      { heading: "Sessions", text: "Both markets are shaped by trading sessions. Activity and liquidity can change significantly as major sessions open and close." },
    ],
  },
  {
    slug: "balance-and-imbalance",
    title: "Balance and Imbalance",
    category: "Market Structure",
    summary: "Markets alternate between rotating inside a range and moving to find new value.",
    date: null,
    readMinutes: 3,
    draft: true,
    body: [
      { text: "In balance, buyers and sellers broadly agree on value and price rotates within a range. In imbalance, one side is more urgent and price travels to find new participants." },
      { heading: "A descriptive tool", text: "Labelling the current state helps a trader choose which questions to ask next. It describes the market; it does not predict it." },
    ],
  },
  {
    slug: "reading-currency-sessions",
    title: "Reading Currency Sessions",
    category: "Forex",
    summary: "How Asian, London and New York sessions shape activity in currency pairs.",
    date: null,
    readMinutes: 3,
    draft: true,
    body: [
      { text: "The currency market trades around the clock on weekdays, but activity is not uniform. Liquidity typically changes as major financial centres open and close." },
      { heading: "Session context", text: "Noting which session you are trading in — and what happened in the previous one — is a simple way to add context to a chart." },
    ],
  },
];

export const insightsDraftNotice = "DRAFT / DEMO CONTENT — educational placeholders pending review by LiquidityX.";
