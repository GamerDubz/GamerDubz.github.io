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
