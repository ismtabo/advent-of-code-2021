import { List } from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import {
  isUppercase,
  partOne,
  partOneNextNodesPredicate,
} from "../partOne/mod.ts";

export function partTwoNextNodesPredicate(
  node: string,
  path: List<string>,
): boolean {
  return isUppercase(node) ||
    !path.contains(node) ||
    path.filter((other) => !isUppercase(other))
        .countBy((other) => other)
        .filter((count) => count === 2)
        .count() < 1;
}

export function partTwo(input: string[][]) {
  return partOne(input, partTwoNextNodesPredicate);
}
