/** Max bullets shown per role on the home timeline. */
export const EXPERIENCE_BULLETS = 3;

// Cut a paragraph into sentences (the period must be followed by a space, so
// "Next.js" and "10+" are never split).
const toSentences = (text = "") =>
  text
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

/**
 * Timeline entries for the home page. Dates, role and company come from the
 * home dictionary; bullets and technologies come from the matching resume
 * experience (same order), falling back to the dictionary summary sentences.
 */
export function buildExperienceTimeline({
  items = [],
  resumeExperiences = [],
  max = EXPERIENCE_BULLETS,
}) {
  return items.map((item, index) => {
    const resume = resumeExperiences[index];
    const bullets = Array.isArray(resume?.bullets) && resume.bullets.length
      ? resume.bullets
      : toSentences(item.summary);
    return {
      dates: item.dates,
      role: item.role,
      company: item.company,
      bullets: bullets.slice(0, max),
      technologies: Array.isArray(resume?.technologies)
        ? resume.technologies
        : [],
    };
  });
}

/**
 * Splits "Provider: Course A, Course B" certification names into a title and
 * its courses. The Anthropic Academy group is flagged to be highlighted.
 */
export function splitCertification({ name, org, dates }) {
  const at = name.indexOf(": ");
  const title = at === -1 ? name : name.slice(0, at);
  const courses =
    at === -1
      ? []
      : name
          .slice(at + 2)
          .split(", ")
          .map((course) => course.trim())
          .filter(Boolean);
  return {
    title,
    courses,
    org,
    dates,
    highlighted: title.startsWith("Anthropic Academy"),
  };
}
