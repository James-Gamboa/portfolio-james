import { notFound } from "next/navigation";
import { getPortfolioData } from "@/utils/data.js";
import ResumeTemplate from "@/components/templates/ResumeTemplate/page.jsx";
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
    page: "resume",
    title: dict.metadata.resume.title,
    description: dict.metadata.resume.description,
  });
}

export default async function ResumePage({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const data = await getPortfolioData(lang);
  const dict = await loadDictionary(lang);

  return <ResumeTemplate lang={lang} dict={dict} data={data} />;
}
