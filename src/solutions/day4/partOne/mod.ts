import { Input } from "../types.ts";
import { Card, State } from "./types.ts";

const ROWS = 5;
const COLS = 5;

export function checkRow(selected: Set<number>, row: number) {
  return new Array(COLS).fill(0).map((_, col) => row * COLS + col).every(
    (idx) => selected.has(idx),
  );
}

export function checkColumn(selected: Set<number>, col: number) {
  return new Array(ROWS).fill(0).map((_, row) => row * COLS + col).every(
    (idx) => selected.has(idx),
  );
}

export function drawNumber(cards: Card[], n: number) {
  return cards.map((card) => {
    const idx = card.numbers.findIndex((item) => item === n);
    if (idx === -1) {
      return card;
    }
    card = { ...card, checked: new Set(card.checked.values()) };
    card.checked.add(idx);
    const row = Math.floor(idx / ROWS);
    const col = Math.floor(idx % COLS);
    card.isBingo = checkRow(card.checked, row) ||
      checkColumn(card.checked, col);
    return card;
  });
}

export function drawUntilBingo(state: State, numbers: number[]): State {
  if (numbers.length < 1) {
    return state;
  }
  const n = numbers.at(0)!;
  const cards = drawNumber(state.cards, n);
  let winCards;
  if (winCards = cards.filter((bingo) => bingo.isBingo), winCards.length > 0) {
    return { cards, winCards, winNumber: n };
  }
  return drawUntilBingo({ cards }, numbers.slice(1));
}

export function score(state: State) {
  const sum = state.winCards!.at(0)!.numbers
    .filter((_, i) => !state.winCards!.at(0)!.checked.has(i))
    .reduce((a, b) => a + b, 0);
  return sum * state.winNumber!;
}

export function partOne(input: Input) {
  const cards = input.cards.map((numbers, idx) => ({
    id: idx,
    numbers,
    checked: new Set<number>(),
    isBingo: false,
  } as Card));
  const state = drawUntilBingo({ cards }, input.numbers);
  return score(state);
}
