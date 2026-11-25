import { LOCALES, SITE_URL, languageAlternates, pageUrl } from "@/lib/seo";

const PAGES = ["home", "resume"];

export default function sitemap() {
  return PAGES.flatMap((page) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(page)).map(([code, path]) => [
        code,
        `${SITE_URL}${path}`,
      ]),
    );

    return LOCALES.map((lang) => ({
      url: pageUrl(lang, page),
      changeFrequency: "monthly",
      priority: page === "home" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
