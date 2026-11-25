import { describe, expect, it } from "vitest";
import { buildHomeJsonLd } from "@/lib/jsonLd";
import data from "@/data/portfolio.json";

const build = (overrides = {}) =>
  buildHomeJsonLd({
    lang: "en",
    data,
    title: "Title",
    description: "Description",
    ...overrides,
  });

const types = (graph) => graph["@graph"].map((node) => node["@type"]);
const person = (graph) => graph["@graph"].find((n) => n["@type"] === "Person");

describe("buildHomeJsonLd", () => {
  it("contains WebSite, ProfilePage and Person", () => {
    expect(types(build())).toEqual(["WebSite", "ProfilePage", "Person"]);
  });

  it("adds FAQPage only when there are questions", () => {
    expect(types(build())).not.toContain("FAQPage");
    const graph = build({ faq: [{ q: "Q?", a: "A." }] });
    expect(types(graph)).toContain("FAQPage");
    const node = graph["@graph"].find((n) => n["@type"] === "FAQPage");
    expect(node.mainEntity).toHaveLength(1);
  });

  it("limits sameAs to LinkedIn and GitHub", () => {
    const sameAs = person(build()).sameAs;
    expect(sameAs.length).toBeGreaterThan(0);
    for (const url of sameAs) {
      expect(url).toMatch(/linkedin\.com|github\.com/);
    }
  });

  it("localizes the job title and language", () => {
    expect(person(build({ lang: "es" })).jobTitle).toMatch(/Desarrollador/);
    expect(build({ lang: "es" })["@graph"][0].inLanguage).toBe("es");
  });
});
