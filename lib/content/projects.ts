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
    slug: "thefixsir",
    name: "FixSir",
    description:
      "A business website for a Durban sports massage and Hijama cupping therapy practice, designed and built end to end for a real client.",
    liveUrl: "https://www.thefixsir.co.za/",
    repoUrl: null,
    iconSrc: null,
  },
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
    repoUrl: null,
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
  {
    slug: "halaq",
    name: "Halaq",
    description:
      "A Shariah-compliant stock screener that filters investments against Islamic finance principles for Muslim investors.",
    liveUrl: "https://halaq.vercel.app/",
    repoUrl: null,
    iconSrc: null,
  },
];
