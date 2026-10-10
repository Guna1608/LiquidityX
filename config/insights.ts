import type { InsightCategory } from "./site";

/**
 * Educational articles by Vignesh — Founder & Mentor, LiquidityX Academy.
 *
 * APPROVAL WORKFLOW
 *  - Every article ships with `draft: true`. Drafts are NOT shown in the public
 *    listing, home page, sitemap, RSS feed or by direct URL (they 404).
 *  - After the owner has reviewed an article, set `draft: false` and add a
 *    `date` (YYYY-MM-DD). It then appears everywhere and the Articles link
 *    appears in the navigation.
 *  - To preview drafts on a private deployment set SHOW_DRAFT_ARTICLES=1
 *    (drafts are also visible under `npm run dev`).
 *
 * General educational explanations only — no predictions, no buy/sell calls,
 * no performance claims.
 */
export type InsightBlock = { heading?: string; text?: string; list?: string[] };

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  summary: string;
  /** null until the owner approves the article for publication. */
  date: string | null;
  readMinutes: number;
  draft: boolean;
  body: InsightBlock[];
};

export const articleByline = "Vignesh · Founder & Mentor, LiquidityX Academy";

export const insights: Insight[] = [
  {
    slug: "what-is-market-profile",
    title: "What is Market Profile?",
    category: "Profile",
    summary: "A way of organising price and time to see where a market spent effort — and where it found value.",
    date: null,
    readMinutes: 6,
    draft: true,
    body: [
      {
        text: "Most traders learn to read charts one candle at a time. A candlestick chart is useful, but it hides something important: how long the market stayed at each price. Market Profile was built to show exactly that. It arranges trading activity by price and by time, so you can see where the market spent its effort and where it moved through quickly.",
      },
      {
        heading: "The idea behind it",
        text: "A market is an auction. Buyers and sellers are trying to find a price at which business can happen. When a price attracts plenty of two-way trade, the market lingers there. When a price is turned down, the market leaves it quickly. Market Profile makes this visible by stacking the time spent at each price into a distribution — a shape that grows sideways wherever trade was accepted.",
      },
      {
        heading: "The vocabulary you will meet",
        list: [
          "Value area — the range of prices where most of the session's activity took place.",
          "Point of control (POC) — the single price where the most activity occurred.",
          "High and low of the session — the extremes the auction explored.",
          "Single prints — thin parts of the profile where price moved through with little trade, often described as rejection.",
          "Initial balance — the range formed early in a session, used as a reference for what follows.",
        ],
      },
      {
        heading: "Acceptance and rejection",
        text: "Two ideas run through everything in Market Profile. Acceptance means the market trades at a price for long enough that buyers and sellers both appear comfortable there. Rejection means the market tries a price and is quickly pushed away. Neither is a prediction. They are descriptions of what has just happened, and they help you judge whether a move is being supported or refused.",
      },
      {
        heading: "Building context",
        text: "The real value of a profile is context. Instead of asking only 'where is price?', you ask: where is price relative to yesterday's value? Is today's activity overlapping with prior value, or has it moved away? Is the market rotating inside a range, or trying to establish value somewhere new? Answering these questions before looking for any trade gives structure to what can otherwise feel like random movement.",
      },
      {
        heading: "Common mistakes",
        list: [
          "Treating the POC or value area edges as guaranteed support and resistance. They are reference points, not promises.",
          "Reading a profile in isolation. A profile is more informative alongside volume and order flow.",
          "Ignoring the time frame. A session profile and a multi-day composite answer different questions.",
        ],
      },
      {
        heading: "Where to go from here",
        text: "Start by looking at a few completed sessions and simply describing them in words: where was value, where was it rejected, did the next day accept or reject it? Describing before predicting is the habit that makes Market Profile useful. It is a framework for understanding the market — not a signal on its own.",
      },
    ],
  },
  {
    slug: "understanding-order-flow",
    title: "Understanding Order Flow",
    category: "Order Flow",
    summary: "Order flow looks at executed transactions to understand which side is acting with urgency.",
    date: null,
    readMinutes: 6,
    draft: true,
    body: [
      {
        text: "A price chart tells you where trades happened. Order flow tries to tell you how they happened. Every transaction has a buyer and a seller; order flow asks which of them was in a hurry, and how the other side responded. This extra layer is why many traders say that price is only part of the story.",
      },
      {
        heading: "Aggressors and passive orders",
        text: "There are two kinds of participant in every trade. A passive participant places a limit order and waits to be filled. An aggressive participant uses a market order and accepts whatever price is on offer to get done immediately. When an aggressive buyer lifts an offer, the trade is recorded as a buy at the ask. When an aggressive seller hits a bid, it is recorded as a sell at the bid. Order flow tools count these executions at each price.",
      },
      {
        heading: "Delta and the footprint",
        text: "Delta is the difference between aggressive buying and aggressive selling over a period. A footprint-style chart shows, for each price inside each bar, how much traded at the bid and at the ask. This lets you see not only that volume was high, but which side was driving it and at which prices.",
      },
      {
        heading: "Aggression and absorption",
        text: "Two patterns come up repeatedly:",
        list: [
          "Aggression moving price — heavy aggressive buying lifts price easily, or heavy aggressive selling pushes it down easily. The other side is thin or is stepping away.",
          "Absorption — aggressive orders keep hitting a price but price barely moves. Resting liquidity on the other side is absorbing them. This can mean the push is being met with a large, patient participant.",
        ],
      },
      {
        text: "Neither pattern tells you what happens next. Absorption can end with the aggressive side finally breaking through; aggression can run out of fuel. They describe the present fight, and they gain meaning only against the surrounding structure.",
      },
      {
        heading: "Why context comes first",
        text: "The same order-flow reading means different things in different places. Absorption near the edge of prior value is a different situation from absorption in the middle of a quiet range. That is why order flow is most useful when read against market profile, volume and key reference levels, rather than as a stand-alone trigger.",
      },
      {
        heading: "Limits to keep in mind",
        list: [
          "Order flow needs reliable, centralised volume data. Exchange-traded futures are well suited; over-the-counter markets are not.",
          "Reading it takes practice. Early on, review completed examples before trying to interpret live action.",
          "It is information, not instruction. Risk still has to be defined before any decision.",
        ],
      },
    ],
  },
  {
    slug: "volume-profile-types",
    title: "Volume Profiles: Session, Range and Fixed",
    category: "Volume",
    summary: "Different volume-profile tools answer different questions about where participation happened.",
    date: null,
    readMinutes: 6,
    draft: true,
    body: [
      {
        text: "A volume profile is a histogram turned on its side. Along the vertical axis is price; along the horizontal axis is how much volume traded at that price over a chosen window. The window you choose is the part that matters most, because it decides which question the profile can answer.",
      },
      {
        heading: "Why the window matters",
        text: "The same market can show very different profiles depending on where you start and stop measuring. A profile of one morning tells you about that morning's participation. A profile of a whole swing tells you where the market did most of its business during that swing. Neither is wrong — they simply answer different questions.",
      },
      {
        heading: "The common types",
        list: [
          "Session profiles summarise a single trading session. They are useful for judging how today's participation compares with yesterday's.",
          "Fixed-range profiles summarise a range you select manually — for example, from the start of a move to its end. They help you ask where volume concentrated during that specific move.",
          "Visible-range profiles summarise whatever is currently on screen. They are quick to use, but they change as you scroll or zoom, so treat them as a convenience rather than a fixed reference.",
          "Periodic profiles repeat automatically over a set period, such as each day or week, letting you compare successive periods side by side.",
        ],
      },
      {
        heading: "High-volume and low-volume areas",
        text: "High-volume areas show where the market was comfortable transacting — price stayed, and plenty of business was done. Low-volume areas show where price moved quickly with little participation. Traders often watch how price behaves when it returns to these areas, because the market's earlier behaviour there provides context.",
      },
      {
        heading: "Choosing the right profile",
        text: "Begin with the question, then pick the window. Ask 'where did participation concentrate today?' and you reach for a session profile. Ask 'where was the business done during this particular rally?' and you anchor a fixed-range profile to that rally. Using the wrong window is the most common reason a volume profile seems unhelpful.",
      },
      {
        heading: "Keep it honest",
        text: "A volume profile describes what has already traded. It does not forecast what will trade next. Used with market profile and order flow, it helps build a more complete picture of context — but it is one input among several, not a decision by itself.",
      },
    ],
  },
  {
    slug: "risk-before-reward",
    title: "Risk Before Reward",
    category: "Risk Management",
    summary: "Why defining risk first is the foundation of a structured trading process.",
    date: null,
    readMinutes: 5,
    draft: true,
    body: [
      {
        text: "Many new traders begin by asking how much they could make. A structured trader begins with a different question: how much am I prepared to lose if I am wrong? Defining risk before reward is not pessimism. It is the part of the process you can actually control.",
      },
      {
        heading: "Every idea can be wrong",
        text: "No analysis is certain. A trade idea is a hypothesis, and hypotheses fail. What separates a process from a gamble is that the cost of being wrong is decided in advance, while you are calm, rather than in the middle of a losing trade.",
      },
      {
        heading: "Invalidation first",
        text: "Before entering, ask: at what price is this idea clearly wrong? That level is your invalidation point. The distance between your entry and that point is the risk per unit. If the idea needs an invalidation point so far away that the risk is unacceptable, the right decision may be to skip the trade.",
      },
      {
        heading: "Position size follows risk",
        text: "A widely taught approach is to decide the amount you are willing to risk on a single trade — a small, fixed fraction of your capital — and then size the position so that hitting your invalidation point costs exactly that amount. The position size is a result of the risk, not a matter of confidence or excitement.",
        list: [
          "Decide the maximum you will risk on one trade.",
          "Mark where the idea is invalidated.",
          "Calculate the position size that makes the distance to that level equal to your risk.",
          "If the size is too small to be worthwhile, or the stop too wide, do not take the trade.",
        ],
      },
      {
        heading: "Protecting capital",
        text: "Losses are not symmetrical. A 10% loss needs an 11% gain to recover; a 50% loss needs a 100% gain. Keeping individual losses small and having a limit on total losses for a day or week keeps you in the game long enough to learn.",
      },
      {
        heading: "Review is part of risk control",
        text: "Review your trades — including well-executed losses. A trade that followed your plan and lost is not a mistake; a trade that broke your plan and won is. Over time, reviewing decisions rather than outcomes builds a process that does not depend on any single result.",
      },
      {
        text: "Nothing here removes risk. Trading involves substantial risk of loss, and this article is educational — it is not advice to take or avoid any trade.",
      },
    ],
  },
  {
    slug: "discipline-and-process",
    title: "Discipline Is a Process, Not a Mood",
    category: "Trading Psychology",
    summary: "Checklists, journals and rules reduce the number of decisions made under pressure.",
    date: null,
    readMinutes: 5,
    draft: true,
    body: [
      {
        text: "Traders often describe discipline as something you either have or lack, like a mood. When it deserts you, you blame yourself. A more useful view is that discipline is a design problem: build a process so that good behaviour does not depend on how you feel that day.",
      },
      {
        heading: "Why decisions go wrong under pressure",
        text: "A live market asks for many decisions in a short time, often while money is at stake and emotions are high. Each extra choice made in the moment is another chance for fear, impatience or overconfidence to decide for you. The solution is to make as many choices as possible earlier, when you are calm.",
      },
      {
        heading: "Build the process before the session",
        list: [
          "A pre-session checklist: what is the market context, what are the key reference levels, what scenarios am I prepared for, and what would make me stand aside?",
          "Written rules for when not to trade — for example, after a set number of losses or when you are tired or distracted.",
          "A defined maximum risk per trade and per day, decided in advance.",
          "A simple routine for ending the session so that you do not keep trading out of boredom.",
        ],
      },
      {
        heading: "Use a journal",
        text: "A trade journal turns experience into learning. Record the context, your reasoning, the plan, the result and how well you followed the plan. Review it regularly. Patterns appear — perhaps you break your rules after a loss, or overtrade at certain hours — and what you can see, you can fix.",
      },
      {
        heading: "Judge process, not outcome",
        text: "In any short run of trades, luck plays a large part. If you judge yourself only by profit and loss, you will reinforce lucky mistakes and abandon sound decisions that happened to lose. Judge each trade by whether you followed your process. Outcomes then take care of themselves over a longer horizon — with no guarantee, because markets are uncertain.",
      },
      {
        heading: "Start small",
        text: "Do not try to rebuild your habits overnight. Choose one rule — perhaps 'I will not trade without a written plan' — and follow it for a few weeks. Then add another. Consistency grows from systems you can repeat, not from bursts of willpower.",
      },
    ],
  },
  {
    slug: "forex-and-futures-structure",
    title: "Forex and Futures: How the Markets Differ",
    category: "Futures",
    summary: "A plain-language look at how forex and futures markets are structured.",
    date: null,
    readMinutes: 6,
    draft: true,
    body: [
      {
        text: "Forex and futures are often mentioned together, and traders move between them, but the two markets are built differently. Knowing how they differ helps you understand what your charts and data are really showing.",
      },
      {
        heading: "Where they trade",
        text: "Futures are standardised contracts traded on regulated exchanges. Every transaction goes through the exchange, which publishes a single, centralised record of price and volume. Spot forex, in contrast, is traded over the counter: a network of banks, brokers and liquidity providers quote prices to one another and to clients. There is no single central record of every trade.",
      },
      {
        heading: "Why that matters for volume",
        text: "Because a futures exchange sees all of its trades, the volume you see for a futures contract reflects real, centralised activity. Tools that rely on volume — volume profiles and order flow among them — work on firm ground. In spot forex, the volume your broker shows usually reflects only that broker's own flow, so it is a sample rather than the whole market. Many traders therefore use currency futures as a window into currency activity when they want volume-based analysis.",
      },
      {
        heading: "Contracts and expiry",
        text: "A futures contract has an expiry date. Traders either close the position before expiry or roll it into a later contract, and activity tends to migrate from the expiring contract to the next one. Spot forex has no expiry in the same way, although positions held overnight may involve financing costs.",
      },
      {
        heading: "Trading hours",
        text: "Spot forex trades around the clock on weekdays, moving between major financial centres. Many futures markets also trade for long hours, but each has its own session structure, and the most active period is often when the underlying market's home exchange is open. Indian exchange-traded markets, by contrast, run in defined sessions with a clear open and close.",
      },
      {
        heading: "Costs and leverage",
        text: "Both markets are leveraged, which means a small move can have a large effect on your capital — in either direction. Costs are structured differently: forex typically involves spreads and sometimes commissions, while futures involve exchange fees, commissions and margin requirements. Whatever you trade, understand the costs and margin rules before you begin.",
      },
      {
        heading: "Choosing what to study",
        text: "The markets differ, but the underlying idea is shared: price is the outcome of buyers and sellers looking for a fair level. Learning to read context, participation and risk transfers across markets. Just make sure you know what your data represents before you rely on it.",
      },
    ],
  },
  {
    slug: "balance-and-imbalance",
    title: "Balance and Imbalance",
    category: "Market Structure",
    summary: "Markets alternate between rotating inside a range and moving to find new value.",
    date: null,
    readMinutes: 5,
    draft: true,
    body: [
      {
        text: "If you watch a market for long enough, you notice two broad behaviours. Sometimes price drifts back and forth inside a range. At other times it travels decisively from one area to another. These are often described as balance and imbalance, and naming them is one of the simplest ways to organise your thinking.",
      },
      {
        heading: "Balance",
        text: "A market is in balance when buyers and sellers broadly agree on value. Neither side has enough urgency to push the price far away, so price rotates between an upper and lower area. Balanced markets tend to have overlapping value from one period to the next, and moves away from the range are often short-lived.",
      },
      {
        heading: "Imbalance",
        text: "A market moves into imbalance when one side becomes more urgent than the other. Price travels in one direction to find new participants who are willing to trade at the new level. Imbalance usually shows as a directional move, with value shifting from one period to the next rather than overlapping.",
      },
      {
        heading: "How the two connect",
        text: "Markets move between these states. A period of balance can end when a move away from the range is accepted — trade continues at the new prices. An imbalance can end when the move runs out of urgency and the market begins to rotate again. Seeing which state you are in helps you decide which questions are worth asking.",
        list: [
          "In balance: where are the edges of the range, and is price being accepted or rejected at them?",
          "In imbalance: is the move being supported by participation, or is it thin? Where might the market find fresh balance?",
        ],
      },
      {
        heading: "A descriptive tool, not a forecast",
        text: "Labelling the market as balanced or imbalanced describes what has happened. It does not predict what will happen next, and it can change quickly. Use it as a starting point for building scenarios — and always define your risk before acting on any of them.",
      },
      {
        heading: "A simple exercise",
        text: "Open a chart of a market you follow and look at the last ten sessions. For each, write one sentence: was value overlapping with the prior session, or did it move? After ten sessions you will have a feel for how often markets alternate and how the transitions look.",
      },
    ],
  },
  {
    slug: "reading-currency-sessions",
    title: "Reading Currency Sessions",
    category: "Forex",
    summary: "How Asian, London and New York sessions shape activity in currency pairs.",
    date: null,
    readMinutes: 5,
    draft: true,
    body: [
      {
        text: "The currency market trades around the clock on weekdays, yet it is not equally active at every hour. Activity follows the sun as major financial centres open and close. Understanding these sessions adds useful context to any currency chart.",
      },
      {
        heading: "The three broad sessions",
        list: [
          "Asian session — centred on Tokyo, Singapore and Hong Kong, with Sydney opening the week. Activity in many major pairs is often calmer, although pairs involving Asian currencies are more active.",
          "London session — Europe's open brings a large rise in participation. Many currency pairs see their busiest periods when London is open.",
          "New York session — US hours add further activity, especially where the US dollar is involved. The overlap with London is typically the most liquid part of the day.",
        ],
      },
      {
        heading: "Local times for traders in India",
        text: "Session times in India depend on the season, because London and New York observe daylight saving while India does not. Rather than memorising clock times, check the current opening hours of each financial centre and convert them to Indian Standard Time. The overlap between sessions shifts by an hour twice a year.",
      },
      {
        heading: "Why sessions matter",
        text: "Liquidity changes as sessions open and close. When many participants are active, orders are absorbed more easily; when they are not, price can move farther on less. The high and low formed in one session often become reference points for the next, and the opening of a new session can change the character of the market.",
      },
      {
        heading: "Adding session context to your chart",
        text: "A simple habit is to mark each session on your chart and note which one you are trading in, what happened in the previous one, and whether the market was balanced or moving. This takes a minute and makes your read of the market less one-dimensional.",
      },
      {
        heading: "Things to remember",
        list: [
          "Sessions describe typical behaviour, not guaranteed behaviour. News and events can change activity at any time.",
          "Different pairs have different busy periods, so check the pair you actually trade.",
          "Lower-liquidity periods may carry wider spreads and faster moves — a risk to be planned for, not ignored.",
        ],
      },
      {
        text: "As with everything here, this is educational context rather than a trading recommendation. Trading currencies involves substantial risk.",
      },
    ],
  },
];

/** Articles approved for the public site. */
export const showDrafts = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFT_ARTICLES === "1";
export const publicInsights = insights.filter((i) => !i.draft || showDrafts);
export const listedInsights = insights.filter((i) => !i.draft);
