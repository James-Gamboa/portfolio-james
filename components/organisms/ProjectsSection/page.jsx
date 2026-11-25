"use client";

import WorkCard from "@/components/molecules/WorkCard/page.jsx";
import { splitProjects } from "@/lib/utils/clientProjects";

const ProjectsSection = ({ projects = [], dict, lang }) => {
  const projectDict = dict?.projects ?? {};
  const groupDict = dict?.home?.projects ?? {};
  const { client, other } = splitProjects(projects);

  const cardLabels = {
    viewProject: projectDict.viewProject,
    explore: projectDict.explore,
    stackLabel: projectDict.stackLabel,
    imageAlt: projectDict.imageAlt,
  };

  return (
    <section
      aria-labelledby="projects-heading"
      className="relative mt-10 w-full min-w-0 overflow-x-clip py-2 laptop:mt-24 laptop:py-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 h-48 w-32 rounded-full bg-violet-500/10 blur-3xl mob:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 left-0 h-40 w-32 rounded-full bg-cyan-500/10 blur-3xl mob:w-40"
      />

      <header
        data-reveal=""
        className="relative mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 laptop:mb-10 laptop:flex-row laptop:items-end laptop:justify-between"
      >
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
            {projectDict.eyebrow}
          </p>
          <h2
            id="projects-heading"
            className="text-2xl font-bold tracking-tight text-white laptop:text-4xl"
          >
            {projectDict.title}.
          </h2>
          <p className="text-sm leading-relaxed text-white/55 laptop:text-base">
            {projectDict.subtitle}
          </p>
        </div>

        <div className="laptop:shrink-0">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/55">
              {projectDict.statStack}
            </p>
            <p className="mt-1 text-sm font-medium text-white/80">
              {projectDict.statStackItems}
            </p>
          </div>
        </div>
      </header>

      <div className="relative">
        <h3 className="text-xl font-semibold text-white laptop:text-2xl">
          {groupDict.clientTitle}
        </h3>
        <p className="mt-1 mb-6 text-base text-white/70">
          {groupDict.clientIntro}
        </p>
        <ul className="project-grid grid w-full min-w-0 grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-6 laptop:gap-6">
          {client.map((project, index) => (
            <li key={project.id} className="h-full min-w-0 laptop:col-span-2">
              <WorkCard
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                url={project.url}
                index={index}
                lang={lang}
                labels={cardLabels}
                category={project.category}
                tags={project.tags}
                excerpt={project.excerpt}
              />
            </li>
          ))}
        </ul>
      </div>

      {other.length > 0 && (
        <div className="relative mt-14">
          <h3 className="text-xl font-semibold text-white laptop:text-2xl">
            {groupDict.otherTitle}
          </h3>
          <p className="mt-1 mb-6 text-base text-white/70">
            {groupDict.otherIntro}
          </p>
          <ul className="project-grid grid w-full min-w-0 grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-6 laptop:gap-6">
            {other.map((project, index) => (
              <li key={project.id} className="h-full min-w-0 laptop:col-span-2">
                <WorkCard
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  url={project.url}
                  index={index + client.length}
                  lang={lang}
                  labels={cardLabels}
                  category={project.category}
                  tags={project.tags}
                  excerpt={project.excerpt}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
