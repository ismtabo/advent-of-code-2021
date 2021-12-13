export interface Point {
  x: number;
  y: number;
}

export interface Fold {
  axis: "x" | "y";
  value: number;
}

export interface Input {
  points: Point[];
  folds: Fold[];
}
