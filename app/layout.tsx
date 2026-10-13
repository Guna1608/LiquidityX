import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Noto_Sans_Tamil, Plus_Jakarta_Sans } from "next/font/google";
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
import { CursorGlow, ScrollProgress } from "@/components/motion/Ambience";

// Plus Jakarta Sans for English; Noto Sans Tamil is the fallback for Tamil script.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "500", "700"], variable: "--font-tamil", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.academy} — ${brand.tagline}`, template: `%s · ${brand.academy}` },
  description: brand.description,
  keywords: [...brand.keywords],
  applicationName: brand.academy,
  authors: [{ name: brand.academy }],
  openGraph: {
    type: "website",
    siteName: brand.academy,
    locale: brand.locale,
    alternateLocale: ["ta_IN"],
    url: brand.siteUrl,
    title: `${brand.academy} — ${brand.tagline}`,
    description: brand.description,
    images: [{ url: ogImage({ title: brand.tagline }), width: 1200, height: 630, alt: `${brand.academy} — ${brand.tagline}`, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.academy} — ${brand.tagline}`,
    description: brand.description,
    images: [ogImage({ title: brand.tagline })],
    ...(marketing.twitterHandle ? { site: marketing.twitterHandle, creator: marketing.twitterHandle } : {}),
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "education",
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], shortcut: "/icon.svg" },
  appleWebApp: { capable: true, title: brand.academy, statusBarStyle: "black-translucent" },

  creator: brand.academy,
  publisher: brand.academy,
  formatDetection: { telephone: false, email: false, address: false },
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
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('lx-seen'))d.classList.add('lx-ready');else d.classList.add('lx-intro')}catch(e){d.classList.add('lx-ready')}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${jakarta.variable} ${tamil.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="text-bone" suppressHydrationWarning>
        <div className="lx-splash" aria-hidden>
          <svg className="lx-beams" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="lxb1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e05e09" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ff7a1a" />
                <stop offset="1" stopColor="#d8b4fe" />
              </linearGradient>
              <linearGradient id="lxb2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff7a1a" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ff7a1a" />
                <stop offset="1" stopColor="#ffbd7d" />
              </linearGradient>
            </defs>
            <path pathLength="1" d="M-40 -40 L500 300" stroke="url(#lxb1)" />
            <path pathLength="1" d="M1040 -40 L500 300" stroke="url(#lxb2)" />
            <path pathLength="1" d="M-40 640 L500 300" stroke="url(#lxb2)" />
            <path pathLength="1" d="M1040 640 L500 300" stroke="url(#lxb1)" />
          </svg>
          <span className="lx-ring lx-ring-a" />
          <span className="lx-ring lx-ring-b" />
          <span className="lx-ring lx-ring-c" />
          <div className="lx-brand">
            <p className="lx-welcome">WELCOME TO</p>
            <p className="lx-name">LIQUIDITY<b>X</b></p>
            <p className="lx-academy">ACADEMY</p>
          </div>
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
