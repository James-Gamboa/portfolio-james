"use client";

import { useRef } from "react";
import Header from "@/components/organisms/Header/page.jsx";
import ServiceCard from "@/components/molecules/ServiceCard/page.jsx";
import Socials from "@/components/atoms/Socials/page.jsx";
import ProjectsSection from "@/components/organisms/ProjectsSection/page.jsx";
import Footer from "@/components/organisms/Footer/page.jsx";
import Reveal from "@/components/motion/Reveal";
import { useHeroEntrance } from "@/hooks/useHeroEntrance";
import { useScrollTo } from "@/hooks/useScrollTo";

const HomeTemplate = ({ lang, dict, data }) => {
  const heroRef = useHeroEntrance();
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
          <div ref={heroRef} className="laptop:mt-20 mt-10">
            <h1 className="mt-5">
              {[
                [data.headerTaglineOne, "w-4/5 mob:w-full laptop:w-4/5"],
                [data.headerTaglineTwo, "w-full laptop:w-4/5"],
                [data.headerTaglineThree, "w-full laptop:w-4/5"],
                [data.headerTaglineFour, "w-full laptop:w-4/5"],
              ]
                .filter(([text]) => Boolean(text))
                .map(([text, width]) => (
                  <span
                    key={text}
                    data-hero-line=""
                    className={`block text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold ${width}`}
                  >
                    {text}
                  </span>
                ))}
            </h1>
            <Socials className="mt-2 laptop:mt-5" lang={lang} data={data} />
          </div>
          <div id={dict?.sections?.work || "work"} ref={workRef} />
          <ProjectsSection projects={data.projects} dict={dict} lang={lang} />
          <section className="mt-10 laptop:mt-30 p-2 laptop:p-0">
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
          <div id={dict?.sections?.about || "about"} />
          <Reveal
            as="section"
            ref={aboutRef}
            className="mt-10 laptop:mt-40 p-2 laptop:p-0"
          >
            <h2 className="text-2xl text-bold">{dict.about.title}.</h2>
            <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
              {data.aboutpara}
            </p>
          </Reveal>
        </main>
        <Reveal as="footer">
          <Footer lang={lang} dict={dict} data={data} />
        </Reveal>
      </div>
    </div>
  );
};

export default HomeTemplate;
