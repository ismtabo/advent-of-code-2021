import {
  List,
  OrderedMap,
  Set,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import { range } from "https://deno.land/x/it_range@v1.1.0/mod.ts";
import { bold, red, yellow } from "https://deno.land/std@0.117.0/fmt/colors.ts";

export const ROWS = 10;
export const COLS = 10;

export function fromKey(key: string): [number, number] {
  return key.split(":", 2).map((item) => parseInt(item)) as [number, number];
}

export function toKey(row: number, col: number): string {
  return `${row}:${col}`;
}

export const NEIGHBORS: List<[number, number]> = List(range(-1, 2, 1))
  .flatMap(
    (dRow) =>
      List(range(-1, 2, 1))
        .map((dCol) => [dRow, dCol] as [number, number]),
  )
  .filter(([dRow, dCol]) => !(dRow === 0 && dCol === 0));

export interface State {
  matrix: OrderedMap<string, number>;
  brights: number;
}

export function initState(matrix: number[][]): State {
  const cells: [string, number][] = matrix
    .flatMap((row, rowIdx) =>
      row.map((cell, colIdx) =>
        [toKey(rowIdx, colIdx), cell] as [string, number]
      )
    );
  return { matrix: OrderedMap<string, number>(cells), brights: 0 };
}

export function getNeighbors(cell: string): List<string> {
  const [row, col] = fromKey(cell);
  return NEIGHBORS
    .map(([dRow, dCol]) => [row + dRow, col + dCol] as [number, number])
    .filter(([r, c]) => 0 <= r && r < ROWS && 0 <= c && c < COLS)
    .map(([r, c]) => toKey(r, c));
}

export function reduceBrightSquids(state: State): State {
  const brights = state.matrix.filter((value) => value > 9).keySeq().toList();
  if (brights.isEmpty()) {
    return state;
  }
  let matrix: OrderedMap<string, number> = state.matrix.slice();
  let affected = brights.slice();
  let visited = Set<string>();
  do {
    const cell = affected.first()!;
    affected = affected.shift();
    const neighbors = getNeighbors(cell).filter((cell) =>
      !visited.union(affected).contains(cell)
    );
    matrix = neighbors
      .reduce(
        (m, neighbor) => m.update(neighbor, (value) => value! + 1),
        matrix,
      );
    matrix = matrix.set(cell, 0);
    affected = affected.concat(
      neighbors.filter((cell) => matrix.get(cell)! > 9),
    );
    visited = visited.add(cell);
  } while (!affected.isEmpty());
  matrix = visited.reduce((m, cell) => m.set(cell, 0), matrix);
  return { matrix, brights: state.brights + visited.size! };
}

export function log(state: State): State {
  console.log(
    List(range(ROWS)).map((rowIdx) => {
      const line = List(range(COLS))
        .map((colIdx) => [rowIdx, colIdx])
        .map(([r, c]) => state.matrix.get(toKey(r, c))!)
        .map((value) =>
          value > 9
            ? red(bold(`X`))
            : value === 0
            ? yellow(bold(`${value}`))
            : `${value}`
        );
      return line.join("");
    }).join("\n"),
    "\n",
  );
  return state;
}

export function nextState(state: State): State {
  const matrix = state.matrix.map((cell) => cell + 1);
  state = reduceBrightSquids({ ...state, matrix });
  // log(state);
  return state;
}

export function partOne(input: number[][]) {
  const state = initState(input);
  // log(state);
  return Array.from(range(100)).reduce(
    (state) => nextState(state),
    state,
  ).brights;
}
