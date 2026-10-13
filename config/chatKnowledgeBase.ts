import { contact, enrolment, mentor, mentorship, pricing, schedule, socialLinks, strategyInfo, whatsapp } from "./site";
import { batchAdjustmentNote, formatBatchDate, getBatch, isRegistrationOpen } from "@/lib/batch";

/**
 * Approved knowledge for the LiquidityX Assistant.
 * The local engine (lib/chat) matches user text against `keywords`.
 * Answers use only owner-approved website content — the current admin-managed
 * fee (config `pricing`) and the automatically calculated batch date
 * (lib/batch). Private strategy names and rules are NOT in this file and must
 * never be added: the assistant only ever states the count.
 */

export type ChatAction = { label: string; href: string; kind: "whatsapp" | "link" | "external" };

export type KnowledgeEntry = {
  id: string;
  /** Canonical question, also used as a quick-question chip. */
  question: string;
  /** Lower-case tokens (English, Tamil, Tanglish). Weighted matching. */
  keywords: string[];
  /** Static text, or a function for answers that depend on the current date. */
  answer: string | (() => string);
  actions?: ChatAction[];
};

export const answerOf = (e: Pick<KnowledgeEntry, "answer">) => (typeof e.answer === "function" ? e.answer() : e.answer);

const wa = (label = "WhatsApp", message?: string): ChatAction => ({ label, href: whatsapp.url(message), kind: "whatsapp" });

const feeText = () =>
  pricing.currentFee
    ? `The course fee is ₹${pricing.currentFee.amount.toLocaleString("en-IN")}, paid in full in a single transaction. Instalments are not available.`
    : "Please message us on WhatsApp for the current course fee.";

const batchText = () => {
  const batch = getBatch();
  const open = isRegistrationOpen(batch, enrolment.registrationOpen);
  const note = batchAdjustmentNote(batch);
  return [
    `The next batch starts on ${formatBatchDate(batch)} at ${schedule.startTime}.`,
    note,
    "A new batch starts on the 25th of every month (the 26th if the 25th is a Sunday). Registration stays open until the batch starts and may close earlier when seats fill; after the batch starts, new registrations move to the following month's batch.",
    open ? null : "Registration for this batch is currently closed — message us on WhatsApp for the next batch.",
  ]
    .filter(Boolean)
    .join(" ");
};

export const chatKnowledgeBase: KnowledgeEntry[] = [
  {
    id: "join",
    question: "How do I enrol?",
    keywords: ["join", "enrol", "enroll", "register", "registration", "admission", "how to join", "signup", "sign up", "pay", "payment"],
    answer:
      "Message us on WhatsApp and we will guide you through enrolment for the upcoming batch. The fee is paid in full in one transaction, and the enrolment terms are shown before you pay.",
    actions: [wa("Message us on WhatsApp", enrolment.whatsappMessage), { label: "Schedule & batch", href: "/classes", kind: "link" }],
  },
  {
    id: "curriculum",
    question: "What does the course teach?",
    keywords: ["learn", "teach", "curriculum", "syllabus", "topics", "modules", "content", "cover", "course", "structure"],
    answer: `A structured ${schedule.teachingDays}-day curriculum with seven modules: ${mentorship.learning.join(", ")}. The seven modules are not seven classes — they are covered across the ${schedule.teachingDays} teaching days. Students learn to build market context, prepare scenarios, evaluate confluences and develop their own trading process.`,
    actions: [{ label: "View curriculum", href: "/learning", kind: "link" }],
  },
  {
    id: "schedule",
    question: "When are the classes held?",
    keywords: ["when", "time", "timing", "schedule", "class", "classes", "days", "meet", "discord", "online", "live", "start time", "ist"],
    answer: `Classes run ${schedule.days} and start at ${schedule.startTime} (the session runs until about 9:45 PM IST). Sunday is a holiday. Classes are held directly with the mentor on ${schedule.platforms}, in Tamil.`,
    actions: [{ label: "Schedule & batch", href: "/classes", kind: "link" }],
  },
  {
    id: "fee",
    question: "What is the fee?",
    keywords: ["fee", "fees", "price", "cost", "pricing", "amount", "charge", "rupees", "₹", "how much", "instalment", "installment", "emi"],
    answer: feeText,
    actions: [wa("WhatsApp", "Hi LiquidityX, I have a question about the course fee.")],
  },
  {
    id: "next-batch",
    question: "When does the next batch start?",
    keywords: ["batch", "next batch", "start", "starting", "date", "upcoming", "25th", "26th", "closed", "open", "deadline", "cutoff", "cut-off"],
    answer: batchText,
    actions: [{ label: "Schedule & batch", href: "/classes", kind: "link" }, wa("Ask on WhatsApp", "Hi LiquidityX, I have a question about the next batch.")],
  },
  {
    id: "markets",
    question: "Which markets are taught?",
    keywords: ["forex", "futures", "both", "markets", "market", "fx", "currency", "india", "indian", "nifty", "stocks"],
    answer: `${mentorship.markets.join(", ")}. The approach combines price and time with Volume, Market Profile, Order Flow and GEX data.`,
    actions: [{ label: "Mentorship", href: "/mentorship", kind: "link" }],
  },
  {
    id: "beginner",
    question: "Is it beginner-friendly?",
    keywords: ["beginner", "beginners", "experience", "new", "basic", "basics", "age", "laptop", "mobile", "requirements", "eligible", "eligibility"],
    answer:
      "Yes. Prior trading experience is not required. The minimum enrolment age is 18, and you need a laptop or desktop to attend classes.",
  },
  {
    id: "recording",
    question: "Are recordings available?",
    keywords: ["recording", "recordings", "recorded", "video", "replay", "miss", "missed", "absent"],
    answer:
      "No, class recordings are not provided. If you miss a class, you can request a short explanation of the missed lesson.",
  },
  {
    id: "repeat",
    question: "Can I repeat the course or transfer batches?",
    keywords: ["repeat", "again", "transfer", "postpone", "defer", "next batch transfer", "cannot attend", "can't attend", "unable"],
    answer:
      "Each student can repeat the full 15-day course once, in the next batch, for a small additional fee — once per student, not indefinitely. Separately, if a paid student cannot attend, they may transfer to the next batch. A transfer is separate from the repeat.",
  },
  {
    id: "included",
    question: "What do I receive with the course?",
    keywords: ["include", "included", "indicator", "indicators", "gex", "workspace", "workspaces", "notes", "materials", "lifetime", "access"],
    answer:
      "Custom indicators, GEX data and LiquidityX workspaces are shared during classes, with lifetime access to the supplied indicators, GEX data and workspaces. Course notes and learning materials are shared through Discord.",
  },
  {
    id: "software",
    question: "Do you provide trading software?",
    keywords: ["software", "subscription", "atas", "deepcharts", "platform", "tools", "tool", "license", "licence"],
    answer:
      "No. LiquidityX Academy provides education, not third-party software or software subscriptions. The mentor mainly uses ATAS and Deepcharts, and tools vary according to teaching needs.",
  },
  {
    id: "support",
    question: "What support is available after the course?",
    keywords: ["support", "doubt", "doubts", "help", "after course", "lifetime support", "live trading", "live session", "sessions"],
    answer:
      "Lifetime doubt-clearing support is available on WhatsApp, Discord and Telegram. Additional live trading sessions are occasional and depend on the mentor's availability — they are not a guaranteed or scheduled benefit.",
  },
  {
    id: "strategies",
    question: "Which strategies are taught?",
    keywords: ["strategy", "strategies", "setup", "setups", "scalping", "scalp", "rules", "entry", "entries"],
    answer: `${strategyInfo.line} Strategy names and rules are not published online — they are shared in classes, not through a student website login.`,
    actions: [{ label: "Strategies", href: "/strategies", kind: "link" }],
  },
  {
    id: "market-profile",
    question: "What is Market Profile?",
    keywords: ["market profile", "profile", "tpo", "value area", "value", "poc"],
    answer:
      "Market Profile organises price by time to show where the market spent effort and found value. It helps describe context — acceptance and rejection, balance and imbalance — and is one of the core modules of the curriculum. (Educational explanation, not advice.)",
    actions: [{ label: "Curriculum", href: "/learning", kind: "link" }],
  },
  {
    id: "order-flow",
    question: "What is Order Flow?",
    keywords: ["order flow", "orderflow", "footprint", "delta", "aggression", "absorption", "tape"],
    answer:
      "Order flow studies executed transactions to see which side is acting with urgency — aggression — and how resting liquidity responds (absorption). It is most useful read against market context. (Educational explanation, not advice.)",
    actions: [{ label: "Curriculum", href: "/learning", kind: "link" }],
  },
  {
    id: "mentor",
    question: "Who is the mentor?",
    keywords: ["mentor", "vignesh", "teacher", "trainer", "founder", "who", "experience of mentor"],
    answer: `Vignesh is the Founder and Mentor of LiquidityX Academy, with ${mentor.tradingExperience} of trading experience. Classes are conducted directly with him, in Tamil.`,
    actions: [{ label: "About Vignesh", href: "/about", kind: "link" }],
  },
  {
    id: "contact",
    question: "How do I contact LiquidityX?",
    keywords: ["contact", "whatsapp", "phone", "number", "call", "email", "mail", "instagram", "telegram", "youtube", "reach"],
    answer: `Message us on WhatsApp at ${contact.whatsappDisplay} for a quick response (messages only — we do not take calls). Email: ${contact.email}. Instagram: ${socialLinks.instagram.handle}. Telegram: ${socialLinks.telegram.handle}. YouTube: ${socialLinks.youtube.handle}.`,
    actions: [wa("Open WhatsApp"), { label: "Contact page", href: "/contact", kind: "link" }],
  },
  {
    id: "language",
    question: "What language are classes taught in?",
    keywords: ["tamil", "language", "english"],
    answer: "Classes are taught in Tamil. The website is in English.",
  },
  {
    id: "guarantee",
    question: "Will I make guaranteed profits?",
    keywords: ["profit", "guarantee", "guaranteed", "returns", "income", "win rate", "accuracy", "money", "earn"],
    answer:
      "No. Trading involves substantial risk and LiquidityX does not guarantee profits or any specific return. The course is education focused on market context and process.",
    actions: [{ label: "Risk Disclaimer", href: "/risk-disclaimer", kind: "link" }],
  },
  {
    id: "signals",
    question: "Do you give buy/sell calls?",
    keywords: ["signal", "signals", "tips", "calls", "buy", "sell", "recommendation", "advice"],
    answer: "LiquidityX provides trading education, not personalised financial advice or buy/sell recommendations.",
    actions: [{ label: "Risk Disclaimer", href: "/risk-disclaimer", kind: "link" }],
  },
];

/** The chips shown when the panel first opens (order matters). */
export const quickQuestionIds = ["join", "next-batch", "fee", "schedule", "curriculum", "included", "support", "contact"];

export const chatFallback: { answer: string; actions: ChatAction[] } = {
  answer:
    "I can answer questions about the course, schedule, fee, enrolment policies and support. For anything else, message us on WhatsApp and the LiquidityX team will reply.",
  actions: [wa("Message us on WhatsApp")],
};

export const chatGreeting =
  "Hi! I'm the LiquidityX Assistant. Ask me about the course, the next batch, the fee or enrolment terms — or message us on WhatsApp for anything else.";
