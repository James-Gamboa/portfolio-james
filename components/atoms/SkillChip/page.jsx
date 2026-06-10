import { cn } from "@/components/lib/utils";

const variantClasses = {
  primary:
    "rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-medium text-white",
  secondary:
    "rounded-md bg-slate-700/60 px-2.5 py-1 text-xs font-normal text-white/90",
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
