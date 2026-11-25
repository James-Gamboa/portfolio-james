import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

/** Concise experience timeline; the full detail lives on the resume page. */
const ExperienceSection = ({ lang, dict }) => {
  const experience = dict.home.experience;
  const resumePath = lang === "es" ? "curriculum-vitae" : "resume";

  return (
    <Reveal
      as="section"
      aria-labelledby="experience-heading"
      className="mt-16 p-2 laptop:mt-24 laptop:p-0"
    >
      <h2
        id="experience-heading"
        className="text-2xl font-bold tracking-tight text-white laptop:text-4xl"
      >
        {experience.title}.
      </h2>
      <ol className="mt-8 space-y-8 border-l border-white/15 pl-6">
        {experience.items.map((item) => (
          <li key={`${item.company}-${item.dates}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-violet-400"
            />
            <p className="text-sm font-medium uppercase tracking-wider text-white/70">
              {item.dates}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white laptop:text-xl">
              {item.role}
              <span className="font-normal text-white/70">
                {" "}
                · {item.company}
              </span>
            </h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-white/75">
              {item.summary}
            </p>
          </li>
        ))}
      </ol>
      <Link
        href={`/${lang}/${resumePath}`}
        className="mt-8 inline-flex min-h-11 items-center text-base font-medium text-white underline underline-offset-4 hover:text-white/80"
      >
        {experience.fullResume} →
      </Link>
    </Reveal>
  );
};

export default ExperienceSection;
