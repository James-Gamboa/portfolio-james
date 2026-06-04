"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/organisms/Header/page.jsx";
import ProjectResume from "@/components/molecules/ProjectResume/page.jsx";
import Socials from "@/components/atoms/Socials/page.jsx";
import Button from "@/components/atoms/Button/page.jsx";
import Footer from "@/components/organisms/Footer/page.jsx";

const SkillCategory = ({ title, items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 mob:mt-5">
      <h2 className="text-lg">{title}</h2>
      <ul className="list-disc">
        {items.map((item, index) => (
          <li key={index} className="ml-5 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ResumeTemplate = ({ lang = "en", dict, data }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!data.showResume) {
    return <div>Resume not available</div>;
  }

  if (!data.resume) {
    console.error("Resume data is missing:", data);
    return <div>Resume data not available</div>;
  }

  const skillCategories = [
    {
      title: dict?.resume?.languages || "Frontend",
      items: data.resume.languages,
    },
    {
      title: dict?.resume?.frameworks || "Backend & APIs",
      items: data.resume.frameworks,
    },
    {
      title: dict?.resume?.cmsEcommerce || "CMS & E-Commerce",
      items: data.resume.cmsEcommerce,
    },
    {
      title: dict?.resume?.databases || "Databases",
      items: data.resume.databases,
    },
    {
      title: dict?.resume?.toolsPlatforms || "Tools & Platforms",
      items: data.resume.toolsPlatforms,
    },
    {
      title: dict?.resume?.aiTools || "AI & Developer Tools",
      items: data.resume.aiTools,
    },
    {
      title: dict?.resume?.others || "Other",
      items: data.resume.others,
    },
  ].filter((category) => category.items && category.items.length > 0);

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Link href="/Edit">
            <Button type="primary">Edit Resume</Button>
          </Link>
        </div>
      )}
      <div className="container mx-auto mb-10">
        <Header dict={dict} data={data} />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div className="w-full min-w-0 max-w-4xl rounded-lg bg-slate-800 p-5 shadow-sm mob:px-6 tablet:p-10 laptop:p-16 desktop:p-20">
              <h1 className="text-3xl font-bold">
                {data.resume.name || data.name}
              </h1>
              <h2 className="text-xl mt-5">{data.resume.tagline}</h2>
              <p className="mt-5 w-full text-base opacity-50 tablet:text-lg laptop:text-xl">
                {data.resume.description}
              </p>
              {data.resume.descriptionSecondary && (
                <p className="mt-3 w-full text-base opacity-50 tablet:text-lg laptop:text-xl">
                  {data.resume.descriptionSecondary}
                </p>
              )}
              <div className="mt-2">
                <Socials lang={lang} data={data} />
              </div>

              {data.resume.aboutParagraphs &&
                data.resume.aboutParagraphs.length > 0 && (
                  <div className="mt-5">
                    <h1 className="text-2xl font-bold">
                      {dict?.resume?.about || "About Me"}
                    </h1>
                    <div className="mt-2 space-y-3">
                      {data.resume.aboutParagraphs.map((paragraph, index) => (
                        <p key={index} className="text-sm opacity-70">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

              <div className="mt-5">
                <h1 className="text-2xl font-bold">
                  {dict?.resume?.experience || "Experience"}
                </h1>
                {data.resume.experiences &&
                  data.resume.experiences.map(
                    ({
                      id,
                      dates,
                      type,
                      position,
                      summary,
                      bullets,
                      featuredProjects,
                    }) => (
                      <ProjectResume
                        key={id}
                        dates={dates}
                        type={type}
                        position={position}
                        summary={summary}
                        bullets={bullets}
                        featuredProjects={featuredProjects}
                        featuredProjectsLabel={
                          dict?.resume?.featuredProjects || "Featured Projects"
                        }
                      />
                    ),
                  )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">
                  {dict?.resume?.education || "Education"}
                </h1>
                {Array.isArray(data.resume.education) ? (
                  data.resume.education.map((edu, index) => (
                    <div key={index} className="mt-2">
                      <h2 className="text-lg">{edu.universityPara}</h2>
                      <h3 className="text-sm opacity-75">
                        {edu.universityName}
                      </h3>
                      <p className="text-sm mt-1 opacity-50">
                        {edu.universityDate}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="mt-2">
                    <h2 className="text-lg">
                      {data.resume.education.universityPara}
                    </h2>
                    <h3 className="text-sm opacity-75">
                      {data.resume.education.universityName}
                    </h3>
                    <p className="text-sm mt-1 opacity-50">
                      {data.resume.education.universityDate}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">
                  {dict?.resume?.skills || "Skills"}
                </h1>
                <div className="grid mob:grid-cols-1 desktop:grid-cols-2 gap-x-8">
                  {skillCategories.map((category) => (
                    <SkillCategory
                      key={category.title}
                      title={category.title}
                      items={category.items}
                    />
                  ))}
                </div>
              </div>
              {data.resume.spokenLanguages &&
                data.resume.spokenLanguages.length > 0 && (
                  <div className="mt-5">
                    <h1 className="text-2xl font-bold">
                      {dict?.resume?.spokenLanguages || "Languages"}
                    </h1>
                    <ul className="list-disc mt-2">
                      {data.resume.spokenLanguages.map((language, index) => (
                        <li key={index} className="ml-5 py-2">
                          {language}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {data.resume.certifications &&
                data.resume.certifications.length > 0 && (
                  <div className="mt-5">
                    <h1 className="text-2xl font-bold">
                      {dict?.resume?.certifications || "Certifications"}
                    </h1>
                    <ul className="list-disc mt-2">
                      {data.resume.certifications.map(
                        (certification, index) => (
                          <li key={index} className="ml-5 py-2">
                            {certification}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              {data.resume.achievements &&
                data.resume.achievements.length > 0 && (
                  <div className="mt-5">
                    <h1 className="text-2xl font-bold">
                      {dict?.resume?.achievements || "Achievements"}
                    </h1>
                    {data.resume.achievements.map((achievement, index) => (
                      <div key={index} className="mt-2">
                        <h2 className="text-lg">{achievement.title}</h2>
                        <p className="text-sm mt-2 opacity-50">
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
      <Footer lang={lang} dict={dict} data={data} />
    </>
  );
};

export default ResumeTemplate;
