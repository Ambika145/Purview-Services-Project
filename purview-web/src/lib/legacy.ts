import "server-only";
import fs from "node:fs";
import path from "node:path";
import { BESPOKE, LEGACY_TO_NEW } from "./routes";

/** Content blocks extracted verbatim from the current site (scripts/extract-content.py). */
export type LinkItem = { label: string; href: string | null; external?: boolean };
export type Block =
  | { type: "heading"; level: number; eyebrow: string; text: string }
  | { type: "text"; text: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "cards"; variant?: "compact"; items: { title: string; eyebrow?: string; body: string; links?: LinkItem[] }[] }
  | { type: "list"; variant?: "outcomes"; items: { title: string; body: string }[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "table"; rows: string[][] }
  | { type: "case"; eyebrow: string; title: string; body: string; result: { value: string; label: string } | null; links: LinkItem[] }
  | { type: "logos"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "links"; items: LinkItem[] };

export type LegacyPage = {
  source: string;
  route: string;
  template: "service" | "editorial" | "article";
  title: string;
  description: string;
  crumbs: { label: string; href: string | null }[];
  eyebrow: string;
  h1: string;
  lede: string | null;
  actions: LinkItem[];
  image: string | null;
  related: { label: string; href: string }[];
  cta: string | null;
  blocks: Block[];
  byline?: string;
  date?: string | null;
  readTime?: string | null;
};

const DIR = path.join(process.cwd(), "src/content/legacy");

const cache = new Map<string, LegacyPage>();

export function getLegacy(name: string): LegacyPage | null {
  if (cache.has(name)) return cache.get(name)!;
  const file = path.join(DIR, `${name}.json`);
  if (!/^[a-z0-9-]+$/.test(name) || !fs.existsSync(file)) return null;
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as LegacyPage;
  cache.set(name, data);
  return data;
}

export function legacyIndex(): Record<string, { route: string; template: string; title: string; h1: string }> {
  return JSON.parse(fs.readFileSync(path.join(DIR, "_index.json"), "utf8"));
}

/** Slugs rendered by the generic legacy template at /<slug>. */
export function genericSlugs(): string[] {
  return Object.keys(legacyIndex()).filter((s) => !BESPOKE.has(s) && !(s in LEGACY_TO_NEW) && !s.startsWith("blog-"));
}

export const ARTICLES = [
  "blog-why-the-agent-needs-the-floor",
  "blog-agentic-ai-governed-workflows",
  "blog-preparation-first-gpu-deployment",
  "blog-managed-services-ai-era",
] as const;

export function articleSlug(legacy: string) {
  return legacy.replace(/^blog-/, "");
}
