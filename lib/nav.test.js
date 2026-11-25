import { describe, expect, it } from "vitest";
import en from "@/components/lib/dictionaries/en.json";
import es from "@/components/lib/dictionaries/es.json";
import { buildMobileNavLinks, sectionHref } from "@/lib/nav";

const dicts = { en, es };
const EMAIL = "mailto:jjguevarag@gmail.com";

describe("sectionHref", () => {
  it("builds anchors from the localized section ids", () => {
    expect(sectionHref("en", en, "work")).toBe("/en#work");
    expect(sectionHref("es", es, "work")).toBe("/es#trabajo");
    expect(sectionHref("es", es, "about")).toBe("/es#sobre-mi");
  });

  it("falls back to the key when the dictionary has no section id", () => {
    expect(sectionHref("en", {}, "about")).toBe("/en#about");
  });
});

describe("buildMobileNavLinks", () => {
  for (const lang of ["en", "es"]) {
    it(`points every section link to a real section id (${lang})`, () => {
      const dict = dicts[lang];
      const links = buildMobileNavLinks({ lang, dict, email: EMAIL });
      const hashes = links
        .filter((link) => link.href.includes("#"))
        .map((link) => link.href.split("#")[1]);
      expect(hashes).toEqual([dict.sections.about, dict.sections.work]);
    });

    it(`labels links from the dictionary (${lang})`, () => {
      const dict = dicts[lang];
      const links = buildMobileNavLinks({ lang, dict, email: EMAIL });
      expect(links.map((link) => link.label)).toEqual([
        dict.nav.home,
        dict.nav.about,
        dict.nav.projects,
        dict.nav.contact,
      ]);
    });
  }

  it("marks the email link as a mail link", () => {
    const links = buildMobileNavLinks({ lang: "en", dict: en, email: EMAIL });
    expect(links.at(-1)).toMatchObject({ href: EMAIL, isMail: true });
  });
});
