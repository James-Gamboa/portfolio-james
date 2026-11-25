import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { getProjectMeta } from "@/utils/getProjectMeta";
import { projectHost } from "@/utils/clientProjects";

/** Standard client-work card used in the grid below the featured projects. */
const WorkCard = ({
  img,
  name,
  description,
  url,
  index = 0,
  lang = "en",
  labels = {},
  category: categoryProp,
  tags: tagsProp,
  excerpt: excerptProp,
}) => {
  const meta = getProjectMeta(
    {
      title: name,
      description,
      category: categoryProp,
      tags: tagsProp,
      excerpt: excerptProp,
    },
    lang,
    index,
  );

  const host = projectHost(url);
  const imageAlt = (
    labels.imageAlt ?? "{name} website homepage screenshot"
  ).replace("{name}", name);

  return (
    <article data-reveal="" className="group relative h-full w-full min-w-0">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-raised/80 transition-[border-color,background-color,transform] duration-300 motion-safe:group-hover:-translate-y-1",
          "hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70",
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-overlay">
          <Image
            alt={imageAlt}
            src={img}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            quality={75}
            loading="lazy"
            className={cn(
              "object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105",
              meta.imagePosition,
            )}
          />
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-content backdrop-blur-md">
            {meta.category}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 tablet:p-5">
          <h4 className="text-lg font-semibold leading-snug tracking-tight text-content">
            {name}
          </h4>
          <p className="line-clamp-3 text-sm leading-relaxed text-content-muted">
            {description}
          </p>

          <ul
            className="flex min-w-0 flex-wrap gap-1.5"
            aria-label={labels.stackLabel ?? "Tech stack"}
          >
            {meta.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-content"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex min-w-0 items-center justify-between gap-2 border-t border-white/10 pt-3 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-content">
              {labels.viewProject ?? "View project"}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
            {host ? (
              <span className="truncate text-xs text-content-subtle">
                {host}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default WorkCard;
