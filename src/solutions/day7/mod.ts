import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  return text.split("\n").at(0)!.trim().split(",").map((item) =>
    parseInt(item)
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
