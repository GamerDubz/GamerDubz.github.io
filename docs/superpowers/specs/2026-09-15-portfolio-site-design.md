# Portfolio site — design spec

## Goal

A personal portfolio site for Ubaid Desai that gives a hiring manager the
best possible impression in the first 30 seconds, then backs it up with
real, verifiable work. It has to read as **full-stack developer**, not
"marketer who codes" — even though the resume spans digital marketing, QA,
and AI work too, and that breadth should show up as a strength (versatility),
not dilute the headline.

## Non-goals

- No CMS, no backend, no database, no contact form with a server — this is
  a static site. Contact is a `mailto:` link, a `tel:` link, and profile
  links (GitHub, LinkedIn).
- No blog/CMS content pipeline. Content is authored directly in typed data
  files and components.
- No dark-mode toggle for v1 — one considered light palette, done well,
  beats two half-finished ones.

## Tech stack & deployment

- Next.js (latest, matching the other 18 repos) + TypeScript + Tailwind,
  `output: "export"` static export — identical pattern to every other repo
  built this session.
- New repo: **`GamerDubz.github.io`** — the special GitHub Pages *user site*
  name, so it deploys at the bare root `https://gamerdubz.github.io` with no
  subpath and no `basePath` config needed.
- Same GitHub Actions → Pages deploy workflow used by the other 18 repos,
  copied and adapted (no `basePath`/`assetPrefix` since this is a user site).
- lucide-react for icons, `next/font/google` for real webfonts, no emoji
  anywhere, no bare `any`.

## Content model

### Identity

- Name: Ubaid Desai
- Headline: **Full-Stack Developer** (secondary line acknowledges the
  marketing/QA/AI breadth as range, not the main billing)
- Location: Durban, South Africa
- Contact: `Ubaid786desai@gmail.com`, `+27 84 786 2260`,
  `linkedin.com/in/ubaid-desai`, GitHub: `github.com/GamerDubz`
- Summary: rewritten/tightened from the resume's opening paragraph — not
  copied verbatim. Something in the register of: ships full production
  software end to end (not just marketing sites), spanning privacy-first
  health apps live in two countries, a browser game with a from-scratch
  simulation engine, and an agency he founded and runs.

### Flagship work (3 case-study cards, NOT 4 — European Nights excluded per
explicit instruction, not shown anywhere on the site)

Each card describes the project holistically — what it is, who it's for,
what it does for them — with technical details folded in as supporting
mentions ("built on an offline-first sync layer with row-level-security
enforced privacy", not headlined as *the* feature). No repo link for these
three — they're proprietary/client work, so each card links only to its
live site, clearly labeled as such (no dead/absent "View code" button, no
implication of a public repo that doesn't exist).

1. **Yana** — privacy-first medication-adherence app for New Zealand
   patients. Next.js, TypeScript, Supabase, shipped to native iOS/Android
   via Capacitor. Founding Senior Developer. Live: `https://yana.co.nz`.
2. **DoseStreaks** — local-first health companion PWA for South African
   patients. Next.js, TypeScript, Zustand, Supabase, shipped to native
   Android via Capacitor. Founding Senior Developer. Live:
   `https://dosestreaks.co.za`.
3. **Qroma** — digital agency he founded, delivering web development,
   digital marketing, SEO/GEO strategy, and business automation for
   clients. Live: `https://www.qroma.digital/`.

### Experience (condensed timeline)

- Freelance Web Developer & QA Specialist — Independent/Fiverr, South
  Africa, Jan 2026–Present
- Social Media Manager — Private Retailer, Durban, Nov 2025–Present
- AI Training Specialist — Alignerr & Outlier, Remote, 2025–Present

Each gets 1–2 tightened bullet points, not copy-pasted resume bullets.

### Skills

Grouped by category (Web & Digital Strategy / Quality Assurance /
Creative & AI Tools, per the resume's own grouping), but each skill or
group links back to evidence already on the page — e.g. "React · Next.js ·
TypeScript · Supabase" annotated with "used across Yana, DoseStreaks, and
14 of the projects below" — rather than a flat, unverifiable tag cloud.

### Projects grid — all 18 repos

All 18 side-project repos built/redesigned/fixed this session, shown as a
**paginated grid, 5 columns × 2 rows (10 per page) on desktop**, with
next/prev controls to page through the remaining 8. Each card shows:

- That project's actual custom SVG logo/favicon (copied from each repo's
  `app/icon.svg` into this site's `public/icons/<slug>.svg` at build time —
  not a generic placeholder, not fetched live from the other sites) as the
  card's visual.
- Project name (display name, e.g. "SnapFrame", not the folder slug)
- One tightened one-line description of what it does
- Link to the live GitHub Pages site and the GitHub repo

The 18, in display order (curated for a strong opening page — most
resume-relevant/impressive first, novelty/utility later — exact order
finalized during implementation, not fixed rigidly here):

| Slug | Display name | One-liner |
|---|---|---|
| imagekit | ImageKit | Batch image resize, compress, convert, and rename entirely in the browser, with ZIP export. |
| csv-lens | CSV Lens | Drop in a CSV and get an instant, searchable, sortable data grid with per-column stats. |
| json-explorer | JSON Explorer | Paste JSON and explore it as a real structural diagram, not just indentation. |
| markdown-studio | Markdown Studio | A distraction-light Markdown editor with live preview and word/read-time stats. |
| regex-visualizer | Regex Visualizer | Test a regex against real text and see its structure as a railroad diagram. |
| invoiceforge | InvoiceForge | Build and print a client-ready invoice, styled like a real printed document. |
| resumeforge | ResumeForge | A local-first resume builder with a live, print-ready preview. |
| tiny-kanban | Tiny Kanban | A lightweight, localStorage-backed kanban board for a single project. |
| qr-studio | QR Studio | Generate and customize QR codes — colors, size, error correction — with PNG export. |
| gradientlab | GradientLab | A visual CSS gradient builder with draggable stops and instant copyable CSS. |
| palette-from-image | Palette from Image | Extract a usable color palette straight out of any uploaded image. |
| contrastlab | ContrastLab | Check any two colors against WCAG contrast requirements at a glance. |
| decisionlab | DecisionLab | Score and weigh options against your own criteria to make a harder decision easier. |
| timezone-buddy | Timezone Buddy | Line up meeting times across timezones on one shared, scrubbable timeline. |
| screensize | ScreenSize | Check your current viewport against real device breakpoints instantly. |
| snapframe | SnapFrame | Frame a screenshot inside a real device/browser mockup for marketing or docs. |
| focus-room | Focus Room | A calm Pomodoro-style focus timer with ambient sound and task tracking. |
| readtime | ReadTime | Paste any text and get its reading time and readability scores instantly. |

### Education

- Higher Certificate in Mobile and Web Development, Computer Science —
  Emeris, Feb 2026 – Nov 2027
- Computer Science — Varsity College, South Africa, 2026–Present
- High School Diploma — Durban High School, graduated 2025

## Visual design

- **Light palette**, but deliberately distinct from every one of the 18
  project redesigns done this session (none of those tokens/fonts get
  reused) — this needs to read as a premium personal-brand site, not
  "app #19."
- One considered accent color, generous whitespace, confident large type
  for the hero and section headers, a real serif/sans pairing via
  `next/font/google` (exact pairing decided during implementation, not
  locked here — will avoid anything already used across the 18 apps:
  Fraunces, Archivo, Manrope, Nunito, Instrument Sans, Work Sans, IBM Plex
  *, Familjen Grotesk, Quicksand, Caveat, Source Serif 4 are all already
  spoken for elsewhere in this portfolio and must not repeat here).
- An original small personal monogram/mark for the header, in the same
  spirit as the per-project logos already built this session (bespoke
  inline SVG, not a generic icon).
- Fully responsive: the flagship cards, experience timeline, and skills
  section reflow to single-column on mobile; the projects grid reflows
  from 5×2 to a narrower column count (e.g. 2 columns on mobile, still
  paginated, batch size adapts to viewport rather than forcing 5-wide on a
  360px screen) while keeping the click-to-page-through interaction.
- Standard accessibility bar carried over from the rest of this session's
  work: 44×44px touch targets, visible focus states, aria-labels on
  icon-only controls, `prefers-reduced-motion` respected, no emoji, no
  bare `any`.

## Data flow

- All content (identity, flagship projects, experience, skills, the 18
  projects list, education) lives in typed TypeScript data files under
  `lib/` or `content/` — not hardcoded inline in JSX — so it's a single
  place to edit later without touching layout code.
- Each of the 18 projects' `icon.svg` is copied into this repo's
  `public/icons/` at authoring time (a one-time copy step during
  implementation, not a runtime fetch), so the grid never depends on the
  other 18 sites being up.

## Testing / gates

- `npm run lint` and `npm run build` clean, same bar as the rest of the
  session's work.
- Manual responsive check at mobile and desktop widths before considering
  it done (this is a fresh build, not a fix, so there's no existing
  behavior to regression-test against).

## Open items resolved during this brainstorm

- European Nights: excluded from the site entirely, per explicit
  instruction — not featured anywhere, not even as a passing mention.
- Flagship links: Yana → yana.co.nz, DoseStreaks → dosestreaks.co.za,
  Qroma → https://www.qroma.digital/. All three are live-site-only (no
  public repo link).
- Phone number: included, per explicit instruction.
- Palette: light, but a distinct new palette/type system, not reused from
  any of the 18 apps.
