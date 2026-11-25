import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";
import { SITE_URL } from "@/lib/seo";

describe("sitemap", () => {
  const entries = sitemap();

  it("lists home and resume for both locales", () => {
    expect(entries.map((entry) => entry.url).sort()).toEqual(
      [
        `${SITE_URL}/en`,
        `${SITE_URL}/es`,
        `${SITE_URL}/en/resume`,
        `${SITE_URL}/es/curriculum-vitae`,
      ].sort(),
    );
  });

  it("declares hreflang alternates on every entry", () => {
    for (const entry of entries) {
      expect(Object.keys(entry.alternates.languages).sort()).toEqual([
        "en",
        "es",
        "x-default",
      ]);
    }
  });

  it("never lists the removed editor route", () => {
    expect(entries.some((entry) => entry.url.includes("/edit"))).toBe(false);
  });
});

describe("robots", () => {
  const result = robots();

  it("allows everything and points to the sitemap", () => {
    expect(result.rules[0]).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("explicitly allows AI and search crawlers", () => {
    const bots = result.rules[1].userAgent;
    expect(bots).toContain("GPTBot");
    expect(bots).toContain("ClaudeBot");
  });
});
