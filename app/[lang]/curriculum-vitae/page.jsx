import { getPortfolioData } from "@/utils/data.js";
import ResumeTemplate from "@/components/templates/ResumeTemplate/page.jsx";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const dict = await import(`@/components/lib/dictionaries/${lang}.json`);

  return {
    title: dict.default.metadata.resume.title,
    description: dict.default.metadata.resume.description,
  };
}

export default async function CurriculumVitaePage({ params }) {
  const data = await getPortfolioData(params.lang).catch(() =>
    getPortfolioData("en"),
  );

  const dict = await import(
    `@/components/lib/dictionaries/${params.lang}.json`
  ).catch(() => import("@/components/lib/dictionaries/en.json"));

  return <ResumeTemplate lang={params.lang} dict={dict.default} data={data} />;
}
