export function partOne(input: number[]) {
  return input.reduce(
    (acc, value, i) => input[i - 1] < value ? acc + 1 : acc,
    0,
  );
}
