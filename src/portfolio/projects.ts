import { projectsArr } from "../translations/projectsContainer";
import { workArr } from "../Constants/experiences";
import type { ProjectType } from "../Typescript/Types";

export { locales, isLocale, languageKey, projectPath, publicLink } from "./routing";
export type { Locale } from "./routing";

const slugs: Record<string, string> = {
  Tou: "tou",
  "Not-messenger": "not-messenger",
  CheckCar: "checkcar",
  Undercover: "undercover",
  "Freelance Prospecting Dashboard": "carnet-demarchage",
};

const commission = workArr[0];
const institutionalProject: ProjectType = {
  projectName: { FR: "Commission européenne", EN: "European Commission" },
  description: commission.description,
  features: [{ title: { FR: "Mission frontend via WMH Project", EN: "Frontend assignment through WMH Project" }, description: commission.description }],
  stack: ["HTML", "CSS", "JavaScript"],
  link: "", image: "", state: { FR: "Terminé", EN: "Done" }, code: "", site: "", desc: true, projectKind: "Freelance",
};

export const projects = [
  ...projectsArr.map(project => ({ ...project, slug: slugs[project.projectName.EN] })),
  { ...institutionalProject, slug: "commission-europeenne" },
];
export type PortfolioProject = (typeof projects)[number];
export const getProject = (slug: string) => projects.find(project => project.slug === slug);
export const legacyProjectSlug = (name: string) => Object.prototype.hasOwnProperty.call(slugs, name) ? slugs[name] : undefined;

export type ProjectPreview = Pick<PortfolioProject, "slug" | "projectName" | "description" | "stack" | "image" | "projectKind">;
export const projectPreviews: ProjectPreview[] = projects.map(({ slug, projectName, description, stack, image, projectKind }) => ({ slug, projectName, description, stack, image, projectKind }));
