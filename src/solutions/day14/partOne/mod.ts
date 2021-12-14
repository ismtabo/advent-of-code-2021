import {
  List,
  Map,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import { range } from "https://deno.land/x/it_range@v1.1.0/mod.ts";
import { Input, Rule } from "../types.d.ts";

export type Rules = Map<string, string>;
export type State = List<string>;

export function State(): State {
  return List();
}

export function initState(protein: string): State {
  return State().concat(...protein);
}

export function initRules(rules: Rule[]): Rules {
  return Map(
    rules.map(({ source, target }) => [source, target]),
  );
}

export function dispatchRules(state: State, rules: Rules): State {
  const first = state.first()!;
  return State().push(first).concat(
    state.slice(1)
      .flatMap((value, i) => [rules.get(state.get(i)! + value)!, value]),
  );
}

export function log(state: State): State {
  console.error(state.join(""));
  return state;
}

export function partOne(input: Input, iters = 10) {
  const rules = initRules(input.rules);
  let state = initState(input.protein);
  state = Array.from(range(iters))
    .reduce((s) => dispatchRules(s, rules), state);
  const frequencies = state.countBy((value) => value);
  return frequencies.max()! - frequencies.min()!;
}
