import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  const [protein, rules] = text.split("\n\n");
  return {
    protein: protein.trim(),
    rules: Array.from(rules.trim().matchAll(/([A-Z]{2})\s->\s([A-Z])/g))
      .map(([_, source, target]) => ({ source, target })),
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
