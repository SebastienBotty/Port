import React from "react";
import { projectsArr } from "../translations/projectsContainer";
import Project from "./Project";

import "../scss/projectsContainer.scss";

function ProjectsContainer() {
  console.log("ICICICICICICICICICICICI");
  console.log(projectsArr);
  return (
    <div className="projects-container">
      {projectsArr.map((project) => (
        <Project projectData={project} />
      ))}
    </div>
  );
}

export default ProjectsContainer;
