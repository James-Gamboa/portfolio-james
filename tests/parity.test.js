import { describe, expect, it } from "vitest";
import enDict from "@/components/lib/dictionaries/en.json";
import esDict from "@/components/lib/dictionaries/es.json";
import enData from "@/data/portfolio.json";
import esData from "@/data/portfolio-es.json";

// Key paths of a JSON tree. Arrays are collapsed to "[]" plus the union of
// their item keys, so lists of different lengths still compare structurally.
function keyPaths(value, prefix = "") {
  if (Array.isArray(value)) {
    const inner = value.flatMap((item) => keyPaths(item, `${prefix}[]`));
    return inner.length ? inner : [`${prefix}[]`];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      keyPaths(item, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

const unique = (paths) => [...new Set(paths)].sort();

describe("dictionary parity", () => {
  it("has identical key trees in en and es", () => {
    expect(unique(keyPaths(esDict))).toEqual(unique(keyPaths(enDict)));
  });
});

describe("portfolio data parity", () => {
  it("has identical top-level keys", () => {
    expect(Object.keys(esData).sort()).toEqual(Object.keys(enData).sort());
  });

  it("has the same project ids in the same order", () => {
    expect(esData.projects.map((p) => p.id)).toEqual(
      enData.projects.map((p) => p.id),
    );
    expect(enData.projects.length).toBeGreaterThan(0);
  });

  it("has unique project ids", () => {
    const ids = enData.projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("shares project images across locales", () => {
    esData.projects.forEach((project, i) => {
      expect(project.imageSrc).toBe(enData.projects[i].imageSrc);
    });
  });
});
