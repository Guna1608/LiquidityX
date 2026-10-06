import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/motion/MagneticButton";

type Variant = "primary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(180deg,#ff9a45_0%,#ff7a1a_55%,#e85f0a_100%)] shadow-[0_0_0_1px_rgba(255,170,100,0.5)_inset,0_1px_0_rgba(255,255,255,0.35)_inset,0_12px_36px_-10px_rgba(255,122,26,0.75)] hover:shadow-[0_0_0_1px_rgba(255,190,130,0.7)_inset,0_1px_0_rgba(255,255,255,0.45)_inset,0_18px_50px_-10px_rgba(255,122,26,0.95)] hover:brightness-110",
  ghost: "text-bone bg-white/[0.05] border border-white/12 hover:bg-white/[0.09] hover:border-white/25 backdrop-blur-md",
  quiet: "text-mist hover:text-bone",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-2",
  md: "h-11 px-6 text-[14px] gap-2.5",
  lg: "h-13 px-7 text-[15px] gap-2.5",
};

/** Text "roll" — the label slides up and is replaced by its twin on hover. */
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", icon, iconPosition = "end", magnetic = true, className, children } = props;
  const cls = cn(
    "group relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-tight",
    "transition-[filter,border-color,background-color,box-shadow,color] duration-500 ease-[var(--ease-expo)]",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {icon && iconPosition === "start" && <span className="shrink-0 transition-transform duration-500 group-hover:-rotate-12">{icon}</span>}
      <Label>{children}</Label>
      {icon && iconPosition === "end" && (
        <span className="shrink-0 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  let el: ReactNode;
  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, icon: _i, iconPosition: _p, magnetic: _m, className: _c, children: _ch, ...rest } = props as AsLink;
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
    el = isExternal ? (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    ) : (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  } else {
    const { variant: _v, size: _s, icon: _i, iconPosition: _p, magnetic: _m, className: _c, children: _ch, ...rest } = props as AsButton;
    el = (
      <button type="button" className={cls} {...rest}>
        {content}
      </button>
    );
  }

  return magnetic ? <MagneticButton>{el}</MagneticButton> : el;
}
