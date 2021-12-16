import {
  List,
  Map,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import dijkstra from "https://deno.land/x/dijkstra@v1.0.1/mod.ts";

export function initGraph(matrix: number[][]) {
  let graph = Map<string, Map<string, number>>();
  matrix.forEach((row, rowIdx) =>
    row.map((_, colIdx) => {
      let neighbors = Map<string, number>();
      if (rowIdx > 0) {
        neighbors = neighbors.set(
          `${(rowIdx - 1) * row.length + colIdx}`,
          matrix[rowIdx - 1][colIdx],
        );
      }
      if (rowIdx < (matrix.length - 1)) {
        neighbors = neighbors.set(
          `${(rowIdx + 1) * row.length + colIdx}`,
          matrix[rowIdx + 1][colIdx],
        );
      }
      if (colIdx > 0) {
        neighbors = neighbors.set(
          `${rowIdx * row.length + colIdx - 1}`,
          matrix[rowIdx][colIdx - 1],
        );
      }
      if (colIdx < (row.length - 1)) {
        neighbors = neighbors.set(
          `${rowIdx * row.length + colIdx + 1}`,
          matrix[rowIdx][colIdx + 1],
        );
      }
      graph = graph.set(`${rowIdx * row.length + colIdx}`, neighbors);
    })
  );
  return graph.toJS();
}

export function partOne(input: number[][]) {
  const graph = initGraph(input);
  const path = dijkstra.find_path(
    graph as any,
    `0`,
    `${input.length * input.length - 1}`,
  );
  const risk = List(path)
    .slice(1)
    .map((step) => parseInt(step))
    .map((index) => [Math.floor(index / input.length), index % input.length])
    .map(([row, col]) => input[row][col])
    .reduce((a, b) => a + b, 0);
  return risk;
}
