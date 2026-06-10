import SkillChip from "@/components/atoms/SkillChip/page.jsx";
import SkillCategoryGroup from "@/components/molecules/SkillCategoryGroup/page.jsx";
import { buildSkillsDisplay } from "@/lib/utils/buildSkillsDisplay";

const SkillsSection = ({ resume, dict }) => {
  const { primaryStack, groups } = buildSkillsDisplay(resume, dict);

  if (primaryStack.length === 0 && groups.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      {primaryStack.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            {dict?.resume?.primaryStack || "Core Stack"}
          </h3>
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label={dict?.resume?.primaryStack || "Core Stack"}
          >
            {primaryStack.map((skill) => (
              <SkillChip key={skill} variant="primary">
                {skill}
              </SkillChip>
            ))}
          </div>
        </div>
      ) : null}

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-6">
          {groups.map((group) => (
            <SkillCategoryGroup
              key={group.key}
              title={group.title}
              items={group.items}
              ariaLabel={group.title}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SkillsSection;
