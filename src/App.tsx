import React, { useEffect, useRef, useState } from "react";
import { LanguageType } from "./Typescript/Types";
import { getBrowserLanguage } from "./Functions/language";
import { LanguageContext } from "./Contexts/useLanguage";
import "./scss/App.scss";

import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";
import PageNotFound from "./Pages/PageNotFound";

interface LightPosition {
  id: string;
  top: string;
  left: string;
}

interface TrajectoryPoint {
  top: number;
  left: number;
}

const LIGHT_IDS = ["light-1", "light-2", "light-3", "light-4"] as const;
type LightId = (typeof LIGHT_IDS)[number];

interface TrajectoryPoint {
  top: number;
  left: number;
}

// Utilisez le type LightId pour les clés
type LightTrajectories = {
  [key in LightId]: TrajectoryPoint[];
};

// Définissez les trajectoires en utilisant le type

function App() {
  const [language, setLanguage] = useState<LanguageType>(getBrowserLanguage());

  function getRandomNumber(): number {
    return Math.floor(Math.random() * 101);
  }

  const LIGHT_TRAJECTORIES: LightTrajectories = {
    "light-1": [
      { top: 20, left: 15 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
    "light-2": [
      { top: 70, left: 80 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
    "light-3": [
      { top: 50, left: 50 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
    "light-4": [
      { top: 60, left: 30 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
  };

  const [lights, setLights] = useState<LightPosition[]>(
    LIGHT_IDS.map((id) => ({
      id,
      top: `${LIGHT_TRAJECTORIES[id][0].top}%`,
      left: `${LIGHT_TRAJECTORIES[id][0].left}%`,
    }))
  );

  useEffect(() => {
    document.title = "Sébastien Botty";
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / totalHeight, 1);

      setLights((prevLights) =>
        prevLights.map((light) => {
          const trajectory = LIGHT_TRAJECTORIES[light.id as LightId];
          if (!trajectory) return light;

          // Déterminer entre quels points nous sommes
          let segment = 0;
          let localProgress = 0;

          if (scrollProgress < 0.33) {
            segment = 0;
            localProgress = scrollProgress / 0.33;
          } else if (scrollProgress < 0.66) {
            segment = 1;
            localProgress = (scrollProgress - 0.33) / 0.33;
          } else {
            segment = 2;
            localProgress = (scrollProgress - 0.66) / 0.34;
          }

          // Interpolation entre les points du segment actuel
          const start = trajectory[segment];
          const end = trajectory[segment + 1];

          if (!start || !end) return light;

          const newTop = start.top + (end.top - start.top) * localProgress;
          const newLeft = start.left + (end.left - start.left) * localProgress;

          return {
            ...light,
            top: `${newTop}%`,
            left: `${newLeft}%`,
          };
        })
      );
    };

    const debouncedScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
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
      {lights.map((light) => (
        <div
          key={light.id}
          className={`light ${light.id}`}
          style={{
            top: light.top,
            left: light.left,
          }}
        />
      ))}
    </BrowserRouter>
  );
}

export default App;
