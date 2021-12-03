import { Action, BinaryCounter, State } from "./types.ts";

export function dispatch(state: State, action: Action) {
  switch (action.type) {
    case "add-report": {
      return Array.from(action.payload).map((
        bit,
        i,
      ) => {
        const { zeros, ones }: BinaryCounter = state.at(i) ??
          { zeros: 0, ones: 0 };
        return bit === "0"
          ? { zeros: zeros + 1, ones }
          : { zeros, ones: ones + 1 };
      });
    }
  }
}

export function reduceState(reports: string[]) {
  return reports.reduce(
    (state, report) => dispatch(state, { type: "add-report", payload: report }),
    [] as State,
  );
}

export function selectGamma(state: State) {
  return state.reduce(
    (acc, { zeros, ones }) => zeros > ones ? acc + "0" : acc + "1",
    "",
  );
}

export function selectEpsilon(state: State) {
  return state.reduce(
    (acc, { zeros, ones }) => zeros <= ones ? acc + "0" : acc + "1",
    "",
  );
}

export function partOne(input: string[]) {
  const state = reduceState(input);
  const gamma = parseInt(selectGamma(state), 2);
  const epsilon = parseInt(selectEpsilon(state), 2);
  return gamma * epsilon;
}
