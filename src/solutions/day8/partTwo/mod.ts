import { Input } from "../types.d.ts";
import {
  List,
  Map,
  OrderedSet,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";

export function guessDigits(combinations: string[]) {
  const splitCombinations = combinations.map((combination) =>
    combination.split("")
  );
  const one = OrderedSet(
    splitCombinations.find((combination) => combination.length === 2)!,
  );
  const seven = OrderedSet(
    splitCombinations.find((combination) => combination.length === 3)!,
  );
  const four = OrderedSet(
    splitCombinations.find((combination) => combination.length === 4)!,
  );
  const eight = OrderedSet(
    splitCombinations.find((combination) => combination.length === 7)!,
  );
  const two = OrderedSet(
    splitCombinations
      .find((combination) =>
        combination.length === 5 &&
        one.intersect(combination).size === 1 &&
        seven.intersect(combination).size === 2 &&
        four.intersect(combination).size === 2
      )!,
  );
  const three = OrderedSet(
    splitCombinations
      .find((combination) =>
        combination.length === 5 &&
        one.intersect(combination).size === 2 &&
        seven.intersect(combination).size === 3 &&
        four.intersect(combination).size === 3 &&
        two.intersect(combination).size === 4
      )!,
  );
  const five = OrderedSet(
    splitCombinations
      .find((combination) =>
        combination.length === 5 &&
        one.intersect(combination).size === 1 &&
        seven.intersect(combination).size === 2 &&
        four.intersect(combination).size === 3 &&
        two.intersect(combination).size === 3 &&
        three.intersect(combination).size === 4
      )!,
  );
  const zero = OrderedSet(
    splitCombinations
      .find((combination) =>
        combination.length === 6 &&
        one.intersect(combination).size === 2 &&
        seven.intersect(combination).size === 3 &&
        four.intersect(combination).size === 3 &&
        two.intersect(combination).size === 4 &&
        three.intersect(combination).size === 4 &&
        five.intersect(combination).size === 4
      )!,
  );
  const six = OrderedSet(
    splitCombinations
      .find((combination) =>
        combination.length === 6 &&
        one.intersect(combination).size === 1 &&
        seven.intersect(combination).size === 2 &&
        four.intersect(combination).size === 3 &&
        two.intersect(combination).size === 4 &&
        three.intersect(combination).size === 4 &&
        five.intersect(combination).size === 5 &&
        zero.intersect(combination).size === 5
      )!,
  );
  const nine = OrderedSet(
    splitCombinations
      .find((combination) =>
        combination.length === 6 &&
        one.intersect(combination).size === 2 &&
        seven.intersect(combination).size === 3 &&
        four.intersect(combination).size === 4 &&
        two.intersect(combination).size === 4 &&
        three.intersect(combination).size === 5 &&
        five.intersect(combination).size === 5 &&
        zero.intersect(combination).size === 5 &&
        six.intersect(combination).size === 5
      )!,
  );
  return Map()
    .set(zero.toList().sort().join(""), 0)
    .set(one.toList().sort().join(""), 1)
    .set(two.toList().sort().join(""), 2)
    .set(three.toList().sort().join(""), 3)
    .set(four.toList().sort().join(""), 4)
    .set(five.toList().sort().join(""), 5)
    .set(six.toList().sort().join(""), 6)
    .set(seven.toList().sort().join(""), 7)
    .set(eight.toList().sort().join(""), 8)
    .set(nine.toList().sort().join(""), 9);
}

export function partTwo(input: Input) {
  return input
    .map((_case) => {
      const digits = guessDigits(_case.combinations);
      return _case.digits
        .map((digit) => List(digit.split("")).sort().join(""))
        .map((digit) => digits.get(digit, 0) as number)
        .reduce((acc, digit) => acc * 10 + digit, 0);
    })
    .reduce((a, b) => a + b, 0);
}
