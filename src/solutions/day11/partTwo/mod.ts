import { initState, nextState } from "../partOne/mod.ts";

export function partTwo(input: number[][]) {
  let state = initState(input);
  let count = 0;
  while (!state.matrix.every((value) => value === 0)) {
    state = nextState(state);
    count++;
  }
  return count;
}
