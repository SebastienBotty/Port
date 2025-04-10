import { ProjectType } from "../Typescript/Types";

export const tOu: ProjectType = {
  projectName: {
    EN: "Tou (WhereUat)",
    FR: "Tou (T'es où)",
  },
  description: {
    EN: "Private mobile application to easily find my friend when we go out",
    FR: "Application mobile privée permettant d'avoir la position de mes amis quand on sort.",
  },
  stack: [
    "TypeScript",
    "ReactNative",
    "MongoDB",
    "Express",
    "AWS: S3",
    "Firebase: Auth",
    "Socket.io",
  ],
  link: "",
  image: "",
};

export const notMessenger: ProjectType = {
  projectName: {
    EN: "Not-messeger",
    FR: "Not-messeger",
  },
  description: {
    EN: "Messenger clone (web) with most of its features.",
    FR: "Close de Messenger (web) avec la plupart de ses fonctionnalités",
  },
  stack: ["TypeScript", "React", "MongoDB", "Express", "AWS: S3", "Firebase: Auth", "Socket.io"],
  link: "",
  image: "",
};

export const portfolio: ProjectType = {
  projectName: {
    EN: "This portfolio",
    FR: "Ce portfolio",
  },
  description: {
    EN: "The portfolio you're currently viewing - a showcase of my projects",
    FR: "Le portfolio que vous regardez actuellement - vitrine de mes projets",
  },
  stack: ["TypeScript", "React", "MongoDB", "Express", "AWS: S3", "Firebase: Auth", "Socket.io"],
  link: "",
  image: "",
};

export const projectsContainerText = {
  title: {
    EN: "Projects",
    FR: "Projets",
  },
};

export const projectsArr: ProjectType[] = [tOu, notMessenger, portfolio];
