import { Download, Github, Linkedin, Mail } from "lucide-react";
import CtaLink from "@/components/atoms/CtaLink/page.jsx";
import { EVENTS } from "@/lib/analytics";
import { cvPath } from "@/lib/cv";

const socialLink = (data, title) =>
  data?.socials?.find((social) => social.title.toLowerCase() === title)?.link;

/** Closing contact CTA: email, LinkedIn, GitHub and CV. */
const Footer = ({ lang = "en", dict, data }) => {
  const hero = dict?.home?.hero ?? {};
  const email = socialLink(data, "email");
  const linkedin = socialLink(data, "linkedin");
  const github = socialLink(data, "github");
  const address = email?.replace(/^mailto:/, "");

  return (
    <div className="relative mt-24 overflow-hidden rounded-3xl border border-line bg-ink-raised p-6 tablet:p-10 laptop:mt-36 laptop:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sky/10 blur-3xl"
      />

      <div className="relative">
        <h2 className="section-title max-w-3xl">
          {dict?.footer?.contact || "Let's talk about projects"}
        </h2>

        {email && address ? (
          <a
            href={email}
            className="mt-6 inline-block break-all font-semibold text-2xl text-content underline decoration-sky/60 decoration-1 underline-offset-8 transition-colors hover:decoration-sky tablet:text-4xl"
          >
            {address}
          </a>
        ) : null}

        <div className="mt-8 grid grid-cols-2 gap-3 tablet:flex tablet:flex-wrap">
          {email && (
            <CtaLink href={email} variant="brand" event={EVENTS.contact}>
              <Mail className="h-4 w-4" aria-hidden />
              {hero.contact || "Contact"}
            </CtaLink>
          )}
          <CtaLink
            href={cvPath(lang)}
            download
            event={EVENTS.cvDownload}
            eventProps={{ locale: lang, placement: "footer" }}
          >
            <Download className="h-4 w-4" aria-hidden />
            {hero.downloadCv || "Download CV"}
          </CtaLink>
          {linkedin && (
            <CtaLink href={linkedin} external event={EVENTS.linkedin}>
              <Linkedin className="h-4 w-4" aria-hidden />
              {hero.linkedin || "LinkedIn"}
            </CtaLink>
          )}
          {github && (
            <CtaLink href={github} external event={EVENTS.github}>
              <Github className="h-4 w-4" aria-hidden />
              {hero.github || "GitHub"}
            </CtaLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
