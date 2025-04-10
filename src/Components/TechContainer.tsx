import React from "react";
import { TechnologyType } from "../Typescript/Types";
import TechIcon from "./TechIcon";

import "../scss/techContainer.scss";

function TechContainer({ tech, showIcon = true }: { tech: TechnologyType; showIcon?: boolean }) {
  return (
    <div className="tech-container">
      {showIcon && <TechIcon icon={tech.icon} />} {tech.name}{" "}
    </div>
  );
}

export default TechContainer;
