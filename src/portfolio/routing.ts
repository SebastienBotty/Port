export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => value === "fr" || value === "en";
export const languageKey = (locale: Locale) => locale === "fr" ? "FR" as const : "EN" as const;
export const projectPath = (locale: Locale, slug: string) => `/${locale}/projects/${slug}`;
export const publicLink = (url: string) => /^https?:\/\//i.test(url);
