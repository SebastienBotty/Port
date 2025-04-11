import React from "react";
import "../scss/footer.scss";
import { navBarText } from "../translations/navBarText";
import { useLanguageContext } from "../Contexts/useLanguage";
import { RefProps } from "../Typescript/Types";
import { scrollToRef } from "../Functions/Utils";

function Footer({ homeRef, personalInfosRef, projectsRef, contactRef }: RefProps) {
  const { language } = useLanguageContext();
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="links">
          <ul>
            <a href="https://github.com/SebastienBotty" target="_blank" rel="noopener noreferrer">
              <li>
                <a></a>GitHub
              </li>
            </a>
            <li>LinkedIn</li>
            <li>Instagram</li>
            <li></li>
          </ul>{" "}
          <ul>
            <li onClick={() => scrollToRef(homeRef)}>{navBarText.home[language]}</li>
            <li onClick={() => scrollToRef(personalInfosRef)}>{navBarText.about[language]}</li>
            <li onClick={() => scrollToRef(projectsRef)}>{navBarText.projects[language]}</li>
            <li onClick={() => scrollToRef(contactRef)}>{navBarText.contacts[language]}</li>
          </ul>
        </div>
        <div className="my-name">
          <div>Botty</div>
          <div>Sébastien</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
