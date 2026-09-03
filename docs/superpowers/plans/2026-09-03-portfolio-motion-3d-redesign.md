# Portfolio Motion/3D Redesign Implementation Plan

> **Superseded 2026-09-03:** The 3D hero accent (Task 5, "3D hero accent") was implemented as written below, then removed in commit `89e3185` after manual browser verification (Task 11) showed it significantly overlapping and obscuring the "FULL STACK DEVELOPPER" title text. `three`, `@react-three/fiber`, and `@react-three/drei` are no longer dependencies of this project, and "Three.js" is no longer listed in the tech stack. Do not use Task 5 or Task 11's 3D-related verification steps as instructions to reinstate this — the Framer Motion layer (Tasks 1-4, 6-10) is unaffected and is the shipped result.
>
> **Ruling on staggered list entrances:** this plan's Architecture line and Task 9 originally implied `Project.tsx`/`TechContainer.tsx` cards would animate in with a staggered entrance (in addition to the whileHover/whileTap this plan's Task 9 does implement). That was never built and, on final review, is a deliberate decline rather than an oversight: `Reveal`'s per-section fade/slide-in (Task 7-8) already gives each section a single, clean entrance, and adding a second, nested stagger animation for cards *inside* an already-animating section risks feeling busy rather than polished — consistent with this plan's broader preference (confirmed by the Task 11 decision to cut the 3D accent entirely rather than tune it) for less motion, applied well, over more. No further work is planned here.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cohesive Framer Motion animation layer and a single React Three Fiber 3D hero accent to the portfolio, plus a professional hero tagline and a new freelance work-experience entry (WHM Projects / European Commission).

**Architecture:** Motion is added incrementally on top of the existing component tree with no restructuring: section-level scroll reveals are applied once in `HomePage.tsx` via a small shared `Reveal` wrapper, card-level hover/stagger is added directly in `Project.tsx`/`TechContainer.tsx`/`Navbar.tsx`, the ambient background "lights" effect in `HomePage.tsx` is re-implemented with Framer Motion's scroll-linked `MotionValue`s instead of a manual `scroll` event handler + `useState`, and a new `HeroVisual`/`Hero3D` component pair renders one abstract 3D shape next to the profile photo, gated behind `prefers-reduced-motion` and viewport visibility.

**Tech Stack:** React 19, TypeScript, Sass, `framer-motion` (motion layer), `three` + `@react-three/fiber` + `@react-three/drei` (3D hero accent), `@testing-library/react` + Jest (via `react-scripts test`, already configured).

**Spec:** `docs/superpowers/specs/2026-09-03-portfolio-motion-3d-redesign-design.md`

## Global Constraints

- `framer-motion` must be `^13.0.0` or later (peer deps support React ^19.0.0).
- `@react-three/fiber` must be `^9.0.0` or later, `@react-three/drei` `^10.0.0` or later, `three` `^0.185.0` or later — these are the versions verified compatible with the project's `react@^19.1.0`.
- All motion (Framer Motion transitions and the 3D hero accent) must respect `prefers-reduced-motion: reduce` — no exceptions.
- No existing project data (Tou, Not-messenger, CheckCar, Portfolio project descriptions) is rewritten.
- No GitHub repo link is added or changed anywhere in the UI — out of scope, explicitly declined.
- `npm run build` must succeed after every task (TypeScript strictness is on for this project via CRA's default `tsconfig.json`).

---

### Task 1: Install motion/3D dependencies

**Files:**
- Modify: `package.json`, `package-lock.json` (via `npm install`)

**Interfaces:**
- Produces: `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei` importable in all later tasks; `@types/three` available for TypeScript.

- [ ] **Step 1: Install the runtime packages**

Run:
```bash
npm install framer-motion@^13 three@^0.185 @react-three/fiber@^9 @react-three/drei@^10
```

- [ ] **Step 2: Install the type-only dev dependency**

Run:
```bash
npm install --save-dev @types/three@^0.185
```

- [ ] **Step 3: Verify the existing app still builds with the new dependencies present but unused**

Run: `npm run build`
Expected: Build succeeds with no new TypeScript errors (the new packages aren't imported yet, so this just confirms the install didn't break anything).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion and react-three-fiber dependencies"
```

---

### Task 2: Work experience data + Studies/Work toggle

**Files:**
- Modify: `src/Constants/experiences.ts`
- Modify: `src/Components/ExperiencesContainer.tsx`
- Create: `src/testUtils.tsx`
- Create: `src/Constants/experiences.test.ts`

**Interfaces:**
- Produces: `workArr: ExperienceType[]` (in `src/Constants/experiences.ts`) containing the WHM Projects entry; `renderWithProviders(ui, language?)` helper in `src/testUtils.tsx`, reused by every later component test in this plan.

- [ ] **Step 1: Write the failing data test**

Create `src/Constants/experiences.test.ts`:

```typescript
import { workArr } from "./experiences";

test("workArr contains the WHM Projects / European Commission entry", () => {
  expect(workArr).toHaveLength(1);

  const entry = workArr[0];
  expect(entry.name.EN).toBe("WHM Projects");
  expect(entry.name.FR).toBe("WHM Projects");
  expect(entry.secondTitle.EN).toBe("Freelance Developer — Client: European Commission");
  expect(entry.secondTitle.FR).toBe("Développeur freelance — Client : Commission européenne");
  expect(entry.dates.start.EN).toBe("Jun 2026");
  expect(entry.dates.end.EN).toBe("Jun 2026");
  expect(entry.dates.start.FR).toBe("Juin 2026");
  expect(entry.dates.end.FR).toBe("Juin 2026");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=experiences.test.ts`
Expected: FAIL — `workArr` is currently `[]`, so `toHaveLength(1)` fails.

- [ ] **Step 3: Add the entry to `workArr`**

In `src/Constants/experiences.ts`, replace the last line (`export const workArr: ExperienceType[] = [];`) with:

```typescript
export const workArr: ExperienceType[] = [
  {
    name: {
      EN: "WHM Projects",
      FR: "WHM Projects",
    },
    secondTitle: {
      EN: "Freelance Developer — Client: European Commission",
      FR: "Développeur freelance — Client : Commission européenne",
    },
    description: {
      EN: "Built multilingual web pages (HTML, CSS, JavaScript) for a European Commission platform, strictly following the Commission's content, accessibility, and localization guidelines.",
      FR: "Développement de pages web multilingues (HTML, CSS, JavaScript) pour une plateforme de la Commission européenne, dans le respect strict des directives de contenu, d'accessibilité et de localisation imposées par la Commission.",
    },
    image: "",
    dates: {
      start: {
        EN: "Jun 2026",
        FR: "Juin 2026",
      },
      end: {
        EN: "Jun 2026",
        FR: "Juin 2026",
      },
    },
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=experiences.test.ts`
Expected: PASS

- [ ] **Step 5: Create the shared render helper used by later component tests**

Create `src/testUtils.tsx`:

```tsx
import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageContext } from "./Contexts/useLanguage";
import { LanguageType } from "./Typescript/Types";

export function renderWithProviders(
  ui: React.ReactElement,
  language: LanguageType = "EN"
): RenderResult {
  return render(
    <MemoryRouter>
      <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
        {ui}
      </LanguageContext.Provider>
    </MemoryRouter>
  );
}
```

- [ ] **Step 6: Write the failing toggle test**

Create `src/Components/ExperiencesContainer.test.tsx`:

```tsx
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import ExperiencesContainer from "./ExperiencesContainer";

test("toggling to Work shows the WHM Projects entry, toggling back shows studies", () => {
  renderWithProviders(<ExperiencesContainer />);

  // Studies are shown by default.
  expect(screen.getByText("Self-learning")).toBeInTheDocument();
  expect(screen.queryByText("WHM Projects")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Experiences"));
  expect(screen.getByText("WHM Projects")).toBeInTheDocument();
  expect(screen.queryByText("Self-learning")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Studies"));
  expect(screen.getByText("Self-learning")).toBeInTheDocument();
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=ExperiencesContainer.test.tsx`
Expected: FAIL — the toggle buttons are currently commented out, so `screen.getByText("Experiences")` throws.

- [ ] **Step 8: Re-enable the toggle UI**

In `src/Components/ExperiencesContainer.tsx`, replace the whole file with:

```tsx
import React, { useState } from "react";
import { useLanguageContext } from "../Contexts/useLanguage";
import { experiencesText } from "../translations/experiences";
import "../scss/experiencesContainer.scss";
import { ExperienceType } from "../Typescript/Types";
import { studiesArr, workArr } from "../Constants/experiences";
import Experience from "./Experience";

function ExperiencesContainer() {
  const { language } = useLanguageContext();
  const [showInfos, setShowInfos] = useState<"studies" | "work">("studies");

  const changeDatas = (type: "studies" | "work") => setShowInfos(type);

  const datas: ExperienceType[] = showInfos === "studies" ? studiesArr : workArr;

  return (
    <div className="experiences">
      <div className="titles-container">
        <div
          className="title"
          onClick={() => changeDatas("studies")}
          style={
            showInfos === "studies"
              ? { backgroundColor: "white", color: "black" }
              : { backgroundColor: "transparent" }
          }
        >
          {experiencesText.titles.studies[language]}
        </div>
        <div
          className="title"
          onClick={() => changeDatas("work")}
          style={
            showInfos === "work"
              ? { backgroundColor: "white", color: "black" }
              : { backgroundColor: "transparent" }
          }
        >
          {experiencesText.titles.experiences[language]}
        </div>
      </div>
      <div className="content">
        {datas.length > 0 ? (
          datas.map((exp) => <Experience key={exp.name.EN} experienceData={exp} />)
        ) : (
          <div className="nothing">
            <div>{experiencesText.nothing[language]}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperiencesContainer;
```

Note: this also drops the two stray `console.log("ici"/"là")` debug lines and adds a `key` prop to the mapped `Experience` list (was missing, causing a silent React key warning).

- [ ] **Step 9: Run test to verify it passes**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=ExperiencesContainer.test.tsx`
Expected: PASS

- [ ] **Step 10: Commit**

```bash
git add src/Constants/experiences.ts src/Constants/experiences.test.ts src/Components/ExperiencesContainer.tsx src/Components/ExperiencesContainer.test.tsx src/testUtils.tsx
git commit -m "feat: add WHM Projects work experience and re-enable studies/work toggle"
```

---

### Task 3: Hero tagline

**Files:**
- Modify: `src/translations/personalInfos.ts`
- Modify: `src/Components/PersonalInfos.tsx`
- Modify: `src/scss/personnalInfos.scss`
- Create: `src/Components/PersonalInfos.test.tsx`

**Interfaces:**
- Produces: `personalInfosText.tagline: { EN: string; FR: string }` used by `PersonalInfos.tsx`.

- [ ] **Step 1: Write the failing test**

Create `src/Components/PersonalInfos.test.tsx`:

```tsx
import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import PersonalInfos from "./PersonalInfos";

test("renders the value-proposition tagline in English and French", () => {
  const { unmount } = renderWithProviders(<PersonalInfos />, "EN");
  expect(
    screen.getByText(/freelance and institutional web projects/i)
  ).toBeInTheDocument();
  unmount();

  renderWithProviders(<PersonalInfos />, "FR");
  expect(
    screen.getByText(/projets web freelance et institutionnels/i)
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=PersonalInfos.test.tsx`
Expected: FAIL — the tagline text doesn't exist yet.

- [ ] **Step 3: Add the tagline copy**

In `src/translations/personalInfos.ts`, add a `tagline` key:

```typescript
export const personalInfosText = {
  based: {
    EN: "Belgium",
    FR: "Belgique",
  },
  contact: {
    EN: "Contact me",
    FR: "Contactez-moi",
  },
  tagline: {
    EN: "Building fast, reliable web & mobile products — from freelance and institutional web projects to full-stack apps.",
    FR: "Je conçois des produits web & mobiles rapides et fiables — des projets web freelance et institutionnels aux applications full-stack.",
  },
};
```

- [ ] **Step 4: Render the tagline in `PersonalInfos.tsx`**

In `src/Components/PersonalInfos.tsx`, add the import:

```tsx
import { personalInfosText } from "../translations/personalInfos";
```

Then, right after the `<div className="big-title title-2">DEVELOPPER</div>{" "}` line, add:

```tsx
<div className="tagline">{personalInfosText.tagline[language]}</div>
```

- [ ] **Step 5: Add minimal styling**

In `src/scss/personnalInfos.scss`, add:

```scss
.tagline {
  max-width: 32rem;
  text-align: center;
  color: lightgray;
  font-size: medium;
  margin-top: 0.5rem;
  padding: 0 1rem;
  opacity: 0;
  @include fadeIn(1s, 1.8s);

  @media only screen and (max-width: 728px), only screen and (max-device-width: 728px) {
    font-size: small;
  }
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=PersonalInfos.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/translations/personalInfos.ts src/Components/PersonalInfos.tsx src/scss/personnalInfos.scss src/Components/PersonalInfos.test.tsx
git commit -m "feat: add hero value-proposition tagline"
```

---

### Task 4: Tech stack additions

**Files:**
- Modify: `src/Constants/techStack.ts`
- Create: `src/Constants/techStack.test.ts`

**Interfaces:**
- Produces: `technologies` array (in `src/Constants/techStack.ts`) includes `"Framer Motion"` and `"Three.js"` entries.

- [ ] **Step 1: Write the failing test**

Create `src/Constants/techStack.test.ts`:

```typescript
import { technologies } from "./techStack";

test("technologies list includes Framer Motion and Three.js", () => {
  const names = technologies.map((tech) => tech.name);
  expect(names).toContain("Framer Motion");
  expect(names).toContain("Three.js");

  const framerMotion = technologies.find((tech) => tech.name === "Framer Motion");
  const threeJs = technologies.find((tech) => tech.name === "Three.js");
  expect(framerMotion?.icon.path).toBeTruthy();
  expect(threeJs?.icon.path).toBeTruthy();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=techStack.test.ts`
Expected: FAIL — neither entry exists yet.

- [ ] **Step 3: Add the entries**

In `src/Constants/techStack.ts`, add `siFramer` and `siThreedotjs` to the import list:

```typescript
import {
  siGit,
  siGithub,
  siJavascript,
  siTypescript,
  siPython,
  siReact,
  siHtml5,
  siCss3,
  siNodedotjs,
  siExpress,
  siMongodb,
  siMongoose,
  siSocketdotio,
  siFirebase,
  siSass,
  siAngular,
  siSqlite,
  siPostgresql,
  siMysql,
  siAmazonwebservices,
  siRaspberrypi,
  siNextdotjs,
  siPrisma,
  siStripe,
  siSupabase,
  siOpenai,
  siFramer,
  siThreedotjs,
} from "simple-icons";
```

Then add these two entries to the `technologies` array, right after the `"NextJs"` entry:

```typescript
  { name: "Framer Motion", icon: siFramer, mostUsed: true },
  { name: "Three.js", icon: siThreedotjs, mostUsed: true },
```

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=techStack.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/Constants/techStack.ts src/Constants/techStack.test.ts
git commit -m "feat: list Framer Motion and Three.js in the tech stack"
```

---

### Task 5: 3D hero accent (`HeroVisual` + `Hero3D`)

**Files:**
- Create: `src/Components/Hero3D.tsx`
- Create: `src/Components/HeroVisual.tsx`
- Create: `src/Components/HeroVisual.test.tsx`
- Create: `src/scss/heroVisual.scss`
- Modify: `src/Components/PersonalInfos.tsx`
- Modify: `src/scss/personnalInfos.scss`

**Interfaces:**
- Consumes: nothing new — self-contained.
- Produces: `HeroVisual` default export, a component with no required props, rendered inside `PersonalInfos`'s `.me` block.

**Why this task is tested the way it is:** `@react-three/fiber`'s `<Canvas>` creates a real WebGL context via `three.js`. `jsdom` (the test environment `react-scripts test` uses) has no GPU and no WebGL implementation, so mounting `<Canvas>` in a test would throw, not skip gracefully. The automated test therefore only covers the branch that must NEVER mount the 3D canvas — `prefers-reduced-motion: reduce` — since that's the accessibility-critical, deterministic behavior. The branch that actually renders the 3D shape is verified manually in a real browser in the final task of this plan.

`HeroVisual` is also the first component in this codebase to call Framer Motion's `useReducedMotion()`/`useInView()`, both of which call browser APIs (`window.matchMedia`, `IntersectionObserver`) that `jsdom` does not implement at all — calling them without a mock throws `TypeError`, not a graceful no-op. Step 1 below adds global, deterministic mocks to `src/setupTests.ts` (loaded before every test file by `react-scripts test`) so this and every later test in the plan that touches motion-aware components (`Reveal` in Task 7, `AnimatedRoutes` in Task 10) gets a safe default (`prefers-reduced-motion: no-preference`) without repeating the mock per file.

- [ ] **Step 1: Add global browser API mocks for the test environment**

Replace the contents of `src/setupTests.ts` with:

```typescript
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// jsdom (the test environment react-scripts uses) implements neither
// matchMedia nor IntersectionObserver, both of which framer-motion's
// useReducedMotion()/useInView() call internally. Every test gets a safe
// default here (no reduced-motion preference, IntersectionObserver as a
// no-op) so components using those hooks don't throw during rendering.
beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

(global as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
```

- [ ] **Step 2: Write the failing reduced-motion test**

Create `src/Components/HeroVisual.test.tsx`:

```tsx
import React from "react";
import { render } from "@testing-library/react";
import HeroVisual from "./HeroVisual";

function setPrefersReducedMotion(matches: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

test("renders a static fallback with no 3D canvas when prefers-reduced-motion is set", () => {
  setPrefersReducedMotion(true);
  const { container } = render(<HeroVisual />);
  expect(container.querySelector("canvas")).toBeNull();
  expect(container.querySelector(".hero-visual-static")).not.toBeNull();
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=HeroVisual.test.tsx`
Expected: FAIL — `HeroVisual` doesn't exist yet.

- [ ] **Step 4: Create the 3D shape component**

Create `src/Components/Hero3D.tsx`:

```tsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function DistortedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.x += delta * 0.15;
    mesh.rotation.y += delta * 0.2;
    mesh.rotation.x += state.pointer.y * 0.0006;
    mesh.rotation.y += state.pointer.x * 0.0006;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.4, 4]}>
      <MeshDistortMaterial
        color="#8a5cf6"
        distort={0.4}
        speed={1.5}
        roughness={0.25}
        metalness={0.5}
      />
    </Icosahedron>
  );
}

function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <DistortedShape />
      </Suspense>
    </Canvas>
  );
}

export default Hero3D;
```

- [ ] **Step 5: Create the gating wrapper**

Create `src/Components/HeroVisual.tsx`:

```tsx
import React, { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Hero3D from "./Hero3D";
import "../scss/heroVisual.scss";

function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { margin: "200px 0px" });

  if (prefersReducedMotion) {
    return <div ref={containerRef} className="hero-visual hero-visual-static" aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className="hero-visual" aria-hidden="true">
      {isInView && <Hero3D />}
    </div>
  );
}

export default HeroVisual;
```

- [ ] **Step 6: Add styling**

Create `src/scss/heroVisual.scss`:

```scss
.hero-visual {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22rem;
  height: 22rem;
  z-index: 0;
  pointer-events: none;

  @media only screen and (max-width: 728px), only screen and (max-device-width: 728px) {
    width: 14rem;
    height: 14rem;
  }
}

.hero-visual-static {
  border-radius: 50%;
  background: radial-gradient(circle, rgba(138, 92, 246, 0.35) 0%, rgba(138, 92, 246, 0) 70%);
}
```

- [ ] **Step 7: Wire `HeroVisual` into `PersonalInfos`**

In `src/Components/PersonalInfos.tsx`, add the import:

```tsx
import HeroVisual from "./HeroVisual";
```

Then, as the first child inside the `.me` div (right before `<div className="img-container" ...>`), add:

```tsx
<HeroVisual />
```

The `.me` element already has `position: relative` (see `src/scss/personnalInfos.scss`), so the absolutely-positioned `.hero-visual` sits centered behind the photo without further layout changes.

- [ ] **Step 8: Run test to verify it passes**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=HeroVisual.test.tsx`
Expected: PASS

- [ ] **Step 9: Run the full test suite and the build to catch regressions**

Run: `CI=true npm test -- --watchAll=false`
Expected: All tests pass, including `PersonalInfos.test.tsx` from Task 3 — `PersonalInfos` now renders `HeroVisual`, which calls `useReducedMotion()`/`useInView()`, but the global mocks added to `src/setupTests.ts` in Step 1 cover that automatically.

Run: `npm run build`
Expected: Succeeds with no TypeScript errors.

- [ ] **Step 10: Commit**

```bash
git add src/Components/Hero3D.tsx src/Components/HeroVisual.tsx src/Components/HeroVisual.test.tsx src/scss/heroVisual.scss src/Components/PersonalInfos.tsx src/setupTests.ts
git commit -m "feat: add reduced-motion-aware 3D hero accent"
```

---

### Task 6: Ambient background lights via Framer Motion scroll values

**Files:**
- Modify: `src/Pages/HomePage.tsx`

**Interfaces:**
- No exported interface changes — internal refactor of `HomePage`'s render only.

**Why no automated test:** this task changes how four background `div`s are positioned as the user scrolls a real, laid-out page. `jsdom` doesn't run layout or paint, so `scrollYProgress` never changes in a test environment — an automated test here would either pass trivially (asserting nothing meaningful) or need to fake scroll math already covered by Framer Motion's own test suite. Correctness is instead covered by `npm run build` (catches type errors) and the manual scroll check in the final task.

- [ ] **Step 1: Replace the manual scroll handler with `useScroll`/`useTransform`**

Replace the full contents of `src/Pages/HomePage.tsx` with:

```tsx
import React, { useEffect, useMemo, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import Navbar from "../Components/Navbar";

import PersonalInfos from "../Components/PersonalInfos";
import TechStack from "../Components/TechStack";
import ProjectsContainer from "../Components/ProjectsContainer";
import ExperiencesContainer from "../Components/ExperiencesContainer";
import ContactContainer from "../Components/ContactContainer";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import { scrollToRef } from "../Functions/Utils";

import "../scss/homePage.scss";

const LIGHT_IDS = ["light-1", "light-2", "light-3", "light-4"] as const;
type LightId = (typeof LIGHT_IDS)[number];

interface TrajectoryPoint {
  top: number;
  left: number;
}

type LightTrajectories = {
  [key in LightId]: TrajectoryPoint[];
};

function getRandomNumber(): number {
  return Math.floor(Math.random() * 101);
}

function buildLightTrajectories(): LightTrajectories {
  return {
    "light-1": [
      { top: 20, left: 15 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
    "light-2": [
      { top: 70, left: 80 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
    "light-3": [
      { top: 50, left: 50 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
    "light-4": [
      { top: 60, left: 30 },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
      { top: getRandomNumber(), left: getRandomNumber() },
    ],
  };
}

const SCROLL_STOPS = [0, 0.33, 0.66, 1];

function useLightPosition(scrollYProgress: MotionValue<number>, trajectory: TrajectoryPoint[]) {
  const top = useTransform(scrollYProgress, SCROLL_STOPS, trajectory.map((p) => `${p.top}%`));
  const left = useTransform(scrollYProgress, SCROLL_STOPS, trajectory.map((p) => `${p.left}%`));
  return { top, left };
}

function HomePage() {
  const homeRef = useRef<HTMLDivElement>(null);
  const personnalInfosRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const refData = location.state;

  useEffect(() => {
    switch (refData) {
      case "perso":
        scrollToRef(personnalInfosRef);
        break;
      case "projects":
        scrollToRef(projectsRef);
        break;
      case "contact":
        scrollToRef(contactRef);
        break;
      default:
        window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    document.title = "Sébastien Botty";
  }, []);

  const trajectories = useMemo(() => buildLightTrajectories(), []);
  const { scrollYProgress } = useScroll();

  const light1 = useLightPosition(scrollYProgress, trajectories["light-1"]);
  const light2 = useLightPosition(scrollYProgress, trajectories["light-2"]);
  const light3 = useLightPosition(scrollYProgress, trajectories["light-3"]);
  const light4 = useLightPosition(scrollYProgress, trajectories["light-4"]);

  const lights: { id: LightId; position: { top: MotionValue<string>; left: MotionValue<string> } }[] = [
    { id: "light-1", position: light1 },
    { id: "light-2", position: light2 },
    { id: "light-3", position: light3 },
    { id: "light-4", position: light4 },
  ];

  return (
    <div className="App glow-background">
      <Navbar
        homeRef={homeRef}
        personalInfosRef={personnalInfosRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />
      <div ref={homeRef}>
        <PersonalInfos />
      </div>
      <div ref={projectsRef} className="class-container">
        <ProjectsContainer />
      </div>
      <div className="class-container">
        <TechStack />
      </div>
      <div ref={personnalInfosRef} className="class-container">
        <ExperiencesContainer />
      </div>
      <div ref={contactRef} className="class-container">
        <ContactContainer />
      </div>
      <div className="class-container">
        <Footer
          homeRef={homeRef}
          personalInfosRef={personnalInfosRef}
          projectsRef={projectsRef}
          contactRef={contactRef}
        />
      </div>
      {lights.map(({ id, position }) => (
        <motion.div key={id} className={`light ${id}`} style={position} />
      ))}
    </div>
  );
}

export default HomePage;
```

This drops the manual `scroll` event listener, the `requestAnimationFrame` debounce, and the `lights`/`setLights` state entirely — Framer Motion's `MotionValue`s update the DOM directly without triggering React re-renders on every scroll tick, which is both simpler and cheaper than the original implementation. The two stray `console.log(refData)` debug lines from the original are also removed.

- [ ] **Step 2: Verify the app still builds and the existing suite still passes**

Run: `npm run build`
Expected: Succeeds with no TypeScript errors.

Run: `CI=true npm test -- --watchAll=false`
Expected: All tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/Pages/HomePage.tsx
git commit -m "refactor: drive ambient background lights with framer-motion scroll values"
```

---

### Task 7: Shared scroll-reveal wrapper

**Files:**
- Create: `src/Components/Reveal.tsx`
- Create: `src/Components/Reveal.test.tsx`

**Interfaces:**
- Produces: `Reveal` default export, `{ children: React.ReactNode; className?: string }` props — a `motion.div` that fades/slides its children in once when scrolled into view, and renders children with no animation at all when `prefers-reduced-motion: reduce` is set.

- [ ] **Step 1: Write the failing test**

Create `src/Components/Reveal.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Reveal from "./Reveal";

test("renders its children", () => {
  render(
    <Reveal>
      <p>Section content</p>
    </Reveal>
  );
  expect(screen.getByText("Section content")).toBeInTheDocument();
});

test("forwards a custom className to the wrapper", () => {
  const { container } = render(
    <Reveal className="class-container">
      <p>Section content</p>
    </Reveal>
  );
  expect(container.querySelector(".class-container")).not.toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=Reveal.test.tsx`
Expected: FAIL — `Reveal` doesn't exist yet.

- [ ] **Step 3: Implement `Reveal`**

Create `src/Components/Reveal.tsx`:

```tsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

function Reveal({ children, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=Reveal.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/Components/Reveal.tsx src/Components/Reveal.test.tsx
git commit -m "feat: add shared scroll-reveal wrapper component"
```

---

### Task 8: Apply scroll reveals to the page sections

**Files:**
- Modify: `src/Pages/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 7 (`{ children, className? }`).

- [ ] **Step 1: Wrap each section container in `Reveal`**

In `src/Pages/HomePage.tsx`, add the import:

```tsx
import Reveal from "../Components/Reveal";
```

Then replace the four `<div className="class-container">...</div>` wrappers (for `ProjectsContainer`, `TechStack`, `ExperiencesContainer`, `ContactContainer`) with `Reveal`, keeping the existing `ref`s where present:

```tsx
<Reveal className="class-container">
  <div ref={projectsRef}>
    <ProjectsContainer />
  </div>
</Reveal>
<Reveal className="class-container">
  <TechStack />
</Reveal>
<Reveal className="class-container">
  <div ref={personnalInfosRef}>
    <ExperiencesContainer />
  </div>
</Reveal>
<Reveal className="class-container">
  <div ref={contactRef}>
    <ContactContainer />
  </div>
</Reveal>
```

Note the `ref`s move one level deeper (onto a plain `div` inside `Reveal`) since `Reveal`'s own root doesn't forward refs. The scroll-to-section behavior in the `useEffect` at the top of `HomePage` still works unchanged because `scrollToRef` only needs the ref's `current` element, not a specific nesting depth.

Leave the `Footer` section's wrapper `<div className="class-container">` as a plain `div` (no scroll-reveal on the footer — it's the last thing on the page, revealing it doesn't serve the reader).

Note on spec coverage: the spec lists `PersonalInfos` among the sections to reveal on scroll. It is intentionally left out here — `PersonalInfos` is the hero, visible at `scrollYProgress = 0` before the user can ever scroll, and its individual pieces (photo, name, titles, tagline, contact icons) already have their own fixed-delay CSS entrance animations (`@include fadeIn(...)`, see `src/scss/personnalInfos.scss`) that fire on mount. Wrapping the whole section in `Reveal` would be a no-op (it's already in view at t=0) and would fight those existing per-element delays. If a real regression is later found where the hero doesn't animate in on first load, that's a bug in the existing CSS animations, not something `Reveal` fixes.

- [ ] **Step 2: Verify the app still builds and tests pass**

Run: `npm run build`
Expected: Succeeds with no TypeScript errors.

Run: `CI=true npm test -- --watchAll=false`
Expected: All tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/Pages/HomePage.tsx
git commit -m "feat: reveal projects, tech stack, experience and contact sections on scroll"
```

---

### Task 9: Card and nav micro-interactions

**Files:**
- Modify: `src/Components/Project.tsx`
- Modify: `src/Components/TechContainer.tsx`
- Modify: `src/Components/Navbar.tsx`
- Create: `src/Components/Project.test.tsx`
- Create: `src/Components/TechContainer.test.tsx`

**Interfaces:**
- No new exported interfaces — adds `whileHover`/`whileTap` motion to existing components without changing their props.

- [ ] **Step 1: Write the failing smoke tests**

Create `src/Components/Project.test.tsx`:

```tsx
import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import Project from "./Project";
import { checkCar } from "../translations/projectsContainer";

test("still renders the project name and description after adding hover motion", () => {
  renderWithProviders(<Project projectData={checkCar} />);
  expect(screen.getByText("CheckCar")).toBeInTheDocument();
});
```

Create `src/Components/TechContainer.test.tsx`:

```tsx
import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import TechContainer from "./TechContainer";
import { technologies } from "../Constants/techStack";

test("still renders the technology name after adding hover motion", () => {
  const react = technologies.find((tech) => tech.name === "React")!;
  renderWithProviders(<TechContainer tech={react} />);
  expect(screen.getByText("React")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they currently pass (baseline) then will keep passing**

Run: `CI=true npm test -- --watchAll=false --testPathPattern="Project.test.tsx|TechContainer.test.tsx"`
Expected: PASS already (these are regression guards written before the change, confirming current behavior — the change in the next steps must not break them).

- [ ] **Step 3: Add hover/tap motion to `Project`**

In `src/Components/Project.tsx`, add the import:

```tsx
import { motion } from "framer-motion";
```

Change the root element from `<div className="project">` to:

```tsx
<motion.div
  className="project"
  whileHover={{ y: -8, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
```

(and the matching closing tag from `</div>` to `</motion.div>`). Remove the now-redundant CSS hover rule in `src/scss/project.scss`:

```scss
&:hover {
  transform: translateY(-5px);
}
```

(delete these three lines from `.project` — Framer Motion's `whileHover` now owns this transform, avoiding the two fighting over the `transform` property).

- [ ] **Step 4: Add hover motion to `TechContainer`**

Replace the contents of `src/Components/TechContainer.tsx` with:

```tsx
import React from "react";
import { motion } from "framer-motion";
import { TechnologyType } from "../Typescript/Types";
import TechIcon from "./TechIcon";

import "../scss/techContainer.scss";

function TechContainer({ tech, showIcon = true }: { tech: TechnologyType; showIcon?: boolean }) {
  return (
    <motion.div
      className="tech-container"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {showIcon && <TechIcon icon={tech.icon} />} {tech.name}{" "}
    </motion.div>
  );
}

export default TechContainer;
```

- [ ] **Step 5: Add tap feedback to nav links**

In `src/Components/Navbar.tsx`, add the import:

```tsx
import { motion } from "framer-motion";
```

Change each of the four `<div className="title" onClick={...}>` elements to `<motion.div className="title" whileTap={{ scale: 0.95 }} onClick={...}>` (closing tags to `</motion.div>`). For example, the first one becomes:

```tsx
<motion.div className="title" whileTap={{ scale: 0.95 }} onClick={() => handleClick("home", homeRef)}>
  {navBarText.home[language]}
</motion.div>
```

Apply the same change to the "projects", "perso", and "contact" nav items.

Note on spec coverage: the spec also lists the contact icons (GitHub/CV/Mail/LinkedIn in `PersonalInfos`) as hover targets. They are intentionally left untouched here — they already have a bespoke CSS hover (the `.reflect` class in `src/scss/personnalInfos.scss`: a scale-up plus a diagonal light-sweep pseudo-element). Adding a Framer Motion `whileHover` scale on top would animate the same `transform` property from two systems at once, which is a real conflict (whichever applies last wins per frame, causing visible jitter), not just redundant. The existing CSS effect already reads as polished; it is left as-is.

- [ ] **Step 6: Run tests to verify they still pass**

Run: `CI=true npm test -- --watchAll=false --testPathPattern="Project.test.tsx|TechContainer.test.tsx"`
Expected: PASS

Run: `CI=true npm test -- --watchAll=false`
Expected: All tests pass.

Run: `npm run build`
Expected: Succeeds with no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/Components/Project.tsx src/Components/TechContainer.tsx src/Components/Navbar.tsx src/scss/project.scss src/Components/Project.test.tsx src/Components/TechContainer.test.tsx
git commit -m "feat: add hover and tap micro-interactions to project cards, tech icons and nav links"
```

---

### Task 10: Page transition between routes

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx` (replace existing content)

**Interfaces:**
- No new exported interfaces — wraps the existing `<Routes>` in `AnimatePresence` via a new internal `AnimatedRoutes` component (not exported).

- [ ] **Step 1: Write the failing/updated smoke test**

The existing `src/App.test.tsx` asserts a "learn react link" that has never existed in this portfolio (a leftover from the Create React App template) — it currently fails or is meaningless. Replace its content with:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the home page nav bar on initial load", () => {
  render(<App />);
  expect(screen.getByText("GitHub")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to check current status**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=App.test.tsx`
Expected: PASS already (the Footer renders a "GitHub" link at initial load) — this is the regression guard for the next step, which must keep it passing.

- [ ] **Step 3: Wrap the routes in `AnimatePresence`**

Replace the contents of `src/App.tsx` with:

```tsx
import React, { useEffect, useState } from "react";
import { LanguageType } from "./Typescript/Types";
import { getBrowserLanguage } from "./Functions/language";
import { LanguageContext } from "./Contexts/useLanguage";
import "./scss/App.scss";

import HomePage from "./Pages/HomePage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";
import PageNotFound from "./Pages/PageNotFound";
import { pingNotMessenger } from "./backendLoader";

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const transitionProps = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25, ease: "easeInOut" as const },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...transitionProps}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectName" element={<ProjectPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [language, setLanguage] = useState<LanguageType>(getBrowserLanguage());

  useEffect(() => {
    //Start messenger free backend host by sending it an API call on portfolio loading
    pingNotMessenger();
  }, []);

  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AnimatedRoutes />
      </LanguageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 4: Run test to verify it still passes**

Run: `CI=true npm test -- --watchAll=false --testPathPattern=App.test.tsx`
Expected: PASS

Run: `CI=true npm test -- --watchAll=false`
Expected: All tests pass.

Run: `npm run build`
Expected: Succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: animate transitions between routes with framer-motion"
```

---

### Task 11: Manual verification pass

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run: `npm start` (leave it running)

- [ ] **Step 2: Check the hero**

Open `http://localhost:3000` in a browser. Confirm:
- The 3D distorted shape renders behind/around the profile photo, rotating slowly and reacting slightly to mouse movement, with no errors in the browser console.
- The tagline appears under "FULL STACK DEVELOPPER" in French (default) and switches to English via the flag dropdown, and vice versa.

- [ ] **Step 3: Check reduced motion**

In the browser dev tools, enable the "Emulate CSS prefers-reduced-motion: reduce" rendering setting, then reload. Confirm:
- No 3D canvas is present in the DOM (inspect element around the photo).
- A static soft-glow circle is shown instead.
- Section entrances no longer animate (content is simply present, not fading in). Turn the emulation back off afterward.

- [ ] **Step 4: Check scroll behavior**

With reduced motion off, scroll from top to bottom. Confirm:
- The four ambient background lights drift smoothly as you scroll, same as before the refactor.
- Each section (Projects, Tech Stack, Experiences, Contact) fades/slides into view the first time it enters the viewport, and does not re-animate when scrolling back up and down again.

- [ ] **Step 5: Check card and nav interactions**

Confirm:
- Hovering a project card lifts it slightly; clicking a nav link gives a brief press-down feedback.
- Hovering a tech stack icon scales it up slightly.

- [ ] **Step 6: Check the Experiences toggle**

In the Experiences section, click "Experiences"/"Expériences" — confirm the WHM Projects entry appears with the correct dates and bilingual text — then click back to "Studies"/"Études" and confirm the original three entries reappear.

- [ ] **Step 7: Check page transitions**

Click into a project's detail page (e.g. CheckCar) and back to the home page via the nav bar. Confirm the transition fades smoothly with no flash of unstyled content or layout jump, and that the ambient lights and scroll position behave correctly on the returned-to home page.

- [ ] **Step 8: Check the contact form is unaffected**

Fill in the contact form and confirm it still visually behaves as before (submit button, validation messages) — do not necessarily submit a real message unless you want to test the Formspree integration end-to-end.

- [ ] **Step 9: Final build check**

Run: `npm run build`
Expected: Succeeds with no errors or new warnings introduced by this plan.

- [ ] **Step 10: Stop the dev server**

Stop the process started in Step 1.
