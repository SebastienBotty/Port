import { LanguageType } from "../Typescript/Types";

export const Flag = ({ countryCode }: { countryCode: LanguageType | "BE" }) => {
  return (
    <img
      src={`/flags/${countryCode}-flag.svg`}
      alt={countryCode}
      style={{ width: "24px", height: "16px", verticalAlign: "middle" }}
    />
  );
};
