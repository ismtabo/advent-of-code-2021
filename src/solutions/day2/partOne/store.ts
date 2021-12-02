import { Action, DepthActionType, PositionActionType } from "../types.ts";

export interface State {
  position: number;
  depth: number;
}

export function dispatch(state: State, action: Action): State {
  switch (action.type) {
    case DepthActionType.up:
      return { ...state, depth: state.depth - action.payload };
    case DepthActionType.down:
      return { ...state, depth: state.depth + action.payload };
    case PositionActionType.forward:
      return { ...state, position: state.position + action.payload };
    default:
      return state;
  }
}
