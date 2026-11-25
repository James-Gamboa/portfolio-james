import { describe, expect, it } from "vitest";
import { CARD_ACCENTS, getProjectMeta } from "@/utils/getProjectMeta";
import en from "@/data/portfolio.json";
import es from "@/data/portfolio-es.json";

const CATEGORY_KEYS = [
  "webPlatform",
  "realEstate",
  "ecommerce",
  "gaming",
  "communityPlatform",
  "product",
  "experiment",
];

describe("project category data", () => {
  it("declares an explicit, known category on every project in both locales", () => {
    for (const data of [en, es]) {
      for (const project of data.projects) {
        expect(CATEGORY_KEYS, `${project.id} ${project.title}`).toContain(
          project.category,
        );
      }
    }
  });

  it("uses the same category for each id in en and es", () => {
    es.projects.forEach((project, i) => {
      expect(project.id).toBe(en.projects[i].id);
      expect(project.category, `${project.id} ${project.title}`).toBe(
        en.projects[i].category,
      );
    });
  });

  it("resolves the same categoryKey for each id in en and es", () => {
    es.projects.forEach((project, i) => {
      expect(getProjectMeta(project, "es", i).categoryKey).toBe(
        getProjectMeta(en.projects[i], "en", i).categoryKey,
      );
    });
  });
});

describe("getProjectMeta", () => {
  it("does not guess the category from prose when it is explicit", () => {
    const meta = getProjectMeta(
      {
        title: "Shopify store",
        description: "A Shopify ecommerce tienda",
        category: "experiment",
      },
      "en",
    );
    expect(meta.categoryKey).toBe("experiment");
    expect(meta.category).toBe("Experiment");
  });

  it("localizes only the label, not the key", () => {
    const project = { title: "x", description: "y", category: "realEstate" };
    expect(getProjectMeta(project, "en").category).toBe("Real Estate");
    expect(getProjectMeta(project, "es").category).toBe("Inmobiliario");
    expect(getProjectMeta(project, "es").categoryKey).toBe("realEstate");
  });

  it("returns tags, an accent and an image position", () => {
    const meta = getProjectMeta(en.projects[0], "en", 7);
    expect(meta.tags.length).toBeGreaterThan(0);
    expect(meta.accent).toBe(CARD_ACCENTS[7 % CARD_ACCENTS.length]);
    expect(meta.imagePosition).toMatch(/^object-/);
  });

  it("returns tags for every project", () => {
    for (const data of [en, es]) {
      data.projects.forEach((project, i) => {
        expect(getProjectMeta(project, "en", i).tags.length).toBeGreaterThan(0);
      });
    }
  });
});
