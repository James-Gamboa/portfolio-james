import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SkillChip from "@/components/atoms/SkillChip/page.jsx";
import { buildExperienceTimeline } from "@/utils/timeline";

/** Experience timeline; the full detail lives on the resume page. */
const ExperienceSection = ({ lang, dict, resume }) => {
  const experience = dict.home.experience;
  const resumePath = lang === "es" ? "curriculum-vitae" : "resume";
  const timeline = buildExperienceTimeline({
    items: experience.items,
    resumeExperiences: resume?.experiences,
  });

  return (
    <Reveal
      as="section"
      aria-labelledby="experience-heading"
      className="mt-24 laptop:mt-36"
    >
      <h2 id="experience-heading" className="section-title">
        {experience.title}.
      </h2>

      <ol className="relative mt-10 space-y-10 laptop:mt-14 laptop:space-y-12">
        {/* Timeline rail */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-brand-pink/70 via-white/15 to-transparent laptop:left-[calc(25%-5px)]"
        />
        {timeline.map((item, index) => (
          <li
            key={`${item.company}-${item.dates}`}
            className="relative pl-8 laptop:grid laptop:grid-cols-12 laptop:gap-10 laptop:pl-0"
          >
            <span
              aria-hidden
              className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-ink laptop:left-[calc(25%-8px)] ${
                index === 0
                  ? "bg-brand-gradient shadow-[0_0_18px_rgb(var(--brand-pink)/0.7)]"
                  : "bg-content-subtle"
              }`}
            />
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-content-muted laptop:col-span-3 laptop:pt-1 laptop:text-right">
              {item.dates}
            </p>
            <div className="mt-2 laptop:col-span-9 laptop:mt-0 laptop:pl-6">
              <h3 className="font-display text-2xl text-content tablet:text-3xl">
                {item.role}
              </h3>
              <p className="mt-1 text-base font-medium text-content-muted">
                {item.company}
              </p>
              <ul className="mt-4 max-w-3xl space-y-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative pl-5 text-base leading-relaxed text-content-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-brand-pink"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
              {item.technologies.length > 0 ? (
                <div
                  className="mt-4 flex flex-wrap gap-1.5"
                  role="list"
                  aria-label={experience.title}
                >
                  {item.technologies.map((tech) => (
                    <SkillChip key={tech} variant="secondary">
                      {tech}
                    </SkillChip>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <Link
        href={`/${lang}/${resumePath}`}
        className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-base font-medium text-content transition-colors hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
      >
        {experience.fullResume}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Reveal>
  );
};

export default ExperienceSection;
