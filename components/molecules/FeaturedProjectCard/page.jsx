import SkillChip from "@/components/atoms/SkillChip/page.jsx";
import { parseTechnologies } from "@/lib/utils/parseTechnologies";

const FeaturedProjectCard = ({ title, description, technologies }) => {
  const techItems = parseTechnologies(technologies);

  return (
    <article className="rounded-lg border border-line bg-ink-raised p-3">
      <h5 className="text-sm font-semibold text-white">{title}</h5>
      {description ? (
        <p className="mt-1 text-xs leading-relaxed text-content-muted">
          {description}
        </p>
      ) : null}
      {techItems.length > 0 ? (
        <div
          className="mt-2 flex flex-wrap gap-1"
          role="list"
          aria-label={`${title} technologies`}
        >
          {techItems.map((tech) => (
            <SkillChip
              key={tech}
              variant="secondary"
              className="text-[0.65rem]"
            >
              {tech}
            </SkillChip>
          ))}
        </div>
      ) : null}
    </article>
  );
};

export default FeaturedProjectCard;
