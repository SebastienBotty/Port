import { siJavascript } from "simple-icons";

export type LanguageType = "FR" | "EN";

export type ProjectType = {
  projectName: {
    [key in LanguageType]: string;
  };
  description: {
    [key in LanguageType]: string;
  };
  stack: string[];
  link: string;
  image: string;
};

export type TechnologyType = {
  name: string;
  icon: typeof siJavascript;
  mostUsed: boolean;
};

export type LanguageContextType = {
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
};
