import React, { useState } from "react";

import "./scss/App.scss";
import Navbar from "./Components/Navbar";
import { LanguageType } from "./Typescript/Types";
import { getBrowserLanguage } from "./Functions/language";
import { LanguageContext } from "./Contexts/useLanguage";
import PersonalInfos from "./Components/PersonalInfos";

function App() {
  const [language, setLanguage] = useState<LanguageType>(getBrowserLanguage());

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="App">
        <Navbar />
        <PersonalInfos />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
