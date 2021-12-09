import { bold, red } from "https://deno.land/std@0.117.0/fmt/colors.ts";

export const NEIGHBORS = [
  [+1, 0],
  [0, +1],
  [-1, 0],
  [0, -1],
];

export function isLowerThanNeighbors(
  matrix: number[][],
  row: number,
  col: number,
): boolean {
  return NEIGHBORS
    .map(([drow, dcol]) => (matrix[row + drow] ?? [])[col + dcol] ?? Infinity)
    .every((other) => matrix.at(row)!.at(col)! < other!);
}

export function getLowPoints(matrix: number[][]) {
  return matrix.flatMap((row, rowIdx) =>
    row.map((_, colIdx) => [rowIdx, colIdx])
      .filter(([row, col]) => isLowerThanNeighbors(matrix, row, col))
  );
}

export function logLowers(matrix: number[][]) {
  console.log(
    matrix.reduce(
      (acc, row, rowIdx) =>
        acc + row.reduce(
          (line, value, colIdx) =>
            line + `${
              isLowerThanNeighbors(matrix, rowIdx, colIdx)
                ? bold(red(value.toString()))
                : value
            }`,
          "",
        ) + "\n",
      "",
    ),
  );
}

export function partOne(input: number[][]) {
  const points = getLowPoints(input);
  return points.map(([row, col]) => input[row][col] + 1)
    .reduce((a, b) => a + b, 0);
}
