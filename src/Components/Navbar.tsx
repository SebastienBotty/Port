import React, { useState } from "react";
import "../scss/navBar.scss";

import { navBarText } from "../translations/navBarText";
import { useLanguageContext } from "../Contexts/useLanguage";
import { Flag } from "./Flag";
import { ALL_LANGUAGES } from "../Constants/Languages";
import { LanguageType, RefProps } from "../Typescript/Types";
import { scrollToRef } from "../Functions/Utils";

const Navbar = ({ homeRef, personalInfosRef, projectsRef, contactRef }: RefProps) => {
  const { language, setLanguage } = useLanguageContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageClick = (lang: LanguageType) => {
    toggleDropdown();
    setLanguage(lang);
  };

  return (
    <div className="nav-bar">
      <div className="routes-container">
        <div className="title" onClick={() => scrollToRef(homeRef)}>
          {navBarText.home[language]}
        </div>
        <div className="title" onClick={() => scrollToRef(personalInfosRef)}>
          {navBarText.about[language]}
        </div>
        <div className="title" onClick={() => scrollToRef(projectsRef)}>
          {navBarText.projects[language]}
        </div>
        <div className="title" onClick={() => scrollToRef(contactRef)}>
          {navBarText.contacts[language]}
        </div>
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
