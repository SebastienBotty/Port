import React from "react";
import { ProjectType, TechnologyType } from "../Typescript/Types";
import { useLanguageContext } from "../Contexts/useLanguage";
import { technologies } from "../Constants/techStack";
import "../scss/project.scss";
import TechContainer from "./TechContainer";
import { projectText } from "../translations/project";
import { Link } from "react-router-dom";

function Project({ projectData }: { projectData: ProjectType }) {
  const { language, setLanguage } = useLanguageContext();

  const renderTechs = () => {
    const usedTechs = projectData.stack.map((tech) => {
      return technologies.find((item) => item.name === tech);
    });
    const filteredTechs = usedTechs.filter((item): item is TechnologyType => item !== undefined); // Type guard
    return filteredTechs.map((item) => <TechContainer tech={item} showIcon={false} />);
  };

  return (
    <Link to={"/project/" + projectData.projectName.EN}>
      <div className="project">
        <div className="image-container">
          <img src={projectData.image} />
        </div>
        <div className="infos">
          <div className="first-line">
            {" "}
            <div className="name">{projectData.projectName[language]}</div>
            <div className="discover">
              {projectText.discover[language]}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" />
              </svg>
            </div>
          </div>
          <div className="description">{projectData.description[language]}</div>
          <div className="stack">{renderTechs()}</div>
        </div>
      </div>
    </Link>
  );
}

export default Project;
