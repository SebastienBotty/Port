import type { MetadataRoute } from "next";
import { locales, projects, projectPath } from "../portfolio/projects";
import { SITE_URL } from "../portfolio/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap(locale => [
    { url: `${SITE_URL}/${locale}`, alternates: { languages: { fr: `${SITE_URL}/fr`, en: `${SITE_URL}/en` } } },
    ...projects.map(project => ({ url: `${SITE_URL}${projectPath(locale, project.slug)}`, alternates: { languages: { fr: `${SITE_URL}${projectPath("fr", project.slug)}`, en: `${SITE_URL}${projectPath("en", project.slug)}` } } })),
  ]);
}
