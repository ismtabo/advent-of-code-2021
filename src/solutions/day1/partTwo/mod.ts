import { partOne } from "../partOne/mod.ts";

const WINDOW = 3;

export function partTwo(input: number[]) {
  const sums = input.slice(0, input.length - WINDOW)
    .map((_, i) => input.slice(i, i + WINDOW).reduce((a, b) => a + b, 0));
  return partOne(sums);
}
