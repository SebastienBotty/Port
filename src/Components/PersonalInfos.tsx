import React, { useState } from "react";
import GlowBackground from "./GlowBackground";
import "../scss/personnalInfos.scss";
import { Flag } from "./Flag";

function PersonnalInfos() {
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
      <GlowBackground>
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
            <span className="big-title-name">Sébastien Botty</span>
            <div>
              <Flag countryCode="BE" />
            </div>
          </div>
          <span className="big-title">FULL STACK DEVELOPPER</span>
        </div>
      </GlowBackground>
    </div>
  );
}

export default PersonnalInfos;
