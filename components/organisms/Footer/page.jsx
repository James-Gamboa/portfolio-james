import { Download, Github, Linkedin, Mail } from "lucide-react";
import CtaLink from "@/components/atoms/CtaLink/page.jsx";
import { EVENTS } from "@/lib/analytics";
import { cvPath } from "@/lib/cv";

// Build-time timestamp (see next.config.js), formatted per locale. Fixed to
// UTC so server and client render the same text.
const formatBuildDate = (lang) => {
  const iso = process.env.NEXT_PUBLIC_BUILD_DATE;
  if (!iso) return null;
  const date = new Date(iso);
  return {
    iso: iso.slice(0, 10),
    label: new Intl.DateTimeFormat(lang === "es" ? "es-CR" : "en-US", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(date),
  };
};

const socialLink = (data, title) =>
  data?.socials?.find((social) => social.title.toLowerCase() === title)?.link;

/** Closing contact CTA: email, LinkedIn, GitHub and CV, plus last-updated. */
const Footer = ({ lang = "en", dict, data }) => {
  const updated = formatBuildDate(lang);
  const hero = dict?.home?.hero ?? {};
  const email = socialLink(data, "email");
  const linkedin = socialLink(data, "linkedin");
  const github = socialLink(data, "github");
  const address = email?.replace(/^mailto:/, "");

  return (
    <div className="relative mt-24 overflow-hidden rounded-3xl border border-white/10 bg-ink-raised p-6 tablet:p-10 laptop:mt-36 laptop:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-pink/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl"
      />

      <div className="relative">
        <h2 className="section-title max-w-3xl">
          {dict?.footer?.contact || "Let's talk about projects"}
        </h2>

        {email && address ? (
          <a
            href={email}
            className="mt-6 inline-block break-all font-display text-2xl text-content underline decoration-brand-pink/60 decoration-1 underline-offset-8 transition-colors hover:decoration-brand-pink tablet:text-4xl"
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

        {updated && (
          <p className="mt-10 text-sm text-content-subtle">
            {dict?.footer?.lastUpdated ?? "Last updated"}:{" "}
            <time dateTime={updated.iso}>{updated.label}</time>
          </p>
        )}
      </div>
    </div>
  );
};

export default Footer;
