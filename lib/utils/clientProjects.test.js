import { describe, expect, it } from "vitest";
import { splitProjects } from "@/utils/clientProjects";
import { getProjectMeta } from "@/utils/getProjectMeta";
import en from "@/data/portfolio.json";
import es from "@/data/portfolio-es.json";

describe("splitProjects", () => {
  for (const [lang, data] of [
    ["en", en],
    ["es", es],
  ]) {
    it(`keeps every project exactly once (${lang})`, () => {
      const { client, other } = splitProjects(data.projects);
      expect(client.length + other.length).toBe(data.projects.length);
      const ids = [...client, ...other].map((p) => p.id);
      expect(new Set(ids).size).toBe(data.projects.length);
    });
  }

  it("splits the same project ids in both locales", () => {
    const ids = (data) => splitProjects(data.projects).client.map((p) => p.id);
    expect(ids(es)).toEqual(ids(en));
  });

  it("orders client work by the curated list", () => {
    const { client } = splitProjects([
      { title: "Savia" },
      { title: "Avenida Escazu" },
      { title: "Something else" },
    ]);
    expect(client.map((p) => p.title)).toEqual(["Avenida Escazu", "Savia"]);
  });

  it("treats Contraluz as client work, listed after the other client projects", () => {
    for (const data of [en, es]) {
      const { client, other } = splitProjects(data.projects);
      expect(client.at(-1).title).toBe("Contraluz");
      expect(other.some((p) => p.title === "Contraluz")).toBe(false);
      expect(client).toHaveLength(14);
      expect(other).toHaveLength(data.projects.length - 14);
    }
  });

  it("points Contraluz to its real domain in both locales", () => {
    for (const data of [en, es]) {
      const project = data.projects.find((p) => p.title === "Contraluz");
      expect(project.url).toBe("https://contraluz.cr");
    }
  });

  it("tags Contraluz as a Shopify e-commerce store in both locales", () => {
    for (const [lang, data] of [
      ["en", en],
      ["es", es],
    ]) {
      const project = data.projects.find((p) => p.title === "Contraluz");
      const meta = getProjectMeta(project, lang);
      expect(meta.categoryKey).toBe("ecommerce");
      expect(meta.tags).toEqual(["Shopify", "Liquid"]);
    }
  });

  it("returns empty groups without input", () => {
    expect(splitProjects()).toEqual({ client: [], other: [] });
  });
});
