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
    <div className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between">
      <div className="text-lg w-2/5">
        <h2>{dates}</h2>
        <h3 className="text-sm opacity-50">{type}</h3>
      </div>
      <div className="w-3/5">
        <h2 className="text-lg font-bold">{position}</h2>
        {summary && (
          <p className="text-sm my-2 opacity-70">{summary}</p>
        )}
        {bulletsLocal.length > 0 && (
          <ul className="list-disc">
            {bulletsLocal.map((bullet, index) => (
              <li key={index} className="text-sm my-1 opacity-70">
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
