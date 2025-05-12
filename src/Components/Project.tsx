import React from "react";
import { ProjectType, TechnologyType } from "../Typescript/Types";
import { useLanguageContext } from "../Contexts/useLanguage";
import { technologies } from "../Constants/techStack";
import TechContainer from "./TechContainer";
import { projectText } from "../translations/project";
import { Link } from "react-router-dom";
import { siGithub } from "simple-icons";
import TechIcon from "./TechIcon";
import ClipBoardSVG from "./SVG/ClipBoardSVG";
import GlobeSVG from "./SVG/GlobeSVG";

import "../scss/project.scss";
import Tooltip from "./Tooltip";

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
    <div className="project">
      <div className="image-container">
        <img src={projectData.image} />
      </div>
      <div className="infos">
        <div className="first-line">
          {" "}
          <div className="name">{projectData.projectName[language]}</div>
        </div>
        <div className="description">{projectData.description[language]}</div>
        <div className="stack">{renderTechs()}</div>
        <div className="icons-link">
          {projectData.code && (
            <>
              <a
                className="icon-container"
                href={projectData.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tooltip text="Code" />

                <TechIcon icon={siGithub} />
              </a>
            </>
          )}
          {projectData.desc && (
            <>
              <Link className="icon-container" to={"/project/" + projectData.projectName.EN}>
                <Tooltip text="Description" />

                <ClipBoardSVG />
              </Link>{" "}
            </>
          )}
          {projectData.site && (
            <a
              href={projectData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-container"
            >
              <Tooltip text="Site" />
              <GlobeSVG />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;
