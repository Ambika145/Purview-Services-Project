import Image from "next/image";
import logos from "@/content/logos.json";

const MAP = logos as Record<string, { slug: string; w: number; h: number }>;

/**
 * A client or partner logo, as published on purviewservices.com. Falls back
 * to a typographic wordmark when no approved artwork exists, never a placeholder.
 */
export function LogoMark({ name, height = 32, className = "" }: { name: string; height?: number; className?: string }) {
  const l = MAP[name];
  if (!l) {
    return <span className={`text-sm font-bold tracking-tight text-muted ${className}`}>{name}</span>;
  }
  const w = Math.min(Math.round((l.w / l.h) * height), height * 4.5);
  return (
    <Image
      src={`/logos/${l.slug}.png`}
      alt={name}
      title={name}
      width={w}
      height={height}
      className={`logo-img object-contain ${className}`}
      style={{ width: w, height }}
      sizes={`${w}px`}
    />
  );
}
