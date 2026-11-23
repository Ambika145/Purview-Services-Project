import type { Metadata } from "next";
import { createElement } from "react";
import { SITE_URL } from "./routes";
import { CONTACT } from "@/content/site";

export const DEFAULT_OG = "/og/purview-og.jpg";

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: "Purview Services",
      locale: "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", site: "@purviewservices", title, description, images: [image] },
  };
}

/** Render a JSON-LD script. Content comes only from our own typed data. */
export function JsonLd({ data }: { data: object }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Purview Services",
    legalName: "Purview Services Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/purview-icon-512.png`,
    description:
      "Purview builds Gen AI and agentic applications and designs, builds and operates the AI data centres, networks and devices they run on.",
    foundingLocation: { "@type": "Place", name: "Edinburgh, Scotland" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "4 Redheughs Rigg, South Gyle",
      addressLocality: "Edinburgh",
      postalCode: "EH12 9DQ",
      addressCountry: "GB",
    },
    contactPoint: CONTACT.offices.map((o) => ({
      "@type": "ContactPoint",
      contactType: o.label,
      email: o.email,
      ...(o.phone ? { telephone: o.phone } : {}),
      areaServed: o.region,
    })),
    sameAs: CONTACT.social.map((s) => s.href),
    subOrganization: [{ "@type": "Organization", name: "Purview Data Centres", url: "https://purviewdc.com/" }],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Purview Services",
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { label: string; href?: string | null }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
}

export function serviceJsonLd({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    ...(serviceType ? { serviceType } : {}),
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function articleJsonLd({ title, description, path, date, image }: { title: string; description: string; path: string; date?: string | null; image?: string }) {
  const iso = date ? toIsoDate(date) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    ...(iso ? { datePublished: iso } : {}),
    author: { "@type": "Organization", name: "Purview Editorial Team" },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
  };
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
export function toIsoDate(d: string) {
  const m = d.match(/(\d{1,2}) (\w+) (\d{4})/);
  if (!m) return undefined;
  const mi = MONTHS.indexOf(m[2].toLowerCase());
  if (mi < 0) return undefined;
  return `${m[3]}-${String(mi + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}
