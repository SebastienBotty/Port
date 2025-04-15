import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

import "../scss/projectPage.scss";
import Footer from "../Components/Footer";
import { projectsArr } from "../translations/projectsContainer";
import PageNotFound from "./PageNotFound";

function ProjectPage() {
  const { projectName } = useParams();
  const project = projectsArr.find((proj) => proj.projectName.EN === projectName);
  if (!project) return <PageNotFound />;
  console.log("render oui oui oui");
  return (
    <div className="project-page">
      <Navbar />
      <Footer />
    </div>
  );
}

export default ProjectPage;
