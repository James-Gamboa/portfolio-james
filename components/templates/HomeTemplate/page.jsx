"use client";

import { useRef } from "react";
import Header from "@/components/organisms/Header/page.jsx";
import Hero from "@/components/organisms/Hero/page.jsx";
import ServiceCard from "@/components/molecules/ServiceCard/page.jsx";
import ProjectsSection from "@/components/organisms/ProjectsSection/page.jsx";
import ExperienceSection from "@/components/organisms/ExperienceSection/page.jsx";
import CredentialsSection from "@/components/organisms/CredentialsSection/page.jsx";
import FaqSection from "@/components/organisms/FaqSection/page.jsx";
import Footer from "@/components/organisms/Footer/page.jsx";
import Reveal from "@/components/motion/Reveal";
import { useScrollTo } from "@/hooks/useScrollTo";

const HomeTemplate = ({ lang, dict, data }) => {
  const { scrollTo } = useScrollTo();
  const workRef = useRef(null);
  const aboutRef = useRef(null);

  return (
    <div className="relative w-full min-w-0 overflow-x-clip">
      <div className="gradient-circle" />
      <div className="gradient-circle-bottom" />
      <div className="container mx-auto mb-10 w-full min-w-0 max-w-full px-4 mob:px-5 tablet:px-6 laptop:px-8">
        <Header
          handleWorkScroll={() => scrollTo(workRef, { offset: -80 })}
          handleAboutScroll={() => scrollTo(aboutRef, { offset: -80 })}
          dict={dict}
          data={data}
        />
        <main>
          <Hero lang={lang} dict={dict} data={data} />
          <div id={dict?.sections?.about || "about"} />
          <section
            ref={aboutRef}
            aria-labelledby="about-heading"
            className="mt-12 p-2 laptop:mt-20 laptop:p-0"
          >
            <h2
              id="about-heading"
              className="text-2xl font-bold tracking-tight text-white laptop:text-4xl"
            >
              {dict.home.about.title}.
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/85 laptop:text-2xl">
              {dict.home.about.summary}
            </p>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/70 laptop:text-lg">
              {data.aboutpara}
            </p>
          </section>
          <div id={dict?.sections?.work || "work"} ref={workRef} />
          <ProjectsSection projects={data.projects} dict={dict} lang={lang} />
          <ExperienceSection lang={lang} dict={dict} />
          <CredentialsSection dict={dict} />
          <section className="mt-16 laptop:mt-24 p-2 laptop:p-0">
            <h2 data-reveal="" className="tablet:m-10 text-2xl text-bold">
              {dict.services.title}.
            </h2>
            <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
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
