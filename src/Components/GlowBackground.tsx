import React, { CSSProperties, useEffect, useState } from "react";
import "../scss/glowBackground.scss";
type LightSource = {
  id: string;
  color: string;
  size: number;
  blur: number;
  opacity: number;
  x: number; // Position en % (0-100)
  y: number; // Position en % (0-100)
};

const GlowBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [lights, setLights] = useState<LightSource[]>([]);
  const lightsContainer: LightSource[] = [
    // Gros halo rose en haut à gauche
    {
      id: "light-1",
      color: "rgb(190, 52, 52)",
      size: 300,
      blur: 200,
      opacity: 1,
      x: 15,
      y: 20,
    },
    // Lumière cyan en bas à droite
    {
      id: "light-2",
      color: "hsla(180, 80%, 85%, 0.6)",
      size: 250,
      blur: 180,
      opacity: 1,
      x: 80,
      y: 70,
    },
    // Point jaune central
    {
      id: "light-3",
      color: "hsla(50, 100%, 80%, 0.8)",
      size: 150,
      blur: 150,
      opacity: 1,
      x: 50,
      y: 50,
    },
    // Accent violet
    {
      id: "light-4",
      color: "hsla(270, 70%, 80%, 0.5)",
      size: 200,
      blur: 160,
      opacity: 1,
      x: 30,
      y: 60,
    },
  ];

  // Style du conteneur
  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundColor: "#0a0a12",
    overflow: "hidden",
  };

  // Style des lumières
  const lightStyle = (light: LightSource): CSSProperties => ({
    position: "absolute",
    width: `${light.size}px`,
    height: `${light.size}px`,
    borderRadius: "50%",
    background: light.color,
    filter: `blur(${light.blur}px)`,
    left: `${light.x}%`,
    top: `${light.y}%`,
    transform: "translate(-50%, -50%)",
  });

  // Style du contenu
  const contentStyle: CSSProperties = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (lights.length < lightsContainer.length) {
        setLights((prevLights) => [...prevLights, lightsContainer[prevLights.length]]);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [lights, lightsContainer]);

  return (
    <div style={containerStyle}>
      {/* Lumières fixes */}
      {lights.map((light) => (
        <div className="light" key={light.id} style={lightStyle(light)} />
      ))}

      {/* Contenu superposé */}
      <div style={contentStyle}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default GlowBackground;
