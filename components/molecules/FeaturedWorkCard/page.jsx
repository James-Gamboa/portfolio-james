import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { getProjectMeta } from "@/utils/getProjectMeta";
import { projectHost } from "@/utils/clientProjects";

/**
 * Large card for the top client projects. `wide` lays the image beside the
 * copy on laptop; otherwise the image sits on top.
 */
const FeaturedWorkCard = ({
  project,
  index = 0,
  lang = "en",
  labels = {},
  wide = false,
}) => {
  const meta = getProjectMeta(project, lang, index);
  const host = projectHost(project.url);
  const imageAlt = (
    labels.imageAlt ?? "{name} website homepage screenshot"
  ).replace("{name}", project.title);

  return (
    <article data-reveal="" className="group relative h-full">
      {/* Gradient hairline that lights up on hover/focus. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[1.6rem] bg-sky opacity-0 transition-opacity duration-500 group-hover:opacity-40 group-focus-within:opacity-40 motion-reduce:transition-none"
      />
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative flex h-full overflow-hidden rounded-3xl border border-line bg-ink-raised transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky",
          wide ? "flex-col laptop:flex-row" : "flex-col",
        )}
      >
        <div
          className={cn(
            "relative w-full shrink-0 overflow-hidden bg-ink-overlay",
            wide
              ? "aspect-[16/10] laptop:aspect-auto laptop:min-h-[22rem] laptop:w-[58%]"
              : "aspect-[16/10]",
          )}
        >
          <Image
            alt={imageAlt}
            src={project.imageSrc}
            fill
            sizes={
              wide
                ? "(min-width: 1024px) 60vw, 100vw"
                : "(min-width: 1024px) 50vw, 100vw"
            }
            quality={75}
            loading="lazy"
            className={cn(
              "object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]",
              meta.imagePosition,
            )}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
          />
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col gap-4 p-5 tablet:p-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-content-muted">
            <span className="rounded-full border border-line bg-ink-raised px-2.5 py-1">
              {meta.category}
            </span>
            {labels.featured ? (
              <span className="text-sky">{labels.featured}</span>
            ) : null}
          </div>

          <h4 className="font-semibold text-3xl leading-tight text-content tablet:text-4xl">
            {project.title}
          </h4>
          <p className="min-h-[4.875em] text-base leading-relaxed text-content-muted">
            {meta.excerpt}
          </p>

          <ul
            className="flex min-w-0 flex-wrap gap-1.5"
            aria-label={labels.stackLabel ?? "Tech stack"}
          >
            {meta.tags.slice(0, 5).map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-line bg-ink-raised px-2 py-0.5 text-xs font-medium text-content"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-content">
              {labels.viewProject ?? "View project"}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
            {host ? <span className="text-content-subtle">{host}</span> : null}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default FeaturedWorkCard;
