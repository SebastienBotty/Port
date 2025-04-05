export type LanguageType = "FR" | "EN";

export type LanguageContextType = {
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
};
