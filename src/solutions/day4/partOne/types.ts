export interface Card {
  id: number;
  numbers: number[];
  checked: Set<number>;
  isBingo: boolean;
}

export interface State {
  cards: Card[];
  winCards?: Card[];
  winNumber?: number;
}
