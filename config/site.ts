/**
 * LIQUIDITYX ACADEMY — single source of truth for site content.
 *
 * Only owner-approved facts live here. Anything not yet confirmed is `null`
 * and the UI renders a neutral "contact us" state instead of inventing data.
 */

export const brand = {
  name: "LiquidityX",
  wordmark: "LIQUIDITYX",
  academy: "LiquidityX Academy",
  subBrand: "ACADEMY",
  tagline: "Read the Market. Understand the Structure.",
  description:
    "LiquidityX Academy — a 15-day live trading mentorship taught in Tamil. Forex & Futures: Market Dynamics, Market Profile, Volume Profiles, Order Flow, Strategy Application and Risk & Review.",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.liquidityxacademy.com").replace(/\/$/, ""),
  locale: "en_IN",
  keywords: [
    "Tamil trading mentorship",
    "Forex mentorship Tamil",
    "Futures trading Tamil",
    "Trading education Tamil",
    "Market Profile Tamil",
    "Order Flow Tamil",
    "LiquidityX Academy",
  ],
} as const;

export const mentor = {
  name: "Vignesh",
  role: "Founder / Mentor",
  summary:
    "Vignesh personally teaches the LiquidityX mentorship with a focus on helping learners understand market structure and develop a structured trading process.",
  /** Path to an owner-supplied portrait. `null` renders the designed placeholder. */
  portrait: null as string | null,
  /** Only add owner-verified items here. Never invent credentials. */
  verifiedFacts: [] as string[],
};

const whatsappNumber = "918870001201";

export const contact = {
  phoneDisplay: "+91 88700 01201",
  phoneHref: "tel:+918870001201",
  email: "liquidityx11.11@gmail.com",
  emailHref: "mailto:liquidityx11.11@gmail.com",
};

export const whatsapp = {
  number: whatsappNumber,
  defaultMessage: "Hi LiquidityX, I'd like to know more about the mentorship.",
  url(message?: string) {
    const text = encodeURIComponent(message ?? this.defaultMessage);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  },
  cta: "Chat on WhatsApp",
};

export const socialLinks = {
  instagram: { label: "Instagram", handle: "liquidityx_", url: "https://www.instagram.com/liquidityx_/" },
  telegram: { label: "Telegram", handle: "liquidityX11", url: "https://t.me/liquidityX11" },
} as const;

export type NavItem = { label: string; href: string };

export const navigation: { primary: NavItem[]; footer: NavItem[]; legal: NavItem[] } = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Classes", href: "/classes" },
    { label: "Strategies", href: "/strategies" },
    { label: "Insights", href: "/insights" },
    { label: "FAQ", href: "/faq" },
  ],
  footer: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Classes", href: "/classes" },
    { label: "Strategies", href: "/strategies" },
    { label: "Learning", href: "/learning" },
    { label: "Market Insights", href: "/insights" },
    { label: "Market", href: "/market" },
    { label: "Events", href: "/events" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Trading Risk Disclaimer", href: "/risk-disclaimer" },
  ],
};

export const hero = {
  badge: "15-day live mentorship · Forex & Futures",
  heading: "Understand the market. Trade with clarity.",
  supporting:
    "A live, step-by-step mentorship by Vignesh — from Market Dynamics to Market Profile, Volume and Order Flow — so you read the structure before you take a trade.",
  primaryCta: "Chat on WhatsApp",
  secondaryCta: { label: "Explore the mentorship", href: "/mentorship" },
  visualLabel: "Illustrative market visual — not live data",
};

/** The five-layer philosophy shown in the scroll story. */
export const approachLayers = [
  { id: "dynamics", index: "01", title: "Market Dynamics", line: "How price moves — auctions, buyers and sellers, balance and imbalance." },
  { id: "profile", index: "02", title: "Market Profile", line: "Where the market found value, and the context around it." },
  { id: "volume", index: "03", title: "Volume", line: "Where participation concentrated — and where it was thin." },
  { id: "orderflow", index: "04", title: "Order Flow", line: "Who is acting now — reading aggression and absorption." },
  { id: "strategy", index: "05", title: "Strategy + Risk", line: "Turning context into a structured, risk-defined process." },
] as const;

export type CurriculumModule = {
  index: string;
  title: string;
  summary: string;
  topics: string[];
};

export const curriculum: CurriculumModule[] = [
  {
    index: "01",
    title: "Market Foundations",
    summary: "How markets work, from the auction up.",
    topics: ["How markets work", "Auction basics", "Buyers and sellers", "Liquidity", "Balance and imbalance", "Market dynamics"],
  },
  {
    index: "02",
    title: "Market Profile",
    summary: "Market structure, value and context.",
    topics: ["Market structure", "Value", "Context"],
  },
  {
    index: "03",
    title: "Volume Profiles",
    summary: "Eight profile tools, read in context.",
    topics: [
      "FRVP",
      "RTH Profile",
      "ETH Profile",
      "Session Profile",
      "Session Profile HD",
      "Periodic Volume Profile",
      "Visible Range Volume Profile",
      "Delta Profile",
    ],
  },
  {
    index: "04",
    title: "Order Flow",
    summary: "Order-flow reading with practical examples.",
    topics: ["Order-flow reading", "Practical examples"],
  },
  {
    index: "05",
    title: "Strategy Application",
    summary: "11 named strategies and setups.",
    topics: ["11 named strategies / setups", "Applying context to execution"],
  },
  {
    index: "06",
    title: "Risk & Review",
    summary: "Protect capital. Review. Keep learning.",
    topics: ["Risk management", "Money management", "Capital protection", "Review", "Follow-up learning"],
  },
];

export type Strategy = { index: string; name: string; slug: string; area: string };

/**
 * Exactly 11 strategies. Names only — rules, thresholds and examples are
 * taught inside the live mentorship and are intentionally NOT published.
 * IVB and PBD are deliberately not expanded.
 */
export const strategies: Strategy[] = [
  { index: "01", name: "1-2-3 Strategy", slug: "1-2-3", area: "Price Structure" },
  { index: "02", name: "IVB Strategy", slug: "ivb", area: "Taught in class" },
  { index: "03", name: "Delta Aggression Strategy", slug: "delta-aggression", area: "Order Flow" },
  { index: "04", name: "Killzone Strategy", slug: "killzone", area: "Session Timing" },
  { index: "05", name: "VWAP Strategy", slug: "vwap", area: "Volume" },
  { index: "06", name: "GEX Level Strategies", slug: "gex-levels", area: "Levels" },
  { index: "07", name: "Profile Framing Strategy", slug: "profile-framing", area: "Market Profile" },
  { index: "08", name: "FRVP Strategy", slug: "frvp", area: "Volume Profile" },
  { index: "09", name: "NQ / GC Shark Strategy", slug: "nq-gc-shark", area: "Futures" },
  { index: "10", name: "Big Trades Strategy", slug: "big-trades", area: "Order Flow" },
  { index: "11", name: "PBD Strategy", slug: "pbd", area: "Taught in class" },
];

export const strategyNotice =
  "Strategy rules, context and examples are taught only inside the live mentorship. No strategy guarantees a result.";

export const mentorship = {
  heroTitle: ["15 Days.", "Live.", "Structured."],
  heroLine: "Forex & Futures, taught live in Tamil — from market structure to risk review.",
  facts: [
    { label: "Duration", value: "15 days" },
    { label: "Format", value: "Weekday live classes" },
    { label: "Language", value: "Tamil instruction" },
    { label: "Platform", value: "Google Meet or Discord" },
  ],
  markets: ["Forex", "Futures"],
  learning: ["Market Dynamics", "Market Profile", "Volume Profiles", "Order Flow", "Strategy Application", "Risk & Review"],
  notes: [
    { title: "No class recordings", body: "Sessions are live. Class recordings are not provided." },
    { title: "Support & follow-up learning", body: "Support and follow-up learning are part of the mentorship. Details are shared at enrolment." },
  ],
  cta: "WhatsApp Enquiry",
};

/**
 * Fee. Keep `null` until the owner confirms a current fee.
 * When set (e.g. { amount: 23000, currency: "INR" }) the UI shows it automatically.
 */
export const pricing: { currentFee: { amount: number; currency: "INR" } | null; note: string } = {
  currentFee: null,
  note: "Fee and batch details are confirmed directly with LiquidityX.",
};

export type EventCategory = "Masterclass" | "Event" | "Special Session";
export type EventStatus = "upcoming" | "past";
export type LXEvent = {
  slug: string;
  title: string;
  category: EventCategory;
  status: EventStatus;
  /** ISO date, e.g. "2026-11-14" */
  date: string;
  /** Display time, e.g. "7:00 PM IST" */
  time: string;
  summary: string;
  body?: string[];
  location?: string;
};

/**
 * Owner-published events only. Leave empty until real events are confirmed —
 * the Events page renders a designed empty state.
 *
 * Example shape:
 * { slug: "order-flow-masterclass", title: "Order Flow Masterclass", category: "Masterclass",
 *   status: "upcoming", date: "2026-11-14", time: "7:00 PM IST", summary: "…" }
 */
export const events: LXEvent[] = [];

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  { q: "Are class recordings available?", a: "No. Classes are held live and class recordings are not provided." },
  { q: "How are the classes conducted?", a: "Live weekday classes over Google Meet or Discord. Instruction is in Tamil." },
  { q: "How long is the mentorship?", a: "The mentorship runs for 15 days of live classes." },
  { q: "Which markets are taught?", a: "Forex and Futures." },
  { q: "Can I learn both Forex and Futures?", a: "Yes. The mentorship covers both Forex and Futures." },
  {
    q: "Is the mentorship beginner-friendly?",
    a: "The curriculum starts with Market Foundations — how markets work and auction basics — and builds step by step to Order Flow, Strategy and Risk. Message us on WhatsApp to check whether the current batch suits your experience.",
  },
  { q: "How do I enrol?", a: "Message LiquidityX on WhatsApp. Current batch, fee and enrolment details are shared directly." },
  {
    q: "How do I contact LiquidityX?",
    a: "WhatsApp / Phone: +91 88700 01201 · Email: liquidityx11.11@gmail.com · Instagram: liquidityx_ · Telegram: liquidityX11",
  },
];

export type MarketGroup = "global" | "india" | "forex" | "commodities" | "crypto";

export type Instrument = {
  symbol: string;
  name: string;
  group: MarketGroup;
  /** Symbol used by the configured provider (Twelve Data format). */
  providerSymbol: string;
  /** Used ONLY by the demo provider to produce a plausible-looking simulated series. */
  demoBase: number;
  decimals: number;
};

export const marketConfig = {
  refreshMs: 60_000,
  groups: [
    { id: "global", label: "Global Indices" },
    { id: "india", label: "Indian Markets" },
    { id: "forex", label: "Forex" },
    { id: "commodities", label: "Commodities" },
    { id: "crypto", label: "Crypto" },
  ] as { id: MarketGroup; label: string }[],
  /** Market Pulse cards on the home page. */
  pulse: [
    { id: "indices", label: "Indices", symbols: ["NIFTY 50", "NASDAQ"] },
    { id: "commodities", label: "Commodities", symbols: ["GOLD"] },
    { id: "forex", label: "Forex", symbols: ["USD/INR"] },
    { id: "crypto", label: "Crypto", symbols: ["BTC/USD"] },
  ],
  instruments: [
    { symbol: "NIFTY 50", name: "Nifty 50", group: "india", providerSymbol: "NIFTY", demoBase: 25000, decimals: 2 },
    { symbol: "BANK NIFTY", name: "Nifty Bank", group: "india", providerSymbol: "BANKNIFTY", demoBase: 55000, decimals: 2 },
    { symbol: "SENSEX", name: "BSE Sensex", group: "india", providerSymbol: "SENSEX", demoBase: 82000, decimals: 2 },
    { symbol: "NASDAQ", name: "Nasdaq Composite", group: "global", providerSymbol: "IXIC", demoBase: 19000, decimals: 2 },
    { symbol: "S&P 500", name: "S&P 500", group: "global", providerSymbol: "SPX", demoBase: 6000, decimals: 2 },
    { symbol: "DOW JONES", name: "Dow Jones Industrial", group: "global", providerSymbol: "DJI", demoBase: 43000, decimals: 2 },
    { symbol: "GOLD", name: "Gold Spot", group: "commodities", providerSymbol: "XAU/USD", demoBase: 2600, decimals: 2 },
    { symbol: "USD/INR", name: "US Dollar / Indian Rupee", group: "forex", providerSymbol: "USD/INR", demoBase: 85, decimals: 4 },
    { symbol: "EUR/USD", name: "Euro / US Dollar", group: "forex", providerSymbol: "EUR/USD", demoBase: 1.08, decimals: 5 },
    { symbol: "BTC/USD", name: "Bitcoin / US Dollar", group: "crypto", providerSymbol: "BTC/USD", demoBase: 90000, decimals: 2 },
  ] as Instrument[],
  tickerSymbols: ["NIFTY 50", "BANK NIFTY", "SENSEX", "NASDAQ", "S&P 500", "DOW JONES", "GOLD", "USD/INR", "BTC/USD"],
  disclaimer: "Market data is for informational/educational purposes only.",
};

export const legal = {
  /** Pending owner confirmation — rendered as visible placeholders on legal pages. */
  entityName: null as string | null,
  registeredAddress: null as string | null,
  governingJurisdiction: null as string | null,
  lastUpdated: "2026-10-05",
  reviewNotice: "Requires owner/legal review before publication.",
};

export const insightCategories = [
  "Market Structure",
  "Volume",
  "Profile",
  "Order Flow",
  "Trading Psychology",
  "Risk Management",
  "Futures",
  "Forex",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

/* ───────────────────────── Classes ───────────────────────── */

/**
 * The live class sessions that make up each batch (one per curriculum module).
 * Batch dates are NOT invented: set `upcomingBatch.startDate` (ISO) once confirmed
 * and the site shows the date; until then it shows "Dates announced on WhatsApp".
 */
export const upcomingBatch: {
  name: string;
  startDate: string | null;
  schedule: string;
  platform: string;
  language: string;
  seats: string | null;
} = {
  name: "Next mentorship batch",
  startDate: null,
  schedule: "Weekday live classes",
  platform: "Google Meet or Discord",
  language: "Taught in Tamil",
  seats: null,
};

export type ClassSession = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  outcome: string;
  topics: string[];
  level: "Foundation" | "Core" | "Applied";
};

export const classSessions: ClassSession[] = [
  {
    slug: "market-foundations",
    index: "01",
    title: "Market Foundations",
    summary: "How markets work, from the auction up.",
    outcome: "Describe what buyers and sellers are doing and whether the market is in balance or imbalance.",
    topics: curriculum[0].topics,
    level: "Foundation",
  },
  {
    slug: "market-profile",
    index: "02",
    title: "Market Profile",
    summary: "Market structure, value and context.",
    outcome: "Read where the market found value and use it as context for every decision.",
    topics: curriculum[1].topics,
    level: "Core",
  },
  {
    slug: "volume-profiles",
    index: "03",
    title: "Volume Profiles",
    summary: "Eight profile tools, read in context.",
    outcome: "Choose the right volume-profile window for the question you are asking.",
    topics: curriculum[2].topics,
    level: "Core",
  },
  {
    slug: "order-flow",
    index: "04",
    title: "Order Flow",
    summary: "Order-flow reading with practical examples.",
    outcome: "Recognise aggression and absorption and read them against structure.",
    topics: curriculum[3].topics,
    level: "Core",
  },
  {
    slug: "strategy-application",
    index: "05",
    title: "Strategy Application",
    summary: "11 named strategies and setups.",
    outcome: "Apply the 11 strategies in context, with rules taught live in class.",
    topics: curriculum[4].topics,
    level: "Applied",
  },
  {
    slug: "risk-and-review",
    index: "06",
    title: "Risk & Review",
    summary: "Protect capital. Review. Keep learning.",
    outcome: "Size positions from risk, protect capital and review every trade.",
    topics: curriculum[5].topics,
    level: "Applied",
  },
];

/* ───────────────────────── Student reviews ───────────────────────── */

/**
 * REAL student reviews only — add them here with the student's permission.
 * Never invent reviews. While this list is empty the Reviews section shows a
 * designed "share your experience" state instead of fake quotes.
 */
export type Testimonial = {
  name: string;
  /** e.g. "Batch 2026 · Futures" */
  detail?: string;
  quote: string;
  /** optional 1–5; omit if the student did not give a rating */
  rating?: number;
  /** optional path to an owner-supplied photo in /public */
  photo?: string;
  /** where the review was originally posted, e.g. an Instagram URL */
  source?: string;
};

export const testimonials: Testimonial[] = [];

/* ───────────────────────── Marketing / SEO ───────────────────────── */

export const marketing = {
  /** Analytics & pixels load only after cookie consent and only when the env var is set. */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || null,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || null,
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || null,
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || null,
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || null,
};

export const site = {
  brand,
  mentor,
  contact,
  socialLinks,
  whatsapp,
  navigation,
  strategies,
  curriculum,
  events,
  faq,
  marketConfig,
  legal,
  pricing,
  upcomingBatch,
  classSessions,
  testimonials,
  marketing,
};

export default site;
