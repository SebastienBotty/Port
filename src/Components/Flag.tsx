import { LanguageType } from "../Typescript/Types";
import "../scss/flag.scss";

export const Flag = ({ countryCode }: { countryCode: LanguageType | "BE" }) => {
  return <img src={`/flags/${countryCode}-flag.svg`} alt={countryCode} className="flag" />;
};
