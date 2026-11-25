import "../globals.css";
import { Hind, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AppProviders from "@/components/providers/AppProviders";
import BaseTemplate from "@/components/templates/BaseTemplate/page.jsx";
import { LOCALES, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
};

const hind = Hind({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-hind",
});

// Display serif echoes the serif JG monogram; used for the name and section
// titles only. Self-hosted by next/font (no third-party request at runtime).
const display = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

// Only the supported locales exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport = {
  themeColor: "#07070b",
  colorScheme: "dark",
};

// This is the root layout (there is no app/layout.jsx) so <html lang> can
// follow the locale segment.
export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`dark ${hind.variable} ${display.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <AppProviders>
          <BaseTemplate>{children}</BaseTemplate>
        </AppProviders>
        {/* Cookie-less; the script only exists on Vercel deployments. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
