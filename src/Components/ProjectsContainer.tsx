import React from "react";
import { projectsArr, projectsContainerText } from "../translations/projectsContainer";
import Project from "./Project";

import "../scss/projectsContainer.scss";
import { useLanguageContext } from "../Contexts/useLanguage";

function ProjectsContainer() {
  const { language } = useLanguageContext();
  return (
    <div className="projects-container">
      <div className="title">{projectsContainerText.title[language]}</div>
      <div className="projects-wrapper">
        {projectsArr.map((project) => (
          <Project projectData={project} />
        ))}
      </div>{" "}
    </div>
  );
}

export default ProjectsContainer;
