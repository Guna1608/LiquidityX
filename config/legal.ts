import { contact, socialLinks } from "./site";

/**
 * Legal copy for LiquidityX Academy.
 *
 * OPEN ITEMS (tracked in docs/PROJECT_BRIEF.md, deliberately NOT shown on the site):
 *  - The owner has not approved publishing a legal business name, GST details or
 *    a postal address, so none appear here. The operator is described only as
 *    "LiquidityX Academy". Do not invent an alternative legal entity.
 *  - Final Terms / Privacy / Risk wording, governing law, tax and invoice wording,
 *    and any Academy-initiated cancellation or exception policy are still to be
 *    confirmed. These documents must be finalised before the paid-enrolment site
 *    is treated as ready.
 */
export type LegalSection = {
  id: string;
  title: string;
  body: (string | { list: string[] })[];
};

const operator = "LiquidityX Academy";

const contactBlock = {
  list: [
    `Email: ${contact.email}`,
    `WhatsApp (messages only): ${contact.whatsappDisplay}`,
    `Instagram: ${socialLinks.instagram.handle} · Telegram: ${socialLinks.telegram.handle} · YouTube: ${socialLinks.youtube.handle}`,
  ],
};

export const privacyPolicy: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      `This Privacy Policy explains how ${operator} ("LiquidityX", "we", "us") handles information when you visit this website, chat with the website assistant, contact us or enrol in the course. It covers payments, registration details, analytics and chatbot storage.`,
    ],
  },
  {
    id: "information-collected",
    title: "Information we collect",
    body: [
      "We collect only the information needed to run the website and the course:",
      {
        list: [
          "Enquiries — the details you choose to send us, such as your name, WhatsApp number, email address and message.",
          "Payment information — when you pay for the course, the payment is processed by a third-party payment gateway. We receive the payment reference, amount and status. We do not receive or store your card, UPI PIN or net-banking credentials.",
          "Registration details (after a successful payment) — your full name, WhatsApp number with country code and email address.",
          "Assistant conversations — the questions you type into the website assistant and its answers.",
          "Visitor analytics — which pages are visited and how often (see below).",
          "Technical information sent automatically by your browser, such as IP address, device and browser type, which may appear in standard server logs.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: [
      {
        list: [
          "To answer your enquiries and provide course information.",
          "To confirm your payment and associate your registration with the batch you purchased.",
          "To provide course access details, class links, materials and support.",
          "To improve the website, using aggregate analytics.",
        ],
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    body: [
      "Course fees are paid in a single transaction through a third-party payment gateway. The gateway processes your payment under its own terms and privacy policy. We verify the payment result on our server and keep a record of the payment reference and the amount you actually paid.",
    ],
  },
  {
    id: "registration-details",
    title: "Registration details",
    body: [
      "After a successful payment you are asked to complete a registration form. This information is stored in our administration system, which only the owner can access. If you pay but do not finish the form, you can complete it later through a private registration link.",
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp, Discord and Telegram",
    body: [
      "WhatsApp buttons on this site open WhatsApp with a pre-filled message to our business number. Nothing is sent until you press send in WhatsApp. Messages are handled by WhatsApp (Meta Platforms) under its own terms and privacy policy. We also support students on Discord and Telegram, which operate under their own policies.",
    ],
  },
  {
    id: "analytics",
    title: "Website analytics",
    body: [
      "We use visitor analytics to see aggregate usage — the number of visits and the most popular pages — so that we can improve the site. Analytics are not used to identify you personally.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: [
      "The website uses your browser's session storage to remember that you have already seen the intro animation during a visit. It does not set advertising cookies. Analytics tools may set their own cookies where permitted by your choices.",
    ],
  },
  {
    id: "market-data",
    title: "Market-data displays",
    body: [
      "Market prices shown on the site may come from a third-party provider (and may be delayed) or may be clearly labelled simulated data. Requests for market data are made by our server and do not include your personal information.",
    ],
  },
  {
    id: "chatbot",
    title: "Website assistant conversations",
    body: [
      "The website assistant answers questions from approved course information. Conversations with the assistant are saved for 30 days and then deleted automatically. The owner can view saved conversations during that period to improve answers and follow up on unanswered enquiries. Please do not type sensitive personal information into the assistant. The assistant does not send your messages to an external AI service.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: [
      "We rely on third parties to operate parts of this site and the course, which may include:",
      {
        list: [
          "Website hosting and content delivery",
          "A payment gateway for course fees",
          "A visitor-analytics provider",
          "WhatsApp, Instagram, Telegram, YouTube and Discord for communication and community",
          "Google Meet and Discord for live classes",
          "Market-data providers (if configured)",
        ],
      },
      "These services process information under their own privacy policies. Links to external sites are provided for convenience; we are not responsible for their content or practices.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: [
      {
        list: [
          "Assistant conversations are kept for 30 days and then deleted automatically.",
          "Student registration details and payment references are kept for as long as needed to provide lifetime support and course access, maintain our records and meet legal and accounting obligations. They are not subject to the 30-day assistant retention.",
          "Enquiry messages are kept for as long as needed to respond to you and for reasonable record-keeping.",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "Student data is stored in an owner-only administration area and payments are verified on the server. We take reasonable measures to protect information we hold. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    body: [
      "The course is for adults: the minimum enrolment age is 18. We do not knowingly collect personal information from anyone under 18. If you believe a minor has sent us personal information, please contact us and we will delete it.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "Depending on applicable law, you may ask us to access, correct or delete personal information we hold about you, or to stop contacting you. To make a request, contact us using the details below. Corrections to registration details can be handled by us on request.",
    ],
  },
  {
    id: "updates",
    title: "Changes to this policy",
    body: ["We may update this policy from time to time. The \"Last updated\" date at the top of this page shows when it last changed."],
  },
  { id: "contact", title: "Contact", body: ["For privacy questions or requests:", contactBlock] },
];

export const termsAndConditions: LegalSection[] = [
  {
    id: "acceptance",
    title: "Website usage",
    body: [
      `These Terms & Conditions govern your use of this website and your enrolment in the course offered by ${operator}. By using the website or paying for the course you agree to these terms. If you do not agree, please do not use the website or enrol.`,
      "You agree not to misuse the website, attempt to disrupt it, or copy its content except as permitted below.",
    ],
  },
  {
    id: "educational-content",
    title: "Educational content",
    body: [
      "All content on this website — including articles, curriculum descriptions, market visuals and assistant answers — is provided for general educational and informational purposes only. It is not financial, investment, legal or tax advice, and it does not take into account your personal circumstances.",
    ],
  },
  {
    id: "course",
    title: "The course",
    body: [
      "The course is a structured 15-day curriculum taught directly by the mentor in Tamil, on Google Meet and Discord. Classes run Monday to Saturday; Sunday is a holiday. Each class starts at 8:30 PM IST and the session runs until about 9:45 PM IST. The curriculum has seven modules, which are covered across the 15 teaching days.",
      "The course is beginner-friendly and prior trading experience is not required. A laptop or desktop is required to attend.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: [
      "The minimum enrolment age is 18. International students may enrol.",
    ],
  },
  {
    id: "batches",
    title: "Batches and registration cut-off",
    body: [
      "A new batch starts on the 25th of every month. If the 25th is a Sunday, the batch starts on Monday the 26th. All dates and times are in Indian Standard Time (Asia/Kolkata).",
      "Seats are limited, so registration may close earlier when seats fill. Otherwise it remains available until the batch's actual start time of 8:30 PM IST. Once that batch has started, new registrations move to the following month's batch. We may open or close registration for a batch at our discretion.",
    ],
  },
  {
    id: "fees",
    title: "Fees and payment",
    body: [
      "The course fee shown on the website at the time of payment is the amount payable. The fee is paid in full in a single transaction; instalments are not available. The fee may be changed for future enrolments, but the amount you actually paid is recorded and is not affected by later changes.",
      "Payments are processed by a third-party payment gateway. Your registration is confirmed only after your payment has been successfully verified by us.",
    ],
  },
  {
    id: "included",
    title: "What the fee includes",
    body: [
      {
        list: [
          "Classes conducted directly with the mentor.",
          "Custom indicators, GEX data and LiquidityX workspaces provided during classes, with lifetime access to the supplied indicators, GEX data and workspaces.",
          "Course notes and learning materials through Discord.",
          "Lifetime doubt-clearing support through WhatsApp, Discord and Telegram.",
        ],
      },
      "Additional live trading sessions are occasional, depend on the mentor's availability and are not a guaranteed or scheduled benefit. Lifetime support does not mean unlimited scheduled one-to-one sessions.",
    ],
  },
  {
    id: "tools",
    title: "Software and tools",
    body: [
      "LiquidityX Academy provides education. We do not supply third-party software or software subscriptions. The mentor mainly uses ATAS and Deepcharts, and tools vary according to teaching needs. Any subscription to third-party software is the student's own responsibility and is not part of the course fee.",
    ],
  },
  {
    id: "missed-classes",
    title: "Missed classes, repeats and batch transfers",
    body: [
      {
        list: [
          "Class recordings are not provided.",
          "If you miss a class, you can request a short explanation of the missed lesson.",
          "Each student may repeat the full 15-day course once, in the next batch, for a small additional fee. The repeat is available once per student, not indefinitely.",
          "If a paid student cannot attend, they may transfer to the next batch. A batch transfer is separate from the one-time repeat.",
        ],
      },
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      "The LiquidityX name, website design, text, graphics, indicators, workspaces, strategies and teaching materials are owned by or licensed to LiquidityX. Strategies are shared in class and are for your personal learning. You may not reproduce, distribute, record, share or resell LiquidityX content, indicators, data, workspaces or class sessions without written permission.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: ["The website links to third-party services such as WhatsApp, Instagram, Telegram, YouTube and market-data providers. We do not control and are not responsible for their content, availability or practices."],
  },
  {
    id: "market-data",
    title: "Market data",
    body: [
      "Market data on this website may be delayed, incomplete or provided by third parties, or may be clearly labelled simulated data that is not live. It is provided \"as is\" for informational purposes and must not be relied on for trading decisions.",
    ],
  },
  {
    id: "chatbot",
    title: "Website assistant",
    body: ["The assistant gives automated answers based on approved course information. Answers may be incomplete or out of date. For anything important — including fees and batch dates — confirm with us on WhatsApp."],
  },
  {
    id: "no-guarantee",
    title: "No guarantee of results",
    body: [
      "Trading involves substantial risk. LiquidityX does not guarantee profits, income or any specific result from the course, its strategies or any content on this website. Your results depend on many factors outside our control.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, LiquidityX is not liable for any trading losses or for any indirect, incidental or consequential loss arising from your use of this website, the course or its content. Nothing in these terms excludes liability that cannot be excluded by law.",
    ],
  },
  { id: "changes", title: "Changes to services and terms", body: ["We may change the website, the course or these terms at any time. The \"Last updated\" date shows when these terms last changed. The terms shown when you pay apply to that payment."] },
  { id: "contact", title: "Contact", body: ["Questions about these terms:", contactBlock] },
];

export const riskDisclaimer: LegalSection[] = [
  {
    id: "risk-and-learning",
    title: "Risk and learning",
    body: [
      "Trading Forex, Futures and other leveraged instruments involves risk of loss and is not suitable for everyone. You can lose some or all of your capital, and with some products you may lose more than your initial deposit. Only trade with money you can afford to lose.",
      "The course teaches you to understand that risk, manage losses and make disciplined decisions. It cannot remove the risk of trading.",
    ],
  },
  {
    id: "education-not-advice",
    title: "Education, not financial advice",
    body: [
      "Everything provided by LiquidityX — including the course, strategies, articles, market visuals and assistant answers — is educational material. It is not financial or investment advice, and it is not a recommendation to buy or sell any instrument. LiquidityX does not provide personalised investment advice or trade signals. If you need advice, consult a suitably qualified and registered adviser.",
    ],
  },
  {
    id: "no-guaranteed-results",
    title: "No guaranteed results",
    body: [
      "LiquidityX does not guarantee profits or any specific result. No strategy taught guarantees a return, and any strategy can produce losing trades. Past performance is not indicative of future results, and examples and visuals are illustrative — they do not represent typical or expected outcomes.",
    ],
  },
  {
    id: "market-data",
    title: "Market data",
    body: [
      "Market data on this website may be delayed, inaccurate or supplied by third parties. Simulated values, where shown, are not live and must never be used for trading.",
    ],
  },
  {
    id: "responsibility",
    title: "Your responsibility",
    body: [
      "You are responsible for your own trading decisions and for complying with the laws and regulations that apply to you, including any restrictions on trading particular instruments in your country.",
    ],
  },
];
