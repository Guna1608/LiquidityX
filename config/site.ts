/**
 * LIQUIDITYX ACADEMY — single source of truth for site content.
 *
 * Only owner-approved facts live here (see docs/PROJECT_BRIEF.md). Anything not
 * yet confirmed is left out of the public site rather than invented.
 */
import { insights } from "./insights";

export const brand = {
  name: "LiquidityX",
  wordmark: "LIQUIDITYX",
  academy: "LiquidityX Academy",
  subBrand: "ACADEMY",
  tagline: "Go Beyond Price. Understand the Market.",
  description:
    "LiquidityX Academy — a structured 15-day curriculum taught in Tamil by Vignesh. Learn to connect Volume, Market Profile, Order Flow and GEX data and build a risk-aware trading process across Forex, Futures and Indian markets.",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.liquidityxacademy.com").replace(/\/$/, ""),
  locale: "en_IN",
  keywords: [
    "Tamil trading mentorship",
    "Forex mentorship Tamil",
    "Futures trading Tamil",
    "Indian markets trading education",
    "Market Profile Tamil",
    "Order Flow Tamil",
    "LiquidityX Academy",
  ],
} as const;

/** The five approved headlines, each used in one place only. */
export const headlines = {
  hero: ["Go Beyond Price.", "Understand the Market."],
  mentorship: ["Read the Market.", "Build Your Own Edge."],
  orderFlow: ["Price Is Only", "Part of the Story."],
  learning: ["From Market Data", "to Trading Decisions."],
  strategies: ["Understand the Context", "Behind Every Setup."],
} as const;

export const mentor = {
  name: "Vignesh",
  role: "Founder & Mentor",
  tradingExperience: "6 years",
  teachingExperience: "1 year",
  summary:
    "Vignesh is the Founder and Mentor of LiquidityX Academy, with six years of trading experience and one year of teaching experience. His approach brings together Market Profile, Volume, Order Flow and GEX data to help students understand market context and build a structured trading process.",
  /** Path to an owner-supplied portrait. While `null`, a name-based layout is shown. */
  portrait: null as string | null,
};

const whatsappNumber = "918870001201";

export const contact = {
  /** WhatsApp messages only — never linked as a phone call. */
  whatsappDisplay: "+91 88700 01201",
  email: "liquidityx11.11@gmail.com",
  emailHref: "mailto:liquidityx11.11@gmail.com",
  responseLine: "Message us on WhatsApp for a quick response.",
};

export const whatsapp = {
  number: whatsappNumber,
  defaultMessage: "Hi LiquidityX, I'd like to know more about the mentorship.",
  url(message?: string) {
    const text = encodeURIComponent(message ?? this.defaultMessage);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  },
  cta: "Message us on WhatsApp",
};

export const socialLinks = {
  instagram: { label: "Instagram", handle: "liquidityx_", url: "https://www.instagram.com/liquidityx_/" },
  telegram: { label: "Telegram", handle: "liquidityX11", url: "https://t.me/liquidityX11" },
  youtube: { label: "YouTube", handle: "@liquidityx_11", url: "https://www.youtube.com/@liquidityx_11" },
} as const;

export const youtubeInvite = "Subscribe for trading education and upcoming videos.";

export type NavItem = { label: string; href: string };

/** Articles appear in navigation only once at least one has been approved and published. */
const hasPublishedArticles = insights.some((i) => !i.draft);

export const navigation: { primary: NavItem[]; footer: NavItem[]; legal: NavItem[] } = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Schedule", href: "/classes" },
    { label: "Strategies", href: "/strategies" },
    ...(hasPublishedArticles ? [{ label: "Articles", href: "/insights" }] : []),
    { label: "FAQ", href: "/faq" },
  ],
  footer: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Schedule & Batch", href: "/classes" },
    { label: "Strategies", href: "/strategies" },
    { label: "Curriculum", href: "/learning" },
    ...(hasPublishedArticles ? [{ label: "Articles", href: "/insights" }] : []),
    { label: "Market", href: "/market" },
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
  badge: "15-day curriculum · Taught in Tamil · Classes start 8:30 PM IST",
  supporting:
    "Learn to connect Volume, Market Profile, Order Flow and GEX data through a structured 15-day curriculum taught directly in Tamil. Build market context and a risk-aware trading process across Forex, Futures and Indian markets.",
  primaryCta: "Message us on WhatsApp",
  secondaryCta: { label: "Explore the mentorship", href: "/mentorship" },
  visualLabel: "Illustrative market visual — not live data",
};

/** The layered teaching approach shown in the scroll story. */
export const approachLayers = [
  { id: "dynamics", index: "01", title: "Price & Time", line: "How price moves through time — auctions, buyers and sellers, balance and imbalance." },
  { id: "profile", index: "02", title: "Market Profile", line: "Where the market found value, and the acceptance and rejection around it." },
  { id: "volume", index: "03", title: "Volume", line: "Where participation concentrated — and where it was thin." },
  { id: "orderflow", index: "04", title: "Order Flow & GEX", line: "Executed activity, aggression and absorption, read alongside GEX data." },
  { id: "strategy", index: "05", title: "Confluence & Risk", line: "Turning context into a structured, risk-defined trading process of your own." },
] as const;

export type CurriculumModule = {
  index: string;
  title: string;
  summary: string;
};

/** Six curriculum modules — NOT six classes. The course runs 15 teaching days. */
export const curriculum: CurriculumModule[] = [
  { index: "01", title: "Market Foundations", summary: "Understand auctions, liquidity, buyers, sellers and market dynamics." },
  { index: "02", title: "Market Profile", summary: "Read value, acceptance and rejection to build market context." },
  { index: "03", title: "Volume Profiles", summary: "Learn how different profile types support different analytical questions." },
  { index: "04", title: "Order Flow", summary: "Interpret executed activity, aggression and absorption alongside market context." },
  { index: "05", title: "Strategy Application", summary: "Connect context, confluence and execution through structured setups." },
  { index: "06", title: "Risk & Review", summary: "Build risk controls, protect capital and review trading decisions." },
];

/**
 * Strategies are NOT published. Only the count is public: no names, areas,
 * rules or descriptions may appear anywhere on the site (page text, aria
 * labels, metadata, structured data or the chatbot).
 */
export const strategyInfo = {
  count: 11,
  line: "11 strategies, including scalping setups — taught inside the mentorship.",
  notice: "Strategies are shared in classes, not through a student website login. No strategy guarantees a result.",
};

export const schedule = {
  teachingDays: 15,
  days: "Monday to Saturday",
  holiday: "Sunday is a holiday",
  startTime: "8:30 PM IST",
  sessionTime: "8:30–9:45 PM IST",
  platforms: "Google Meet and Discord",
  language: "Tamil",
};

export const mentorship = {
  heroLine:
    "A structured 15-day curriculum taught directly by Vignesh in Tamil — from market foundations to context, confluence and risk — across Forex, Futures and Indian markets.",
  facts: [
    { label: "Course", value: "15 teaching days" },
    { label: "Classes", value: "Monday to Saturday" },
    { label: "Starts at", value: "8:30 PM IST" },
    { label: "Language", value: "Tamil" },
  ],
  markets: ["Forex", "Futures", "Indian markets"],
  learning: ["Market Foundations", "Market Profile", "Volume Profiles", "Order Flow", "Strategy Application", "Risk & Review"],
  /** What the fee includes (shown on the fee panel). */
  included: [
    "Classes directly with the mentor",
    "Custom indicators, shared in class",
    "GEX data, shared in class",
    "LiquidityX workspaces",
    "Course notes and materials via Discord",
    "Lifetime access to supplied indicators, GEX data and workspaces",
    "Lifetime doubt-clearing on WhatsApp, Discord and Telegram",
    "One T-shirt and one printed Course Completion Certificate (India delivery)",
  ],
  cta: "Message us on WhatsApp",
};

/** Fee. The owner can change it; payment records must store the amount actually paid. */
export const pricing: { currentFee: { amount: number; currency: "INR" } | null; lines: string[] } = {
  currentFee: { amount: 23000, currency: "INR" },
  lines: ["Full payment in one transaction", "No instalments"],
};

/**
 * Enrolment switches.
 *  - registrationOpen: owner's manual open/close control (set NEXT_PUBLIC_REGISTRATION_OPEN=false to close).
 *    It is never closed automatically by head-count.
 *  - checkoutHref: stays null until a payment gateway is configured AND tested.
 *    While null, the site does not present online checkout and enrolment runs through WhatsApp.
 */
export const enrolment: { registrationOpen: boolean; checkoutHref: string | null; whatsappMessage: string } = {
  registrationOpen: process.env.NEXT_PUBLIC_REGISTRATION_OPEN !== "false",
  checkoutHref: null,
  whatsappMessage: "Hi LiquidityX, I'd like to enrol in the next batch.",
};

/** Terms shown clearly before payment. */
export const enrolmentTerms: { title: string; items: string[] }[] = [
  {
    title: "Course & schedule",
    items: [
      "15 teaching days, Monday to Saturday. Sunday is a holiday.",
      "Classes start at 8:30 PM IST and run until about 9:45 PM IST.",
      "Conducted directly with the mentor on Google Meet and Discord, in Tamil.",
      "Beginner-friendly — prior trading experience is not required.",
      "Minimum age 18. A laptop or desktop is required.",
    ],
  },
  {
    title: "Fee & delivery",
    items: [
      "The fee is paid in full, in one transaction. There are no instalments.",
      "The fee includes one T-shirt and one printed Course Completion Certificate. Delivery is within India only.",
      "The T-shirt is sent during the course; the certificate is sent after the 15-day course ends.",
    ],
  },
  {
    title: "Missed classes, repeats & cancellations",
    items: [
      "Class recordings are not provided.",
      "If you miss a class, you can request a short explanation of the missed lesson.",
      "Each student gets one free repeat of the full 15-day course in the next batch — once per student.",
      "If a paid student cannot attend, they may transfer to the next batch. A transfer is separate from the free repeat.",
      "No refunds.",
    ],
  },
  {
    title: "Tools",
    items: [
      "LiquidityX Academy provides education. It does not supply third-party software or software subscriptions.",
      "The mentor mainly uses ATAS and Deepcharts; tools vary according to teaching needs.",
    ],
  },
];

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "What is the course structure?",
    a: "A structured 15-day curriculum taught directly by Vignesh. The curriculum has six modules — Market Foundations, Market Profile, Volume Profiles, Order Flow, Strategy Application and Risk & Review. The six modules are not six classes; they are spread across the 15 teaching days.",
  },
  {
    q: "When are the classes and what time do they start?",
    a: "Classes run Monday to Saturday and start at 8:30 PM IST (the session runs until about 9:45 PM IST). Sunday is a holiday. Classes are held on Google Meet and Discord.",
  },
  {
    q: "When does the next batch start?",
    a: "A new batch starts on the 25th of every month. If the 25th is a Sunday, it starts on Monday the 26th. Registration stays open until the batch starts at 8:30 PM IST; after that, new registrations move to the following month's batch. The exact upcoming date is shown on the Schedule page.",
  },
  {
    q: "What is the fee?",
    a: "The course fee is ₹23,000, paid in full in a single transaction. Instalments are not available.",
  },
  { q: "What language are classes taught in?", a: "Classes are taught in Tamil. This website is in English." },
  { q: "Which markets are taught?", a: "Forex, Futures and Indian markets." },
  {
    q: "Is the course beginner-friendly?",
    a: "Yes. Prior trading experience is not required. The minimum enrolment age is 18, and you need a laptop or desktop to attend.",
  },
  {
    q: "Are class recordings available?",
    a: "No. Recordings are not provided. If you miss a class, you can request a short explanation of the missed lesson.",
  },
  {
    q: "What if I can't attend my batch, or I want to repeat the course?",
    a: "A paid student who cannot attend can transfer to the next batch. Separately, each student gets one free repeat of the full 15-day course in the next batch — once per student, not indefinitely.",
  },
  { q: "Is there a refund policy?", a: "No refunds. Please read the enrolment terms before you pay." },
  {
    q: "What do I receive with the course?",
    a: "Custom indicators, GEX data and LiquidityX workspaces are shared during classes, with lifetime access to the supplied items. Course notes and learning materials are shared through Discord. The fee also includes one T-shirt and one printed Course Completion Certificate.",
  },
  {
    q: "Do you provide trading software or subscriptions?",
    a: "No. LiquidityX Academy provides education, not third-party software or software subscriptions. The mentor mainly uses ATAS and Deepcharts, and tools vary according to teaching needs.",
  },
  {
    q: "What support do I get after the course?",
    a: "Lifetime doubt-clearing support is available on WhatsApp, Discord and Telegram. Additional live trading sessions are occasional and depend on the mentor's availability — they are not a guaranteed or scheduled benefit.",
  },
  {
    q: "Can I enrol from outside India?",
    a: "Yes, international students may enrol and provide an Indian delivery address. The T-shirt and certificate are delivered within India only.",
  },
  {
    q: "When do I get the T-shirt and the certificate?",
    a: "The T-shirt is sent during the course and the certificate after the 15-day course ends.",
  },
  {
    q: "How do I enrol?",
    a: "Message us on WhatsApp and we will guide you through enrolment for the upcoming batch.",
  },
  {
    q: "How do I contact LiquidityX?",
    a: "Message us on WhatsApp at +91 88700 01201 for a quick response (messages only — we do not take calls). You can also email liquidityx11.11@gmail.com or find us on Instagram, Telegram and YouTube.",
  },
];

export type MarketGroup = "global" | "india" | "forex" | "commodities";

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
    { id: "india", label: "Indian Markets" },
    { id: "global", label: "Global Indices" },
    { id: "forex", label: "Forex" },
    { id: "commodities", label: "Commodities" },
  ] as { id: MarketGroup; label: string }[],
  /** Market Pulse cards on the home page. */
  pulse: [
    { id: "india", label: "Indian markets", symbols: ["NIFTY 50", "BANK NIFTY"] },
    { id: "global", label: "Global indices", symbols: ["NASDAQ", "S&P 500"] },
    { id: "forex", label: "Forex", symbols: ["EUR/USD", "USD/INR"] },
    { id: "commodities", label: "Commodities", symbols: ["GOLD"] },
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
  ] as Instrument[],
  tickerSymbols: ["NIFTY 50", "BANK NIFTY", "SENSEX", "NASDAQ", "S&P 500", "DOW JONES", "GOLD", "USD/INR", "EUR/USD"],
  disclaimer: "Market data is for informational/educational purposes only.",
};

export const legal = {
  lastUpdated: "2026-10-10",
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

/* ───────────────────────── Student reviews ───────────────────────── */

/**
 * REAL student reviews only — WhatsApp screenshots supplied by the owner, who
 * confirms permission to publish. Before adding one: crop/hide phone numbers
 * and profile photos, keep only the review text and any permitted display name,
 * and never change its meaning. While this list is empty the Reviews section is
 * not rendered at all. Never invent reviews, ratings or student counts.
 */
export type Testimonial = {
  /** Permitted display name only (no phone number). */
  name?: string;
  /** Review text — used as the accessible alt text for the screenshot. */
  quote: string;
  /** Path (in /public) to the cleaned screenshot — numbers and photos hidden. */
  image?: string;
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
  strategyInfo,
  curriculum,
  schedule,
  faq,
  marketConfig,
  legal,
  pricing,
  enrolment,
  testimonials,
  marketing,
};

export default site;
