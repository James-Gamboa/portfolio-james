import SkillChip from "@/components/atoms/SkillChip/page.jsx";

const SkillCategoryGroup = ({ title, items, ariaLabel }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 border-t border-line pt-4">
      <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-content-subtle">
        {title}
      </h3>
      <div
        className="flex flex-wrap gap-1.5"
        role="list"
        aria-label={ariaLabel || title}
      >
        {items.map((item) => (
          <SkillChip key={item} variant="secondary">
            {item}
          </SkillChip>
        ))}
      </div>
    </div>
  );
};

export default SkillCategoryGroup;
