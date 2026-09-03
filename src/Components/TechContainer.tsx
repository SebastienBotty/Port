import React from "react";
import { motion } from "framer-motion";
import { TechnologyType } from "../Typescript/Types";
import TechIcon from "./TechIcon";

import "../scss/techContainer.scss";

function TechContainer({ tech, showIcon = true }: { tech: TechnologyType; showIcon?: boolean }) {
  return (
    <motion.div
      className="tech-container"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {showIcon && <TechIcon icon={tech.icon} />} {tech.name}{" "}
    </motion.div>
  );
}

export default TechContainer;
