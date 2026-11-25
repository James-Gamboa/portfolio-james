import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import CtaLink from "@/components/atoms/CtaLink/page.jsx";
import { EVENTS } from "@/lib/analytics";
import { cvPath } from "@/lib/cv";
import { buildHeroFacts, buildHeroHeading } from "@/utils/hero";

const socialLink = (data, title) =>
  data.socials?.find((social) => social.title.toLowerCase() === title)?.link;

const FACT_SPAN = {
  clients: "laptop:col-span-2",
  since: "laptop:col-span-2",
  stack: "col-span-2 laptop:col-span-5",
  languages: "col-span-2 laptop:col-span-3",
};

/**
 * Recruiter-first hero. The H1 lines animate with a CSS keyframe (no JS), so
 * the LCP text is painted immediately on load.
 */
const Hero = ({ lang, dict, data }) => {
  const hero = dict.home.hero;
  const { greeting, name, role } = buildHeroHeading(data);
  const facts = buildHeroFacts({ projects: data.projects, dict });

  const email = socialLink(data, "email");
  const linkedin = socialLink(data, "linkedin");
  const github = socialLink(data, "github");

  return (
    <div className="pt-12 laptop:pt-20">
      <div
        data-hero-line=""
        style={{ "--hero-i": 0 }}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-raised py-1.5 pl-3 pr-4 text-sm text-content-muted"
      >
        <MapPin className="h-4 w-4 text-sky" aria-hidden />
        {hero.location}
      </div>

      <h1 className="mt-6 max-w-4xl">
        {greeting ? (
          <span
            data-hero-line=""
            style={{ "--hero-i": 1 }}
            className="block text-lg text-content-muted tablet:text-2xl"
          >
            {greeting}
          </span>
        ) : null}
        <span
          data-hero-line=""
          style={{ "--hero-i": 2 }}
          className="mt-1 block font-extrabold text-display text-content"
        >
          {name}
        </span>
        {role ? (
          <span
            data-hero-line=""
            style={{ "--hero-i": 3 }}
            className="mt-3 block font-semibold text-3xl text-sky tablet:text-5xl"
          >
            <span className="text-sky">{role}</span>
          </span>
        ) : null}
      </h1>

      <div data-hero-line="" style={{ "--hero-i": 4 }}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-content-muted tablet:text-xl tablet:leading-relaxed">
          {hero.valueProp}
        </p>

        <div
          role="group"
          aria-label={hero.actionsLabel}
          className="mt-8 grid grid-cols-2 gap-3 tablet:flex tablet:flex-wrap"
        >
          <CtaLink
            href={cvPath(lang)}
            variant="brand"
            download
            event={EVENTS.cvDownload}
            eventProps={{ locale: lang, placement: "hero" }}
          >
            <Download className="h-4 w-4" aria-hidden />
            {hero.downloadCv}
          </CtaLink>
          {email && (
            <CtaLink href={email} event={EVENTS.contact}>
              <Mail className="h-4 w-4" aria-hidden />
              {hero.contact}
            </CtaLink>
          )}
          {linkedin && (
            <CtaLink
              href={linkedin}
              external
              variant="ghost"
              event={EVENTS.linkedin}
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              {hero.linkedin}
            </CtaLink>
          )}
          {github && (
            <CtaLink
              href={github}
              external
              variant="ghost"
              event={EVENTS.github}
            >
              <Github className="h-4 w-4" aria-hidden />
              {hero.github}
            </CtaLink>
          )}
        </div>
      </div>

      <dl
        data-hero-line=""
        style={{ "--hero-i": 5 }}
        className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-ink-raised/60 backdrop-blur-sm laptop:mt-16 laptop:grid-cols-12"
      >
        {facts.map((fact) => {
          const isNumeric = fact.key === "clients" || fact.key === "since";
          return (
            <div
              key={fact.key}
              className={`fact flex flex-col-reverse justify-end gap-1.5 p-4 tablet:p-5 ${FACT_SPAN[fact.key] ?? ""}`}
            >
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-content-subtle">
                {fact.label}
              </dt>
              <dd
                className={
                  isNumeric
                    ? `font-extrabold text-4xl leading-none tablet:text-5xl ${fact.key === "clients" ? "text-sky" : "text-content"}`
                    : "text-base font-medium text-content tablet:text-lg"
                }
              >
                {fact.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default Hero;
