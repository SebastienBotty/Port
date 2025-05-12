import React, { useState } from "react";
import { siGithub } from "simple-icons";

import TechIcon from "./TechIcon";
import Tooltip from "./Tooltip";
import LinkedInSVG from "./SVG/LinkedInSVG";
import FileSVG from "./SVG/FileSVG";
import { Flag } from "./Flag";
import MailSVG from "./SVG/MailSVG";

import "../scss/personnalInfos.scss";
import { LanguageContext, useLanguageContext } from "../Contexts/useLanguage";

function PersonnalInfos() {
  const { language, setLanguage } = useLanguageContext();

  const [rotation, setRotation] = useState(0); // État pour la rotation
  const [copyMailText, setCopyMailText] = useState("Mail");

  const handleMouseEnter = () => {
    const randomRotation = Math.floor(Math.random() * 181) - 90; // Génère un nombre aléatoire entre -60 et 60
    setRotation(randomRotation);
  };
  const handleMouseLeave = () => {
    setRotation(0);
  };

  const handleMailClick = () => {
    navigator.clipboard
      .writeText("Sebastien.botty@outlook.com")
      .then(() => {
        setCopyMailText(() => {
          return language === "FR" ? "Copié!" : "Copied!";
        });
        setTimeout(() => setCopyMailText("Mail"), 1000);
      })
      .catch((err) => {
        console.error("Erreur lors de la copie :", err);
      });
  };

  return (
    <div className="personal-infos">
      <div className="main-container">
        <div className="me">
          <div
            className="img-container"
            style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            onMouseEnter={handleMouseEnter} // Gère l'événement de survol
            onMouseLeave={handleMouseLeave}
          >
            <div className="img-flag">
              {" "}
              <Flag countryCode="BE" />
            </div>
          </div>
          <div className="text-container">
            <div className="big-title-name">Sébastien Botty</div>
            <div className="me-flag">FR/EN</div>
          </div>
        </div>
        <div className="big-title title-1">FULL STACK</div>
        <div className="big-title title-2">DEVELOPPER</div>{" "}
        <div className="contacts">
          <a href="https://github.com/SebastienBotty" target="_blank" rel="noopener noreferrer">
            <div className="img-container reflect">
              <TechIcon icon={siGithub} />
            </div>
            <Tooltip text="GitHub" />
          </a>
          <a
            href={`/files/CV-Sebastien-Botty-${language}.pdf`}
            download={`CV-Sebastien-Botty-${language}`}
          >
            <div className="img-container reflect">
              <FileSVG />
            </div>
            <Tooltip text="CV" />
          </a>
          <a onClick={handleMailClick}>
            <div className="img-container reflect">
              <MailSVG />
            </div>
            <Tooltip text={copyMailText} />
          </a>
          <a
            href="https://www.linkedin.com/in/s%C3%A9bastien-botty-3338b714b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="img-container reflect">
              <LinkedInSVG />
            </div>
            <Tooltip text="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default PersonnalInfos;
