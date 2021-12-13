import { dispatchFold, initState, log, State } from "../partOne/mod.ts";
import { Fold, Input } from "../types.d.ts";

export function reduceFolds(state: State, folds: Fold[]) {
  return folds.reduce((s, fold) => dispatchFold(s, fold), state);
}

export function partTwo(input: Input) {
  let state = initState(input.points);
  state = reduceFolds(state, input.folds);
  log(state);
  return NaN;
}
