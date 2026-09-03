import React, { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Hero3D from "./Hero3D";
import "../scss/heroVisual.scss";

function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { margin: "200px 0px" });

  if (prefersReducedMotion) {
    return <div ref={containerRef} className="hero-visual hero-visual-static" aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className="hero-visual" aria-hidden="true">
      {isInView && <Hero3D />}
    </div>
  );
}

export default HeroVisual;
