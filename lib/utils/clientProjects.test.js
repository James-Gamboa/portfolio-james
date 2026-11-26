import { describe, expect, it } from "vitest";
import {
  FEATURED_COUNT,
  pickFeatured,
  projectHost,
  splitProjects,
} from "@/utils/clientProjects";
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
      expect(client).toHaveLength(21);
      expect(other).toHaveLength(data.projects.length - 21);
    }
  });

  it("points Contraluz to its real domain in both locales", () => {
    for (const data of [en, es]) {
      const project = data.projects.find((p) => p.title === "Contraluz");
      expect(project.url).toBe("https://contraluz.cr");
    }
  });

  it("points Novus ERP to its production domain per locale", () => {
    for (const [data, locale] of [[en, "en"], [es, "es"]]) {
      const project = data.projects.find((p) => p.title === "Novus ERP");
      expect(project.url).toBe(`https://www.novussoftware.la/${locale}`);
    }
  });

  it("points Plaza Tempo to its production domain per locale", () => {
    for (const [data, locale] of [[en, "en"], [es, "es"]]) {
      const project = data.projects.find((p) => p.title === "Plaza Tempo");
      expect(project.url).toBe(`https://www.plazatempo.com/${locale}`);
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

describe("pickFeatured", () => {
  const items = ["a", "b", "c", "d", "e"].map((id) => ({ id }));

  it("features the first FEATURED_COUNT client projects, keeping the rest in order", () => {
    const { featured, rest } = pickFeatured(items);
    expect(FEATURED_COUNT).toBe(3);
    expect(featured.map((p) => p.id)).toEqual(["a", "b", "c"]);
    expect(rest.map((p) => p.id)).toEqual(["d", "e"]);
  });

  it("never duplicates or drops a project", () => {
    const { featured, rest } = pickFeatured(items, 2);
    expect([...featured, ...rest]).toEqual(items);
  });

  it("handles fewer projects than the featured count and empty input", () => {
    expect(pickFeatured(items.slice(0, 2))).toEqual({
      featured: items.slice(0, 2),
      rest: [],
    });
    expect(pickFeatured()).toEqual({ featured: [], rest: [] });
  });

  for (const [lang, data] of [
    ["en", en],
    ["es", es],
  ]) {
    it(`features the same top three real client projects (${lang})`, () => {
      const { client } = splitProjects(data.projects);
      const { featured, rest } = pickFeatured(client);
      expect(featured.map((p) => p.title)).toEqual([
        "Avenida Escazu",
        "Escazu Village",
        "Plaza Tempo",
      ]);
      expect(rest.length).toBe(client.length - 3);
    });
  }
});

describe("projectHost", () => {
  it("returns the bare hostname of a project url", () => {
    expect(projectHost("https://www.escazuvillage.com/en")).toBe(
      "escazuvillage.com",
    );
    expect(projectHost("https://novussoftware.la/es")).toBe("novussoftware.la");
  });

  it("returns an empty string for missing or invalid urls", () => {
    expect(projectHost("")).toBe("");
    expect(projectHost("not a url")).toBe("");
    expect(projectHost()).toBe("");
  });

  it("resolves a host for every real project", () => {
    for (const project of en.projects) {
      expect(projectHost(project.url)).not.toBe("");
    }
  });
});
