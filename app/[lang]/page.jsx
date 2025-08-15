import { getDictionary } from "@/components/lib/dictionaries";
import { getPortfolioDataSync } from "@/utils/data.js";
import HomeTemplate from "@/components/templates/HomeTemplate/page.jsx";

export default async function HomePage({ params }) {
  const [dict, data] = await Promise.all([
    getDictionary(params.lang),
    getPortfolioDataSync(params.lang).catch(() => getPortfolioDataSync("en")),
  ]);

  return <HomeTemplate lang={params.lang} dict={dict} data={data} />;
}
