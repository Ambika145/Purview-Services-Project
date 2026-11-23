"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, LoaderCircle, RotateCcw, TriangleAlert } from "lucide-react";
import { INTERESTS } from "@/components/sections/ContactForm";

/**
 * "Let's talk": the homepage closing enquiry. Same fields and inbox routing as
 * the Contact page form (/contact). There is no form backend in this project,
 * so, exactly like that form, sending composes the enquiry and opens it in the
 * visitor's email app, addressed to the right Purview inbox. If no email app
 * responds, the visitor gets the enquiry to copy and the address to send it to.
 */

type Field = "name" | "email" | "problem";
type Errors = Partial<Record<Field, string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; to: string } | { kind: "failed"; to: string; text: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(d: Record<string, string>): Errors {
  const e: Errors = {};
  if (!d.name) e.name = "Enter your name.";
  if (!EMAIL_RE.test(d.email ?? "")) e.email = "Enter an email address, like name@company.com.";
  if ((d.problem ?? "").length < 20) e.problem = "Tell us a little more: at least 20 characters.";
  return e;
}

function compose(d: Record<string, string>) {
  const to = INTERESTS.find((i) => i.v === d.interest)?.to ?? "contact@purviewservices.com";
  const subject = `Enquiry: ${d.interest}`;
  const text = [`Name: ${d.name}`, `Company: ${d.company}`, `Email: ${d.email}`, `Country: ${d.country}`, `Interested in: ${d.interest}`, "", "Problem statement:", d.problem].join("\n");
  return { to, subject, text, href: `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` };
}

export function LetsTalkForm() {
  const uid = useId();
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const watch = useRef<() => void>(() => {});

  useEffect(() => () => watch.current(), []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const fd = new FormData(e.currentTarget);
    const d = Object.fromEntries(Array.from(fd.entries()).map(([k, v]) => [k, String(v).trim()]));
    const errs = validate(d);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (e.currentTarget.elements.namedItem(Object.keys(errs)[0]!) as HTMLElement | null)?.focus();
      return;
    }
    const mail = compose(d);
    setStatus({ kind: "sending" });

    // Hand the enquiry to the email app, then confirm only if the browser actually
    // left the page for it (blur / hidden). Otherwise offer the copy fallback.
    window.setTimeout(() => {
      let handed = false;
      const done = () => (handed = true);
      window.addEventListener("blur", done, { once: true });
      document.addEventListener("visibilitychange", done, { once: true });
      const timer = window.setTimeout(() => {
        cleanup();
        setStatus(handed ? { kind: "sent", to: mail.to } : { kind: "failed", to: mail.to, text: `To: ${mail.to}\nSubject: ${mail.subject}\n\n${mail.text}` });
      }, 1600);
      const cleanup = () => {
        window.clearTimeout(timer);
        window.removeEventListener("blur", done);
        document.removeEventListener("visibilitychange", done);
      };
      watch.current = cleanup;
      try {
        window.location.href = mail.href;
      } catch {
        cleanup();
        setStatus({ kind: "failed", to: mail.to, text: `To: ${mail.to}\nSubject: ${mail.subject}\n\n${mail.text}` });
      }
    }, 450);
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    form.current?.reset();
    setErrors({});
    setStatus({ kind: "idle" });
  }

  const describe = (k: Field) => (errors[k] ? `${uid}-${k}-err` : undefined);
  const err = (k: Field) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="lt-err">
        {errors[k]}
      </p>
    ) : null;

  if (status.kind === "sent" || status.kind === "failed") {
    const ok = status.kind === "sent";
    return (
      <div className="lt-result" role="status" aria-live="polite">
        <span className={`lt-result-icon ${ok ? "is-ok" : "is-warn"}`} aria-hidden>
          {ok ? <Check className="size-5" /> : <TriangleAlert className="size-5" />}
        </span>
        <h3 className="lt-result-title">{ok ? "Your enquiry is ready to send." : "We couldn’t open your email app."}</h3>
        <p className="lt-result-body">
          {ok ? (
            <>
              Your email app has the enquiry addressed to <b>{status.to}</b>. Press send there and the right Purview team will pick it up.
            </>
          ) : (
            <>
              Nothing has been sent. Copy your enquiry and email it to <a href={`mailto:${status.to}`}>{status.to}</a>.
            </>
          )}
        </p>
        <div className="lt-result-actions">
          {!ok && (
            <button type="button" className="lt-submit" onClick={() => copy(status.text)}>
              {copied ? "Copied" : "Copy enquiry"} {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
            </button>
          )}
          <button type="button" className="lt-ghost" onClick={reset}>
            <RotateCcw aria-hidden className="size-4" /> New enquiry
          </button>
        </div>
      </div>
    );
  }

  const sending = status.kind === "sending";
  return (
    <form ref={form} noValidate onSubmit={onSubmit} className="lt-form" aria-describedby={`${uid}-note`} aria-busy={sending}>
      <div className="lt-row">
        <div data-lt-in className="lt-field">
          <label htmlFor={`${uid}-name`}>
            Name <span className="lt-req">required</span>
          </label>
          <input id={`${uid}-name`} name="name" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={describe("name")} />
          {err("name")}
        </div>
        <div data-lt-in className="lt-field">
          <label htmlFor={`${uid}-company`}>Company</label>
          <input id={`${uid}-company`} name="company" autoComplete="organization" placeholder="Organisation" />
        </div>
      </div>
      <div className="lt-row">
        <div data-lt-in className="lt-field">
          <label htmlFor={`${uid}-email`}>
            Email <span className="lt-req">required</span>
          </label>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={!!errors.email} aria-describedby={describe("email")} />
          {err("email")}
        </div>
        <div data-lt-in className="lt-field">
          <label htmlFor={`${uid}-country`}>Country</label>
          <input id={`${uid}-country`} name="country" autoComplete="country-name" placeholder="Where the work is" />
        </div>
      </div>

      <fieldset data-lt-in className="lt-field lt-chips">
        <legend>I am interested in</legend>
        <div className="lt-chip-row">
          {INTERESTS.map((i, k) => (
            <label key={i.v} className="lt-chip">
              <input type="radio" name="interest" value={i.v} defaultChecked={k === 0} />
              <span>{i.v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div data-lt-in className="lt-field">
        <label htmlFor={`${uid}-problem`}>
          The problem statement <span className="lt-req">required</span>
        </label>
        <textarea
          id={`${uid}-problem`}
          name="problem"
          rows={3}
          placeholder="The decision that has to be made, how fast, under what constraints and at what cost."
          aria-invalid={!!errors.problem}
          aria-describedby={describe("problem")}
        />
        {err("problem")}
      </div>

      <div data-lt-in className="lt-actions">
        <button type="submit" className="lt-submit" disabled={sending}>
          {sending ? (
            <>
              Preparing your email <LoaderCircle aria-hidden className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Send enquiry <ArrowUpRight aria-hidden className="size-4" />
            </>
          )}
        </button>
        <p id={`${uid}-note`} className="lt-note">
          Sending opens your email app with the enquiry addressed to the right Purview team. See our{" "}
          <Link href="/privacy-policy">privacy policy</Link>.
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {sending ? "Preparing your email." : ""}
      </p>
    </form>
  );
}
