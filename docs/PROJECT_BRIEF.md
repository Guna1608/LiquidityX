# LiquidityX Academy — Project Brief & Open Items

Status of the "Confirmed Website Update Brief". Internal document — not shown on the site.

## Done in this codebase (public site)

| Brief § | What changed |
| --- | --- |
| 1, 2 | Positioning rewritten (Forex, Futures, Indian markets; Tamil teaching, English site). All five headlines placed once each: Home hero, Mentorship hero, Volume/Order Flow intro (home "Inside the classroom" section), Learning hero, Locked-strategies section (`headlines` in `config/site.ts`). Curriculum is prioritised; live trading sessions appear only as "occasional, not guaranteed". |
| 3 | Text-based wordmark (`components/brand/Wordmark.tsx`); LX mark and 3D LX object removed from the UI. Name-based mentor card with the approved intro, 6 yrs trading / 1 yr teaching. No portrait/placeholder message, no invented credentials. |
| 4 | "Six live classes" removed everywhere. Six items are *curriculum modules*; course = 15 teaching days, Mon–Sat, 8:30 PM IST emphasised (session 8:30–9:45), Google Meet + Discord, Tamil, 18+, laptop/desktop, no recordings. Per-module `/classes/[slug]` pages deleted (redirect to `/learning`); no day-by-day syllabus. |
| 4 | Batch logic in `lib/batch.ts` (Asia/Kolkata, 25th → Monday 26th if Sunday, cut-off 8:30 PM IST, rolls to next month at start time). Shown via `useBatch` / `NextBatchDate` / `BatchBanner`; used by the chatbot. Internal batch size (20) is not anywhere in the code or UI. |
| 4, 16 | Owner open/close switch: `enrolment.registrationOpen` (env `NEXT_PUBLIC_REGISTRATION_OPEN=false` closes). Never auto-closes on head-count. **Interim only** — see "Not built". |
| 5 | Six modules with the approved short descriptions. Strategies: only the count (11, incl. scalping) is public. `LockedStrategies` renders numbered locked tiles with no names/areas/rules/aria text. Old strategy list, marquee, cards, anchors, chatbot keywords and metadata removed. |
| 6, 7 | Tools/materials/lifetime access/support, missed-class, repeat, transfer and no-refund terms in `enrolmentTerms`, shown on the fee section, `/classes`, `/mentorship`, FAQ, Terms and chatbot. |
| 8 | Fee ₹23,000 (`pricing.currentFee`), single payment, no instalments; no speculative future price; no "tax-free" wording. Checkout is **not** presented as live (`enrolment.checkoutHref = null` → CTA goes to WhatsApp). |
| 10 | Certificate/T-shirt terms, India-only delivery; no courier tracking anywhere. |
| 11 | Testimonials section renders **nothing** until real cleaned screenshots are added to `testimonials` (type supports `image` + optional display name). |
| 12 | Eight articles fully rewritten (English, byline "Vignesh · Founder & Mentor, LiquidityX Academy"). All `draft: true`: hidden from listing, home teaser, sitemap, RSS and direct URL (404). Articles nav link appears only after one is published. Events page, nav/footer links and data removed (`/events` redirects to `/`). |
| 13 | Crypto/BTC removed from ticker, pulse, dashboard, sessions, mock UI, copy. Demo data labelled "Demo / Simulated data — Not live"; developer/API-key message removed from the public page. Real data only if a provider is configured (Twelve Data adapter kept, optional). |
| 14 | WhatsApp-only number (call links/`tel:` and auto phone-detection removed), email, Instagram, Telegram, YouTube + subscribe invitation. |
| 15 | Chatbot answers only from approved info; uses current fee + calculated batch date; refers unknowns to WhatsApp; never names strategies. |
| 17 | Operator shown only as "LiquidityX Academy". No legal name/GST/address. No bracketed placeholders or "requires review" banners on the site. Privacy policy updated for payments, registration, delivery, analytics and 30-day chatbot storage. |

## Not built (blocked on owner decisions — needs a backend)

The site is currently static + two stateless API routes. These brief items need a server, database and third-party accounts:

1. **Payment gateway + verified payment flow** (§8, 9) — gateway not selected / merchant onboarding pending. Needs: order creation, webhook/server-side verification, idempotent handling of duplicate notifications, failed/interrupted payment states, amount-paid stored per payment.
2. **Paid-only registration form + private resume links + manual UPI confirmation** (§9) — depends on (1) and a database.
3. **Owner-only admin panel** (§16) — fee edit, registration open/close (replace the env switch), registrations/payment refs, edit student data, repeat-used flag, articles, reviews, website text, previews, chatbot logs, analytics.
4. **Chatbot conversation storage with 30-day auto-delete + admin view** (§15). **The Privacy Policy already states this practice — do not publish the policy before it is implemented, or edit that section.**
5. **Visitor analytics** (§15) — provider pending. Existing consent-gated GA4/GTM/Clarity hooks remain (`.env.example`).
6. **Free real-market-data source** (§13) — provider terms/coverage for public display not yet checked; site stays in labelled demo mode.

Suggested stack when ready: hosting that supports server code (the current Netlify demo works with Next.js), a managed Postgres/Supabase-style DB, an auth-protected `/admin`, Razorpay/Cashfree-style gateway with webhooks.

## Unresolved — keep out of public copy until the owner approves

- Legal operator name (YASOVILIYAGROUP), GST details, postal address — **not approved for publication**.
- Final Privacy / Terms / Risk wording; governing law; tax & invoice wording; Academy-initiated cancellations or other exceptions (no wording exists; Terms currently say only "No refunds" for student cancellations).
- Registration/payment/delivery data retention (stated generally as "as long as needed"; owner preference is indefinite).

## Owner inputs still needed

Mentor portrait and final logo · WhatsApp testimonial screenshots (hide numbers/photos first) · review & approval of the 8 articles (set `draft: false` + `date`) · domain · gateway onboarding · final operator/policy/invoice details. The favicon (`app/icon.svg`) is still the earlier provisional LX mark — replace with the final logo.

## Launch checks (§18)

Verified in this pass: batch dates incl. Sunday shift, 8:30 PM IST cut-off, month/year rollover (see tests below); removal of strategy names, Crypto and Events from built HTML/JS; no placeholders; draft articles 404; chatbot answers (fee, date, refunds, support, strategies).
Still to test once built: open/close controls, successful/failed/interrupted payments, duplicate notifications, paid-only registration and resume links, owner-only data access, preservation of previously paid amounts.

Batch-date spot checks (`lib/batch.ts`): 10 Oct 2026 → Mon 26 Oct (25th is Sunday) · 26 Oct 20:29:59 IST → still 26 Oct · 20:30:00 → Wed 25 Nov · 25 Dec 21:00 → Mon 25 Jan 2027 · 31 Oct 18:40 UTC (= 1 Nov IST) → 25 Nov.
