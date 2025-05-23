import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { projectsArr } from "../translations/projectsContainer";
import PageNotFound from "./PageNotFound";
import { useLanguageContext } from "../Contexts/useLanguage";
import { FeatureType, ProjectType } from "../Typescript/Types";
import { projectPageText } from "../translations/projectPage";

import "../scss/projectPage.scss";

function ProjectPage() {
  const { projectName } = useParams();
  const { language } = useLanguageContext();
  const [activeFeat, setActiveFeat] = useState<FeatureType | undefined>(undefined);
  const [project, setProject] = useState<ProjectType | undefined>(undefined);
  const featuresListRef = useRef<HTMLUListElement>(null);
  const featureRefs = useRef<{ [key: string]: React.RefObject<HTMLLIElement> }>({});

  const [isZoomed, setIsZoomed] = useState<string>("");

  const handleImgClick = (img: string) => {
    isZoomed === img ? setIsZoomed("") : setIsZoomed(img);
  };

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

      listElement.scrollTo({
        top: elementPosition - listHeight / 2,
        behavior: "smooth",
      });
    }
  };

  const lights = [{ id: "light-1" }, { id: "light-2" }, { id: "light-3" }, { id: "light-4" }];

  useEffect(() => {
    document.title = "Sébastien Botty - " + projectName;
    return () => {};
  }, []);

  if (!project) {
    return <PageNotFound />;
  }

  return (
    <div className="project-page">
      <Navbar />
      <div className="container">
        <div className="title">
          {projectName}{" "}
          {project.state.EN === "In progress" && (
            <span className="in-progress">({project.state[language]}...)</span>
          )}
        </div>

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
                <p className="nothing-to-show"> {projectPageText.nothingToShow[language]}</p>
              </div>
            )}
          </ul>
          <div className="details">
            {project?.features.length > 0 ? (
              <>
                <div className="description" key={activeFeat?.title[language]}>
                  <ReactMarkdown>{activeFeat?.description[language]}</ReactMarkdown>
                </div>
                <div className="images-container">
                  {activeFeat?.image && (
                    <div className="images-content" key={activeFeat?.title[language]}>
                      {activeFeat.image.map((img, index) => {
                        if (activeFeat.title.EN === "Tell users I've arrived to my destination") {
                          return <div key={index}>Fix in progress...</div>;
                        }
                        return (
                          <div>
                            <img
                              src={img.src}
                              onClick={() => handleImgClick(img.src)}
                              className={`${isZoomed === img.src ? "zoomed" : ""}`}
                              alt={img.desc[language]}
                            />

                            <span style={{ margin: "0.5rem" }}>{img.desc[language]}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
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
                <p className="nothing-to-show">{projectPageText.nothingToShow[language]}</p>
              </div>
            )}
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
      {lights.map((light) => (
        <div key={light.id} className={`light ${light.id}`} />
      ))}
      <Footer />
    </div>
  );
}

export default ProjectPage;
