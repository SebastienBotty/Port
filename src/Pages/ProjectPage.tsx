import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "../Components/Navbar";

import "../scss/projectPage.scss";
import Footer from "../Components/Footer";
import { projectsArr } from "../translations/projectsContainer";
import PageNotFound from "./PageNotFound";
import { useLanguageContext } from "../Contexts/useLanguage";
import { FeatureType, ProjectType } from "../Typescript/Types";
import { projectPageText } from "../translations/projectPage";

function ProjectPage() {
  const { projectName } = useParams();
  const { language } = useLanguageContext();
  const [activeFeat, setActiveFeat] = useState<FeatureType | undefined>(undefined);
  const [project, setProject] = useState<ProjectType | undefined>(undefined);

  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Fait défiler la page vers le haut

    const project = projectsArr.find((proj) => proj.projectName.EN === projectName);
    if (!project) {
      return;
    }
    setProject(project);
    setActiveFeat(project.features[0]);
  }, [projectName]);

  if (!project) {
    return <PageNotFound />;
  }

  return (
    <div className="project-page">
      <Navbar />
      <div className="container">
        <div className="title">{projectName}</div>
        <div className="content">
          <ul className="features-list">
            {project?.features.map((feat, index) => (
              <li
                onClick={() => setActiveFeat(feat)}
                className="feat"
                style={
                  feat.title[language] === activeFeat?.title[language]
                    ? { filter: "brightness(1)" }
                    : ({ "--delay": index * 0.2 + "s" } as React.CSSProperties)
                }
              >
                <div className="tiret">-</div> {feat.title[language]}
              </li>
            ))}
          </ul>
          <div className="details">
            <div className="description" key={activeFeat?.title[language]}>
              <ReactMarkdown>{activeFeat?.description[language]}</ReactMarkdown>
            </div>
            <div className="image">{activeFeat?.image}</div>
          </div>
        </div>
        <div className="other-projects">
          <div className="title"> {projectPageText.otherProjects[language]}</div>
          <div className="other-projects-container">
            {" "}
            {projectsArr
              .filter((proj) => proj.projectName.EN !== project.projectName.EN)
              .sort((a, b) => a.projectName[language].localeCompare(b.projectName[language]))
              .map((proj) => (
                <Link to={"/project/" + proj.projectName.EN} className="proj-name">
                  {proj.projectName[language]}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectPage;
