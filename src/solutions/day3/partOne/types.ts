export interface BinaryCounter {
  zeros: number;
  ones: number;
}

export type State = BinaryCounter[];

export interface Action {
  type: "add-report";
  payload: string;
}
