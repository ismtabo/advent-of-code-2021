import { range } from "https://cdn.deno.land/it_range/versions/v1.0.2/raw/mod.ts";
import { Input, Vector } from "../types.ts";

export interface Action {
  type: "vertical" | "horizontal" | "diagonal" | "unknown";
  payload: Vector;
}

export type State = Map<string, number>;

export function dispatch(state: State, action: Action) {
  switch (action.type) {
    case "vertical": {
      const x = action.payload.start.x;
      const { start: { y: startY }, end: { y: endY } } = action.payload;
      const fromY = Math.min(startY, endY);
      const toY = Math.max(startY, endY) + 1;
      Array.from(range(fromY, toY))
        .forEach(
          (y) => {
            const key = `${x}:${y}`;
            const prev = state.get(key) ?? 0;
            state = state.set(key, prev + 1);
          },
        );
      break;
    }
    case "horizontal": {
      const y = action.payload.start.y;
      const { start: { x: startX }, end: { x: endX } } = action.payload;
      const fromX = Math.min(startX, endX);
      const toX = Math.max(startX, endX) + 1;
      Array.from(range(fromX, toX))
        .forEach(
          (x) => {
            const key = `${x}:${y}`;
            const prev = state.get(key) ?? 0;
            state = state.set(key, prev + 1);
          },
        );
      break;
    }
  }
  return state;
}

export function reduceState(action: Action[]) {
  return action.reduce(
    (state, action) => dispatch(state, action),
    new Map<string, number>(),
  );
}

export function toActions(vents: Vector[]): Action[] {
  return vents.map((vent) =>
    vent.start.x === vent.end.x
      ? ({ type: "vertical", payload: vent })
      : vent.start.y === vent.end.y
      ? ({ type: "horizontal", payload: vent })
      : Math.abs(vent.start.x - vent.end.x) ===
          Math.abs(vent.start.y - vent.end.y)
      ? ({ type: "diagonal", payload: vent })
      : ({ type: "unknown", payload: vent })
  );
}

export function score(state: State) {
  return Array.from(state.values()).filter((value) => value > 1).length;
}

export function partOne(input: Input) {
  const actions = toActions(input);
  const status = reduceState(actions);
  return score(status);
}
