import React, { useEffect, useRef, useState } from "react";

import Navbar from "../Components/Navbar";

import PersonalInfos from "../Components/PersonalInfos";
import TechStack from "../Components/TechStack";
import ProjectsContainer from "../Components/ProjectsContainer";
import ExperiencesContainer from "../Components/ExperiencesContainer";
import ContactContainer from "../Components/ContactContainer";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import { scrollToRef } from "../Functions/Utils";

function HomePage() {
  const homeRef = useRef<HTMLDivElement>(null);
  const personnalInfosRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  let refData = location.state;

  useEffect(() => {
    console.log(refData);
    switch (refData) {
      case "home":
        window.scrollTo(0, 0); // Fait défiler la page vers le haut
        break;
      case "perso":
        scrollToRef(personnalInfosRef);
        break;
      case "projects":
        scrollToRef(projectsRef);
        break;
      case "contact":
        scrollToRef(contactRef);
        break;
      default:
        window.scrollTo(0, 0); // Fait défiler la page vers le haut
    }
  }, []);
  // Positions initiales et finales pour chaque lumière

  return (
    <div className="App glow-background">
      <Navbar
        homeRef={homeRef}
        personalInfosRef={personnalInfosRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />
      <div ref={homeRef}>
        {" "}
        <PersonalInfos />
      </div>
      <div ref={personnalInfosRef} className="class-container">
        <ExperiencesContainer />
      </div>
      <div className="class-container">
        {" "}
        <TechStack />
      </div>
      <div ref={projectsRef} className="class-container">
        <ProjectsContainer />
      </div>
      <div ref={contactRef} className="class-container">
        <ContactContainer />
      </div>
      <div className="class-container">
        {" "}
        <Footer
          homeRef={homeRef}
          personalInfosRef={personnalInfosRef}
          projectsRef={projectsRef}
          contactRef={contactRef}
        />
      </div>
    </div>
  );
}

export default HomePage;
