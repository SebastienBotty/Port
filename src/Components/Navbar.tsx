import React, { useState } from "react";
import { motion } from "framer-motion";
import "../scss/navBar.scss";

import { navBarText } from "../translations/navBarText";
import { useLanguageContext } from "../Contexts/useLanguage";
import { Flag } from "./Flag";
import { ALL_LANGUAGES } from "../Constants/Languages";
import { LanguageType, RefProps } from "../Typescript/Types";
import { scrollToRef } from "../Functions/Utils";
import { useNavigate } from "react-router-dom";

const Navbar = ({ homeRef, personalInfosRef, projectsRef, contactRef }: RefProps) => {
  const { language, setLanguage } = useLanguageContext();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageClick = (lang: LanguageType) => {
    toggleDropdown();
    setLanguage(lang);
  };

  const handleClick = (refName: string, ref?: React.RefObject<HTMLDivElement | null>) => {
    if (ref) scrollToRef(ref);
    else {
      navigate("/", { state: refName });
    }
  };

  return (
    <div className="nav-bar">
      <div className="routes-container">
        <motion.div
          className="title"
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("home", homeRef)}
        >
          {navBarText.home[language]}
        </motion.div>
        <motion.div
          className="title"
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("projects", projectsRef)}
        >
          {navBarText.projects[language]}
        </motion.div>
        <motion.div
          className="title"
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("perso", personalInfosRef)}
        >
          {navBarText.about[language]}
        </motion.div>

        <motion.div
          className="title"
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("contact", contactRef)}
        >
          {navBarText.contacts[language]}
        </motion.div>
      </div>

      <div className="select-language selected-language">
        <div className="language-flag" onClick={toggleDropdown}>
          <Flag countryCode={language} />
        </div>
        <div className={`dropdown-menu `}>
          {ALL_LANGUAGES.filter((item) => item !== language).map((unselectedLanguage) => {
            return (
              <div
                className="language-flag"
                key={unselectedLanguage}
                onClick={() => handleLanguageClick(unselectedLanguage)}
              >
                <Flag countryCode={unselectedLanguage} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
