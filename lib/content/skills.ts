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
