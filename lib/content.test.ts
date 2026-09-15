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
