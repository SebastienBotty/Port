# Portfolio motion/3D redesign + content update

## Goal

Make the portfolio read as more professional and technically credible by:
- Adding a cohesive motion layer across the site (Framer Motion).
- Adding a single, tasteful 3D accent in the hero (React Three Fiber + drei) to demonstrate 3D frontend skill without turning the site into a gimmick — the audience includes institutional clients (e.g. European Commission).
- Rewriting the hero copy to state a clearer value proposition.
- Adding a freelance work experience entry for WHM Projects / European Commission.
- Listing Framer Motion and Three.js in the tech stack, since they are now genuinely used on the site.

Out of scope: rewriting existing project descriptions (Tou, Not-messenger, CheckCar), adding/changing any GitHub repo link on the site (explicitly declined by the user — the local repo is already correctly connected to `origin` on GitHub, no action needed there), migrating off Create React App.

## Stack additions

- `framer-motion` (latest) — scroll reveals, hover/tap micro-interactions, staggered lists, page transitions.
- `three`, `@react-three/fiber`, `@react-three/drei` (latest, React 19-compatible) — one abstract animated 3D shape in the hero.

## Behavior

### Motion layer
- Section-level scroll reveal (fade/slide-in) for: PersonalInfos, ProjectsContainer, TechStack, ExperiencesContainer, ContactContainer.
- Staggered entrance for list items: project cards, tech icons, experience entries.
- Hover/tap feedback (`whileHover`/`whileTap`) on: project cards, contact icons (GitHub/CV/Mail/LinkedIn), nav links, tech icons.
- Page transition (`AnimatePresence`) between `HomePage` and `ProjectPage`.
- `HomePage.tsx`'s current manual scroll-driven "lights" background (raw `scrollY` math + `useState`/`useEffect`) is reimplemented with Framer Motion's `useScroll`/`useTransform` — same visual effect (ambient lights drifting on scroll), simpler and more robust implementation.
- All motion respects `prefers-reduced-motion: reduce` (skip/shorten animations via Framer Motion's `useReducedMotion` hook).

### 3D hero accent
- New component (e.g. `Hero3D.tsx`) rendered next to/behind the profile photo in `PersonalInfos`.
- A single abstract shape (icosahedron or torus with `MeshDistortMaterial`/`MeshWobbleMaterial` from drei), slow autonomous rotation, subtle parallax toward cursor position.
- Canvas is capped `dpr` (e.g. `[1, 1.5]`) and paused/unmounted when scrolled out of view (IntersectionObserver) to protect performance.
- No 3D rendering at all when `prefers-reduced-motion: reduce` is set — falls back to the static photo only.

### Content changes
- `PersonalInfos`: add a one-line value-proposition subtitle under the "FULL STACK DEVELOPPER" titles (FR/EN), e.g. positioning freelance + institutional project experience.
- `ExperiencesContainer.tsx`: re-enable the existing (currently commented-out) Studies/Work toggle UI.
- `Constants/experiences.ts`: add one entry to `workArr`:
  - name: "WHM Projects"
  - secondTitle: "Freelance Developer — Client: European Commission" / "Développeur freelance — Client : Commission européenne"
  - description (EN): "Built multilingual web pages (HTML, CSS, JavaScript) for a European Commission platform, strictly following the Commission's content, accessibility, and localization guidelines."
  - description (FR): "Développement de pages web multilingues (HTML, CSS, JavaScript) pour une plateforme de la Commission européenne, dans le respect strict des directives de contenu, d'accessibilité et de localisation imposées par la Commission."
  - image: "" (no logo)
  - dates: start/end both "Jun 2026" / "Juin 2026"
- `Constants/techStack.ts`: add `{ name: "Framer Motion", icon: siFramer, mostUsed: true }` and `{ name: "Three.js", icon: siThreedotjs, mostUsed: true }` (icons from `simple-icons`, already a project dependency).

## Testing / verification

- `npm run build` must succeed (TypeScript type-check + production bundle).
- Manual verification in a browser via dev server:
  - Hero renders with 3D accent, no console errors, reduced-motion fallback works (toggle OS/browser setting or `prefers-reduced-motion` emulation).
  - Scroll reveals trigger correctly for each section; ambient background lights still drift on scroll.
  - FR/EN toggle still renders all new copy correctly in both languages.
  - Studies/Work toggle shows the new WHM Projects entry under Work.
  - Project cards, tech icons, nav links show hover/tap feedback.
  - Page transition to a project detail page and back works.
  - Contact form still submits (Formspree) unaffected by motion wrapper changes.
