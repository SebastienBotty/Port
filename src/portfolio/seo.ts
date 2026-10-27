import type { Metadata } from "next";
import { type Locale, projectPath } from "./routing";

export const SITE_URL = "https://sebastienbotty.com";
export const EMAIL = "Sebastien.botty@outlook.com";
export const github = "https://github.com/SebastienBotty";
export const linkedin = "https://www.linkedin.com/in/s%C3%A9bastien-botty-3338b714b/";

export function pageMetadata(locale: Locale, title: string, description: string, slug?: string): Metadata {
  const path = slug ? projectPath(locale, slug) : `/${locale}`;
  const localizedPath = (lang: Locale) => slug ? projectPath(lang, slug) : `/${lang}`;
  const image = `/og?lang=${locale}${slug ? `&project=${slug}` : ""}`;
  return {
    title, description,
    alternates: { canonical: path, languages: { fr: localizedPath("fr"), en: localizedPath("en"), "x-default": localizedPath("fr") } },
    openGraph: { type: "website", title, description, url: path, siteName: "Sébastien Botty", locale: locale === "fr" ? "fr_BE" : "en_GB", alternateLocale: locale === "fr" ? "en_GB" : "fr_BE", images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt: title }] },
  };
}

export const homeDescriptions = {
  fr: "Sébastien Botty, développeur full stack freelance en Belgique. Découvrez mes applications web et mobiles, mes projets clients et ma façon de construire avec TypeScript, React et Node.js.",
  en: "Sébastien Botty, freelance full stack developer in Belgium. Explore my web and mobile applications, client projects and work with TypeScript, React and Node.js.",
};

export function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
