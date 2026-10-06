import { contact, mentorship, pricing, socialLinks, strategies, whatsapp } from "./site";

/**
 * Approved knowledge for the LiquidityX Assistant.
 * The local engine (lib/chat) matches user text against `keywords` and
 * `patterns`. Answers use only owner-approved website content.
 */

export type ChatAction = { label: string; href: string; kind: "whatsapp" | "link" | "external" };

export type KnowledgeEntry = {
  id: string;
  /** Canonical question, also used as a quick-question chip. */
  question: string;
  /** Lower-case tokens (English, Tamil, Tanglish). Weighted matching. */
  keywords: string[];
  answer: string;
  actions?: ChatAction[];
};

const wa = (label = "WhatsApp", message?: string): ChatAction => ({ label, href: whatsapp.url(message), kind: "whatsapp" });

const feeAnswer = pricing.currentFee
  ? `The current mentorship fee is ₹${pricing.currentFee.amount.toLocaleString("en-IN")}. Please confirm batch details on WhatsApp.`
  : "Current fee details are available through LiquidityX. Please contact us on WhatsApp for the latest fee.";

export const chatKnowledgeBase: KnowledgeEntry[] = [
  {
    id: "join",
    question: "How do I join the mentorship?",
    keywords: ["join", "enrol", "enroll", "register", "admission", "how to join", "signup", "sign up"],
    answer: "Message LiquidityX on WhatsApp to join. Current batch, fee and enrolment details are shared with you directly.",
    actions: [wa("Chat on WhatsApp", "Hi LiquidityX, I'd like to join the mentorship.")],
  },
  {
    id: "curriculum",
    question: "What does the mentorship teach?",
    keywords: ["learn", "teach", "curriculum", "syllabus", "topics", "modules", "content", "cover", "course"],
    answer: `A 15-day live mentorship: ${mentorship.learning.join(" → ")}. Strategy Application covers ${strategies.length} named strategies and setups.`,
    actions: [
      { label: "View Curriculum", href: "/learning", kind: "link" },
      { label: "Strategies", href: "/strategies", kind: "link" },
    ],
  },
  {
    id: "schedule",
    question: "When are the classes held?",
    keywords: ["when", "time", "timing", "schedule", "class", "classes", "weekday", "days", "meet", "discord", "online", "live"],
    answer: "Classes are held live on weekdays over Google Meet or Discord, taught in Tamil. Ask on WhatsApp for the next batch timings.",
    actions: [wa("Ask on WhatsApp", "Hi LiquidityX, what are the class timings?"), { label: "Class schedule", href: "/classes", kind: "link" }],
  },
  {
    id: "fee",
    question: "What is the fee?",
    keywords: ["fee", "fees", "price", "cost", "pricing", "amount", "charge", "rupees", "₹", "how much", "payment"],
    answer: feeAnswer,
    actions: [wa("WhatsApp", "Hi LiquidityX, what is the current mentorship fee?")],
  },
  {
    id: "markets",
    question: "Can I learn both Forex and Futures?",
    keywords: ["forex", "futures", "both", "markets", "market", "fx", "currency", "nq", "gc"],
    answer: "Yes. The mentorship covers both Forex and Futures.",
    actions: [{ label: "Mentorship", href: "/mentorship", kind: "link" }],
  },
  {
    id: "contact",
    question: "How do I contact LiquidityX?",
    keywords: ["contact", "whatsapp", "phone", "number", "call", "email", "mail", "instagram", "telegram", "reach"],
    answer: `WhatsApp / Phone: ${contact.phoneDisplay}. Email: ${contact.email}. Instagram: ${socialLinks.instagram.handle}. Telegram: ${socialLinks.telegram.handle}.`,
    actions: [wa("Open WhatsApp"), { label: "Contact page", href: "/contact", kind: "link" }],
  },
  {
    id: "market-profile",
    question: "What is Market Profile?",
    keywords: ["market profile", "profile", "tpo", "value area", "value", "poc"],
    answer:
      "Market Profile organises price by time to show where the market spent effort and found value. It helps describe context — balance or imbalance — and is one of the core modules of the mentorship. (Educational explanation, not advice.)",
    actions: [{ label: "Read more", href: "/insights/what-is-market-profile", kind: "link" }],
  },
  {
    id: "order-flow",
    question: "What is Order Flow?",
    keywords: ["order flow", "orderflow", "footprint", "delta", "aggression", "absorption", "tape", "big trades"],
    answer:
      "Order flow studies executed transactions to see which side is acting with urgency — aggression — and how resting liquidity responds. It is most useful read against structure. (Educational explanation, not advice.)",
    actions: [{ label: "Read more", href: "/insights/understanding-order-flow", kind: "link" }],
  },
  {
    id: "next-batch",
    question: "When does the next batch start?",
    keywords: ["batch", "next batch", "start", "starting", "date", "upcoming"],
    answer: "Next batch dates are shared directly on WhatsApp. Send us a message and we'll keep you updated.",
    actions: [wa("Get batch updates", "Hi LiquidityX, when does the next batch start?"), { label: "Upcoming classes", href: "/classes", kind: "link" }],
  },
  {
    id: "recording",
    question: "Are recordings available?",
    keywords: ["recording", "recordings", "recorded", "video", "replay"],
    answer: "No. Classes are live and class recordings are not provided.",
  },
  {
    id: "duration",
    question: "How long is the mentorship?",
    keywords: ["duration", "days", "long", "how long", "15", "length", "weeks"],
    answer: "The mentorship runs for 15 days of live weekday classes.",
  },
  {
    id: "language",
    question: "What language are classes taught in?",
    keywords: ["tamil", "language", "english"],
    answer: "Classes are taught in Tamil.",
  },
  {
    id: "mentor",
    question: "Who is the mentor?",
    keywords: ["mentor", "vignesh", "teacher", "trainer", "founder", "who"],
    answer: "Vignesh — Founder / Mentor — personally teaches the LiquidityX mentorship.",
    actions: [{ label: "Meet Vignesh", href: "/about", kind: "link" }],
  },
  {
    id: "strategies",
    question: "Which strategies are taught?",
    keywords: ["strategy", "strategies", "setup", "setups", "vwap", "ivb", "pbd", "frvp", "gex", "killzone", "shark", "1-2-3"],
    answer: `${strategies.length} strategies: ${strategies.map((s) => s.name).join(", ")}. Rules and examples are taught only inside the live mentorship.`,
    actions: [{ label: "Strategies", href: "/strategies", kind: "link" }],
  },
  {
    id: "guarantee",
    question: "Will I make guaranteed profits?",
    keywords: ["profit", "guarantee", "guaranteed", "returns", "income", "win rate", "accuracy", "money", "earn"],
    answer:
      "No. Trading involves substantial risk and LiquidityX does not guarantee profits or any specific return. The mentorship is education focused on structure and process.",
    actions: [{ label: "Risk Disclaimer", href: "/risk-disclaimer", kind: "link" }],
  },
  {
    id: "signals",
    question: "Do you give buy/sell calls?",
    keywords: ["signal", "signals", "tips", "call", "calls", "buy", "sell", "recommendation", "advice"],
    answer: "LiquidityX provides trading education, not personalised financial advice or buy/sell recommendations.",
    actions: [{ label: "Risk Disclaimer", href: "/risk-disclaimer", kind: "link" }],
  },
];

/** The chips shown when the panel first opens (order matters). */
export const quickQuestionIds = [
  "join",
  "curriculum",
  "schedule",
  "fee",
  "markets",
  "contact",
  "market-profile",
  "order-flow",
  "next-batch",
];

export const chatFallback: { answer: string; actions: ChatAction[] } = {
  answer:
    "I can help with mentorship, classes, fees, markets and contact details. For anything else, the LiquidityX team can answer directly on WhatsApp.",
  actions: [wa("WhatsApp")],
};

export const chatGreeting = "Hi! I'm the LiquidityX Assistant. Ask me about the mentorship, classes, fees or how to get in touch.";
