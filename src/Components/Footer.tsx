import React from "react";
import "../scss/footer.scss";
import { navBarText } from "../translations/navBarText";
import { useLanguageContext } from "../Contexts/useLanguage";
import { RefProps } from "../Typescript/Types";
import { scrollToRef } from "../Functions/Utils";
import { useNavigate } from "react-router-dom";

function Footer({ homeRef, personalInfosRef, projectsRef, contactRef }: RefProps) {
  const { language } = useLanguageContext();
  const navigate = useNavigate();

  const handleClick = (refName: string, ref?: React.RefObject<HTMLDivElement | null>) => {
    if (ref) scrollToRef(ref);
    else {
      navigate("/", { state: refName });
    }
  };
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="links">
          <ul>
            <li>
              <a href="https://github.com/SebastienBotty" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/s%C3%A9bastien-botty-3338b714b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>{" "}
          <ul>
            <li onClick={() => handleClick("home", homeRef)}>{navBarText.home[language]}</li>
            <li onClick={() => handleClick("projects", projectsRef)}>
              {navBarText.projects[language]}
            </li>
            <li onClick={() => handleClick("perso", personalInfosRef)}>
              {navBarText.about[language]}
            </li>

            <li onClick={() => handleClick("contact", contactRef)}>
              {navBarText.contacts[language]}
            </li>
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
