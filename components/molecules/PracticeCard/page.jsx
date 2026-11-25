import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectMeta } from "@/utils/getProjectMeta";

/** Compact row for practice and personal projects (visually secondary). */
const PracticeCard = ({ project, index = 0, lang = "en", labels = {} }) => {
  const meta = getProjectMeta(project, lang, index);
  const imageAlt = (
    labels.imageAlt ?? "{name} website homepage screenshot"
  ).replace("{name}", project.title);

  return (
    <article data-reveal="" className="group h-full">
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
      >
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-ink-overlay">
          <Image
            alt={imageAlt}
            src={project.imageSrc}
            fill
            sizes="80px"
            quality={60}
            loading="lazy"
            className="object-cover object-top"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-medium text-content">
            {project.title}
          </h4>
          <p className="mt-0.5 truncate text-xs text-content-subtle">
            {[meta.category, ...meta.tags.slice(0, 2)].join(" · ")}
          </p>
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-content-subtle transition-colors group-hover:text-content"
          aria-hidden
        />
      </Link>
    </article>
  );
};

export default PracticeCard;
