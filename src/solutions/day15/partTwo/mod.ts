import {
  List,
  Range,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import { partOne } from "../partOne/mod.ts";

export function expandMatrix(input: number[][]) {
  return Range(0, 5)
    .flatMap((rowIdx) =>
      input.map((row) =>
        Range(0, 5)
          .flatMap((colIdx) =>
            List(row).map((value) => {
              const cell = (value + rowIdx + colIdx);
              if (cell > 9) {
                return cell % 10 + 1;
              }
              return cell;
            })
          )
      )
    )
    .toJS() as number[][];
}

export function partTwo(input: number[][]) {
  const matrix = expandMatrix(input);
  return partOne(matrix);
}
