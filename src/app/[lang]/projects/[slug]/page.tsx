import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getProject, isLocale, languageKey, locales, projectPath, projects, publicLink } from "../../../../portfolio/projects";
import { SiteFooter, SiteHeader } from "../../../../portfolio/SiteChrome";
import { jsonLd, pageMetadata, SITE_URL } from "../../../../portfolio/seo";
import { text } from "../../../../portfolio/text";

type Props = { params: Promise<{ lang: string; slug: string }> };
export function generateStaticParams() {
  return locales.flatMap(lang => projects.map(project => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) notFound();
  const key = languageKey(lang);
  return pageMetadata(lang, `${project.projectName[key]} — Sébastien Botty`, project.description[key], slug);
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) notFound();
  const key = languageKey(lang);
  const t = text[lang];
  const url = `${SITE_URL}${projectPath(lang, slug)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CreativeWork", "@id": `${url}#project`, name: project.projectName[key], description: project.description[key], url, inLanguage: lang, author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Sébastien Botty", url: SITE_URL }, keywords: project.stack.join(", "), ...(project.image && { image: `${SITE_URL}${project.image}` }) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Portfolio", item: `${SITE_URL}/${lang}` }, { "@type": "ListItem", position: 2, name: project.projectName[key], item: url }] },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
    <SiteHeader locale={lang} slug={slug} />
    <main className="wrap project-page" id="contenu">
      <Link className="work-link" href={`/${lang}#projets`}>← {t.back}</Link>
      <p className="mono project-kind">{project.projectKind === "Perso" ? t.personal : t.client} / {project.state[key]}</p>
      <h1 className="display project-title">{project.projectName[key]}</h1>
      <p className="project-description">{project.description[key]}</p>
      {slug === "commission-europeenne" && <p className="project-assignment">{t.assignment}</p>}
      <div className="stack project-stack" aria-label={t.technologies}>{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
      <div className="project-links">{publicLink(project.site) && <a className="nav-contact" href={project.site} target="_blank" rel="noopener noreferrer">{lang === "fr" ? "Voir le site" : "Visit website"} ↗</a>}{publicLink(project.code) && <a className="work-link" href={project.code} target="_blank" rel="noopener noreferrer">Code ↗</a>}</div>
      {project.image && <div className={`project-main-image ${slug === "tou" ? "portrait-image" : ""}`}><Image src={project.image} alt={project.projectName[key]} width={1600} height={900} sizes="(max-width: 800px) 100vw, 1440px" priority /></div>}
      <section className="project-features" aria-labelledby="features-title"><h2 className="display" id="features-title">{t.features}</h2>
        {project.features.length ? project.features.map((feature, index) => <details className="feature" key={feature.title.EN} open={index === 0}>
          <summary><span className="mono">{String(index + 1).padStart(2, "0")}</span><h3>{feature.title[key]}</h3><span aria-hidden="true">+</span></summary>
          <div className="feature-content"><ReactMarkdown>{feature.description[key]}</ReactMarkdown>
            <div className="feature-images">{feature.image?.filter(image => image.src).map((image, imageIndex) => <figure key={`${image.src}-${imageIndex}`}><a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={lang === "fr" ? `Agrandir : ${image.desc[key] || feature.title[key]}` : `Enlarge: ${image.desc[key] || feature.title[key]}`}><Image src={image.src} alt={image.desc[key] || `${project.projectName[key]} — ${feature.title[key]}`} width={1200} height={800} sizes="(max-width: 800px) 100vw, 700px" /></a>{image.desc[key] && <figcaption>{image.desc[key]}</figcaption>}</figure>)}</div>
          </div>
        </details>) : <p>{t.noFeatures}</p>}
      </section>
      <aside className="other-projects"><h2 className="display">{t.nextProjects}</h2><div>{projects.filter(other => other.slug !== slug).map(other => <Link className="work-link" key={other.slug} href={projectPath(lang, other.slug)}>{other.projectName[key]} ↗</Link>)}</div></aside>
    </main><SiteFooter locale={lang} />
  </>;
}
