import { NextResponse, type NextRequest } from "next/server";
import legacyIndex from "@/content/legacy/_index.json";
import { BESPOKE, LEGACY_TO_NEW } from "@/lib/routes";

/**
 * Return a real HTTP 404 for unknown pages.
 *
 * With Cache Components, a dynamic route streams its prerendered shell with a
 * 200 before `notFound()` runs (the streamed 404 page carries `noindex`).
 * Checking the path here, before rendering starts, gives crawlers and
 * analytics a true 404. Known routes pass straight through.
 */
const STATIC_ROUTES = new Set([
  "/",
  "/tech",
  "/data-centre",
  "/workforce",
  "/company",
  "/contact",
  "/industries",
  "/our-work",
  "/insights",
  "/locations",
  "/products",
  "/not-found-page",
]);

const GENERIC = new Set(
  Object.keys(legacyIndex)
    .filter((s) => !BESPOKE.has(s) && !(s in LEGACY_TO_NEW) && !s.startsWith("blog-"))
    .map((s) => `/${s}`),
);

const ARTICLES = new Set(
  Object.keys(legacyIndex)
    .filter((s) => s.startsWith("blog-"))
    .map((s) => `/insights/${s.replace(/^blog-/, "")}`),
);

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  if (STATIC_ROUTES.has(path) || GENERIC.has(path) || ARTICLES.has(path)) return NextResponse.next();
  // Serve the designed not-found page with a real 404 status.
  // (A rewrite would keep the rendered page's own 200.)
  try {
    const page = await fetch(new URL("/not-found-page", request.url), { headers: { accept: "text/html" } });
    return new NextResponse(page.body, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex", "cache-control": "no-store" },
    });
  } catch {
    return new NextResponse("Page not found", { status: 404, headers: { "x-robots-tag": "noindex" } });
  }
}

export const config = {
  // Page paths only: skip Next internals, metadata files and anything with a file extension.
  // Legacy *.html / *.php URLs have extensions, so they reach the redirects in next.config.ts.
  matcher: ["/((?!_next/|api/|sitemap.xml|robots.txt|.*\\.[a-zA-Z0-9]+$).*)"],
};
