import React, { useEffect, useState } from "react";

import "./scss/App.scss";
import Navbar from "./Components/Navbar";
import { LanguageType } from "./Typescript/Types";
import { getBrowserLanguage } from "./Functions/language";
import { LanguageContext } from "./Contexts/useLanguage";
import PersonalInfos from "./Components/PersonalInfos";
import TechStack from "./Components/TechStack";

function App() {
  const [language, setLanguage] = useState<LanguageType>(getBrowserLanguage());
  const [lights, setLights] = useState([
    { id: "light-1", top: "20%", left: "15%" },
    { id: "light-2", top: "70%", left: "80%" },
    { id: "light-3", top: "50%", left: "50%" },
    { id: "light-4", top: "60%", left: "30%" },
  ]);

  const swapLights = () => {
    console.log("ALLLLO ALLOALOALOA");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="App glow-background">
        <Navbar />
        <PersonalInfos />
        <TechStack />
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
