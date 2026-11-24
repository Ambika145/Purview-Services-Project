import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GroupCompaniesGrid, GroupCompaniesTitle } from "@/components/sections/GroupCompanies";

/** Homepage: the group companies, between the clients/partners block and "Beyond capabilities". */
export function GroupCompanies() {
  return (
    <section id="companies" className="relative scroll-mt-24 border-t border-line bg-paper py-[clamp(4.5rem,9vw,8rem)]" aria-labelledby="gc-title">
      <div className="wrap-wide">
        <div className="flex items-center gap-4" data-reveal>
          <span className="h-px w-10 bg-accent" aria-hidden />
          <span className="t-eyebrow text-accent-strong">Our companies</span>
        </div>
        <div className="mt-6">
          <GroupCompaniesTitle id="gc-title" />
        </div>
        <div className="mt-10">
          <GroupCompaniesGrid />
        </div>
        <Link href="/company#companies" className="gc-more" data-reveal>
          About the group <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    </section>
  );
}
