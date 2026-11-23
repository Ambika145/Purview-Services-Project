import { Button } from "@/components/ui/Button";
import { VERTICALS } from "@/content/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[80svh] items-center overflow-hidden bg-abyss">
      <div className="blueprint absolute inset-0 opacity-60" aria-hidden />
      <div className="wrap relative pt-32 pb-20">
        <p className="t-eyebrow text-sky">404 · Page not found</p>
        <h1 className="t-h1 mt-6 max-w-[16ch]">This page is not on the floor plan.</h1>
        <p className="t-lead mt-6 max-w-[40rem] text-on-dark-muted">The address may have changed in the redesign. Start from one of the three capabilities, or go back to the homepage.</p>
        <ul className="mt-10 grid max-w-3xl gap-px overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-sky/15 sm:grid-cols-3">
          {VERTICALS.map((v) => (
            <li key={v.id} className="bg-abyss">
              <Link href={v.href} className="flex items-center gap-3 p-5 hover:bg-ink">
                <span className="layer-chip border-sky/40 text-sky">{v.layer}</span>
                <span className="font-bold">{v.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/">Back to the homepage</Button>
        </div>
      </div>
    </section>
  );
}
