import { getDictionary } from "@/components/lib/dictionaries";
import { getPortfolioData } from "@/utils/data.js";
import ResumeTemplate from "@/components/templates/ResumeTemplate/page.jsx";

export default async function CurriculumVitaePage({ params }) {
  const [dict, data] = await Promise.all([
    getDictionary(params.lang),
    getPortfolioData(params.lang).catch(() => getPortfolioData("en")),
  ]);

  return <ResumeTemplate lang={params.lang} dict={dict} data={data} />;
}
