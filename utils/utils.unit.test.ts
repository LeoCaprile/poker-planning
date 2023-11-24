import { describe, expect, it } from "bun:test";
import { checkIfDateIsOneMonthOld } from ".";

describe("utils", () => {
  it("should returns true if date is a month old", () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const result = checkIfDateIsOneMonthOld(date.getTime());
    expect(result).toBe(true);
  });

  it("should returns false if date is not a month old", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const result = checkIfDateIsOneMonthOld(date.getTime());
    expect(result).toBe(false);
  });
});
