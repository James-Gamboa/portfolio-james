import { cn } from "@/components/lib/utils";

const variantClasses = {
  // Core stack: soft sky tint.
  primary:
    "rounded-full border border-sky/40 bg-sky/10 px-3.5 py-1.5 text-sm font-medium text-content",
  // Supporting skills and technologies: quiet outline chip.
  secondary:
    "rounded-full border border-line bg-ink-raised px-3 py-1 text-xs font-normal text-content-muted",
};

const SkillChip = ({
  children,
  variant = "secondary",
  className,
  role = "listitem",
}) => {
  return (
    <span
      role={role}
      className={cn(
        "inline-flex items-center",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default SkillChip;
