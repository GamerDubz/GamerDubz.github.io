import { describe, expect, it } from "vitest";
import { withBasePath } from "./base-path";

describe("withBasePath", () => {
  it("keeps the leading slash of a public path", () => {
    expect(withBasePath("/icons/yana.svg")).toMatch(/\/icons\/yana\.svg$/);
  });

  it("never doubles the slash between the base path and the file", () => {
    expect(withBasePath("/resume.pdf")).not.toContain("//");
  });
});
