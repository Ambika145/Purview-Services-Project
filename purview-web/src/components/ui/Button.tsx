import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "ghost-dark";

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const isExternal = external ?? /^https?:/.test(href);
  const Icon = isExternal ? ArrowUpRight : ArrowRight;
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <Icon aria-hidden className="btn-arrow size-4 shrink-0" strokeWidth={2.25} />
      {isExternal && <span className="sr-only"> (opens external site)</span>}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const isExternal = /^https?:/.test(href);
  const Icon = isExternal ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      <Icon aria-hidden className="size-4" strokeWidth={2.25} />
      {isExternal && <span className="sr-only"> (opens external site)</span>}
    </>
  );
  return isExternal ? (
    <a href={href} className={`link-arrow ${className}`} target="_blank" rel="noopener">
      {content}
    </a>
  ) : (
    <Link href={href} className={`link-arrow ${className}`}>
      {content}
    </Link>
  );
}
