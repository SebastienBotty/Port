interface TechIconProps {
  icon: {
    hex: string;
    path: string;
  };
  size?: number;
}

const TechIcon = ({ icon, size = 24 }: TechIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={`white`}>
    <path d={icon.path} />
  </svg>
);

export default TechIcon;
