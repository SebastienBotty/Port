import React, { useEffect, useRef, useState } from "react";
import { LanguageType } from "./Typescript/Types";
import { getBrowserLanguage } from "./Functions/language";
import { LanguageContext } from "./Contexts/useLanguage";
import "./scss/App.scss";

import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";
import PageNotFound from "./Pages/PageNotFound";
import { pingNotMessenger } from "./backendLoader";

function App() {
  const [language, setLanguage] = useState<LanguageType>(getBrowserLanguage());

  useEffect(() => {
    //Start messenger free backend host by sending it an API call on portfolio loading
    pingNotMessenger();
  }, []);

  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectName" element={<ProjectPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
