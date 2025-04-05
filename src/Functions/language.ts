import { LanguageType } from "../Typescript/Types";

export const getBrowserLanguage = (): LanguageType => {
  const userLanguage = navigator.language || "en-US";

  if (userLanguage.startsWith("fr")) {
    return "FR";
  } else {
    return "EN";
  }
};
