import { notFound } from "next/navigation";
import Portfolio from "../../portfolio/Portfolio";
import { isLocale, projectPreviews } from "../../portfolio/projects";
import { github, homeDescriptions, jsonLd, linkedin, pageMetadata, SITE_URL } from "../../portfolio/seo";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return pageMetadata(lang, lang === "fr" ? "Sébastien Botty — Développeur full stack freelance en Belgique" : "Sébastien Botty — Freelance full stack developer in Belgium", homeDescriptions[lang]);
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Sébastien Botty", jobTitle: "Freelance Full Stack Developer", url: SITE_URL, image: `${SITE_URL}/images/moi.jpg`, address: { "@type": "PostalAddress", addressCountry: "BE" }, knowsLanguage: ["fr", "en"], sameAs: [github, linkedin] },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Sébastien Botty — Portfolio", inLanguage: ["fr", "en"], author: { "@id": `${SITE_URL}/#person` } },
      { "@type": "ProfilePage", url: `${SITE_URL}/${lang}`, name: "Sébastien Botty", description: homeDescriptions[lang], inLanguage: lang, mainEntity: { "@id": `${SITE_URL}/#person` }, isPartOf: { "@id": `${SITE_URL}/#website` } },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} /><Portfolio locale={lang} projects={projectPreviews} /></>;
}
