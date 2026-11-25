import Reveal from "@/components/motion/Reveal";

const Entry = ({ name, org, dates }) => (
  <li className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
    <p className="text-base font-medium text-white">{name}</p>
    <p className="mt-1 text-sm text-white/70">
      {[org, dates].filter(Boolean).join(" · ")}
    </p>
  </li>
);

/** Education and certifications, rendered as plain HTML for crawlers. */
const CredentialsSection = ({ dict }) => {
  const credentials = dict.home.credentials;

  return (
    <Reveal
      as="section"
      aria-labelledby="credentials-heading"
      className="mt-16 p-2 laptop:mt-24 laptop:p-0"
    >
      <h2
        id="credentials-heading"
        className="text-2xl font-bold tracking-tight text-white laptop:text-4xl"
      >
        {credentials.title}.
      </h2>

      <div className="mt-8 grid gap-10 laptop:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {credentials.educationTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {credentials.education.map((item) => (
              <Entry key={item.name} {...item} />
            ))}
          </ul>
          <h3 className="mt-8 text-lg font-semibold text-white">
            {credentials.achievementTitle}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-white/75">
            {credentials.achievement}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            {credentials.certificationsTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {credentials.certifications.map((item) => (
              <Entry key={item.name} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
};

export default CredentialsSection;
