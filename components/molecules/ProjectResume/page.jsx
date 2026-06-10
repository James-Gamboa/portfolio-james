"use client";
import SkillChip from "@/components/atoms/SkillChip/page.jsx";
import FeaturedProjectCard from "@/components/molecules/FeaturedProjectCard/page.jsx";
import { parseTechnologies } from "@/lib/utils/parseTechnologies";

const ProjectResume = ({
  dates,
  type,
  position,
  summary,
  bullets,
  technologies,
  featuredProjects,
  featuredProjectsLabel = "Featured Projects",
}) => {
  const bulletsLocal = Array.isArray(bullets)
    ? bullets
    : typeof bullets === "string"
      ? bullets.split(",")
      : [];

  const techItems = parseTechnologies(technologies);

  return (
    <article className="mt-6 border-l-2 border-white/20 pl-4 tablet:pl-5">
      <div className="flex w-full min-w-0 flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-6">
        <div className="w-full shrink-0 tablet:w-[34%] tablet:max-w-[220px]">
          <p className="text-sm font-medium text-white/90">{dates}</p>
          <p className="mt-0.5 text-xs uppercase tracking-wide text-white/50">
            {type}
          </p>
        </div>

        <div className="min-w-0 w-full flex-1 space-y-3">
          <h2 className="text-base font-bold leading-snug text-white laptop:text-lg">
            {position}
          </h2>

          {summary ? (
            <p className="text-sm leading-relaxed text-white/70">{summary}</p>
          ) : null}

          {techItems.length > 0 ? (
            <div
              className="flex flex-wrap gap-1.5"
              role="list"
              aria-label="Role technologies"
            >
              {techItems.map((tech) => (
                <SkillChip key={tech} variant="primary">
                  {tech}
                </SkillChip>
              ))}
            </div>
          ) : null}

          {bulletsLocal.length > 0 ? (
            <ul className="space-y-1.5">
              {bulletsLocal.map((bullet, index) => (
                <li
                  key={index}
                  className="relative pl-4 text-sm leading-relaxed text-white/75 before:absolute before:left-0 before:top-[0.55rem] before:h-1 before:w-1 before:rounded-full before:bg-white/40"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}

          {featuredProjects && featuredProjects.length > 0 ? (
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/80">
                {featuredProjectsLabel}
              </h3>
              <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2">
                {featuredProjects.map((project, index) => {
                  if (typeof project === "string") {
                    return <FeaturedProjectCard key={index} title={project} />;
                  }

                  return (
                    <FeaturedProjectCard
                      key={project.title || index}
                      title={project.title}
                      description={project.description}
                      technologies={project.technologies}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProjectResume;
