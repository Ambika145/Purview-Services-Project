"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Enquiry form with the same fields as purviewservices.com/contact.html.
 *
 * INTEGRATION NOTE: the live site's form endpoint is not available to this
 * project, so on submit the enquiry is composed into an email to the right
 * Purview inbox (opened in the visitor's mail client). Replace `deliver()`
 * with the approved CRM / form handler before launch.
 */
export const INTERESTS = [
  { v: "AI applications and agents", to: "contact@purviewservices.com" },
  { v: "Data centres and GPU deployment (Purview DC)", to: "contact@purviewdc.com" },
  { v: "Managed IT services", to: "contact@purviewservices.com" },
  { v: "Workforce solutions", to: "contact@purviewservices.com" },
  { v: "Payments and fintech", to: "contact@purviewservices.com" },
  { v: "Partnership", to: "contact@purviewservices.com" },
  { v: "Other", to: "contact@purviewservices.com" },
];

type Errors = Partial<Record<"name" | "email" | "problem", string>>;

export function ContactForm() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function deliver(data: Record<string, string>) {
    const to = INTERESTS.find((i) => i.v === data.interest)?.to ?? "contact@purviewservices.com";
    const body = [`Name: ${data.name}`, `Company: ${data.company}`, `Email: ${data.email}`, `Country: ${data.country}`, `Interested in: ${data.interest}`, "", "Problem statement:", data.problem].join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Enquiry: ${data.interest}`)}&body=${encodeURIComponent(body)}`;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(Array.from(fd.entries()).map(([k, v]) => [k, String(v).trim()]));
    const errs: Errors = {};
    if (!data.name) errs.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) errs.email = "Enter an email address, like name@company.com.";
    if ((data.problem ?? "").length < 20) errs.problem = "Tell us a little more: at least 20 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    deliver(data);
    setSent(true);
  }

  const field = "mt-2 block w-full rounded-[var(--radius-s)] border border-line bg-surface px-4 py-3 text-fg placeholder:text-muted/70 focus:border-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";
  const label = "text-sm font-bold";
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-sm font-semibold text-[#b42318]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2" aria-describedby={`${uid}-note`}>
      <div>
        <label htmlFor={`${uid}-name`} className={label}>
          Name <span className="text-muted">(required)</span>
        </label>
        <input id={`${uid}-name`} name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={`${uid}-company`} className={label}>
          Company
        </label>
        <input id={`${uid}-company`} name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className={label}>
          Email <span className="text-muted">(required)</span>
        </label>
        <input id={`${uid}-email`} name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor={`${uid}-country`} className={label}>
          Country
        </label>
        <input id={`${uid}-country`} name="country" autoComplete="country-name" className={field} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>I am interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((i, k) => (
            <label key={i.v} className="cursor-pointer">
              <input type="radio" name="interest" value={i.v} defaultChecked={k === 0} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-[var(--radius-s)] border border-line bg-surface px-3.5 text-sm font-semibold text-muted transition-colors peer-checked:border-fg peer-checked:bg-ink peer-checked:text-on-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {i.v}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-problem`} className={label}>
          The problem statement <span className="text-muted">(required)</span>
        </label>
        <textarea
          id={`${uid}-problem`}
          name="problem"
          rows={6}
          className={field}
          placeholder="The decision that has to be made, how fast, under what constraints and at what cost."
          aria-invalid={!!errors.problem}
          aria-describedby={errors.problem ? `${uid}-problem-err` : undefined}
        />
        {err("problem")}
      </div>
      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <button type="submit" className="btn btn-dark">
          Send <ArrowRight aria-hidden className="btn-arrow size-4" />
        </button>
        <p id={`${uid}-note`} className="max-w-[46ch] text-sm text-muted">
          Sending opens your email app with the enquiry addressed to the right Purview team. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </div>
      <p role="status" className="text-sm font-semibold sm:col-span-2">
        {sent ? "Your email app should now be open with the enquiry ready to send. If it did not open, write to contact@purviewservices.com." : ""}
      </p>
    </form>
  );
}
