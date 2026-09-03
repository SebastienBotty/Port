import React, { useEffect, useMemo, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import Navbar from "../Components/Navbar";
import Reveal from "../Components/Reveal";

import PersonalInfos from "../Components/PersonalInfos";
import TechStack from "../Components/TechStack";
import ProjectsContainer from "../Components/ProjectsContainer";
import ExperiencesContainer from "../Components/ExperiencesContainer";
import ContactContainer from "../Components/ContactContainer";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import { scrollToRef } from "../Functions/Utils";

import "../scss/homePage.scss";

const LIGHT_IDS = ["light-1", "light-2", "light-3", "light-4"] as const;
type LightId = (typeof LIGHT_IDS)[number];

interface TrajectoryPoint {
  top: number;
  left: number;
}

type LightTrajectories = {
  [key in LightId]: TrajectoryPoint[];
};

function getRandomNumber(): number {
  return Math.floor(Math.random() * 101);
}

function buildLightTrajectories(): LightTrajectories {
  return {
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
}

const SCROLL_STOPS = [0, 0.33, 0.66, 1];

function useLightPosition(scrollYProgress: MotionValue<number>, trajectory: TrajectoryPoint[]) {
  const top = useTransform(scrollYProgress, SCROLL_STOPS, trajectory.map((p) => `${p.top}%`));
  const left = useTransform(scrollYProgress, SCROLL_STOPS, trajectory.map((p) => `${p.left}%`));
  return { top, left };
}

function HomePage() {
  const homeRef = useRef<HTMLDivElement>(null);
  const personnalInfosRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const refData = location.state;

  useEffect(() => {
    switch (refData) {
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
        window.scrollTo(0, 0);
    }
    // Mount-only by design: this reacts to the location.state the router handed us
    // on navigation, not to live changes in refData.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "Sébastien Botty";
  }, []);

  const trajectories = useMemo(() => buildLightTrajectories(), []);
  const { scrollYProgress } = useScroll();

  const light1 = useLightPosition(scrollYProgress, trajectories["light-1"]);
  const light2 = useLightPosition(scrollYProgress, trajectories["light-2"]);
  const light3 = useLightPosition(scrollYProgress, trajectories["light-3"]);
  const light4 = useLightPosition(scrollYProgress, trajectories["light-4"]);

  const lights: { id: LightId; position: { top: MotionValue<string>; left: MotionValue<string> } }[] = [
    { id: "light-1", position: light1 },
    { id: "light-2", position: light2 },
    { id: "light-3", position: light3 },
    { id: "light-4", position: light4 },
  ];

  return (
    <div className="App glow-background">
      <Navbar
        homeRef={homeRef}
        personalInfosRef={personnalInfosRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />
      <div ref={homeRef}>
        <PersonalInfos />
      </div>
      <Reveal className="reveal-section">
        <div ref={projectsRef}>
          <ProjectsContainer />
        </div>
      </Reveal>
      <Reveal className="reveal-section">
        <TechStack />
      </Reveal>
      <Reveal className="reveal-section">
        <div ref={personnalInfosRef}>
          <ExperiencesContainer />
        </div>
      </Reveal>
      <Reveal className="reveal-section">
        <div ref={contactRef}>
          <ContactContainer />
        </div>
      </Reveal>
      <div className="class-container">
        <Footer
          homeRef={homeRef}
          personalInfosRef={personnalInfosRef}
          projectsRef={projectsRef}
          contactRef={contactRef}
        />
      </div>
      {lights.map(({ id, position }) => (
        <motion.div key={id} className={`light ${id}`} style={position} />
      ))}
    </div>
  );
}

export default HomePage;
