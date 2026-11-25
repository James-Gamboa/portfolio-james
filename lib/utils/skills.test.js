import { describe, expect, it } from "vitest";
import { buildSkillsDisplay } from "@/utils/buildSkillsDisplay";
import { parseTechnologies } from "@/utils/parseTechnologies";

describe("parseTechnologies", () => {
  it("splits and trims comma-separated strings", () => {
    expect(parseTechnologies(" React , Next.js,, ")).toEqual([
      "React",
      "Next.js",
    ]);
  });

  it("normalizes arrays and empty input", () => {
    expect(parseTechnologies([" a ", "", "b"])).toEqual(["a", "b"]);
    expect(parseTechnologies(undefined)).toEqual([]);
  });
});

describe("buildSkillsDisplay", () => {
  it("normalizes Shopify Liquid into a single Shopify entry", () => {
    const { groups } = buildSkillsDisplay(
      { cmsEcommerce: ["Shopify Liquid", "Strapi"] },
      {},
    );
    const cms = groups.find((group) => group.key === "cmsCommerce");
    expect(cms.items).toEqual(["Shopify", "Strapi"]);
  });

  it("drops SQL when MySQL is present", () => {
    const { groups } = buildSkillsDisplay(
      { databases: ["SQL", "MySQL"], frameworks: ["Express"] },
      {},
    );
    const backend = groups.find((group) => group.key === "backendData");
    expect(backend.items).toEqual(["Express", "MySQL"]);
  });

  it("excludes the primary stack from the other groups", () => {
    const { groups, primaryStack } = buildSkillsDisplay(
      { primaryStack: ["React"], languages: ["React", "Sass"] },
      {},
    );
    expect(primaryStack).toEqual(["React"]);
    expect(groups.find((g) => g.key === "coreFrontend").items).toEqual([
      "Sass",
    ]);
  });
});
