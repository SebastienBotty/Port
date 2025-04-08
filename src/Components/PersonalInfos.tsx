import React, { use, useState } from "react";
import "../scss/personnalInfos.scss";
import { Flag } from "./Flag";
import { personalInfosText } from "../translations/personalInfos";
import { useLanguageContext } from "../Contexts/useLanguage";

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
    <div>
      <div className="main-container">
        <div className="me">
          <div
            className="img-container"
            style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            onMouseEnter={handleMouseEnter} // Gère l'événement de survol
            onMouseLeave={handleMouseLeave}
          >
            Yo
          </div>
          <div className="text-container">
            <div className="big-title-name">Sébastien Botty</div>
            <div>
              {personalInfosText.based[language]} <Flag countryCode="BE" />
            </div>
          </div>
        </div>
        <span className="big-title title-1">FULL STACK</span>
        <span className="big-title title-2">DEVELOPPER</span>{" "}
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
        <span className="big-title title-2">DEVELOPPER</span>
      </div>
    </div>
  );
}

export default PersonnalInfos;
