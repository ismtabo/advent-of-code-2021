import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Action } from "./types.ts";

export function preprocess(text: string) {
  return text.split("\n").map((line) => {
    const [type, payload] = line.trim().split(/\s/, 2);
    return { type: type.trim(), payload: parseInt(payload) } as Action;
  });
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
