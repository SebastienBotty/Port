import React, { useState } from "react";
import "../scss/personnalInfos.scss";
import { siGithub, siFiles, siMailboxdotorg } from "simple-icons";

import { Flag } from "./Flag";
import { personalInfosText } from "../translations/personalInfos";
import { useLanguageContext } from "../Contexts/useLanguage";
import TechIcon from "./TechIcon";

function PersonnalInfos() {
  const { language, setLanguage } = useLanguageContext();
  const [rotation, setRotation] = useState(0); // État pour la rotation

  const handleMouseEnter = () => {
    const randomRotation = Math.floor(Math.random() * 181) - 90; // Génère un nombre aléatoire entre -60 et 60
    setRotation(randomRotation);
  };
  const handleMouseLeave = () => {
    setRotation(0);
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
          ></div>
          <div className="text-container">
            <div className="big-title-name">Sébastien Botty</div>
            <div className="me-flag">
              {personalInfosText.based[language]} <Flag countryCode="BE" />
            </div>
          </div>
        </div>
        <div className="big-title title-1">FULL STACK</div>
        <div className="big-title title-2">DEVELOPPER</div>{" "}
        <div className="contacts">
          <a href="https://github.com/SebastienBotty" target="_blank" rel="noopener noreferrer">
            <div className="img-container">
              <TechIcon icon={siGithub} size={32} />
            </div>
          </a>

          <div className="img-container">
            <TechIcon icon={siFiles} size={32} />
          </div>
          <div className="img-container">
            <TechIcon icon={siMailboxdotorg} size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonnalInfos;
