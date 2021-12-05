import {
  Action,
  dispatch as partOneDispatch,
  score,
  State,
  toActions,
} from "../partOne/mod.ts";
import { range } from "https://cdn.deno.land/it_range/versions/v1.0.2/raw/mod.ts";
import { Input } from "../types.ts";

export function dispatch(state: State, action: Action) {
  switch (action.type) {
    case "diagonal": {
      // NOTE: assume only 45º diagonals so both x and y are equally incremented
      const { start, end } = action.payload;
      const dx = start.x <= end.x ? 1 : -1;
      const dy = start.y <= end.y ? 1 : -1;
      const length = Math.abs(start.x - end.x) + 1;
      Array.from(range(length)).forEach((n) => {
        const key = `${start.x + (n * dx)}:${start.y + (n * dy)}`;
        const value = state.get(key) ?? 0;
        state = state.set(key, value + 1);
      });
      break;
    }
    default:
      state = partOneDispatch(state, action);
      break;
  }
  return state;
}

export function reduceState(actions: Action[]) {
  return actions.reduce(
    (state, action) => dispatch(state, action),
    new Map<string, number>(),
  );
}

export function log(state: State): State {
  let matrix = "";
  for (let i = 0; i < 10; i++) {
    let row = "";
    for (let j = 0; j < 10; j++) {
      const key = `${j}:${i}`;
      row += state.get(key) ?? ".";
    }
    matrix += row + "\n";
  }
  console.log(matrix);
  return state;
}

export function partTwo(input: Input) {
  const actions = toActions(input);
  const state = reduceState(actions);
  // log(state);
  return score(state);
}
