import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  const [points, folds] = text.split("\n\n", 2);
  return {
    points: points.split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split(",").map((item) => parseInt(item)))
      .map(([x, y]) => ({ x, y })),
    folds: folds.split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [_, axis, value] = line.match(/^fold along ([xy])=(\d+)$/)!;
        return { axis: axis as "x" | "y", value: parseInt(value) };
      }),
  };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
