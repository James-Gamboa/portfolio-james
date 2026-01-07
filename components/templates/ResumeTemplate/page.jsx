"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/organisms/Header/page.jsx";
import ProjectResume from "@/components/molecules/ProjectResume/page.jsx";
import Socials from "@/components/atoms/Socials/page.jsx";
import Button from "@/components/atoms/Button/page.jsx";
import Footer from "@/components/organisms/Footer/page.jsx";

const ResumeTemplate = ({ lang = "en", dict, data }) => {
  const router = useRouter();
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
            <div className="w-full bg-slate-800 max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm">
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <h2 className="text-xl mt-5">{data.resume.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">
                {data.resume.description}
              </h2>
              <div className="mt-2">
                <Socials lang={lang} data={data} />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">
                  {dict?.resume?.experience || "Experience"}
                </h1>
                {data.resume.experiences &&
                  data.resume.experiences.map(
                    ({ id, dates, type, position, bullets }) => (
                      <ProjectResume
                        key={id}
                        dates={dates}
                        type={type}
                        position={position}
                        bullets={bullets}
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
                      <h2 className="text-lg">{edu.universityName}</h2>
                      <h3 className="text-sm opacity-75">
                        {edu.universityDate}
                      </h3>
                      <p className="text-sm mt-2 opacity-50">
                        {edu.universityPara}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="mt-2">
                    <h2 className="text-lg">
                      {data.resume.education.universityName}
                    </h2>
                    <h3 className="text-sm opacity-75">
                      {data.resume.education.universityDate}
                    </h3>
                    <p className="text-sm mt-2 opacity-50">
                      {data.resume.education.universityPara}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">
                  {dict?.resume?.skills || "Skills"}
                </h1>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {data.resume.languages &&
                    data.resume.languages.length > 0 && (
                      <div className="mt-2 mob:mt-5">
                        <h2 className="text-lg">
                          {dict?.resume?.languages || "Languages"}
                        </h2>
                        <ul className="list-disc">
                          {data.resume.languages.map((language, index) => (
                            <li key={index} className="ml-5 py-2">
                              {language}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {data.resume.frameworks &&
                    data.resume.frameworks.length > 0 && (
                      <div className="mt-2 mob:mt-5">
                        <h2 className="text-lg">
                          {dict?.resume?.frameworks || "Frameworks"}
                        </h2>
                        <ul className="list-disc">
                          {data.resume.frameworks.map((framework, index) => (
                            <li key={index} className="ml-5 py-2">
                              {framework}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {data.resume.others && data.resume.others.length > 0 && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">
                        {dict?.resume?.others || "Others"}
                      </h2>
                      <ul className="list-disc">
                        {data.resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer lang={lang} dict={dict} data={data} />
    </>
  );
};

export default ResumeTemplate;
