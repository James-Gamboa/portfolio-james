"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/lib/utils";
import { getProjectMeta } from "@/lib/utils/getProjectMeta";

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

  const viewLabel = labels.viewProject ?? "View project";
  const exploreLabel = labels.explore ?? "Explore";
  const stackLabel = labels.stackLabel ?? "Tech stack";
  const imageAlt = (
    labels.imageAlt ?? "{name} website homepage screenshot"
  ).replace("{name}", name);

  return (
    <article
      data-reveal=""
      className={cn(
        "group relative h-full w-full min-w-0 max-w-full overflow-hidden",
      )}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
        className={cn(
          "link flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-sm backdrop-blur-sm transition-[color,background-color,border-color,box-shadow,transform] duration-300 motion-safe:group-hover:-translate-y-1.5",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
          "hover:border-white/20 hover:bg-white/[0.05]",
          meta.accent.ring,
        )}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
            meta.accent.glow,
            "motion-reduce:hidden group-hover:opacity-100",
          )}
        />

        <div className="relative z-10 overflow-hidden">
          <div
            className={cn(
              "relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 transition-transform duration-[550ms] ease-out motion-safe:group-hover:scale-105",
            )}
          >
            <Image
              alt={imageAlt}
              src={img}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              quality={75}
              loading="lazy"
              decoding="async"
              className={cn(
                "h-full w-full object-cover transition-transform duration-500 ease-out",
                meta.imagePosition,
              )}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span
                className={cn("h-2 w-2 rounded-full", meta.accent.dot)}
                aria-hidden
              />
              <span className="rounded-md border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-md">
                {meta.category}
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-4 p-4 mob:p-5">
          <div className="space-y-1.5">
            <h4 className="text-lg font-semibold leading-snug tracking-tight text-white laptop:text-xl">
              {name}
            </h4>
            <p className="text-sm leading-relaxed text-white/50 laptop:text-base">
              {description}
            </p>
          </div>

          <ul className="flex min-w-0 flex-wrap gap-2" aria-label={stackLabel}>
            {meta.tags.map((tag) => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-[11px] font-medium normal-case tracking-normal",
                    meta.accent.badge,
                  )}
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex min-w-0 items-center justify-between gap-2 border-t border-white/5 pt-4">
            <span className="inline-flex min-w-0 shrink items-center gap-1.5 text-sm font-medium text-white/90 transition-colors group-hover:text-white">
              {viewLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-white/55 transition-colors group-hover:text-white/75">
              {exploreLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default WorkCard;
