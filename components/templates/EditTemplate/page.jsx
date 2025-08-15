"use client";
import React, { useState } from "react";
import Button from "@/components/atoms/Button/page.jsx";
import Header from "@/components/organisms/Header/page.jsx";
import { v4 as uuidv4 } from "uuid";
import { getPortfolioData } from "@/utils/data.js";

const EditTemplate = () => {
  const [data, setData] = useState(null);
  const [currentTabs, setCurrentTabs] = useState("HEADER");
  const [currentLang, setCurrentLang] = useState("en");

  React.useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1];
    const lang = ["en", "es"].includes(pathLang) ? pathLang : "en";
    setCurrentLang(lang);

    getPortfolioData(lang).then(setData);
  }, []);

  const saveData = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const editProjects = (projectIndex, editProject) => {
    let copyProjects = data.projects;
    copyProjects[projectIndex] = { ...editProject };
    setData({ ...data, projects: copyProjects });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...data.projects,
        {
          id: uuidv4(),
          title: "New Project",
          description: "Web Design & Development",
          imageSrc:
            "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAyfHxwYXN0ZWx8ZW58MHx8MHw%3D&auto=format&fit=crop&w=400&q=60",
          url: "http://chetanverma.com/",
        },
      ],
    });
  };

  const deleteProject = (id) => {
    let copyProjects = data.projects.filter((project) => project.id !== id);
    setData({ ...data, projects: copyProjects });
  };

  const editServices = (serviceIndex, editService) => {
    let copyServices = data.services;
    copyServices[serviceIndex] = { ...editService };
    setData({ ...data, services: copyServices });
  };

  const addService = () => {
    setData({
      ...data,
      services: [
        ...data.services,
        {
          id: uuidv4(),
          title: "New Service",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    });
  };

  const deleteService = (id) => {
    let copyServices = data.services.filter((service) => service.id !== id);
    setData({ ...data, services: copyServices });
  };

  const editSocials = (socialIndex, editSocial) => {
    let copySocials = data.socials;
    copySocials[socialIndex] = { ...editSocial };
    setData({ ...data, socials: copySocials });
  };

  const addSocials = () => {
    setData({
      ...data,
      socials: [
        ...data.socials,
        {
          id: uuidv4(),
          title: "New Link",
          link: "www.chetanverma.com",
        },
      ],
    });
  };

  const deleteSocials = (id) => {
    let copySocials = data.socials.filter((social) => social.id !== id);
    setData({ ...data, socials: copySocials });
  };

  const handleAddExperiences = () => {
    setData({
      ...data,
      resume: {
        ...data.resume,
        experiences: [
          ...data.resume.experiences,
          {
            id: uuidv4(),
            dates: "Enter Dates",
            type: "Full Time",
            position: "Frontend Engineer at X",
            bullets: ["Worked on the frontend of a React application"],
          },
        ],
      },
    });
  };

  const handleEditExperiences = (index, editExperience) => {
    let copyExperiences = data.resume.experiences;
    copyExperiences[index] = { ...editExperience };
    setData({
      ...data,
      resume: { ...data.resume, experiences: copyExperiences },
    });
  };

  return (
    <div className="container mx-auto">
      <Header isBlog></Header>
      <div className="mt-10">
        <div className="bg-transparent">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">Dashboard</h1>
            <div className="flex items-center">
              <Button onClick={saveData} type="primary">
                Save
              </Button>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              onClick={() => setCurrentTabs("HEADER")}
              type={currentTabs === "HEADER" && "primary"}
            >
              Header
            </Button>
            <Button
              onClick={() => setCurrentTabs("PROJECTS")}
              type={currentTabs === "PROJECTS" && "primary"}
            >
              Projects
            </Button>
            <Button
              onClick={() => setCurrentTabs("SERVICES")}
              type={currentTabs === "SERVICES" && "primary"}
            >
              Services
            </Button>
            <Button
              onClick={() => setCurrentTabs("ABOUT")}
              type={currentTabs === "ABOUT" && "primary"}
            >
              About
            </Button>
            <Button
              onClick={() => setCurrentTabs("SOCIAL")}
              type={currentTabs === "SOCIAL" && "primary"}
            >
              Social
            </Button>
            <Button
              onClick={() => setCurrentTabs("RESUME")}
              type={currentTabs === "RESUME" && "primary"}
            >
              Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;
