import {
  List,
  Map,
  Stack,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import { reduceLine } from "../partOne/mod.ts";
import { median } from "https://deno.land/x/statistics@v0.1.1/mod.ts";

export const CLOSING = Map<string, string>()
  .set("(", ")")
  .set("[", "]")
  .set("{", "}")
  .set("<", ">");

export const SCORES = Map<string, number>()
  .set(")", 1)
  .set("]", 2)
  .set("}", 3)
  .set(">", 4);

export function reduceStackScore(stack: Stack<string>) {
  return stack
    .map((char) => CLOSING.get(char)!)
    .map((char) => SCORES.get(char)!)
    .reduce((a, b) => a * 5 + b, 0);
}

export function partTwo(input: string[]) {
  const scores = input
    .map((line) => reduceLine({ stack: Stack() }, List(line.split(""))))
    .filter(({ unexpectedToken }) => unexpectedToken == null)
    .map(({ stack }) => reduceStackScore(stack));
  return median(scores);
}
