# LiquidityX Academy — Public Website

Premium dark, motion-rich website for **LiquidityX Academy** (mentor: Vignesh) — Forex & Futures trading education (classes taught in Tamil; site copy in English).

Public marketing/education site. Payments, the owner admin panel, chatbot storage and analytics are not built yet — see docs/PROJECT_BRIEF.md.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · Lenis · TradingView Lightweight Charts (Apache-2.0).

Type: **Satoshi** (Indian Type Foundry, Fontshare Free License — free for commercial use), self-hosted from `app/fonts/`. JetBrains Mono for numbers.

Visual direction: near-black base, single warm orange accent glow, blur-in typography, animated UI illustrations (`components/visuals/`) instead of stock imagery.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Copy `.env.example` → `.env.local` to configure optional integrations.

## Where things live

| Path | Purpose |
| --- | --- |
| `config/site.ts` | **All content**: brand, headlines, mentor, contact, navigation, curriculum, schedule, fee, enrolment terms, FAQ, market config |
| `lib/batch.ts` | Monthly batch date logic (Asia/Kolkata, 25th / Monday 26th, 8:30 PM IST cut-off) |
| `config/chatKnowledgeBase.ts` | Approved chatbot answers (fee and batch date are computed live) |
| `config/insights.ts` | Articles — all `draft: true` until the owner approves them |
| `config/legal.ts` | Privacy / Terms / Risk copy |
| `docs/PROJECT_BRIEF.md` | What is done, what is blocked on a backend, and open owner items |

See [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) for the full status against the update brief.

## Owner checklist

- **Fee** — `pricing.currentFee` (currently ₹23,000).
- **Registration open/close** — set `NEXT_PUBLIC_REGISTRATION_OPEN=false` and redeploy (interim; the admin panel will replace this).
- **Checkout** — `enrolment.checkoutHref` stays `null` until a payment gateway is configured and tested; until then enrolment is via WhatsApp.
- **Articles** — review, then set `draft: false` and a `date`. Preview drafts on a private deploy with `SHOW_DRAFT_ARTICLES=1`.
- **Reviews** — add cleaned WhatsApp screenshots (numbers and photos hidden) to `testimonials`.
- **Portrait** — add a photo to `public/` and set `mentor.portrait`.
- **Domain** — set `NEXT_PUBLIC_SITE_URL`.

## Market data

No provider configured → every market surface is labelled **Demo / Simulated data — Not live** and shows simulated values. Simulated data is never labelled live.

To connect Twelve Data (free tier available):

```env
MARKET_DATA_PROVIDER=twelvedata
TWELVEDATA_API_KEY=your_key
```

Symbol mapping is in `marketConfig.instruments[].providerSymbol`. Unsupported symbols render "—". Third-party data is labelled "may be delayed". To add another provider, implement `MarketDataProvider` (`lib/market/types.ts`) and return it from `getProvider()`.

The header "● MARKETS LIVE" indicator reflects the **global FX session clock**, not the data feed.

## Chatbot

Works fully offline from `config/chatKnowledgeBase.ts` (keyword matching, Tamil + English). To add an AI model later, implement `ChatProvider` in `lib/chat/engine.ts` and select it in `app/api/chat/route.ts` — the UI doesn't change.

## Performance & accessibility notes

- Animated illustrations only run while on screen (IntersectionObserver). The single WebGL object is code-split and paused off-screen, with a CSS fallback for low-end devices.
- Mobile/touch and reduced-motion users get native scrolling (no Lenis); reduced motion disables blur/scroll animations.
- Reveal states are gated behind a `.js` class set before paint, so content is visible without JavaScript.
- Skip link, focus-visible rings, ARIA on accordion / dialogs / menu / chatbot.

See `docs/IMAGE_PROMPTS.md` for optional art-direction image prompts.

## Classes, reviews & marketing (owner settings)

- **Upcoming batch** — `config/site.ts → upcomingBatch.startDate` (ISO, e.g. `"2026-11-03T19:00:00+05:30"`). Once set, the site shows the date and a live countdown everywhere; until then "Dates announced on WhatsApp". Optional `seats` text (e.g. `"Limited seats"`).
- **Classes** — `classSessions` drives `/classes`, `/classes/[slug]`, the home horizontal class strip, sitemap and structured data.
- **Student reviews** — add **real** reviews (with permission) to `testimonials`. The Reviews section and `aggregateRating` structured data switch on automatically. Never add invented reviews.
- **Analytics & pixels** — set any of `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_CLARITY_ID`. A cookie-consent banner appears only when at least one is set; nothing loads before the visitor accepts. WhatsApp / phone / email clicks are tracked as `generate_lead` / `contact` (Meta: `Lead` / `Contact`).
- **Search consoles** — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

## SEO

- Per-page title, description, canonical, hreflang (`en-IN`), keywords, Open Graph and Twitter cards via `pageMetadata()` (`lib/seo.ts`).
- Branded OG images generated on the fly at `/og?title=…` (Satoshi font, candle motif) — every page/class/article gets its own.
- JSON-LD: EducationalOrganization, WebSite, Course (+ each class), ItemList of classes, FAQPage, BreadcrumbList, Article.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, RSS at `/feed.xml` (published insights only). Draft articles are `noindex`.
