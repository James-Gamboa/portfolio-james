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
  const { lang } = await params;

  const data = await getPortfolioDataSync(lang).catch(() =>
    getPortfolioDataSync("en"),
  );

  const dict = await import(`@/components/lib/dictionaries/${lang}.json`).catch(
    () => import("@/components/lib/dictionaries/en.json"),
  );

  return <HomeTemplate lang={lang} dict={dict.default} data={data} />;
}
