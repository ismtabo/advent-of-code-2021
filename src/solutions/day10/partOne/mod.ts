import {
  List,
  Map,
  Stack,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";

export const OPENING = Map()
  .set(")", "(")
  .set("]", "[")
  .set("}", "{")
  .set(">", "<");

export const SCORES = Map()
  .set(")", 3)
  .set("]", 57)
  .set("}", 1197)
  .set(">", 25137);

export interface State {
  stack: Stack<string>;
  unexpectedToken?: string;
}

export function reduceLine(
  { stack }: State,
  line: List<string>,
): State {
  if (line.isEmpty()) {
    return { stack };
  }
  const first = line.first()!;
  switch (first) {
    case "[":
    case "(":
    case "{":
    case "<":
      return reduceLine({ stack: stack.push(first) }, line.shift());
    case "]":
    case ")":
    case "}":
    case ">":
      return stack.peek() !== OPENING.get(first)
        ? { stack, unexpectedToken: first }
        : reduceLine({ stack: stack.pop() }, line.shift());
  }
  return { stack };
}

export function partOne(input: string[]) {
  return input
    .map((line) => reduceLine({ stack: Stack() }, List(line.split(""))))
    .filter(({ unexpectedToken }) => unexpectedToken != null)
    .map(({ unexpectedToken }) => SCORES.get(unexpectedToken)! as number)
    .reduce((a, b) => a + b, 0);
}
