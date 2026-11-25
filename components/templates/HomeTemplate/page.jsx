import Header from "@/components/organisms/Header/page.jsx";
import Hero from "@/components/organisms/Hero/page.jsx";
import ServiceCard from "@/components/molecules/ServiceCard/page.jsx";
import ProjectsSection from "@/components/organisms/ProjectsSection/page.jsx";
import ExperienceSection from "@/components/organisms/ExperienceSection/page.jsx";
import SkillsSection from "@/components/molecules/SkillsSection/page.jsx";
import CredentialsSection from "@/components/organisms/CredentialsSection/page.jsx";
import FaqSection from "@/components/organisms/FaqSection/page.jsx";
import Footer from "@/components/organisms/Footer/page.jsx";
import Reveal from "@/components/motion/Reveal";

const HomeTemplate = ({ lang, dict, data }) => {
  return (
    <div className="relative isolate w-full min-w-0 overflow-x-clip">
      {/* Ambient backdrop: soft blue glow plus a fading dot grid. Pure CSS
          gradients, so it never competes for LCP. */}
      <div aria-hidden className="page-aurora" />
      <div className="container mx-auto mb-10 w-full min-w-0 max-w-full px-4 mob:px-5 tablet:px-6 laptop:px-8">
        <Header dict={dict} data={data} />
        <main>
          <Hero lang={lang} dict={dict} data={data} />
          <div id={dict?.sections?.about || "about"} />
          <Reveal
            as="section"
            aria-labelledby="about-heading"
            className="mt-24 grid gap-6 laptop:mt-36 laptop:grid-cols-12 laptop:gap-12"
          >
            <h2 id="about-heading" className="eyebrow laptop:col-span-3">
              {dict.home.about.title}
            </h2>
            <div className="laptop:col-span-9">
              <p className="max-w-4xl text-xl leading-snug text-content laptop:text-3xl laptop:leading-snug">
                {dict.home.about.summary}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-content-muted laptop:text-lg">
                {data.aboutpara}
              </p>
            </div>
          </Reveal>
          <div id={dict?.sections?.work || "work"} />
          <ProjectsSection projects={data.projects} dict={dict} lang={lang} />
          <ExperienceSection lang={lang} dict={dict} resume={data.resume} />
          <Reveal
            as="section"
            aria-labelledby="skills-heading"
            className="mt-24 laptop:mt-36"
          >
            <h2 id="skills-heading" className="section-title">
              {dict.resume.skills}.
            </h2>
            <SkillsSection resume={data.resume} dict={dict} />
          </Reveal>
          <CredentialsSection dict={dict} />
          <section className="mt-24 laptop:mt-36">
            <h2 data-reveal="" className="section-title">
              {dict.services.title}.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 laptop:grid-cols-2 laptop:[&>*:last-child:nth-child(odd)]:col-span-2">
              {data.services.map((service, index) => (
                <ServiceCard
                  key={index}
                  name={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </section>
          <FaqSection dict={dict} />
        </main>
        <Reveal as="footer">
          <Footer lang={lang} dict={dict} data={data} />
        </Reveal>
      </div>
    </div>
  );
};

export default HomeTemplate;
