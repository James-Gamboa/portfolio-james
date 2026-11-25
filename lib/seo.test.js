import { describe, expect, it } from "vitest";
import {
  SITE_URL,
  buildPageMetadata,
  isLocale,
  languageAlternates,
  pagePath,
  pageUrl,
  serializeJsonLd,
} from "@/lib/seo";

describe("seo paths", () => {
  it("uses a localized resume slug", () => {
    expect(pagePath("en", "resume")).toBe("/en/resume");
    expect(pagePath("es", "resume")).toBe("/es/curriculum-vitae");
  });

  it("uses the bare locale for the home page", () => {
    expect(pagePath("en", "home")).toBe("/en");
    expect(pageUrl("es", "home")).toBe(`${SITE_URL}/es`);
  });

  it("lists both locales and x-default as alternates", () => {
    expect(languageAlternates("resume")).toEqual({
      en: "/en/resume",
      es: "/es/curriculum-vitae",
      "x-default": "/en/resume",
    });
  });

  it("recognizes only supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe("buildPageMetadata", () => {
  const meta = buildPageMetadata({
    lang: "es",
    page: "resume",
    title: "T",
    description: "D",
  });

  it("sets canonical and hreflang alternates", () => {
    expect(meta.alternates.canonical).toBe("/es/curriculum-vitae");
    expect(meta.alternates.languages["x-default"]).toBe("/en/resume");
  });

  it("marks the other locale as alternate in Open Graph", () => {
    expect(meta.openGraph.locale).toBe("es_CR");
    expect(meta.openGraph.alternateLocale).toEqual(["en_US"]);
  });

  it("adds profile names only for profile pages", () => {
    expect(meta.openGraph.firstName).toBeUndefined();
    const profile = buildPageMetadata({
      lang: "en",
      page: "home",
      title: "T",
      description: "D",
      type: "profile",
    });
    expect(profile.openGraph.firstName).toBe("James");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < so inline scripts cannot be closed early", () => {
    const out = serializeJsonLd({ a: "</script><b>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).a).toBe("</script><b>");
  });
});
