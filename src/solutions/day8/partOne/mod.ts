import { Input } from "../types.d.ts";

export const KNOWN_SIZES = [
  2, // one digit segments
  3, // seven digit segments
  4, // four digit segments
  7, // eight digit segments
];

export function partOne(input: Input) {
  return input.reduce(
    (acc, _case) =>
      acc +
      _case.digits.filter((digit) => KNOWN_SIZES.includes(digit.length)).length,
    0,
  );
}
