import React from "react";
import "../scss/techStack.scss";
import { useLanguageContext } from "../Contexts/useLanguage";
import { techStackText } from "../translations/techStack";
import {
  siGit,
  siGithub,
  siJavascript,
  siTypescript,
  siPython,
  siReact,
  siHtml5,
  siCss3,
  siNodedotjs,
  siExpress,
  siMongodb,
  siMongoose,
  siSocketdotio,
  siFirebase,
  siSass,
  siAngular,
  siSqlite,
  siPostgresql,
  siMysql,
  siAmazonwebservices,
  siRaspberrypi,
} from "simple-icons";
import TechIcon from "./TechIcon";

interface Technology {
  name: string;
  icon: typeof siJavascript;
  mostUsed: boolean;
}
function TechStack() {
  const { language, setLanguage } = useLanguageContext();

  const technologies: Technology[] = [
    { name: "JavaScript", icon: siJavascript, mostUsed: true },
    { name: "TypeScript", icon: siTypescript, mostUsed: true },
    { name: "React", icon: siReact, mostUsed: true },
    { name: "ReactNative", icon: siReact, mostUsed: true },

    { name: "HTML5", icon: siHtml5, mostUsed: true },
    { name: "CSS3", icon: siCss3, mostUsed: true },
    { name: "Node.js", icon: siNodedotjs, mostUsed: true },
    { name: "MongoDB", icon: siMongodb, mostUsed: true },
    { name: "Mongoose", icon: siMongoose, mostUsed: true },
    { name: "Express", icon: siExpress, mostUsed: true },
    { name: "Socket.io", icon: siSocketdotio, mostUsed: true },
    { name: "Git", icon: siGit, mostUsed: true },
    { name: "GitHub", icon: siGithub, mostUsed: true },
    { name: "Firebase: Auth", icon: siFirebase, mostUsed: true },
    { name: "AWS: S3", icon: siAmazonwebservices, mostUsed: true },
    { name: "Python", icon: siPython, mostUsed: false },

    { name: "Sass", icon: siSass, mostUsed: false },
    { name: "Angular", icon: siAngular, mostUsed: false },
    { name: "PostgreSQL", icon: siPostgresql, mostUsed: false },
    { name: "MySQL", icon: siMysql, mostUsed: false },
    { name: "SQLite", icon: siSqlite, mostUsed: false },
    { name: "AWS: SNS/SQS", icon: siAmazonwebservices, mostUsed: false },
    { name: "RaspberryPi", icon: siRaspberrypi, mostUsed: false },
  ];

  return (
    <div className="tech-stack">
      <div className="title">Tech Stack</div>
      <div className="smaller-title">{techStackText.mostUsed[language]}</div>
      <div className="dev-stack-container">
        {technologies
          .filter((item) => item.mostUsed === true)
          .map((tech) => (
            <div className="tech-container">
              {" "}
              <TechIcon icon={tech.icon} /> {tech.name}{" "}
            </div>
          ))}
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
