"use client";
import React from "react";

const ProjectResume = ({
  dates,
  type,
  position,
  summary,
  bullets,
  featuredProjects,
  featuredProjectsLabel = "Featured Projects",
}) => {
  const bulletsLocal = Array.isArray(bullets)
    ? bullets
    : typeof bullets === "string"
      ? bullets.split(",")
      : [];

  return (
    <div className="mt-5 flex w-full min-w-0 flex-col gap-3 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-6">
      <div className="w-full shrink-0 text-base tablet:w-[38%] tablet:max-w-[220px] laptop:text-lg">
        <h2 className="break-words">{dates}</h2>
        <h3 className="text-sm opacity-50">{type}</h3>
      </div>
      <div className="min-w-0 w-full flex-1 tablet:w-auto">
        <h2 className="text-base font-bold break-words laptop:text-lg">
          {position}
        </h2>
        {summary && (
          <p className="my-2 text-sm opacity-70 break-words">{summary}</p>
        )}
        {bulletsLocal.length > 0 && (
          <ul className="list-disc pl-5">
            {bulletsLocal.map((bullet, index) => (
              <li key={index} className="my-1 text-sm opacity-70 break-words">
                {bullet}
              </li>
            ))}
          </ul>
        )}
        {featuredProjects && featuredProjects.length > 0 && (
          <div className="mt-4">
            <h3 className="text-base font-semibold opacity-90">
              {featuredProjectsLabel}
            </h3>
            <ul className="list-disc mt-2">
              {featuredProjects.map((project, index) => (
                <li key={index} className="text-sm my-1 opacity-70 ml-5">
                  {typeof project === "string" ? project : project.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectResume;
