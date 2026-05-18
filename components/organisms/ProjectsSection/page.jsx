"use client";

import WorkCard from "@/components/molecules/WorkCard/page.jsx";

const ProjectsSection = ({ projects = [], dict, lang }) => {
  const projectDict = dict?.projects ?? {};
  const count = projects.length;

  const cardLabels = {
    viewProject: projectDict.viewProject,
    explore: projectDict.explore,
    stackLabel: projectDict.stackLabel,
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
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

        <div className="flex flex-wrap gap-3 laptop:shrink-0">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/40">
              {projectDict.statProjects}
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-white">
              {count}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/40">
              {projectDict.statStack}
            </p>
            <p className="mt-1 text-sm font-medium text-white/80">
              Next.js · React · GSAP
            </p>
          </div>
        </div>
      </header>

      <ul className="grid w-full min-w-0 grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-3 laptop:gap-6">
        {projects.map((project, index) => (
          <li key={project.id} className="h-full min-w-0">
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
              priority={index < 3}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
