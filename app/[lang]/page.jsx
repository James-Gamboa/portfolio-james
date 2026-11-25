import { notFound } from "next/navigation";
import { getPortfolioDataSync } from "@/utils/data.js";
import HomeTemplate from "@/components/templates/HomeTemplate/page.jsx";
import JsonLd from "@/components/seo/JsonLd";
import { buildHomeJsonLd } from "@/lib/jsonLd";
import { buildPageMetadata, isLocale } from "@/lib/seo";

async function loadDictionary(lang) {
  const dict = await import(`@/components/lib/dictionaries/${lang}.json`);
  return dict.default;
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = await loadDictionary(lang);

  return buildPageMetadata({
    lang,
    page: "home",
    type: "profile",
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
  });
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const data = await getPortfolioDataSync(lang).catch(() =>
    getPortfolioDataSync("en"),
  );
  const dict = await loadDictionary(lang);

  return (
    <>
      <JsonLd
        data={buildHomeJsonLd({
          lang,
          data,
          title: dict.metadata.home.title,
          description: dict.metadata.home.description,
          faq: dict.home.faq.items,
        })}
      />
      <HomeTemplate lang={lang} dict={dict} data={data} />
    </>
  );
}
