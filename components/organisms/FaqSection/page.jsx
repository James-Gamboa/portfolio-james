import Reveal from "@/components/motion/Reveal";

/** Recruiter FAQ. A definition list keeps every answer in the served HTML. */
const FaqSection = ({ dict }) => {
  const faq = dict.home.faq;

  return (
    <Reveal
      as="section"
      aria-labelledby="faq-heading"
      className="mt-24 laptop:mt-36"
    >
      <h2 id="faq-heading" className="section-title">
        {faq.title}.
      </h2>
      <p className="mt-3 text-base text-content-muted laptop:text-lg">
        {faq.intro}
      </p>
      <dl className="mt-8 grid gap-3 laptop:grid-cols-2 laptop:gap-4">
        {faq.items.map((item) => (
          <div key={item.q} className="panel p-5 tablet:p-6">
            <dt className="text-lg font-semibold text-content">{item.q}</dt>
            <dd className="mt-2 text-base leading-relaxed text-content-muted">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
};

export default FaqSection;
