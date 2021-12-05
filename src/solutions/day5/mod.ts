import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  return text.split("\n")
    .filter(Boolean)
    .map((line) => line.trim().match(/(\d+),(\d+)\s+->\s+(\d+),(\d+)/))
    .map((match) => ({
      start: { x: parseInt(match!.at(1)!), y: parseInt(match!.at(2)!) },
      end: { x: parseInt(match!.at(3)!), y: parseInt(match!.at(4)!) },
    }));
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
