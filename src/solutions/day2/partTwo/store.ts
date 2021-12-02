import { Action, DepthActionType, PositionActionType } from "../types.ts";

export interface State {
  position: number;
  depth: number;
  aim: number;
}

export function dispatch(state: State, action: Action) {
  switch (action.type) {
    case DepthActionType.up:
      return { ...state, aim: state.aim - action.payload };
    case DepthActionType.down:
      return { ...state, aim: state.aim + action.payload };
    case PositionActionType.forward:
      return {
        ...state,
        position: state.position + action.payload,
        depth: state.depth + state.aim * action.payload,
      };
    default:
      return state;
  }
}
