import "../scss/techIcon.scss";

interface TechIconProps {
  icon?: {
    hex: string;
    path: string;
  };
}

const TechIcon = ({ icon }: TechIconProps) => {
  if (!icon) return null;

  return (
    <svg viewBox="0 0 24 24" className="svg-icon" fill={`white`}>
      <path d={icon.path} />
    </svg>
  );
};

export default TechIcon;
