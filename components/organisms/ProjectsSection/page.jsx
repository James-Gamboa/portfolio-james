import FeaturedWorkCard from "@/components/molecules/FeaturedWorkCard/page.jsx";
import PracticeCard from "@/components/molecules/PracticeCard/page.jsx";
import WorkCard from "@/components/molecules/WorkCard/page.jsx";
import { pickFeatured, splitProjects } from "@/utils/clientProjects";

const ProjectsSection = ({ projects = [], dict, lang }) => {
  const projectDict = dict?.projects ?? {};
  const groupDict = dict?.home?.projects ?? {};
  const { client, other } = splitProjects(projects);
  const { featured, rest } = pickFeatured(client);

  const cardLabels = {
    viewProject: projectDict.viewProject,
    stackLabel: projectDict.stackLabel,
    imageAlt: projectDict.imageAlt,
    featured: groupDict.featuredLabel,
  };

  return (
    <section
      aria-labelledby="projects-heading"
      className="relative mt-24 w-full min-w-0 laptop:mt-36"
    >
      <header data-reveal="" className="max-w-3xl space-y-4">
        <p className="eyebrow">{projectDict.eyebrow}</p>
        <h2 id="projects-heading" className="section-title">
          {projectDict.title}.
        </h2>
        <p className="text-base leading-relaxed text-content-muted laptop:text-lg">
          {projectDict.subtitle}
        </p>
      </header>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-content laptop:text-2xl">
          {groupDict.clientTitle}
        </h3>
        <p className="mt-1 mb-6 text-base text-content-muted">
          {groupDict.clientIntro}
        </p>

        <ul className="grid grid-cols-1 gap-5 laptop:grid-cols-2 laptop:gap-6">
          {featured.map((project, index) => (
            <li
              key={project.id}
              className={index === 0 ? "min-w-0 laptop:col-span-2" : "min-w-0"}
            >
              <FeaturedWorkCard
                project={project}
                index={index}
                lang={lang}
                labels={cardLabels}
                wide={index === 0}
              />
            </li>
          ))}
        </ul>

        {rest.length > 0 && (
          <ul className="project-grid mt-5 grid w-full min-w-0 grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-6 laptop:mt-6 laptop:grid-cols-6 laptop:gap-6">
            {rest.map((project, index) => (
              <li key={project.id} className="h-full min-w-0 laptop:col-span-2">
                <WorkCard
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  url={project.url}
                  index={index + featured.length}
                  lang={lang}
                  labels={cardLabels}
                  category={project.category}
                  tags={project.tags}
                  excerpt={project.excerpt}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {other.length > 0 && (
        <div className="mt-16 border-t border-white/10 pt-10">
          <h3 className="text-lg font-semibold text-content-muted laptop:text-xl">
            {groupDict.otherTitle}
          </h3>
          <p className="mt-1 mb-5 text-sm text-content-subtle">
            {groupDict.otherIntro}
          </p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {other.map((project, index) => (
              <li key={project.id} className="w-full min-w-0 tablet:w-[calc(50%-0.3125rem)] laptop:w-[calc(33.333%-0.4167rem)]">
                <PracticeCard
                  project={project}
                  index={index + client.length}
                  lang={lang}
                  labels={cardLabels}
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
