import React from "react";
import "../scss/techStack.scss";
import { useLanguageContext } from "../Contexts/useLanguage";
import { techStackText } from "../translations/techStack";
import { technologies } from "../Constants/techStack";
import TechIcon from "./TechIcon";
import TechContainer from "./TechContainer";

function TechStack() {
  const { language, setLanguage } = useLanguageContext();

  return (
    <div className="tech-stack">
      <div className="title">Tech Stack</div>
      <div className="smaller-title">{techStackText.mostUsed[language]}</div>
      <div className="dev-stack-container">
        {technologies
          .filter((item) => item.mostUsed === true)
          .map((tech) => (
            <TechContainer tech={tech} />
          ))}
        <div className="tech-container">RESTAPI</div>
      </div>
      <div className="smaller-title">{techStackText.workedWith[language]}</div>
      <div className="dev-stack-container">
        {technologies
          .filter((item) => item.mostUsed === false)
          .map((tech) => (
            <div className="tech-container">
              {" "}
              <TechIcon icon={tech.icon} /> {tech.name}{" "}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TechStack;
