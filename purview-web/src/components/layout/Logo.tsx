import Image from "next/image";
import Link from "next/link";

/** Official Purview logo (white artwork from purviewservices.com/assets/brand; navy is a recolour of the same alpha mask). */
export function Logo({ tone = "white", className = "" }: { tone?: "white" | "navy"; className?: string }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label="Purview Services home">
      <Image
        src={tone === "white" ? "/brand/purview-logo-white.png" : "/brand/purview-logo-navy.png"}
        alt="Purview"
        width={365}
        height={132}
        loading="eager"
        fetchPriority="high"
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
