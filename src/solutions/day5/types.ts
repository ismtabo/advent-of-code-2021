export interface Point {
  x: number;
  y: number;
}

export interface Vector {
  start: Point;
  end: Point;
}

export type Input = Vector[];
