import type { Metadata } from "next";
import NotFound from "../not-found";

/** Target of the 404 rewrite in src/proxy.ts. Not linked or indexed. */
export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFoundPage() {
  return <NotFound />;
}
