import React, { useEffect, useState } from "react";
import { LanguageType } from "./Typescript/Types";
import { getBrowserLanguage } from "./Functions/language";
import { LanguageContext } from "./Contexts/useLanguage";
import "./scss/App.scss";

import HomePage from "./Pages/HomePage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";
import PageNotFound from "./Pages/PageNotFound";
import { pingNotMessenger } from "./backendLoader";

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const transitionProps = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25, ease: "easeInOut" as const },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...transitionProps}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectName" element={<ProjectPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [language, setLanguage] = useState<LanguageType>(getBrowserLanguage());

  useEffect(() => {
    //Start messenger free backend host by sending it an API call on portfolio loading
    pingNotMessenger();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AnimatedRoutes />
      </LanguageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
