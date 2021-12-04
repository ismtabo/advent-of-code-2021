export enum DepthActionType {
  up = "up",
  down = "down",
}

interface DepthAction {
  type: DepthActionType;
  payload: number;
}

export enum PositionActionType {
  forward = "forward",
}

interface PositionAction {
  type: PositionActionType;
  payload: number;
}

export type Action = DepthAction | PositionAction;
export type Dispatch<S = unknown, A = Action> = (state: S, action: A) => S;
