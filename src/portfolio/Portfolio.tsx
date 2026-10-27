"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ProjectPreview } from "./projects";
import { type Locale, languageKey, projectPath } from "./routing";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { captions, text } from "./text";
import { EMAIL, github } from "./seo";
import ContactForm from "./ContactForm";

const selectedSlugs = ["checkcar", "undercover", "commission-europeenne", "tou"] as const;
const deckSlugs = ["checkcar", "undercover", "tou"];

export default function Portfolio({ locale, projects }: { locale: Locale; projects: ProjectPreview[] }) {
  const t = text[locale];
  const key = languageKey(locale);
  const featured = selectedSlugs.map(slug => projects.find(project => project.slug === slug)!);
  const deck = deckSlugs.map(slug => projects.find(project => project.slug === slug)!);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<ProjectPreview | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
    document.documentElement.classList.add("motion-ready");
    return () => { observer.disconnect(); document.documentElement.classList.remove("motion-ready"); };
  }, []);

  useEffect(() => {
    const area = scene.current;
    if (!area) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const orbit = area.querySelector<HTMLElement>(".scene-orbit")!;
    let frame = 0;
    function move(event: PointerEvent) {
      if (reduced.matches || !fine.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = area!.getBoundingClientRect();
        orbit.style.setProperty("--rx", `${(.5 - (event.clientY - rect.top) / rect.height) * 9}deg`);
        orbit.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 10}deg`);
      });
    }
    function reset() { cancelAnimationFrame(frame); orbit.style.setProperty("--rx", "0deg"); orbit.style.setProperty("--ry", "0deg"); }
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", reset);
    return () => { reset(); area.removeEventListener("pointermove", move); area.removeEventListener("pointerleave", reset); };
  }, []);

  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open) { dialog.current.showModal(); dialog.current.scrollTop = 0; }
  }, [selected]);

  function preview(event: MouseEvent<HTMLAnchorElement>, project: ProjectPreview) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setSelected(project);
  }

  function cycle(direction: number) { setActive(index => (index + direction + deck.length) % deck.length); }
  function closePreview() { setSelected(null); opener.current?.focus({ preventScroll: true }); }

  return <>
    <SiteHeader locale={locale} />
    <main id="contenu">
      <section className="wrap hero" aria-labelledby="name">
        <p className="mono hero-top"><span className="cross" aria-hidden="true">✳</span>{t.role}</p>
        <h1 className="display" id="name"><span className="name-line"><span>SÉBASTIEN</span></span><span className="name-line name-last"><span>BOTTY.</span></span></h1>
        <p className="hero-description">{t.intro1}<br /><b>{t.intro2}</b><br />{t.intro3}</p>
        <a className="work-link" href="#projets">{t.workLink} ↘</a>
        <div ref={scene} className="scene" aria-label={t.projects}>
          <div className="scene-label" aria-hidden="true">{t.homemade}<span>↙</span></div>
          <div className="scene-orbit">{deck.map((project, index) => {
            const slot = (index - active + deck.length) % deck.length;
            return <Link className="object" key={project.slug} href={projectPath(locale, project.slug)} data-project={project.slug} data-slot={slot} aria-label={`${slot === 0 ? t.open : t.front} ${project.projectName[key]}`} onClick={event => {
              if (slot === 0) preview(event, project);
              else if (!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) { event.preventDefault(); setActive(index); }
            }}><span className="object-bar"><span><i className="object-dot" aria-hidden="true" />{project.projectName[key]}</span><span>{project.slug === "tou" ? "MOBILE" : "WEB APP"} ↗</span></span><Image src={project.image} alt={project.projectName[key]} width={1200} height={650} sizes="(max-width: 800px) 80vw, 600px" priority={index === 0} /></Link>;
          })}</div>
          <div className="scene-controls"><button onClick={() => cycle(-1)} aria-label={t.previous}>←</button><button onClick={() => cycle(1)} aria-label={t.next}>→</button><p aria-live="polite"><strong>{deck[active].projectName[key]}</strong><small>{t.explore}</small></p><span className="scene-count">{String(active + 1).padStart(2, "0")} / 03</span></div>
        </div>
        <div className="hero-bottom"><a className="scroll-link" href="#projets"><span className="circle-arrow" aria-hidden="true">↓</span>{t.tour}</a><span className="mono">{t.signature}<br />FR / EN · Belgium</span></div>
      </section>
      <section className="wrap work-section" id="projets" aria-labelledby="work-title">
        <div className="section-heading reveal"><h2 className="display" id="work-title">{t.workTitle}<br /><span>{t.workTitle2}</span></h2><p>{t.workIntro}</p></div>
        <div className="work-grid">{featured.map(project => {
          const slug = project.slug as typeof selectedSlugs[number];
          const institutional = slug === "commission-europeenne";
          return <article className="reveal" key={slug}>
            <Link className="work-card" href={projectPath(locale, slug)} onClick={event => preview(event, project)} aria-label={`${t.open} ${project.projectName[key]}`}>
              <div className={`project-cover cover-${institutional ? "europe" : slug}`}>
                <span className="cover-word" aria-hidden="true">{slug === "checkcar" ? "CHECKCAR." : slug === "undercover" ? "TRUST NO ONE." : slug === "tou" ? (locale === "fr" ? "T’ES OÙ ?" : "WHERE ARE YOU?") : (locale === "fr" ? <>À PLUSIEURS<br />LANGUES.</> : <>MANY<br />LANGUAGES.</>)}</span>
                {institutional ? <div className="eu-document"><span className="mono">Frontend / WMH Project</span><strong>{project.projectName[key]}</strong><span>{locale === "fr" ? "Contenu · Accessibilité · Localisation" : "Content · Accessibility · Localisation"}</span><p>HTML / CSS / JAVASCRIPT<br />2026</p></div> : <Image src={project.image} width={1200} height={650} sizes="(max-width: 480px) 100vw, 50vw" alt={project.projectName[key]} />}
                <span className="cover-action" aria-hidden="true">↗</span>
              </div>
            </Link>
            <div className="project-info"><div><h3><Link href={projectPath(locale, slug)}>{project.projectName[key]}</Link></h3><p>{captions[slug][locale]}</p></div><span className="mono">{project.projectKind === "Perso" ? t.personal : institutional ? "WMH Project" : t.client}<br />{slug === "tou" ? "Mobile" : institutional ? "Frontend · 2026" : "Full stack"}</span></div>
          </article>;
        })}</div>
        <div className="work-tail reveal"><p>{t.other}</p><div className="extra-projects">{projects.filter(project => !(selectedSlugs as readonly string[]).includes(project.slug)).map(project => <Link className="work-link" key={project.slug} href={projectPath(locale, project.slug)}>{project.projectName[key]} ↗</Link>)}</div><a href={github} target="_blank" rel="noopener noreferrer">{t.github} ↗</a></div>
      </section>
      <section className="about-section" id="apropos" aria-labelledby="about-title"><div className="wrap about-layout">
        <div className="portrait-scene reveal"><Image src="/images/moi.jpg" alt="Sébastien Botty" width={370} height={446} sizes="(max-width: 800px) 240px, 370px" /><span className="portrait-caption">{t.portrait}</span></div>
        <div className="about-copy reveal"><p className="mono">{t.about}</p><h2 className="display" id="about-title">{t.curious}<br /><span>{t.concrete}</span></h2><p>{t.bio1}</p><p>{t.bio2}</p><div className="stack" aria-label={t.technologies}><span>TypeScript</span><span>React / React Native</span><span>Node.js</span><span>PostgreSQL</span><span>Next.js</span></div><a href={`/files/Botty_Sebastien_CV-${key}.pdf`}>{t.cv} ↗</a></div>
      </div></section>
      <section className="wrap contact" id="contact" aria-labelledby="contact-title"><div className="contact-top"><span className="mono">{t.contactIntro}</span><p>{t.contactCopy}</p></div><a className="contact-title" href={`mailto:${EMAIL}`}><h2 className="display" id="contact-title">{t.contact1}<br /><span>{t.contact2}</span></h2><span className="contact-arrow" aria-hidden="true">↗</span></a><a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL} ↗</a><ContactForm locale={locale} /></section>
    </main>
    <SiteFooter locale={locale} />
    <dialog ref={dialog} className="dialog" aria-labelledby="dialog-title" onClose={closePreview} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
    }}>
      <div className="dialog-bar"><span className="mono">{selected?.projectKind === "Perso" ? t.personal : t.client}</span><button className="dialog-close" onClick={() => dialog.current?.close()} autoFocus>{t.close} ×</button></div>
      {selected && <div className="dialog-body"><h2 className="display" id="dialog-title">{selected.projectName[key]}</h2><p className="dialog-description">{selected.description[key]}</p>{selected.image && <Image className="dialog-image" src={selected.image} alt={selected.projectName[key]} width={1200} height={800} sizes="(max-width: 800px) 100vw, 800px" />}<div className="stack project-stack" aria-label={t.technologies}>{selected.stack.map(tech => <span key={tech}>{tech}</span>)}</div><Link className="dialog-link" href={projectPath(locale, selected.slug)}>{t.fullProject} ↗</Link></div>}
    </dialog>
  </>;
}
