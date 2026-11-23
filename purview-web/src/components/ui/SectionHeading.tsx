import type { ReactNode } from "react";

/**
 * Editorial section heading: mono index + eyebrow on a hairline, then the
 * headline. The index ("01", "02"…) gives the long homepage a readable spine.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  align = "left",
  className = "",
  dark = false,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "split";
  className?: string;
  dark?: boolean;
}) {
  const eyebrowColor = dark ? "text-sky" : "text-accent-strong";
  const head = (
    <div className="flex items-center gap-4" data-reveal>
      {index && <span className={`t-eyebrow ${dark ? "text-on-dark-muted" : "text-muted"}`}>{index}</span>}
      <span className={`h-px w-10 ${dark ? "bg-sky/40" : "bg-line"}`} aria-hidden />
      <span className={`t-eyebrow ${eyebrowColor}`}>{eyebrow}</span>
    </div>
  );
  if (align === "split") {
    return (
      <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
        <div className="lg:col-span-7">
          {head}
          <Tag className="t-h2 mt-6 balance" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {title}
          </Tag>
        </div>
        {lead && (
          <div className={`t-lead lg:col-span-5 lg:pb-2 pretty ${dark ? "text-on-dark-muted" : "text-muted"}`} data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {lead}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={className}>
      {head}
      <Tag className="t-h2 mt-6 max-w-[22ch] balance" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
        {title}
      </Tag>
      {lead && (
        <div className={`t-lead mt-6 measure pretty ${dark ? "text-on-dark-muted" : "text-muted"}`} data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          {lead}
        </div>
      )}
    </div>
  );
}
