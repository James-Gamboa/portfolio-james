import { describe, expect, it } from "vitest";
import en from "@/components/lib/dictionaries/en.json";
import es from "@/components/lib/dictionaries/es.json";
import enData from "@/data/portfolio.json";
import esData from "@/data/portfolio-es.json";
import {
  EXPERIENCE_BULLETS,
  buildExperienceTimeline,
  splitCertification,
} from "@/utils/timeline";

const cases = [
  ["en", en, enData],
  ["es", es, esData],
];

describe("buildExperienceTimeline", () => {
  for (const [lang, dict, data] of cases) {
    it(`keeps dates, role and company from the dictionary (${lang})`, () => {
      const timeline = buildExperienceTimeline({
        items: dict.home.experience.items,
        resumeExperiences: data.resume.experiences,
      });
      expect(timeline).toHaveLength(dict.home.experience.items.length);
      timeline.forEach((entry, i) => {
        const source = dict.home.experience.items[i];
        expect(entry.dates).toBe(source.dates);
        expect(entry.role).toBe(source.role);
        expect(entry.company).toBe(source.company);
      });
    });

    it(`gives every entry 2-3 bullets and tech from the resume (${lang})`, () => {
      const timeline = buildExperienceTimeline({
        items: dict.home.experience.items,
        resumeExperiences: data.resume.experiences,
      });
      for (const entry of timeline) {
        expect(entry.bullets.length).toBeGreaterThanOrEqual(2);
        expect(entry.bullets.length).toBeLessThanOrEqual(EXPERIENCE_BULLETS);
        expect(entry.technologies.length).toBeGreaterThan(0);
      }
    });
  }

  it("falls back to the summary sentences when resume data is missing", () => {
    const timeline = buildExperienceTimeline({
      items: [
        {
          role: "R",
          company: "C",
          dates: "D",
          summary: "First thing. Second thing. Third thing. Fourth thing.",
        },
      ],
      resumeExperiences: [],
    });
    expect(timeline[0].bullets).toEqual([
      "First thing.",
      "Second thing.",
      "Third thing.",
    ]);
    expect(timeline[0].technologies).toEqual([]);
  });
});

describe("splitCertification", () => {
  it("groups a provider with its courses (Anthropic Academy)", () => {
    const [anthropic] = en.home.credentials.certifications;
    const cert = splitCertification(anthropic);
    expect(cert.title).toBe("Anthropic Academy");
    expect(cert.courses).toHaveLength(7);
    expect(cert.courses).toContain("AI Fluency: Framework & Foundations");
    expect(cert.highlighted).toBe(true);
    expect(cert.dates).toBe("May 2026");
  });

  it("keeps plain certifications as-is", () => {
    const cert = splitCertification({
      name: "Universidad HTML",
      org: "Udemy",
      dates: "Dec 2021",
    });
    expect(cert).toEqual({
      title: "Universidad HTML",
      courses: [],
      org: "Udemy",
      dates: "Dec 2021",
      highlighted: false,
    });
  });

  it("highlights only the Anthropic group across both locales", () => {
    for (const dict of [en, es]) {
      const flags = dict.home.credentials.certifications.map(
        (c) => splitCertification(c).highlighted,
      );
      expect(flags.filter(Boolean)).toHaveLength(1);
      expect(flags[0]).toBe(true);
    }
  });
});
