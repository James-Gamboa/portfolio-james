import "../globals.css";
import { Hind } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import BaseTemplate from "@/components/templates/BaseTemplate/page.jsx";
import { LOCALES } from "@/lib/seo";

const hind = Hind({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-hind",
});

// Only the supported locales exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// This is the root layout (there is no app/layout.jsx) so <html lang> can
// follow the locale segment.
export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`dark ${hind.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <AppProviders>
          <BaseTemplate>{children}</BaseTemplate>
        </AppProviders>
      </body>
    </html>
  );
}
