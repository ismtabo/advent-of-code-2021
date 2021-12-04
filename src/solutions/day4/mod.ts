import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  const [numbersStr, ...bingosStr] = text.trim().split("\n");
  const numbers = numbersStr.split(",").map((item) => parseInt(item));
  const cards = bingosStr.reduce(
    (acc, line) =>
      line.trim() === "" ? [...acc, []] : [
        ...acc.slice(0, -1),
        acc.at(-1)!.concat(
          line.trim().split(/\s+/).map((item) => parseInt(item)),
        ),
      ],
    [] as number[][],
  );
  return { numbers, cards };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
