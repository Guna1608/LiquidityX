# LiquidityX Academy — Public Website

Premium dark, motion-rich website for **LiquidityX Academy** (mentor: Vignesh) — Forex & Futures trading education (classes taught in Tamil; site copy in English).

Public marketing/education site only. No student portal, logins, protected downloads, admin or payments (future phases).

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · Lenis · TradingView Lightweight Charts (Apache-2.0) · three.js/R3F (only the 3D LX object on Contact).

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
| `config/site.ts` | **All content**: brand, mentor, contact, WhatsApp, navigation, strategies, curriculum, events, FAQ, pricing, market config, legal placeholders |
| `config/chatKnowledgeBase.ts` | Approved answers for the chatbot |
| `config/insights.ts` | Educational articles (currently **draft/demo**, noindex) |
| `config/legal.ts` | Privacy / Terms / Risk copy (**requires owner/legal review**) |
| `lib/motion/` | Central animation system: `presets.ts` (`reveal`, `parallax`), `useStickyProgress` |
| `lib/market/` | `MarketDataProvider` interface, demo + Twelve Data providers, session clock |
| `lib/chat/engine.ts` | Local FAQ matcher + `ChatProvider` interface for a future AI model |
| `lib/device.tsx` | Device tiers (`high` / `mid` / `low`) driving 3D complexity |
| `components/visuals/` | Animated illustrations: trading-terminal mockup, profile/order-flow/live-class/risk card visuals, glow horizon & orbs (all illustrative, labelled) |
| `components/motion/` | `MotionSection`, `TextReveal` (blur word reveal), `ScrollTilt`, `CountUp`, `Parallax`, `MagneticButton`, `PageTransition`, `SmoothScroll` |
| `components/3d/` | The interactive 3D LX object (Contact page) with fallbacks |

## Owner checklist (things intentionally left unconfirmed)

- **Fee** — `pricing.currentFee` is `null`, so the site shows "Contact for Current Fee". Set e.g. `{ amount: 23000, currency: "INR" }` once confirmed.
- **Portrait** — add a photo to `public/` and set `mentor.portrait`. Until then a labelled placeholder is shown.
- **Verified mentor facts** — `mentor.verifiedFacts` is empty by design; add only verified items.
- **Events** — `events` is empty, so a designed empty state is shown. Add real events to publish cards and detail pages.
- **Articles** — all insights are marked draft. Review, set `draft: false` and a `date` to publish (they then enter the sitemap).
- **Legal** — entity name, address, jurisdiction, refund policy, analytics, retention. Every legal page shows "Requires owner/legal review before publication".
- **Domain** — set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap, OG).

## Market data

No provider configured → every market surface is labelled **MARKET DATA DEMO** and shows simulated values. The /market page shows "Connect a market-data provider to enable live pricing." Simulated data is never labelled live.

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
