import { dispatch } from "./store.ts";
import { Action } from "../types.ts";

export function partTwo(input: Action[]) {
  const state = input.reduce((state, action) => dispatch(state, action), {
    aim: 0,
    position: 0,
    depth: 0,
  });
  return state.position * state.depth;
}
