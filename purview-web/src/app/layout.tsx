import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { JsonLd, organizationJsonLd, websiteJsonLd, DEFAULT_OG } from "@/lib/seo";
import { SITE_URL } from "@/lib/routes";

// Manrope is the existing brand typeface (display + body). IBM Plex Mono is the
// existing technical label face. Weights are limited to those actually used.
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Purview Services | AI Applications and AI Infrastructure",
    template: "%s | Purview Services",
  },
  description:
    "Purview builds Gen AI and agentic applications and designs, builds and operates the AI data centres, networks and devices they run on.",
  applicationName: "Purview Services",
  icons: {
    icon: [{ url: "/brand/purview-icon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/brand/purview-icon-180.png", sizes: "180x180" }],
  },
  openGraph: { siteName: "Purview Services", locale: "en_GB", type: "website", images: [DEFAULT_OG] },
  twitter: { card: "summary_large_image", site: "@purviewservices" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#0a1538",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal start-states only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
