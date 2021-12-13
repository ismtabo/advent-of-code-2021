import {
  List,
  OrderedSet,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import { Fold, Input, Point } from "../types.d.ts";
import { range } from "https://deno.land/x/it_range@v1.1.0/mod.ts";

export type State = OrderedSet<string>;
export function State(): State {
  return OrderedSet();
}

export function compress({ x, y }: Point): string {
  return `${x},${y}`;
}

export function decompress(value: string): Point {
  const [x, y] = value.split(",", 2);
  return {
    x: parseInt(x),
    y: parseInt(y),
  };
}

export function initState(points: Point[]): State {
  return State().concat(points.map((point) => compress(point)));
}

export function foldX(state: State, value: number): State {
  return State().concat(
    state
      .map((point) => {
        const { x, y } = decompress(point);
        if (x < value) {
          return { x, y };
        }
        return { x: value - (x - value), y };
      })
      .map((point) => compress(point)),
  );
}

export function foldY(state: State, value: number): State {
  return State().concat(
    state
      .map((point) => {
        const { x, y } = decompress(point);
        if (y < value) {
          return { x, y };
        }
        return { x, y: value - (y - value) };
      })
      .map((point) => compress(point)),
  );
}

export function dispatchFold(state: State, fold: Fold): State {
  if (fold.axis === "x") {
    return foldX(state, fold.value);
  }
  return foldY(state, fold.value);
}

export function reduceFolds(state: State, folds: Fold[]) {
  return folds.reduce((s, fold) => dispatchFold(s, fold), state);
}

export function log(state: State): State {
  const points = state.map((point) => decompress(point));
  const xs = points.map(({ x }) => x);
  const ys = points.map(({ y }) => y);
  const str = List(range(ys.min(), ys.max()! + 1))
    .map((y) =>
      List(range(xs.min(), xs.max()! + 1))
        .map((x) => state.has(compress({ x, y })))
        .map((isPoint) => isPoint ? "#" : "·")
        .join("")
    )
    .join("\n");
  console.error(str, "\n");
  return state;
}

export function partOne(input: Input) {
  let state = initState(input.points);
  state = dispatchFold(state, input.folds[0]);
  return state.count();
}
