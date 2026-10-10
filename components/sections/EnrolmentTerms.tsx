import Link from "next/link";
import { enrolmentTerms } from "@/config/site";
import { cn } from "@/lib/cn";

/** Key enrolment terms — shown clearly before payment. */
export function EnrolmentTerms({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[24px] border border-gold-500/30 bg-gold-500/[0.05] p-6 sm:p-8", className)}>
      <p className="text-lg font-bold text-gold-100">Please read before you pay</p>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {enrolmentTerms.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-bold text-bone">{g.title}</h3>
            <ul className="mt-2 space-y-1.5 text-[14px] leading-relaxed text-mist">
              {g.items.map((t) => (
                <li key={t} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-gold-400">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-smoke">
        Full details in the{" "}
        <Link href="/terms" className="text-mist underline decoration-gold-500/50 underline-offset-4 hover:text-gold-200">
          Terms &amp; Conditions
        </Link>
        . Education only — trading involves substantial risk and no result is guaranteed.
      </p>
    </div>
  );
}
