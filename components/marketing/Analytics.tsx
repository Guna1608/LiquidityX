"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { marketing } from "@/config/site";
import { classifyLink, track } from "@/lib/track";

const KEY = "lx-consent";
type Consent = "granted" | "denied" | null;

const anyConfigured = Boolean(marketing.ga4Id || marketing.gtmId || marketing.metaPixelId || marketing.clarityId);

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Marketing & analytics integrations (GA4, GTM, Meta Pixel, Microsoft Clarity).
 *  - Nothing loads unless its env ID is configured.
 *  - Nothing loads until the visitor accepts cookies (consent banner).
 *  - Lead events: every WhatsApp / phone / email / social click is tracked.
 *  - SPA page views are reported on route change.
 */
export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  // lead & contact tracking for every outbound contact link
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const kind = classifyLink(a.getAttribute("href") ?? "");
      if (kind) track(kind.event, { channel: kind.channel, page: location.pathname, label: a.textContent?.trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // SPA page views
  useEffect(() => {
    if (consent !== "granted") return;
    track("page_view", { page_path: pathname, page_location: location.href, page_title: document.title });
  }, [pathname, consent]);

  const decide = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setConsent(v);
  };

  const on = consent === "granted";

  return (
    <>
      {on && marketing.ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${marketing.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});gtag('config','${marketing.ga4Id}',{send_page_view:false});`}
          </Script>
        </>
      )}
      {on && marketing.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${marketing.gtmId}');`}
        </Script>
      )}
      {on && marketing.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${marketing.metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
      {on && marketing.clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${marketing.clarityId}");`}
        </Script>
      )}

      <AnimatePresence>
        {ready && anyConfigured && consent === null && (
          <motion.div
            role="dialog"
            aria-label="Cookie consent"
            initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="panel-blur fixed bottom-24 left-3 right-3 z-[86] max-w-md rounded-[22px] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:left-5 md:bottom-6"
          >
            <p className="text-sm font-bold">We value your privacy</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-mist">
              We use cookies for analytics and to measure our marketing. You can accept or decline — the site works either way.{" "}
              <Link href="/privacy" className="text-bone underline underline-offset-4">
                Privacy Policy
              </Link>
            </p>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => decide("granted")} className="rounded-full bg-gold-500 px-5 py-2 text-sm font-medium text-white hover:brightness-110">
                Accept
              </button>
              <button type="button" onClick={() => decide("denied")} className="rounded-full border border-white/15 px-5 py-2 text-sm text-bone hover:bg-white/5">
                Decline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
