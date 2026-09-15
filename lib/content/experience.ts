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
  {
    role: "Student — Higher Certificate in Mobile and Web Development, Computer Science",
    org: "Emeris",
    location: "Durban, South Africa",
    start: "Feb 2026",
    end: "Present",
    bullets: [
      "Studying full-time alongside freelance client work and running Qroma.",
    ],
  },
];
