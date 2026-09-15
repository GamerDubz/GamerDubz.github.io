import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // No test files exist yet in this scaffold task — later tasks add pure-logic
    // tests. Without this, `vitest run` exits 1 on an empty suite.
    passWithNoTests: true,
  },
});
