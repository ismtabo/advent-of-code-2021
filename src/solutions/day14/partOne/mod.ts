import {
  List,
  Map,
  Range,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import { Input, Rule } from "../types.d.ts";

export type Rules = Map<string, string>;
export type State = List<string>;

export function State(): State {
  return List();
}

export function initState(polymers: string): State {
  return State().concat(...polymers);
}

export function initRules(rules: Rule[]): Rules {
  return Map(
    rules.map(({ source, target }) => [source, target]),
  );
}

/**
 * @deprecated iterative version consumes to much memory for the memory requirements
 * of the second part. See `countPolymers` instead.
 * @param state
 * @param rules
 * @returns next polymer state
 */
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

export function paired<T>(list: List<T>): List<List<T>> {
  return Range(0, list.size! - 1)
    .map((i) => list.slice(i, i + 2))
    .toList();
}

export function polymerize(
  rules: Map<string, string>,
  maxDepth: number,
  pair: string,
  depth: number,
  cache: { [_: string]: Map<string, number> },
): Map<string, number> {
  const cacheKey = `${pair}-${depth}`;
  if (cacheKey in cache) {
    return cache[cacheKey];
  }
  const nextState = rules.get(pair)!;
  let counter = Map<string, number>().set(nextState, 1);
  if (depth < maxDepth) {
    counter = counter.mergeWith(
      (oldVal: number, newVal: number) => oldVal + newVal,
      polymerize(rules, maxDepth, `${pair[0]}${nextState}`, depth + 1, cache),
      polymerize(rules, maxDepth, `${nextState}${pair[1]}`, depth + 1, cache),
    );
  }
  return cache[cacheKey] = counter;
}

export function countPolymers(
  proteins: List<string>,
  rules: Rules,
  maxDepth: number,
): Map<string, number> {
  const counter = Map<string, number>()
    .merge(proteins.countBy((value) => value));
  const pairs = paired(List(proteins)).map((pair) => pair.join(""));
  const cache = {};
  return counter.mergeWith(
    (oldVal: number, newVal: number) => oldVal + newVal,
    ...pairs.map((pair) => polymerize(rules, maxDepth, pair, 1, cache)),
  );
}

export function partOne(input: Input, iters = 10) {
  const rules = initRules(input.rules);
  const counters = countPolymers(List(input.polymers), rules, iters);
  return counters.max()! - counters.min()!;
}
