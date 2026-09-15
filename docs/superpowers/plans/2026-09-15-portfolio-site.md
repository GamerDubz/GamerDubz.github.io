# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a personal portfolio site for Ubaid Desai at `https://gamerdubz.github.io`, showcasing his flagship shipped work (Yana, DoseStreaks, Qroma) and a paginated grid of 21 side/solo projects, structured to make the strongest possible impression on a hiring manager within 30 seconds.

**Architecture:** A single-page Next.js App Router site (`output: "export"`), sections stacked top-to-bottom, all content driven from typed data files in `lib/content/`. No backend, no CMS, no client-side data fetching — everything is static at build time. Icons for the 18 session-built projects are copied in from their source repos at authoring time; the 3 extra projects (European Nights, Flight Path, SVG-to-3D Converter) get hand-authored inline SVG icons.

**Tech Stack:** Next.js (latest) + TypeScript + Tailwind v4, `next/font/google` (Newsreader + Sora), lucide-react for icons, framer-motion for scroll-reveal and hover micro-interactions, Vitest for the two pure-logic modules (pagination, content validation), GitHub Actions → GitHub Pages for deploy.

**Spec:** `docs/superpowers/specs/2026-09-15-portfolio-site-design.md`

## Global Constraints

- Static export only (`output: "export"` in `next.config.ts`) — no server code, no API routes, no client-side fetch of remote data.
- Repo name must be exactly `GamerDubz.github.io` (GitHub Pages user-site convention) — no `basePath`/`assetPrefix` in `next.config.ts`.
- Light color palette. Background `#f1f2f4` (cool fog-gray), ink `#12141a`, accent `#0e6655` (deep emerald) — must NOT reuse any palette/font already used in the 18 session repos (see spec's "Visual design" section for the exclusion list).
- Fonts: `Newsreader` (serif, display/headings) + `Sora` (sans, UI/body) via `next/font/google`. No other font family.
- No emoji anywhere. lucide-react only for functional icons.
- No bare `any`. Every content shape has a named TypeScript type.
- Accessibility: 44×44px minimum touch targets, visible `:focus-visible` state, `aria-label` on every icon-only control, `prefers-reduced-motion` respected, no accessibility regressions.
- Motion: the site should feel dynamic, not static — every major section reveals on scroll, cards lift on hover, the projects grid animates between pages — but every single animated component MUST call framer-motion's `useReducedMotion()` and fall back to an instant, non-animated state when it returns true. No animation is exempt from this check. Nothing blocks interaction while animating (no disabled buttons during a transition, no animation gating content visibility beyond a fade-in).
- `npm run lint` and `npm run build` must be clean (zero errors/warnings) before every commit.
- European Nights is NOT a flagship project — it appears only in the projects grid.
- Flagship cards (Yana, DoseStreaks, Qroma) link to their live site only — never imply a public repo.

---

## File Structure

```
portfolio/
  app/
    layout.tsx              — root layout, fonts, metadata
    page.tsx                — assembles all sections in order
    globals.css             — design tokens, base styles
    icon.svg                — site favicon (personal monogram)
    apple-icon.tsx           — generated apple touch icon
  components/
    monogram.tsx             — personal "UD" mark (also used by icon.svg source)
    reveal.tsx                — shared scroll-reveal wrapper (framer-motion, reduced-motion aware)
    site-header.tsx
    hero-section.tsx
    flagship-section.tsx
    flagship-card.tsx
    experience-section.tsx
    skills-section.tsx
    projects-section.tsx     — owns pagination state
    project-card.tsx
    pagination-controls.tsx
    education-section.tsx
    site-footer.tsx
    project-icons/
      european-nights-icon.tsx
      flight-path-icon.tsx
      svg-to-3d-icon.tsx
  lib/
    content/
      identity.ts            — name, headline, summary, contact
      flagship.ts             — 3 flagship project records
      experience.ts           — timeline entries
      skills.ts                — skill groups + evidence text
      education.ts             — education entries
      projects.ts               — 21 project records
    pagination.ts             — pure paginate() function
    pagination.test.ts
    content.test.ts           — validates the data files
  public/
    icons/                    — 18 copied SVGs, named by slug
    resume.pdf
  .github/workflows/deploy.yml
  next.config.ts
  package.json
  tsconfig.json
  eslint.config.mjs
  postcss.config.mjs
  vitest.config.ts
```

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `.gitignore`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a runnable Next.js app; every later task adds to `app/page.tsx` and imports from `components/`/`lib/`

- [ ] **Step 1: Scaffold via create-next-app**

Run from `C:\Users\thema\OneDrive\Documents\Apps\portfolio`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --yes
```

- [ ] **Step 2: Set static export in `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 3: Strip the generated boilerplate**

Delete the default `public/*.svg` files (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) and `app/favicon.ico`. Replace `app/page.tsx` with a temporary placeholder:

```tsx
export default function Home() {
  return <main className="p-8">Portfolio — under construction</main>;
}
```

- [ ] **Step 4: Verify the app runs**

Run: `npm run build`
Expected: build succeeds, `out/index.html` exists.

- [ ] **Step 5: Add Vitest for the two pure-logic modules**

```bash
npm install -D vitest
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(scaffold): initialize Next.js static-export portfolio project"
```

---

### Task 2: Design tokens, base styles, and the shared Reveal animation wrapper

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/reveal.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: CSS custom properties every component below uses: `--color-bg`, `--color-surface`, `--color-ink`, `--color-ink-soft`, `--color-ink-faint`, `--color-accent`, `--color-accent-ink`, `--color-line`; the `font-serif-display` Tailwind utility class (backed by the Newsreader font set via `next/font/google` in `layout.tsx` and registered as a theme token in `app/globals.css`'s `@theme` block — deliberately NOT named `font-serif`, since that's Tailwind's own built-in utility and would silently resolve to its default Georgia-style stack instead); and `function Reveal({ children, delay, className }: { children: React.ReactNode; delay?: number; className?: string }): JSX.Element` — a scroll-triggered fade+slide-up wrapper every later section uses to animate its own content in, that instantly skips to its final visible state (no animation at all, not even a fade) when `useReducedMotion()` is true.

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Wire the fonts in `app/layout.tsx`**

- [ ] **Step 1: Wire the fonts in `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Newsreader, Sora } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ubaid Desai — Full-Stack Developer",
  description:
    "Full-stack developer building production software end to end — privacy-first health apps, a browser game with a custom simulation engine, and a run agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${sora.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Write `app/globals.css`**

```css
@import "tailwindcss";

* {
  box-sizing: border-box;
}

@theme {
  --color-bg: #f1f2f4;
  --color-surface: #fbfbfc;
  --color-ink: #12141a;
  --color-ink-soft: #4a4e58;
  --color-ink-faint: #868c98;
  --color-accent: #0e6655;
  --color-accent-ink: #f1f2f4;
  --color-line: #dcdfe3;

  --font-serif-display: var(--font-serif), ui-serif, Georgia, serif;
  --font-sans-ui: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
}

html {
  color-scheme: light;
}

body {
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans-ui);
  font-size: 16px;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

:focus-visible {
  outline: 2.5px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

- [ ] **Step 4: Write `components/reveal.tsx`**

Every later section wraps its content in this component instead of animating ad hoc, so the reduced-motion check lives in exactly one place:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds with no CSS errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(design): add design tokens, fonts, base styles, and Reveal animation wrapper"
```

---

### Task 3: Content data layer — identity, experience, skills, education

**Files:**
- Create: `lib/content/identity.ts`
- Create: `lib/content/experience.ts`
- Create: `lib/content/skills.ts`
- Create: `lib/content/education.ts`
- Create: `lib/content.test.ts`

**Interfaces:**
- Produces:
  - `type Identity = { name: string; headline: string; location: string; email: string; phone: string; linkedinUrl: string; githubUrl: string; summary: string; resumeHref: string }` and `export const identity: Identity`
  - `type ExperienceEntry = { role: string; org: string; location: string; start: string; end: string; bullets: string[] }` and `export const experience: ExperienceEntry[]`
  - `type SkillGroup = { title: string; skills: string; evidence: string }` and `export const skillGroups: SkillGroup[]`
  - `type EducationEntry = { credential: string; institution: string; period: string }` and `export const education: EducationEntry[]`
- Consumes: nothing

- [ ] **Step 1: Write `lib/content/identity.ts`**

```typescript
export type Identity = {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  summary: string;
  resumeHref: string;
};

export const identity: Identity = {
  name: "Ubaid Desai",
  headline: "Full-Stack Developer",
  location: "Durban, South Africa",
  email: "Ubaid786desai@gmail.com",
  phone: "+27 84 786 2260",
  linkedinUrl: "https://linkedin.com/in/ubaid-desai",
  githubUrl: "https://github.com/GamerDubz",
  summary:
    "I build full production software end to end, not just marketing sites — privacy-first health apps live in New Zealand and South Africa, a browser game with a simulation engine built from scratch, and a digital agency I founded and run. Also spend time in QA and applied AI model evaluation, which keeps my code honest.",
  resumeHref: "/resume.pdf",
};
```

- [ ] **Step 2: Write `lib/content/experience.ts`**

```typescript
export type ExperienceEntry = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Web Developer & QA Specialist",
    org: "Independent / Fiverr",
    location: "South Africa",
    start: "Jan 2026",
    end: "Present",
    bullets: [
      "Deliver custom web projects end to end, from client scoping through deployment.",
      "Run structured software QA — reproduce and write severity-classified bug reports developers can triage fast.",
    ],
  },
  {
    role: "Social Media Manager",
    org: "Private Retailer",
    location: "Durban, South Africa",
    start: "Nov 2025",
    end: "Present",
    bullets: [
      "Run content, campaigns, and community engagement for a local retail brand, tied directly to in-store sales goals.",
    ],
  },
  {
    role: "AI Training Specialist",
    org: "Alignerr & Outlier",
    location: "Remote",
    start: "2025",
    end: "Present",
    bullets: [
      "Evaluate and rank AI-generated responses for accuracy, safety, and alignment, and write training examples across reasoning, coding, and creative writing.",
    ],
  },
];
```

- [ ] **Step 3: Write `lib/content/skills.ts`**

```typescript
export type SkillGroup = {
  title: string;
  skills: string;
  evidence: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Web & Digital Strategy",
    skills: "React · Next.js · TypeScript · Supabase · SEO & GEO · Business Automation",
    evidence: "Used across Yana, DoseStreaks, and most of the projects below.",
  },
  {
    title: "Quality Assurance",
    skills: "App/Software Testing · Bug Reporting · Severity Assessment · Technical Documentation",
    evidence: "Runs full CI — lint, types, tests, build — on every push and PR on DoseStreaks.",
  },
  {
    title: "Creative & AI Tools",
    skills: "AI Prompt Engineering · Applied AI Model Evaluation · API Integration",
    evidence: "Daily work evaluating and training production AI models at Alignerr & Outlier.",
  },
];
```

- [ ] **Step 4: Write `lib/content/education.ts`**

```typescript
export type EducationEntry = {
  credential: string;
  institution: string;
  period: string;
};

export const education: EducationEntry[] = [
  {
    credential: "Higher Certificate in Mobile and Web Development, Computer Science",
    institution: "Emeris",
    period: "Feb 2026 – Nov 2027",
  },
  {
    credential: "Computer Science",
    institution: "Varsity College, South Africa",
    period: "2026 – Present",
  },
  {
    credential: "High School Diploma",
    institution: "Durban High School",
    period: "Graduated 2025",
  },
];
```

- [ ] **Step 5: Write the validation test `lib/content.test.ts`**

```typescript
import { describe, expect, it } from "vitest";
import { identity } from "./content/identity";
import { experience } from "./content/experience";
import { skillGroups } from "./content/skills";
import { education } from "./content/education";

describe("identity", () => {
  it("has every required field non-empty", () => {
    for (const [key, value] of Object.entries(identity)) {
      expect(value, `identity.${key}`).not.toBe("");
    }
  });

  it("has a valid mailto-able email", () => {
    expect(identity.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
  });
});

describe("experience", () => {
  it("has at least one entry with at least one bullet each", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const entry of experience) {
      expect(entry.bullets.length).toBeGreaterThan(0);
    }
  });
});

describe("skillGroups", () => {
  it("has at least one group with non-empty fields", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const group of skillGroups) {
      expect(group.title).not.toBe("");
      expect(group.skills).not.toBe("");
      expect(group.evidence).not.toBe("");
    }
  });
});

describe("education", () => {
  it("has at least one entry", () => {
    expect(education.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 6: Run the test**

Run: `npm run test`
Expected: all tests PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(content): add identity, experience, skills, and education data"
```

---

### Task 4: Pagination utility (TDD)

**Files:**
- Create: `lib/pagination.ts`
- Create: `lib/pagination.test.ts`

**Interfaces:**
- Produces: `function paginate<T>(items: T[], pageSize: number, page: number): { pageItems: T[]; totalPages: number; currentPage: number }` — `page` is 0-indexed and clamped into range.
- Consumes: nothing

- [ ] **Step 1: Write the failing tests**

```typescript
import { describe, expect, it } from "vitest";
import { paginate } from "./pagination";

const items = Array.from({ length: 21 }, (_, i) => i);

describe("paginate", () => {
  it("returns the first page of pageSize items", () => {
    const result = paginate(items, 10, 0);
    expect(result.pageItems).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result.totalPages).toBe(3);
    expect(result.currentPage).toBe(0);
  });

  it("returns a partial last page", () => {
    const result = paginate(items, 10, 2);
    expect(result.pageItems).toEqual([20]);
    expect(result.totalPages).toBe(3);
  });

  it("clamps a page below zero to zero", () => {
    const result = paginate(items, 10, -5);
    expect(result.currentPage).toBe(0);
    expect(result.pageItems).toEqual(items.slice(0, 10));
  });

  it("clamps a page past the end to the last page", () => {
    const result = paginate(items, 10, 99);
    expect(result.currentPage).toBe(2);
    expect(result.pageItems).toEqual([20]);
  });

  it("handles an empty list without dividing by zero", () => {
    const result = paginate([] as number[], 10, 0);
    expect(result.pageItems).toEqual([]);
    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL — `paginate` is not defined / module not found.

- [ ] **Step 3: Write the implementation**

```typescript
export type PaginationResult<T> = {
  pageItems: T[];
  totalPages: number;
  currentPage: number;
};

export function paginate<T>(
  items: T[],
  pageSize: number,
  page: number
): PaginationResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(0, page), totalPages - 1);
  const start = currentPage * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return { pageItems, totalPages, currentPage };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: all 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(pagination): add pure paginate() utility with edge-case tests"
```

---

### Task 5: Flagship projects data

**Files:**
- Create: `lib/content/flagship.ts`

**Interfaces:**
- Produces: `type FlagshipProject = { name: string; role: string; period: string; description: string; liveUrl: string; liveLabel: string }` and `export const flagshipProjects: FlagshipProject[]`
- Consumes: nothing

- [ ] **Step 1: Write `lib/content/flagship.ts`**

```typescript
export type FlagshipProject = {
  name: string;
  role: string;
  period: string;
  description: string;
  liveUrl: string;
  liveLabel: string;
};

export const flagshipProjects: FlagshipProject[] = [
  {
    name: "Yana",
    role: "Founding Senior Developer",
    period: "Apr 2026 – Present",
    description:
      "A privacy-first medication-adherence app for patients in New Zealand, shipped to native iOS and Android. Built with Next.js, TypeScript, and Supabase, on an offline-first sync layer with row-level-security enforced privacy, behind a 600+ page clinical library, a 449-medicine database, and a companion pharmacy dashboard.",
    liveUrl: "https://yana.co.nz",
    liveLabel: "yana.co.nz",
  },
  {
    name: "DoseStreaks",
    role: "Founding Senior Developer",
    period: "May 2026 – Present",
    description:
      "A local-first health companion PWA for South African patients, shipped to native Android. Built with Next.js, TypeScript, Zustand, and Supabase, with on-device OCR for label scanning and SA-guideline vitals tracking — full CI (lint, types, tests, build) runs on every push and PR.",
    liveUrl: "https://dosestreaks.co.za",
    liveLabel: "dosestreaks.co.za",
  },
  {
    name: "Qroma",
    role: "Founder",
    period: "Feb 2026 – Present",
    description:
      "A digital agency I founded and run, delivering web development, digital marketing, and business automation for clients — directing SEO/GEO strategy and AI-assisted creative production for campaigns end to end.",
    liveUrl: "https://www.qroma.digital/",
    liveLabel: "qroma.digital",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run build`
Expected: succeeds (this file isn't imported yet, but `tsc` runs over the whole project during build — confirm no type errors reported for this file).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(content): add flagship projects data"
```

---

### Task 6: Projects data (21 entries) and icon assets

**Files:**
- Create: `lib/content/projects.ts`
- Create: `public/icons/*.svg` (18 files, copied)
- Create: `components/project-icons/european-nights-icon.tsx`
- Create: `components/project-icons/flight-path-icon.tsx`
- Create: `components/project-icons/svg-to-3d-icon.tsx`
- Modify: `lib/content.test.ts` (add projects coverage)

**Interfaces:**
- Produces: `type Project = { slug: string; name: string; description: string; liveUrl: string; repoUrl: string | null; iconSrc: string | null }` — `iconSrc` is a `public/`-relative path (e.g. `/icons/imagekit.svg`) for the 18 copied icons, and `null` for the 3 projects that instead render one of the `project-icons/*` React components. `export const projects: Project[]`
- Consumes: `paginate` from Task 4 (used later by Task 11, not here)

- [ ] **Step 1: Copy the 18 icon files**

Run (from the portfolio directory):

```bash
mkdir -p public/icons
cp "../Side/01-snapframe/app/icon.svg" public/icons/snapframe.svg
cp "../Side/02-qr-studio/app/icon.svg" public/icons/qr-studio.svg
cp "../Side/03-invoiceforge/app/icon.svg" public/icons/invoiceforge.svg
cp "../Side/04-timezone-buddy/app/icon.svg" public/icons/timezone-buddy.svg
cp "../Side/05-csv-lens/app/icon.svg" public/icons/csv-lens.svg
cp "../Side/06-imagekit/app/icon.svg" public/icons/imagekit.svg
cp "../Side/07-decisionlab/app/icon.svg" public/icons/decisionlab.svg
cp "../Side/08-contrastlab/app/icon.svg" public/icons/contrastlab.svg
cp "../Side/09-resumeforge/app/icon.svg" public/icons/resumeforge.svg
cp "../Side/10-json-explorer/app/icon.svg" public/icons/json-explorer.svg
cp "../Side/12-gradientlab/app/icon.svg" public/icons/gradientlab.svg
cp "../Side/13-palette-from-image/app/icon.svg" public/icons/palette-from-image.svg
cp "../Side/14-markdown-studio/app/icon.svg" public/icons/markdown-studio.svg
cp "../Side/15-focus-room/app/icon.svg" public/icons/focus-room.svg
cp "../Side/16-regex-visualizer/app/icon.svg" public/icons/regex-visualizer.svg
cp "../Side/18-tiny-kanban/app/icon.svg" public/icons/tiny-kanban.svg
cp "../Side/19-readtime/app/icon.svg" public/icons/readtime.svg
cp "../Side/20-screensize/app/icon.svg" public/icons/screensize.svg
ls public/icons | wc -l
```

Expected: 18 files listed.

- [ ] **Step 2: Author the 3 bespoke icons for the non-session projects**

`components/project-icons/european-nights-icon.tsx` — a simple pitch/stadium-goal motif in one stroke color, consistent stroke-width with the copied icons (view them for reference: 2px stroke, 24x24 viewBox is typical of this session's marks):

```tsx
export function EuropeanNightsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <path d="M3 12h4M17 12h4M9 9v6M15 9v6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
```

`components/project-icons/flight-path-icon.tsx` — a globe-with-flight-arc motif:

```tsx
export function FlightPathIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.8 2.3 2.8 15 0 17M12 3.5c-2.8 2.3-2.8 15 0 17" />
      <path d="M6 7l3 -2.2M18 17l-3 2.2" strokeLinecap="round" />
    </svg>
  );
}
```

`components/project-icons/svg-to-3d-icon.tsx` — a flat-shape-to-cube motif:

```tsx
export function SvgTo3dIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    >
      <path d="M4 6h6v6H4z" />
      <path d="M13 9l4 -2.3 4 2.3v6l-4 2.3 -4 -2.3z" />
      <path d="M13 9l4 2.3 4 -2.3M17 11.3v6" />
    </svg>
  );
}
```

- [ ] **Step 3: Write `lib/content/projects.ts`**

```typescript
export type Project = {
  slug: string;
  name: string;
  description: string;
  liveUrl: string;
  repoUrl: string | null;
  iconSrc: string | null;
};

export const projects: Project[] = [
  {
    slug: "imagekit",
    name: "ImageKit",
    description:
      "Batch image resize, compress, convert, and rename entirely in the browser, with ZIP export.",
    liveUrl: "https://gamerdubz.github.io/imagekit/",
    repoUrl: "https://github.com/GamerDubz/imagekit",
    iconSrc: "/icons/imagekit.svg",
  },
  {
    slug: "csv-lens",
    name: "CSV Lens",
    description:
      "Drop in a CSV and get an instant, searchable, sortable data grid with per-column stats.",
    liveUrl: "https://gamerdubz.github.io/csv-lens/",
    repoUrl: "https://github.com/GamerDubz/csv-lens",
    iconSrc: "/icons/csv-lens.svg",
  },
  {
    slug: "json-explorer",
    name: "JSON Explorer",
    description:
      "Paste JSON and explore it as a real structural diagram, not just indentation.",
    liveUrl: "https://gamerdubz.github.io/json-explorer/",
    repoUrl: "https://github.com/GamerDubz/json-explorer",
    iconSrc: "/icons/json-explorer.svg",
  },
  {
    slug: "markdown-studio",
    name: "Markdown Studio",
    description:
      "A distraction-light Markdown editor with live preview and word/read-time stats.",
    liveUrl: "https://gamerdubz.github.io/markdown-studio/",
    repoUrl: "https://github.com/GamerDubz/markdown-studio",
    iconSrc: "/icons/markdown-studio.svg",
  },
  {
    slug: "regex-visualizer",
    name: "Regex Visualizer",
    description:
      "Test a regex against real text and see its structure as a railroad diagram.",
    liveUrl: "https://gamerdubz.github.io/regex-visualizer/",
    repoUrl: "https://github.com/GamerDubz/regex-visualizer",
    iconSrc: "/icons/regex-visualizer.svg",
  },
  {
    slug: "invoiceforge",
    name: "InvoiceForge",
    description:
      "Build and print a client-ready invoice, styled like a real printed document.",
    liveUrl: "https://gamerdubz.github.io/invoiceforge/",
    repoUrl: "https://github.com/GamerDubz/invoiceforge",
    iconSrc: "/icons/invoiceforge.svg",
  },
  {
    slug: "resumeforge",
    name: "ResumeForge",
    description: "A local-first resume builder with a live, print-ready preview.",
    liveUrl: "https://gamerdubz.github.io/resumeforge/",
    repoUrl: "https://github.com/GamerDubz/resumeforge",
    iconSrc: "/icons/resumeforge.svg",
  },
  {
    slug: "tiny-kanban",
    name: "Tiny Kanban",
    description: "A lightweight, localStorage-backed kanban board for a single project.",
    liveUrl: "https://gamerdubz.github.io/tiny-kanban/",
    repoUrl: "https://github.com/GamerDubz/tiny-kanban",
    iconSrc: "/icons/tiny-kanban.svg",
  },
  {
    slug: "qr-studio",
    name: "QR Studio",
    description:
      "Generate and customize QR codes — colors, size, error correction — with PNG export.",
    liveUrl: "https://gamerdubz.github.io/qr-studio/",
    repoUrl: "https://github.com/GamerDubz/qr-studio",
    iconSrc: "/icons/qr-studio.svg",
  },
  {
    slug: "gradientlab",
    name: "GradientLab",
    description: "A visual CSS gradient builder with draggable stops and instant copyable CSS.",
    liveUrl: "https://gamerdubz.github.io/gradientlab/",
    repoUrl: "https://github.com/GamerDubz/gradientlab",
    iconSrc: "/icons/gradientlab.svg",
  },
  {
    slug: "palette-from-image",
    name: "Palette from Image",
    description: "Extract a usable color palette straight out of any uploaded image.",
    liveUrl: "https://gamerdubz.github.io/palette-from-image/",
    repoUrl: "https://github.com/GamerDubz/palette-from-image",
    iconSrc: "/icons/palette-from-image.svg",
  },
  {
    slug: "contrastlab",
    name: "ContrastLab",
    description: "Check any two colors against WCAG contrast requirements at a glance.",
    liveUrl: "https://gamerdubz.github.io/contrastlab/",
    repoUrl: "https://github.com/GamerDubz/contrastlab",
    iconSrc: "/icons/contrastlab.svg",
  },
  {
    slug: "decisionlab",
    name: "DecisionLab",
    description: "Score and weigh options against your own criteria to make a harder decision easier.",
    liveUrl: "https://gamerdubz.github.io/decisionlab/",
    repoUrl: "https://github.com/GamerDubz/decisionlab",
    iconSrc: "/icons/decisionlab.svg",
  },
  {
    slug: "timezone-buddy",
    name: "Timezone Buddy",
    description: "Line up meeting times across timezones on one shared, scrubbable timeline.",
    liveUrl: "https://gamerdubz.github.io/timezone-buddy/",
    repoUrl: "https://github.com/GamerDubz/timezone-buddy",
    iconSrc: "/icons/timezone-buddy.svg",
  },
  {
    slug: "screensize",
    name: "ScreenSize",
    description: "Check your current viewport against real device breakpoints instantly.",
    liveUrl: "https://gamerdubz.github.io/screensize/",
    repoUrl: "https://github.com/GamerDubz/screensize",
    iconSrc: "/icons/screensize.svg",
  },
  {
    slug: "snapframe",
    name: "SnapFrame",
    description: "Frame a screenshot inside a real device/browser mockup for marketing or docs.",
    liveUrl: "https://gamerdubz.github.io/snapframe/",
    repoUrl: "https://github.com/GamerDubz/snapframe",
    iconSrc: "/icons/snapframe.svg",
  },
  {
    slug: "focus-room",
    name: "Focus Room",
    description: "A calm Pomodoro-style focus timer with ambient sound and task tracking.",
    liveUrl: "https://gamerdubz.github.io/focus-room/",
    repoUrl: "https://github.com/GamerDubz/focus-room",
    iconSrc: "/icons/focus-room.svg",
  },
  {
    slug: "readtime",
    name: "ReadTime",
    description: "Paste any text and get its reading time and readability scores instantly.",
    liveUrl: "https://gamerdubz.github.io/readtime/",
    repoUrl: "https://github.com/GamerDubz/readtime",
    iconSrc: "/icons/readtime.svg",
  },
  {
    slug: "european-nights",
    name: "European Nights",
    description:
      "A solo-built browser game — ~3,900 lines of strict TypeScript running a seeded Poisson match-simulation engine across two-legged knockouts.",
    liveUrl: "https://european-nights.vercel.app",
    repoUrl: null,
    iconSrc: null,
  },
  {
    slug: "flight-path-app",
    name: "Flight Path",
    description:
      "A travel journey tracker that turns logged flights into a gamified 3D globe, virtual passport, and journey timeline.",
    liveUrl: "https://flight-path-kappa.vercel.app",
    repoUrl: "https://github.com/GamerDubz/flight-path-app",
    iconSrc: null,
  },
  {
    slug: "svg-to-3d-converter",
    name: "SVG to 3D Converter",
    description: "Turns a flat SVG into an editable 3D model in the browser, built on Three.js.",
    liveUrl: "https://gamerdubz.github.io/svg-to-3d-converter/",
    repoUrl: "https://github.com/GamerDubz/svg-to-3d-converter",
    iconSrc: null,
  },
];
```

- [ ] **Step 4: Add project-data coverage to `lib/content.test.ts`**

Append to the existing file (import `projects` at the top alongside the other imports):

```typescript
import { projects } from "./content/projects";

describe("projects", () => {
  it("has exactly 21 entries", () => {
    expect(projects.length).toBe(21);
  });

  it("has a unique slug per project", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a non-empty name, description, and liveUrl for every project", () => {
    for (const project of projects) {
      expect(project.name, project.slug).not.toBe("");
      expect(project.description, project.slug).not.toBe("");
      expect(project.liveUrl, project.slug).toMatch(/^https:\/\//);
    }
  });

  it("has an iconSrc of null only for the 3 projects without a copied icon", () => {
    const noIcon = projects.filter((p) => p.iconSrc === null).map((p) => p.slug);
    expect(new Set(noIcon)).toEqual(
      new Set(["european-nights", "flight-path-app", "svg-to-3d-converter"])
    );
  });
});
```

- [ ] **Step 5: Run the test**

Run: `npm run test`
Expected: all tests PASS, including the 4 new `projects` tests.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(content): add 21-project data, copy 18 icons, author 3 bespoke icons"
```

---

### Task 7: Personal monogram + favicon

**Files:**
- Create: `components/monogram.tsx`
- Create: `app/icon.svg`
- Create: `app/apple-icon.tsx`

**Interfaces:**
- Produces: `function Monogram({ className }: { className?: string }): JSX.Element` — consumed by Task 8 (site header)
- Consumes: nothing

- [ ] **Step 1: Design and write the monogram component**

An interlocking "UD" mark, two overlapping geometric strokes, single accent color, works at 16–512px:

```tsx
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Ubaid Desai"
    >
      <path
        d="M7 6v13a6 6 0 0 0 12 0V6"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <path
        d="M17 26 27 6"
        stroke="var(--color-accent)"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Write `app/icon.svg`** (static favicon, same mark, self-contained — no CSS variables since favicons render outside the page's stylesheet)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="#f1f2f4" />
  <path d="M9 8v11a6 6 0 0 0 12 0V8" stroke="#12141a" stroke-width="2.4" stroke-linecap="round" />
  <path d="M17 25 25 8" stroke="#0e6655" stroke-width="2.4" stroke-linecap="round" />
</svg>
```

- [ ] **Step 3: Write `app/apple-icon.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f1f2f4",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <path
            d="M9 8v11a6 6 0 0 0 12 0V8"
            stroke="#12141a"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <path d="M17 25 25 8" stroke="#0e6655" strokeWidth={2.4} strokeLinecap="round" />
        </svg>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds; `out/icon.svg` and `out/apple-icon` (or `.png`) exist.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(brand): add personal monogram mark, favicon, and apple touch icon"
```

---

### Task 8: Site header

**Files:**
- Create: `components/site-header.tsx`

**Interfaces:**
- Consumes: `Monogram` (Task 7), `identity` (Task 3)
- Produces: `function SiteHeader(): JSX.Element` — used by Task 13 (`app/page.tsx`)

- [ ] **Step 1: Write the component**

```tsx
import Link from "next/link";
import { Monogram } from "./monogram";
import { identity } from "@/lib/content/identity";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-(--color-line) bg-(--color-bg)/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-2 font-serif-display text-lg font-medium text-(--color-ink)">
          <Monogram className="h-8 w-8 text-(--color-ink)" />
          {identity.name}
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium text-(--color-ink-soft) md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="min-h-11 py-2 hover:text-(--color-ink)">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={identity.resumeHref}
          className="inline-flex min-h-11 items-center rounded-full bg-(--color-ink) px-4 text-sm font-semibold text-(--color-bg) transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90"
          download
        >
          Résumé
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds. (Component isn't wired into `app/page.tsx` yet — this step just confirms it type-checks in isolation via the project-wide `tsc` pass.)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(header): add sticky site header with nav and resume link"
```

---

### Task 9: Hero section

**Files:**
- Create: `components/hero-section.tsx`

**Interfaces:**
- Consumes: `identity` (Task 3)
- Produces: `function HeroSection(): JSX.Element` — used by Task 13

This section animates on page load (not on scroll — it's above the fold, so
scroll-triggered reveal via `Reveal` would never fire until the user
scrolled away and back). It uses framer-motion directly with a staggered
container so the eyebrow, headline, paragraph, and buttons appear in
sequence, gated by the same `useReducedMotion()` check as `Reveal`.

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { identity } from "@/lib/content/identity";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  // When reduced motion is preferred, start already in the "show" state —
  // initial and animate are then identical, so framer-motion renders the
  // final state directly with no visible transition. This keeps every
  // element as a real motion.div (no tag-swapping, no prop-shape branching)
  // while still fully honoring the user's preference.
  const initialState = shouldReduceMotion ? "show" : "hidden";

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-24">
      <motion.div variants={container} initial={initialState} animate="show">
        <motion.div variants={item}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
            {identity.location}
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h1 className="mt-4 max-w-3xl font-serif-display text-5xl font-medium leading-[1.05] text-(--color-ink) sm:text-6xl">
            {identity.name}, {identity.headline.toLowerCase()}.
          </h1>
        </motion.div>
        <motion.div variants={item}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-ink-soft)">
            {identity.summary}
          </p>
        </motion.div>
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center rounded-full bg-(--color-accent) px-6 text-sm font-semibold text-(--color-accent-ink) transition-transform duration-200 hover:-translate-y-0.5"
          >
            View my work
          </a>
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex min-h-11 items-center rounded-full border border-(--color-line) px-6 text-sm font-semibold text-(--color-ink) transition-transform duration-200 hover:-translate-y-0.5"
          >
            Email me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(hero): add hero section"
```

---

### Task 10: Flagship work section

**Files:**
- Create: `components/flagship-card.tsx`
- Create: `components/flagship-section.tsx`

**Interfaces:**
- Consumes: `flagshipProjects` (Task 5), `Reveal` (Task 2)
- Produces: `function FlagshipSection(): JSX.Element` — used by Task 13

`FlagshipCard` itself has a plain CSS hover-lift (already reduced-motion-safe
via Task 2's global `@media (prefers-reduced-motion: reduce)` rule, which
zeroes every `transition-duration` on the page — no framer-motion needed for
a simple hover). `FlagshipSection` wraps each card in `Reveal` with a
staggered delay so the three cards animate in one after another as the
section scrolls into view.

- [ ] **Step 1: Write `components/flagship-card.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import type { FlagshipProject } from "@/lib/content/flagship";

export function FlagshipCard({ project }: { project: FlagshipProject }) {
  return (
    <article className="h-full rounded-2xl border border-(--color-line) bg-(--color-surface) p-8 transition-transform duration-300 hover:-translate-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-serif-display text-2xl font-medium text-(--color-ink)">{project.name}</h3>
        <span className="text-sm text-(--color-ink-faint)">{project.period}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-(--color-accent)">{project.role}</p>
      <p className="mt-4 text-base leading-relaxed text-(--color-ink-soft)">
        {project.description}
      </p>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-ink) hover:text-(--color-accent)"
      >
        {project.liveLabel}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
```

- [ ] **Step 2: Write `components/flagship-section.tsx`**

```tsx
import { flagshipProjects } from "@/lib/content/flagship";
import { FlagshipCard } from "./flagship-card";
import { Reveal } from "./reveal";

export function FlagshipSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Shipped work</h2>
      <p className="mt-2 max-w-2xl text-(--color-ink-soft)">
        Production software in real people&apos;s hands, not just prototypes.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {flagshipProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.1} className="h-full">
            <FlagshipCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(flagship): add shipped-work section with 3 case-study cards"
```

---

### Task 11: Experience and skills sections

**Files:**
- Create: `components/experience-section.tsx`
- Create: `components/skills-section.tsx`

**Interfaces:**
- Consumes: `experience` (Task 3), `skillGroups` (Task 3), `Reveal` (Task 2)
- Produces: `function ExperienceSection(): JSX.Element`, `function SkillsSection(): JSX.Element` — used by Task 13

`<ol>` requires `<li>` as its direct children (a `<div>` there would be
invalid HTML and break the timeline's semantics), so in
`ExperienceSection` the `<li>` itself is NOT the animated element — only
its inner content block is wrapped in `Reveal`, with the decorative dot
staying a direct, unanimated child of the `<li>`. `SkillsSection`'s cards
have no such constraint, so each one is wrapped in `Reveal` directly, same
pattern as the flagship cards.

- [ ] **Step 1: Write `components/experience-section.tsx`**

```tsx
import { experience } from "@/lib/content/experience";
import { Reveal } from "./reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Experience</h2>
      <ol className="mt-10 space-y-10 border-l border-(--color-line) pl-8">
        {experience.map((entry, index) => (
          <li key={entry.role} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-(--color-accent)" />
            <Reveal delay={index * 0.1}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-(--color-ink)">{entry.role}</h3>
                <span className="text-sm text-(--color-ink-faint)">
                  {entry.start} – {entry.end}
                </span>
              </div>
              <p className="text-sm text-(--color-ink-soft)">
                {entry.org} · {entry.location}
              </p>
              <ul className="mt-3 space-y-1.5 text-base text-(--color-ink-soft)">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/skills-section.tsx`**

```tsx
import { skillGroups } from "@/lib/content/skills";
import { Reveal } from "./reveal";

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Skills</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.1} className="h-full">
            <div className="h-full rounded-2xl border border-(--color-line) bg-(--color-surface) p-6 transition-transform duration-300 hover:-translate-y-1.5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-(--color-accent)">
                {group.title}
              </h3>
              <p className="mt-3 text-base text-(--color-ink)">{group.skills}</p>
              <p className="mt-3 text-sm text-(--color-ink-faint)">{group.evidence}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(experience,skills): add experience timeline and skills sections"
```

---

### Task 12: Project card component

**Files:**
- Create: `components/project-card.tsx`

**Interfaces:**
- Consumes: `Project` type (Task 6), the 3 bespoke icon components (Task 6)
- Produces: `function ProjectCard({ project }: { project: Project }): JSX.Element` — used by Task 13 (projects section)

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/content/projects";
import { EuropeanNightsIcon } from "./project-icons/european-nights-icon";
import { FlightPathIcon } from "./project-icons/flight-path-icon";
import { SvgTo3dIcon } from "./project-icons/svg-to-3d-icon";

const FALLBACK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "european-nights": EuropeanNightsIcon,
  "flight-path-app": FlightPathIcon,
  "svg-to-3d-converter": SvgTo3dIcon,
};

export function ProjectCard({ project }: { project: Project }) {
  const FallbackIcon = FALLBACK_ICONS[project.slug];

  return (
    <article className="flex h-full flex-col rounded-xl border border-(--color-line) bg-(--color-surface) p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-bg) text-(--color-ink)">
        {project.iconSrc ? (
          <Image src={project.iconSrc} alt="" width={22} height={22} aria-hidden="true" />
        ) : FallbackIcon ? (
          <FallbackIcon className="h-[22px] w-[22px]" />
        ) : null}
      </div>
      <h3 className="mt-4 text-base font-semibold text-(--color-ink)">{project.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-(--color-ink-soft)">
        {project.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-sm font-medium">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-(--color-ink) hover:text-(--color-accent)"
        >
          Live <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-(--color-ink-soft) hover:text-(--color-accent)"
            aria-label={`${project.name} source code on GitHub`}
          >
            <Github size={14} aria-hidden="true" /> Code
          </a>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Configure `next.config.ts` for static `next/image`**

Static export requires unoptimized images (already set in Task 1's `next.config.ts` — verify `images: { unoptimized: true }` is present; if not, add it now).

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(projects): add project card component with live/repo links"
```

---

### Task 13: Projects section with pagination

**Files:**
- Create: `components/pagination-controls.tsx`
- Create: `components/projects-section.tsx`

**Interfaces:**
- Consumes: `paginate` (Task 4), `projects` (Task 6), `ProjectCard` (Task 12), `Reveal` (Task 2)
- Produces: `function ProjectsSection(): JSX.Element` — used by Task 14

- [ ] **Step 1: Write `components/pagination-controls.tsx`**

```tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export function PaginationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage === 0}
        aria-label="Previous projects"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) disabled:opacity-30"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <span className="text-sm font-medium text-(--color-ink-faint)">
        {currentPage + 1} / {totalPages}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next projects"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) disabled:opacity-30"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/projects-section.tsx`**

Fixed page size of 10 (5×2 desktop grid) for every viewport — the grid reflows to fewer columns on narrower screens via CSS alone (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`), so the same 10 items per page just wrap into more rows on mobile instead of changing how many load per page. This keeps the pagination logic single-source-of-truth and avoids a second, viewport-dependent page-size path.

Changing pages animates as a crossfade + slight horizontal slide between
the outgoing and incoming grid via `AnimatePresence`, keyed on the current
page number so framer-motion treats each page as a distinct element to
transition between. Under reduced motion, `AnimatePresence` still swaps
the content but every transform/opacity transition collapses to 0 duration
because `transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}`
is passed explicitly (relying on the global CSS media query alone does NOT
work here, since framer-motion's `AnimatePresence` exit/enter animations
are driven by its own JS timing, not CSS transitions).

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/content/projects";
import { paginate } from "@/lib/pagination";
import { ProjectCard } from "./project-card";
import { PaginationControls } from "./pagination-controls";
import { Reveal } from "./reveal";

const PAGE_SIZE = 10;

export function ProjectsSection() {
  const [page, setPage] = useState(0);
  const { pageItems, totalPages, currentPage } = paginate(projects, PAGE_SIZE, page);
  const shouldReduceMotion = useReducedMotion();
  const pageTransition = { duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" as const };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Projects</h2>
        <p className="mt-2 max-w-2xl text-(--color-ink-soft)">
          {projects.length} shipped side projects and experiments — each one a real, working app.
        </p>
      </Reveal>
      <div className="relative mt-10 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
            transition={pageTransition}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {pageItems.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(projects): add paginated projects grid section"
```

---

### Task 14: Education section and footer

**Files:**
- Create: `components/education-section.tsx`
- Create: `components/site-footer.tsx`

**Interfaces:**
- Consumes: `education` (Task 3), `identity` (Task 3), `Reveal` (Task 2)
- Produces: `function EducationSection(): JSX.Element`, `function SiteFooter(): JSX.Element` — used by Task 15

- [ ] **Step 1: Write `components/education-section.tsx`**

```tsx
import { education } from "@/lib/content/education";
import { Reveal } from "./reveal";

export function EducationSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Education</h2>
        <ul className="mt-8 space-y-4">
          {education.map((entry) => (
            <li key={entry.credential} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-(--color-line) pb-4">
              <div>
                <p className="font-medium text-(--color-ink)">{entry.credential}</p>
                <p className="text-sm text-(--color-ink-soft)">{entry.institution}</p>
              </div>
              <span className="text-sm text-(--color-ink-faint)">{entry.period}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/site-footer.tsx`**

```tsx
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { identity } from "@/lib/content/identity";
import { Reveal } from "./reveal";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-(--color-line) bg-(--color-surface)">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
        <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">
          Let&apos;s work together
        </h2>
        <p className="mt-2 max-w-xl text-(--color-ink-soft)">
          Open to full-stack roles and freelance projects — reach out any way that&apos;s easiest.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-(--color-ink)">
          <a href={`mailto:${identity.email}`} className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)">
            <Mail size={18} aria-hidden="true" /> {identity.email}
          </a>
          <a href={`tel:${identity.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)">
            <Phone size={18} aria-hidden="true" /> {identity.phone}
          </a>
          <a
            href={identity.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)"
          >
            <Linkedin size={18} aria-hidden="true" /> LinkedIn
          </a>
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)"
          >
            <Github size={18} aria-hidden="true" /> GitHub
          </a>
        </div>
        <p className="mt-12 text-xs text-(--color-ink-faint)">
          © {new Date().getFullYear()} {identity.name}
        </p>
        </Reveal>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(footer): add education section and contact footer"
```

---

### Task 15: Assemble the homepage

**Files:**
- Modify: `app/page.tsx`
- Modify: `public/resume.pdf` (copy in)

**Interfaces:**
- Consumes: every section component from Tasks 8–14
- Produces: the complete rendered page

- [ ] **Step 1: Copy the résumé PDF into `public/`**

```bash
cp "C:\Users\thema\Downloads\Ubaid_Desai_Resume.pdf" public/resume.pdf
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FlagshipSection } from "@/components/flagship-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { EducationSection } from "@/components/education-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FlagshipSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 3: Run full gates**

Run: `npm run lint`
Expected: zero errors/warnings.

Run: `npm run test`
Expected: all tests PASS.

Run: `npm run build`
Expected: succeeds, `out/index.html` renders the full page.

- [ ] **Step 4: Manual responsive check**

Run: `npm run dev`, open in a browser at a mobile width (375px) and a desktop width (1440px). Confirm:
- The projects grid shows 2 columns on mobile, 5 on desktop, with pagination controls usable at both.
- The flagship cards, experience timeline, and skills grid each reflow to single/narrow column on mobile without horizontal scroll.
- Every interactive element (nav links, résumé button, pagination arrows, footer links) has a visible focus ring when tabbed to.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble homepage from all sections, add resume download"
```

---

### Task 16: Deploy workflow and GitHub Pages setup

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: the built `out/` directory from Task 15
- Produces: a live site at `https://gamerdubz.github.io`

- [ ] **Step 1: Write the deploy workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Write a short `README.md`**

```markdown
# Ubaid Desai — Portfolio

Personal portfolio site, built with Next.js (static export) and deployed to
GitHub Pages at https://gamerdubz.github.io.

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test
```

## Build

```bash
npm run build
```
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "ci: add GitHub Pages deploy workflow"
```

- [ ] **Step 4: Create the GitHub repo and push**

```bash
gh repo create GamerDubz/GamerDubz.github.io --public --source=. --remote=origin
git branch -M main
git push -u origin main
```

- [ ] **Step 5: Enable GitHub Pages via GitHub Actions**

```bash
gh api -X PUT repos/GamerDubz/GamerDubz.github.io/pages -f build_type=workflow
```

If that returns an error because Pages isn't initialized yet, create it first:

```bash
gh api -X POST repos/GamerDubz/GamerDubz.github.io/pages -f "source[branch]=main" -f "source[path]=/" -f build_type=workflow
```

- [ ] **Step 6: Verify the deploy**

Run: `gh run list --limit 1` — confirm the "Deploy to GitHub Pages" workflow shows `completed`/`success`.

Then check `https://gamerdubz.github.io` loads and shows the full site.

---

## Self-Review Notes

- **Spec coverage:** every spec section has a task — scaffold/deploy (Tasks 1, 16), design tokens (Task 2), identity/experience/skills/education content (Task 3), pagination (Task 4), flagship content (Task 5), projects content + icons (Task 6), monogram/favicon (Task 7), header (Task 8), hero (Task 9), flagship UI (Task 10), experience/skills UI (Task 11), project card (Task 12), projects grid + pagination UI (Task 13), education/footer (Task 14), assembly + resume + responsive check (Task 15).
- **Placeholder scan:** no TBD/TODO; every code block is complete, runnable code, not a description.
- **Type consistency:** `Project`, `FlagshipProject`, `ExperienceEntry`, `SkillGroup`, `EducationEntry`, `Identity`, and `PaginationResult<T>` are each defined once (Tasks 3–6) and referenced with matching field names in every later task that consumes them (Tasks 8–14).
