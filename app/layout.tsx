import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { brand, marketing } from "@/config/site";
import { ogImage, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Analytics } from "@/components/marketing/Analytics";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LiquidityChatbot } from "@/components/chat/LiquidityChatbot";
import { WhatsAppFloat } from "@/components/chat/WhatsAppFloat";
import { JsonLd } from "@/components/ui/JsonLd";
import { CandleLoader } from "@/components/brand/CandleLoader";
import { CursorGlow, ScrollProgress } from "@/components/motion/Ambience";

// Satoshi by Indian Type Foundry — Fontshare Free License (free for commercial use), self-hosted.
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700" },
    { path: "./fonts/Satoshi-900.woff2", weight: "900" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.academy} — Live Forex & Futures Trading Mentorship`, template: `%s · ${brand.academy}` },
  description: brand.description,
  keywords: [...brand.keywords],
  applicationName: brand.academy,
  authors: [{ name: brand.academy }],
  openGraph: {
    type: "website",
    siteName: brand.academy,
    locale: brand.locale,
    url: brand.siteUrl,
    title: `${brand.academy} — Live Forex & Futures Trading Mentorship`,
    description: brand.description,
    images: [{ url: ogImage({ title: "Understand the market. Trade with clarity." }), width: 1200, height: 630, alt: brand.academy }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.academy,
    description: brand.description,
    images: [ogImage({ title: "Understand the market. Trade with clarity." })],
    ...(marketing.twitterHandle ? { site: marketing.twitterHandle, creator: marketing.twitterHandle } : {}),
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "education",
  creator: brand.academy,
  publisher: brand.academy,
  formatDetection: { telephone: true, email: true, address: false },
  verification: {
    ...(marketing.googleVerification ? { google: marketing.googleVerification } : {}),
    ...(marketing.bingVerification ? { other: { "msvalidate.01": marketing.bingVerification } } : {}),
  },
  alternates: { canonical: brand.siteUrl, languages: { "en-IN": brand.siteUrl, "x-default": brand.siteUrl }, types: { "application/rss+xml": `${brand.siteUrl}/feed.xml` } },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Runs before paint: enables JS-gated reveal states. */
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('lx-seen'))d.classList.add('lx-ready')}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${satoshi.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="text-bone">
        <div className="lx-splash" aria-hidden>
          <CandleLoader label="Preparing the market…" />
        </div>
        <Providers>
          <ScrollProgress />
          <CursorGlow />
          <Header />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <LiquidityChatbot />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
