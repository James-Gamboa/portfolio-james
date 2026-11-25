import { describe, expect, it } from "vitest";
import en from "@/components/lib/dictionaries/en.json";
import es from "@/components/lib/dictionaries/es.json";
import {
  buildDesktopNavLinks,
  buildMobileNavLinks,
  sectionHref,
} from "@/lib/nav";

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

describe("buildDesktopNavLinks", () => {
  for (const lang of ["en", "es"]) {
    it(`lists projects, about, resume and contact in order (${lang})`, () => {
      const dict = dicts[lang];
      const links = buildDesktopNavLinks({
        lang,
        dict,
        email: EMAIL,
        showResume: true,
      });
      expect(links.map((link) => link.label)).toEqual([
        dict.nav.projects,
        dict.nav.about,
        dict.nav.resume,
        dict.nav.contact,
      ]);
      expect(links[0].href).toBe(`/${lang}#${dict.sections.work}`);
      expect(links[1].href).toBe(`/${lang}#${dict.sections.about}`);
      expect(links.at(-1)).toMatchObject({ href: EMAIL, isMail: true });
    });
  }

  it("points the resume link to the localized resume route", () => {
    const en_ = buildDesktopNavLinks({ lang: "en", dict: en, email: EMAIL, showResume: true });
    const es_ = buildDesktopNavLinks({ lang: "es", dict: es, email: EMAIL, showResume: true });
    expect(en_.find((l) => l.label === en.nav.resume).href).toBe("/en/resume");
    expect(es_.find((l) => l.label === es.nav.resume).href).toBe("/es/curriculum-vitae");
  });

  it("omits the resume link when the resume is hidden", () => {
    const links = buildDesktopNavLinks({ lang: "en", dict: en, email: EMAIL, showResume: false });
    expect(links.map((l) => l.label)).not.toContain(en.nav.resume);
  });
});
