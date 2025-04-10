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

export type ExperienceType = {
  name: {
    [key in LanguageType]: string;
  };
  secondTitle: {
    [key in LanguageType]: string;
  };
  description: {
    [key in LanguageType]: string;
  };
  image: string;
  dates: {
    start: {
      [key in LanguageType]: string;
    };
    end: {
      [key in LanguageType]: string;
    };
  };
};

export type LanguageContextType = {
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
};
