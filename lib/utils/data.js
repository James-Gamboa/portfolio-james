export async function getPortfolioData(locale) {
  try {
    if (locale === "es") {
      const data = await import("@/data/portfolio-es.json");
      return data.default;
    } else {
      const data = await import("@/data/portfolio.json");
      return data.default;
    }
  } catch (error) {
    console.error(`Error loading portfolio data for locale: ${locale}`, error);
    const fallback = await import("@/data/portfolio.json");
    return fallback.default;
  }
}

export function getPortfolioDataSync(locale) {
  if (locale === "es") {
    return import("@/data/portfolio-es.json").then((data) => data.default);
  } else {
    return import("@/data/portfolio.json").then((data) => data.default);
  }
}
