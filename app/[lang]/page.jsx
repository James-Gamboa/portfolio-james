import { getPortfolioDataSync } from "@/utils/data.js";
import HomeTemplate from "@/components/templates/HomeTemplate/page.jsx";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  // Import normal del diccionario
  const dict = await import(`@/components/lib/dictionaries/${lang}.json`);

  return {
    title: dict.default.metadata.home.title,
    description: dict.default.metadata.home.description,
  };
}

export default async function HomePage({ params }) {
  const data = await getPortfolioDataSync(params.lang).catch(() =>
    getPortfolioDataSync("en"),
  );

  const dict = await import(
    `@/components/lib/dictionaries/${params.lang}.json`
  ).catch(() => import("@/components/lib/dictionaries/en.json"));

  return <HomeTemplate lang={params.lang} dict={dict.default} data={data} />;
}
