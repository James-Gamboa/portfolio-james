import "../globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AppProviders from "@/components/providers/AppProviders";
import BaseTemplate from "@/components/templates/BaseTemplate/page.jsx";
import { LOCALES, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
};

// Single family for headings and body, self-hosted by next/font (no
// third-party request at runtime).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

// Only the supported locales exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport = {
  themeColor: "#0a0f1c",
  colorScheme: "dark",
};

// This is the root layout (there is no app/layout.jsx) so <html lang> can
// follow the locale segment.
export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`dark ${jakarta.variable}`}
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
