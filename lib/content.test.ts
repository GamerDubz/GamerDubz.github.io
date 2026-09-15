import { describe, expect, it } from "vitest";
import { identity } from "./content/identity";
import { experience } from "./content/experience";
import { skillGroups } from "./content/skills";
import { education } from "./content/education";
import { projects } from "./content/projects";
import { about } from "./content/about";

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

describe("about", () => {
  it("has a non-empty heading and at least one paragraph", () => {
    expect(about.heading).not.toBe("");
    expect(about.paragraphs.length).toBeGreaterThan(0);
    for (const paragraph of about.paragraphs) {
      expect(paragraph).not.toBe("");
    }
  });
});

describe("projects", () => {
  it("has exactly 23 entries", () => {
    expect(projects.length).toBe(23);
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

  it("has an iconSrc of null only for the 5 projects without a copied icon", () => {
    const noIcon = projects.filter((p) => p.iconSrc === null).map((p) => p.slug);
    expect(new Set(noIcon)).toEqual(
      new Set(["thefixsir", "european-nights", "flight-path-app", "svg-to-3d-converter", "halaq"])
    );
  });
});
