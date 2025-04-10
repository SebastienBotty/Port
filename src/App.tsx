import React, { useEffect, useRef, useState } from "react";

import "./scss/App.scss";
import Navbar from "./Components/Navbar";
import { LanguageType } from "./Typescript/Types";
import { getBrowserLanguage } from "./Functions/language";
import { LanguageContext } from "./Contexts/useLanguage";
import PersonalInfos from "./Components/PersonalInfos";
import TechStack from "./Components/TechStack";
import ProjectsContainer from "./Components/ProjectsContainer";
import ExperiencesContainer from "./Components/ExperiencesContainer";
import ContactContainer from "./Components/ContactContainer";

function App() {
  const [language, setLanguage] = useState<LanguageType>(getBrowserLanguage());
  const [lights, setLights] = useState([
    { id: "light-1", top: "20%", left: "15%" },
    { id: "light-2", top: "70%", left: "80%" },
    { id: "light-3", top: "50%", left: "50%" },
    { id: "light-4", top: "60%", left: "30%" },
  ]);
  const personnalInfosRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const swapLights = () => {
    console.log("ALLLLO ALLOALOALOA");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="App glow-background">
        <Navbar
          personalInfosRef={personnalInfosRef as React.RefObject<HTMLDivElement>}
          projectsRef={projectsRef as React.RefObject<HTMLDivElement>}
          contactRef={contactRef as React.RefObject<HTMLDivElement>}
        />{" "}
        <div>
          {" "}
          <PersonalInfos />{" "}
        </div>
        <div ref={personnalInfosRef}>
          <ExperiencesContainer />{" "}
        </div>
        <div>
          <TechStack />{" "}
        </div>
        <div ref={projectsRef}>
          <ProjectsContainer />
        </div>
        <div ref={contactRef}>
          <ContactContainer />
        </div>
        {lights.map((light) => (
          <div
            key={light.id}
            className={`light ${light.id}`}
            style={{ top: light.top, left: light.left }}
          />
        ))}
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
