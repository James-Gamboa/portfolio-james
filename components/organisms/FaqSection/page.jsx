import Reveal from "@/components/motion/Reveal";

/** Recruiter FAQ. A definition list keeps every answer in the served HTML. */
const FaqSection = ({ dict }) => {
  const faq = dict.home.faq;

  return (
    <Reveal
      as="section"
      aria-labelledby="faq-heading"
      className="mt-16 p-2 laptop:mt-24 laptop:p-0"
    >
      <h2
        id="faq-heading"
        className="text-2xl font-bold tracking-tight text-white laptop:text-4xl"
      >
        {faq.title}.
      </h2>
      <p className="mt-3 text-base text-white/75">{faq.intro}</p>
      <dl className="mt-8 grid max-w-4xl gap-4">
        {faq.items.map((item) => (
          <div
            key={item.q}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
          >
            <dt className="text-lg font-semibold text-white">{item.q}</dt>
            <dd className="mt-2 text-base leading-relaxed text-white/75">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
};

export default FaqSection;
