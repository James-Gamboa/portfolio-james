import { describe, expect, it } from "vitest";
import { splitProjects } from "@/utils/clientProjects";
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

  it("returns empty groups without input", () => {
    expect(splitProjects()).toEqual({ client: [], other: [] });
  });
});
