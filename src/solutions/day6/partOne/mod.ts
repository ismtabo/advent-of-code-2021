import { range } from "https://cdn.deno.land/it_range/versions/v1.0.2/raw/mod.ts";
import {
  List,
  Map,
} from "https://cdn.deno.land/immutable/versions/4.0.0-rc.12-deno.1/raw/mod.ts";

/**
 * Deprecated reducer first implementation
 *
 * To reduce the next state, it iterates over the current list of lanterfish
 * decrementing the value of each, and incrementing and reset the values when
 * the current one reach 0.
 *
 * For the first part this implementation was correct. But the number of items
 * for the second one increments in a huge way the time for each new state calculation.
 *
 * @deprecated use reducer instead
 * @param state current
 * @returns new state
 */
export function iterativeReducer(state: List<number>) {
  const zeros = state.filter((value) => value === 0);
  const next = state.map((value) => value === 0 ? 6 : value - 1);
  return zeros.size > 0 ? next.concat(zeros.toArray().fill(8)) : next;
}

export type State = Map<number, number>;

export const State = () => Map<number, number>();

export function reducer(state: State): State {
  return state.reduce((state, fishes, value) => {
    if (value === 0) {
      return state
        .set(6, state.get(6, 0) + fishes)
        .set(8, state.get(8, 0) + fishes);
    } else {
      return state.set(value - 1, state.get(value - 1, 0) + fishes);
    }
  }, State());
}

export function initialState(fishes: number[]): State {
  return fishes.reduce(
    (state, fish) => state.set(fish, state.get(fish, 0) + 1),
    State(),
  );
}

export function partOne(input: number[], days = 80) {
  const state = Array.from(range(days)).reduce(
    (state) => reducer(state),
    initialState(input),
  );
  return state.reduce((acc, val) => acc + val, 0);
}
