import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden px-6 pt-24 text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 tech-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" />
        <div className="absolute left-1/2 top-[10%] h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(82,120,255,0.18),transparent)] blur-3xl" />
      </div>
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,8rem)] font-semibold leading-none tracking-[-0.04em]">
          Off the <span className="text-gold">chart.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-mist">This page doesn&apos;t exist — or hasn&apos;t been published yet.</p>
        <div className="mt-10 flex justify-center">
          <Button href="/" icon={<ArrowRight size={16} />}>
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
