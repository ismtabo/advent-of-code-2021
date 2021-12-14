import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  const [polymers, rules] = text.split("\n\n");
  return {
    polymers: polymers.trim(),
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
