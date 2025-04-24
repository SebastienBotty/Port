import { siJavascript } from "simple-icons";

export type LanguageType = "FR" | "EN";
export type FeatureType = {
  title: {
    [key in LanguageType]: string;
  };
  description: {
    [key in LanguageType]: string;
  };
  image?: string;
};
export type ProjectType = {
  projectName: {
    [key in LanguageType]: string;
  };
  description: {
    [key in LanguageType]: string;
  };
  features: FeatureType[];
  stack: string[];
  link: string;
  image: string;
  state: ProgressType;
  code: string;
  site: string;
  desc: boolean;
};

export type ProgressType = {
  EN: "Done" | "In progress";
  FR: "Terminé" | "En cours";
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

export type RefProps = {
  homeRef?: React.RefObject<HTMLDivElement | null>;
  personalInfosRef?: React.RefObject<HTMLDivElement | null>;
  projectsRef?: React.RefObject<HTMLDivElement | null>;
  contactRef?: React.RefObject<HTMLDivElement | null>;
};

export type LanguageContextType = {
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
};
