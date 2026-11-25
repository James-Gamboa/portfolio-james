import { describe, expect, it } from "vitest";
import en from "@/components/lib/dictionaries/en.json";
import es from "@/components/lib/dictionaries/es.json";
import enData from "@/data/portfolio.json";
import esData from "@/data/portfolio-es.json";
import { splitProjects } from "@/utils/clientProjects";
import { buildHeroFacts, buildHeroHeading } from "@/utils/hero";

const cases = [
  ["en", en, enData],
  ["es", es, esData],
];

describe("buildHeroFacts", () => {
  for (const [lang, dict, data] of cases) {
    it(`derives the client count from the client list (${lang})`, () => {
      const facts = buildHeroFacts({ projects: data.projects, dict });
      const clients = facts.find((fact) => fact.key === "clients");
      expect(clients.value).toBe(
        String(splitProjects(data.projects).client.length),
      );
      expect(Number(clients.value)).toBeGreaterThan(0);
    });

    it(`labels every fact from the dictionary (${lang})`, () => {
      const facts = buildHeroFacts({ projects: data.projects, dict });
      expect(facts.map((fact) => fact.key)).toEqual([
        "clients",
        "since",
        "stack",
        "languages",
      ]);
      for (const fact of facts) {
        expect(fact.label).toBe(dict.home.facts[fact.key]);
        expect(fact.value).toBeTruthy();
      }
    });
  }

  it("counts only client projects, not practice ones", () => {
    const facts = buildHeroFacts({
      projects: [{ title: "Savia" }, { title: "Pokedex" }, { title: "Aleste" }],
      dict: en,
    });
    expect(facts[0].value).toBe("2");
  });

  it("reports freelance since 2024 and the core stack", () => {
    const facts = buildHeroFacts({ projects: [], dict: en });
    expect(facts.find((f) => f.key === "since").value).toBe("2024");
    expect(facts.find((f) => f.key === "stack").value).toBe(
      "Next.js · React · TypeScript · Strapi · Shopify",
    );
  });
});

describe("buildHeroHeading", () => {
  it("splits the English greeting, name and role", () => {
    expect(buildHeroHeading(enData)).toEqual({
      greeting: "Hello 👋 I'm",
      name: "James Guevara Gamboa",
      role: "Frontend & Full Stack Developer",
    });
  });

  it("splits the Spanish greeting, name and role", () => {
    expect(buildHeroHeading(esData)).toEqual({
      greeting: "Hola 👋 Soy",
      name: "James Guevara Gamboa",
      role: "Desarrollador Frontend y Full Stack",
    });
  });

  it("falls back to the joined text when the name is not found", () => {
    expect(
      buildHeroHeading({
        name: "Ada",
        headerTaglineOne: "Hi",
        headerTaglineTwo: "Engineer",
      }),
    ).toEqual({ greeting: "", name: "Hi", role: "Engineer" });
  });
});
