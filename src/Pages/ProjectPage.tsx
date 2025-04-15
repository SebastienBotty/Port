import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

import "../scss/projectPage.scss";
import Footer from "../Components/Footer";

function ProjectPage() {
  const { projectName } = useParams();
  console.log("render oui oui oui");
  return (
    <div className="project-page">
      <Navbar />
      <Footer />
    </div>
  );
}

export default ProjectPage;
