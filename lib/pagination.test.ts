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
