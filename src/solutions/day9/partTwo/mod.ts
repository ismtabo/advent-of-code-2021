import { getLowPoints, NEIGHBORS } from "../partOne/mod.ts";

export function expandBasis(
  matrix: number[][],
  startRow: number,
  startCol: number,
) {
  const rows = matrix.length;
  const cols = matrix.at(0)!.length;
  const open: number[][] = [[startRow, startCol]];
  const close: number[][] = [];
  while (open.length > 0) {
    const [row, col] = open.shift()!;
    let neighbors: number[][] = NEIGHBORS;
    neighbors = neighbors.map(([dRow, dCol]) => [row + dRow, col + dCol]);
    neighbors = neighbors.filter(([r, c]) =>
      0 <= r && r < rows && 0 <= c && c < cols
    );
    neighbors = neighbors.filter(([r, c]) =>
      !close.some(([otherR, otherC]) => otherR === r && otherC === c)
    );
    neighbors = neighbors.filter(([r, c]) =>
      !open.some(([otherR, otherC]) => otherR === r && otherC === c)
    );
    neighbors = neighbors.filter(([r, c]) => matrix[r][c] < 9);
    open.push(...neighbors);
    close.push([row, col]);
  }
  return close;
}

export function getBasinSize(matrix: number[][], row: number, col: number) {
  return expandBasis(matrix, row, col).length;
}

export function partTwo(input: number[][]) {
  const points = getLowPoints(input);
  return points.map(([row, col]) => getBasinSize(input, row, col))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
}
