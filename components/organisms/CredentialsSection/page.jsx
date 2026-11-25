import Reveal from "@/components/motion/Reveal";
import SkillChip from "@/components/atoms/SkillChip/page.jsx";
import { splitCertification } from "@/utils/timeline";

const meta = (...parts) => parts.filter(Boolean).join(" · ");

const EducationEntry = ({ name, org, dates }) => (
  <li className="relative border-l border-line pb-6 pl-5 last:pb-0">
    <span
      aria-hidden
      className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-content-subtle"
    />
    <p className="text-sm font-medium uppercase tracking-[0.12em] text-content-subtle">
      {dates}
    </p>
    <p className="mt-1 text-base font-medium text-content">{name}</p>
    <p className="text-sm text-content-muted">{org}</p>
  </li>
);

/** Anthropic Academy: highlighted card with its courses as chips. */
const HighlightedCertification = ({ cert }) => (
  <li className="relative overflow-hidden rounded-2xl bg-sky/60 p-px">
    <div className="rounded-[calc(1rem-1px)] bg-ink-raised p-5 tablet:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-semibold text-2xl text-content tablet:text-3xl">
          {cert.title}
        </p>
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-content-muted">
          {meta(cert.org, cert.dates)}
        </p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {cert.courses.map((course) => (
          <li key={course}>
            <SkillChip variant="primary" role="presentation">
              {course}
            </SkillChip>
          </li>
        ))}
      </ul>
    </div>
  </li>
);

const CertificationRow = ({ cert }) => (
  <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-line py-3 last:border-b-0">
    <div className="min-w-0">
      <p className="text-base font-medium text-content">{cert.title}</p>
      {cert.org ? (
        <p className="text-sm text-content-muted">{cert.org}</p>
      ) : null}
    </div>
    <p className="shrink-0 text-sm text-content-subtle">{cert.dates}</p>
  </li>
);

/** Education and certifications, rendered as plain HTML for crawlers. */
const CredentialsSection = ({ dict }) => {
  const credentials = dict.home.credentials;
  const certifications = credentials.certifications.map(splitCertification);
  const highlighted = certifications.filter((cert) => cert.highlighted);
  const regular = certifications.filter((cert) => !cert.highlighted);

  return (
    <Reveal
      as="section"
      aria-labelledby="credentials-heading"
      className="mt-24 laptop:mt-36"
    >
      <h2 id="credentials-heading" className="section-title max-w-3xl">
        {credentials.title}.
      </h2>

      <div className="mt-10 grid gap-12 laptop:mt-14 laptop:grid-cols-12 laptop:gap-14">
        <div className="laptop:col-span-5">
          <h3 className="eyebrow">{credentials.educationTitle}</h3>
          <ul className="mt-6">
            {credentials.education.map((item) => (
              <EducationEntry key={item.name} {...item} />
            ))}
          </ul>

          <h3 className="eyebrow mt-12">{credentials.achievementTitle}</h3>
          <p className="mt-5 rounded-2xl border border-line bg-ink-raised p-5 text-base leading-relaxed text-content-muted">
            {credentials.achievement}
          </p>
        </div>

        <div className="laptop:col-span-7">
          <h3 className="eyebrow">{credentials.certificationsTitle}</h3>
          <ul className="mt-6 space-y-4">
            {highlighted.map((cert) => (
              <HighlightedCertification key={cert.title} cert={cert} />
            ))}
          </ul>
          <ul className="mt-4">
            {regular.map((cert) => (
              <CertificationRow key={cert.title} cert={cert} />
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
};

export default CredentialsSection;
