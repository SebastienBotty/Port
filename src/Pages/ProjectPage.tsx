import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

import "../scss/projectPage.scss";
import Footer from "../Components/Footer";
import { projectsArr } from "../translations/projectsContainer";
import PageNotFound from "./PageNotFound";
import { useLanguageContext } from "../Contexts/useLanguage";
import { FeatureType, ProjectType } from "../Typescript/Types";

function ProjectPage() {
  const { projectName } = useParams();
  const { language } = useLanguageContext();
  const [activeFeat, setActiveFeat] = useState<FeatureType | undefined>(undefined);
  const [project, setProject] = useState<ProjectType | undefined>(undefined);

  useEffect(() => {
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
              {activeFeat?.description[language]}
            </div>
            <div className="image">{activeFeat?.image}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectPage;
