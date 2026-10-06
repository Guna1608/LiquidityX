import { contact, legal, socialLinks } from "./site";

/**
 * Legal copy. Drafted for LiquidityX — NOT reviewed by a lawyer.
 * Every document is marked "Requires owner/legal review before publication".
 * Pending business details render as visible [placeholders].
 */
export type LegalSection = {
  id: string;
  title: string;
  body: (string | { list: string[] })[];
  /** Shown as a highlighted review note on the section. */
  review?: string;
};

const entity = legal.entityName ?? "[Legal entity name — pending owner confirmation]";
const address = legal.registeredAddress ?? "[Registered address — pending owner confirmation]";
const jurisdiction = legal.governingJurisdiction ?? "[Governing law & jurisdiction — pending legal review]";
const enrolmentPolicy = "Subject to the applicable policy communicated by LiquidityX at the time of enrolment.";

const contactBlock = {
  list: [
    `Email: ${contact.email}`,
    `WhatsApp / Phone: ${contact.phoneDisplay}`,
    `Instagram: ${socialLinks.instagram.handle} · Telegram: ${socialLinks.telegram.handle}`,
    `Postal address: ${address}`,
  ],
};

export const privacyPolicy: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      `This Privacy Policy explains how ${entity} ("LiquidityX", "we", "us") handles information when you visit this website or contact us about LiquidityX Academy. This website is a public information site; it does not offer user accounts, logins or online payments.`,
    ],
  },
  {
    id: "information-collected",
    title: "Information we collect",
    body: [
      "We collect only the information needed to respond to you and to operate the website:",
      {
        list: [
          "Information you choose to send us — for example your name, phone number, email address and the content of your message.",
          "Technical information sent automatically by your browser, such as IP address, device and browser type, and pages visited, which may appear in standard server logs.",
          "Analytics information, only if analytics are enabled (see below).",
        ],
      },
    ],
  },
  {
    id: "contact-information",
    title: "Contact information",
    body: [
      "When you contact us by email, phone, Instagram or Telegram, we receive the details you provide and use them to reply, to share information about the mentorship you asked for, and to keep a record of our conversation.",
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp enquiries",
    body: [
      "WhatsApp buttons on this site open WhatsApp with a pre-filled message to our business number. Nothing is sent until you press send in WhatsApp. Messages are handled by WhatsApp (Meta Platforms) under its own terms and privacy policy, and we receive your WhatsApp name, number and message.",
    ],
  },
  {
    id: "analytics",
    title: "Website analytics",
    review: "Confirm whether an analytics tool is used and, if so, name it here.",
    body: [
      "If we enable website analytics, we use it to understand aggregate usage — such as which pages are visited — so that we can improve the site. We do not use analytics to identify you personally. This section will name the analytics provider if one is enabled.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: [
      "The website uses your browser's session storage to remember that you have already seen the intro animation during a visit. It does not set advertising cookies. If analytics or other third-party tools are enabled in future, they may set their own cookies, and this policy will be updated.",
    ],
  },
  {
    id: "market-data",
    title: "Market-data integrations",
    body: [
      "Market prices shown on the site may be requested from a third-party market-data provider by our server. These requests do not include your personal information. When no provider is configured, the site shows clearly labelled demonstration data generated on our server.",
    ],
  },
  {
    id: "chatbot",
    title: "Chatbot interactions",
    body: [
      "The LiquidityX Assistant answers questions from website content. Questions you type are processed to find an answer and are not used to build a profile of you. The current assistant does not send your messages to an external AI service. If an external AI provider is added in future, this policy will be updated before it is enabled.",
    ],
    review: "Confirm whether chatbot messages are logged on the server and for how long.",
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: [
      "We rely on third parties to operate parts of this site and our communications, which may include:",
      { list: ["Website hosting and content delivery", "WhatsApp, Instagram and Telegram for messaging", "Email providers", "Market-data providers (if configured)", "Google Meet or Discord for live classes"] },
      "These services process information under their own privacy policies. Links to external sites are provided for convenience; we are not responsible for their content or practices.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    review: "Specify retention periods for enquiries and student records.",
    body: [
      "We keep enquiry information only for as long as needed to respond to you and for reasonable record-keeping, after which it is deleted or anonymised.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We take reasonable measures to protect information we hold. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    body: [
      "This website and the mentorship are intended for adults. We do not knowingly collect personal information from children. If you believe a child has sent us personal information, please contact us and we will delete it.",
    ],
    review: "Confirm the minimum age for enrolment.",
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "Depending on applicable law, you may ask us to access, correct or delete personal information we hold about you, or to stop contacting you. To make a request, contact us using the details below.",
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
      `These Terms & Conditions govern your use of this website, operated by ${entity}. By using the website you agree to these terms. If you do not agree, please do not use the website.`,
      "You agree not to misuse the website, attempt to disrupt it, or copy its content except as permitted below.",
    ],
  },
  {
    id: "educational-content",
    title: "Educational content",
    body: [
      "All content on this website — including articles, strategy names, market visuals and chatbot answers — is provided for general educational and informational purposes only. It is not financial, investment, legal or tax advice, and it does not take into account your personal circumstances.",
      "Articles marked \"Draft / Demo\" are placeholders and have not yet been reviewed by LiquidityX.",
    ],
  },
  {
    id: "mentorship",
    title: "Mentorship information",
    body: [
      "The website describes the LiquidityX 15-day live mentorship (Tamil instruction, Forex and Futures, weekday live classes via Google Meet or Discord, no class recordings). Final details of any batch — including schedule, content and support — are confirmed directly by LiquidityX at the time of enrolment and may change.",
    ],
  },
  { id: "enrolment", title: "Enrolment", body: ["Enrolment is arranged directly with LiquidityX, currently through WhatsApp. This website does not process enrolments or payments.", enrolmentPolicy] },
  { id: "fees", title: "Fees", body: ["Fees are confirmed directly by LiquidityX. Any fee shown on this website is for information and is confirmed at enrolment.", enrolmentPolicy] },
  {
    id: "refunds",
    title: "Cancellations and refunds",
    review: "Insert the confirmed cancellation and refund policy.",
    body: [enrolmentPolicy],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      "The LiquidityX name, LX mark, website design, text, graphics and teaching materials are owned by or licensed to LiquidityX. You may view and share links to the website for personal, non-commercial use. You may not reproduce, distribute, record or resell LiquidityX content or class sessions without written permission.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: ["The website links to third-party services such as WhatsApp, Instagram, Telegram and market-data providers. We do not control and are not responsible for their content, availability or practices."],
  },
  {
    id: "market-data",
    title: "Market data",
    body: [
      "Market data on this website may be delayed, incomplete or provided by third parties, and may be clearly labelled demonstration data when no provider is configured. It is provided \"as is\" for informational purposes and must not be relied on for trading decisions.",
    ],
  },
  {
    id: "chatbot",
    title: "Chatbot",
    body: ["The LiquidityX Assistant gives automated answers based on website content. Answers may be incomplete or out of date. For anything important — including fees and batch dates — confirm directly with LiquidityX."],
  },
  {
    id: "no-guarantee",
    title: "No guarantee of results",
    body: [
      "Trading involves substantial risk. LiquidityX does not guarantee profits, income or any specific result from the mentorship, its strategies or any content on this website. Your results depend on many factors outside our control.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    review: "Have this clause reviewed for enforceability under the governing law.",
    body: [
      "To the maximum extent permitted by law, LiquidityX is not liable for any trading losses or for any indirect, incidental or consequential loss arising from your use of this website or its content. Nothing in these terms excludes liability that cannot be excluded by law.",
    ],
  },
  { id: "changes", title: "Changes to services and terms", body: ["We may change the website, the mentorship or these terms at any time. The \"Last updated\" date shows when these terms last changed."] },
  { id: "law", title: "Governing law", review: "Confirm governing law and jurisdiction.", body: [`These terms are governed by: ${jurisdiction}.`] },
  { id: "contact", title: "Contact", body: ["Questions about these terms:", contactBlock] },
];

export const riskDisclaimer: LegalSection[] = [
  {
    id: "substantial-risk",
    title: "Trading involves substantial risk",
    body: [
      "Trading Forex, Futures and other leveraged instruments involves substantial risk of loss and is not suitable for everyone. Leverage can work against you as well as for you. You can lose some or all of your capital, and with some products you may lose more than your initial deposit.",
      "Only trade with money you can afford to lose.",
    ],
  },
  {
    id: "past-performance",
    title: "Past performance",
    body: ["Past performance — of any market, strategy, setup or individual — is not indicative of future results. Examples shown in education are illustrative and do not represent typical or expected outcomes."],
  },
  {
    id: "not-advice",
    title: "Education, not financial advice",
    body: [
      "Everything provided by LiquidityX — including the mentorship, strategies, articles, market visuals and chatbot answers — is educational material. It is not financial or investment advice, and it is not a recommendation to buy or sell any instrument.",
      "LiquidityX does not provide personalised advice or trade signals. If you need advice, consult a suitably qualified and registered adviser.",
    ],
  },
  {
    id: "no-guarantee",
    title: "No guaranteed profits",
    body: ["LiquidityX does not guarantee profits. No strategy taught — including any of the 11 named strategies — guarantees a specific return or outcome. Any strategy can and will produce losing trades."],
  },
  {
    id: "market-data",
    title: "Market data",
    body: [
      "Market data shown on this website may be delayed, inaccurate or supplied by third parties. When no data provider is connected, the site shows simulated demonstration values that are clearly labelled and must never be used for trading.",
    ],
  },
  {
    id: "responsibility",
    title: "Your responsibility",
    body: [
      "You are solely responsible for your own trading decisions, for the risks you take, and for complying with the laws and regulations that apply to you, including any restrictions on trading particular instruments in your country.",
    ],
    review: "Add any jurisdiction-specific regulatory statements (e.g. regarding leveraged forex trading for Indian residents).",
  },
];
