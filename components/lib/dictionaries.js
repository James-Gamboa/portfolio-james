const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  return dictionaries[locale]?.() || dictionaries.en();
};

export const getDictionaryClient = async (locale) => {
  try {
    const dictionary = await import(`./dictionaries/${locale}.json`);
    return dictionary.default;
  } catch (error) {
    const fallback = await import("./dictionaries/en.json");
    return fallback.default;
  }
};
