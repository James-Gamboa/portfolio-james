import { Download, Github, Linkedin, Mail } from "lucide-react";
import CtaLink from "@/components/atoms/CtaLink/page.jsx";
import { EVENTS } from "@/lib/analytics";
import { cvPath } from "@/lib/cv";

const socialLink = (data, title) =>
  data.socials?.find((social) => social.title.toLowerCase() === title)?.link;

/**
 * Recruiter-first hero. The H1 lines animate with a CSS keyframe (no JS), so
 * the LCP text is painted immediately on load.
 */
const Hero = ({ lang, dict, data }) => {
  const hero = dict.home.hero;
  const lines = [
    [data.headerTaglineOne, "w-4/5 mob:w-full laptop:w-4/5"],
    [data.headerTaglineTwo, "w-full laptop:w-4/5"],
    [data.headerTaglineThree, "w-full laptop:w-4/5"],
    [data.headerTaglineFour, "w-full laptop:w-4/5"],
  ].filter(([text]) => Boolean(text));

  const email = socialLink(data, "email");
  const linkedin = socialLink(data, "linkedin");
  const github = socialLink(data, "github");

  return (
    <div className="laptop:mt-20 mt-10">
      <h1 className="mt-5">
        {lines.map(([text, width], index) => (
          <span
            key={text}
            data-hero-line=""
            style={{ "--hero-i": index }}
            className={`block text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold ${width}`}
          >
            {text}
          </span>
        ))}
      </h1>

      <div data-hero-line="" style={{ "--hero-i": lines.length }}>
        <p className="mt-4 text-base font-medium text-white/90 tablet:text-xl">
          {hero.stack}
        </p>
        <p className="mt-1 text-base text-white/75 tablet:text-lg">
          {hero.location}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 tablet:text-lg">
          {hero.valueProp}
        </p>

        <div
          role="group"
          aria-label={hero.actionsLabel}
          className="mt-6 flex flex-wrap gap-3"
        >
          <CtaLink
            href={cvPath(lang)}
            variant="primary"
            download
            event={EVENTS.cvDownload}
            eventProps={{ locale: lang }}
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
            <CtaLink href={linkedin} external event={EVENTS.linkedin}>
              <Linkedin className="h-4 w-4" aria-hidden />
              {hero.linkedin}
            </CtaLink>
          )}
          {github && (
            <CtaLink href={github} external event={EVENTS.github}>
              <Github className="h-4 w-4" aria-hidden />
              {hero.github}
            </CtaLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
