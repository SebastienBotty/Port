import Arrow from "./Arrow";
import Link from "next/link";
import { type Locale, languageKey, projectPath } from "./routing";
import { text } from "./text";
import { github, linkedin } from "./seo";

export function SiteHeader({ locale, slug }: { locale: Locale; slug?: string }) {
  const t = text[locale];
  const otherLocale = locale === "fr" ? "en" : "fr";
  return <>
    <a className="skip" href="#contenu">{t.skip}</a>
    <header className="wrap nav">
      <Link className="brand" href={`/${locale}`} aria-label="Sébastien Botty">sb<span><Arrow /></span></Link>
      <nav className="nav-links" aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
        <Link href={`/${locale}#projets`}>{t.projects}</Link>
        <Link className="about-nav" href={`/${locale}#apropos`}>{t.about}</Link>
        <Link href={slug ? projectPath(otherLocale, slug) : `/${otherLocale}`} hrefLang={otherLocale} lang={otherLocale} className="language-link" aria-label={locale === "fr" ? "Read in English" : "Lire en français"}>{otherLocale.toUpperCase()}</Link>
        <Link className="nav-contact" href={`/${locale}#contact`}>{t.discuss} <Arrow /></Link>
      </nav>
    </header>
  </>;
}

export function SiteFooter({ locale }: { locale: Locale }) {
  return <footer className="wrap footer"><span>Sébastien Botty © {new Date().getFullYear()}</span><span className="mono">{text[locale].footer}</span><div className="footer-links"><a href={github} target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a><a href={`/files/Botty_Sebastien_CV-${languageKey(locale)}.pdf`} type="application/pdf" target="_blank" rel="noopener noreferrer">CV <Arrow /></a><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a></div></footer>;
}
