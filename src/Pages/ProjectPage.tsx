import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const featuresListRef = useRef<HTMLUListElement>(null);
  const featureRefs = useRef<{ [key: string]: React.RefObject<HTMLLIElement> }>({});

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const project = projectsArr.find((proj) => proj.projectName.EN === projectName);
    if (!project) {
      return;
    }
    setProject(project);
    setActiveFeat(project.features[0]);

    project.features.forEach((feat) => {
      const key = feat.title.EN;
      featureRefs.current[key] = featureRefs.current[key] || React.createRef<HTMLLIElement>();
    });
  }, [projectName]);

  const scrollToFeat = (feat: FeatureType) => {
    setActiveFeat(feat);

    const key = feat.title.EN;
    if (featureRefs.current[key]?.current && featuresListRef.current) {
      const featElement = featureRefs.current[key].current;
      const listElement = featuresListRef.current;

      const elementPosition = featElement.offsetTop;

      const currentScrollTop = listElement.scrollTop;

      const listHeight = listElement.clientHeight;

      const elementTop = elementPosition - currentScrollTop;
      const elementBottom = elementTop + featElement.clientHeight;

      if (elementTop >= 0 && elementBottom <= listHeight) {
        return;
      }

      listElement.scrollTo({
        top: elementPosition - listHeight / 2 + featElement.clientHeight / 2,
        behavior: "smooth",
      });
    }
  };

  if (!project) {
    return <PageNotFound />;
  }

  return (
    <div className="project-page">
      <Navbar />
      <div className="container">
        <div className="title">{projectName}</div>
        <div className="content">
          <ul className="features-list" key={projectName} ref={featuresListRef}>
            {project?.features.length > 0 ? (
              project?.features.map((feat, index) => (
                <li
                  key={feat.title.EN}
                  ref={featureRefs.current[feat.title.EN]}
                  onClick={() => scrollToFeat(feat)}
                  className="feat"
                  style={
                    feat.title[language] === activeFeat?.title[language]
                      ? { filter: "brightness(1)", backdropFilter: "brightness(0.5)" }
                      : ({ "--delay": index * 0.2 + "s" } as React.CSSProperties)
                  }
                >
                  <div className="tiret">-</div> {feat.title[language]}
                </li>
              ))
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "medium" }}> {projectPageText.nothingToShow[language]}</p>
              </div>
            )}
          </ul>
          <div className="details">
            {project?.features.length > 0 ? (
              <>
                <div className="description" key={activeFeat?.title[language]}>
                  <ReactMarkdown>{activeFeat?.description[language]}</ReactMarkdown>
                </div>
                <div className="image">{activeFeat?.image}</div>
              </>
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "medium" }}> {projectPageText.nothingToShow[language]}</p>
              </div>
            )}{" "}
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
