import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  return text.split("\n").map((line) => line.trim()).filter(Boolean).map(
    (line) => {
      const [combinations, digits] = line.split(" | ", 2);
      return {
        combinations: combinations.split(" ").map((item) => item.trim()),
        digits: digits.split(" ").map((item) => item.trim()),
      };
    },
  );
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
