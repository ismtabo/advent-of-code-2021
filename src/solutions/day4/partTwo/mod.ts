import { drawUntilBingo, score } from "../partOne/mod.ts";
import { Card, State } from "../partOne/types.ts";
import { Input } from "../types.ts";

export function drawUntilLastWinner(cards: Card[], numbers: number[]): State {
  const state = drawUntilBingo({ cards }, numbers);
  if (state.winCards && state.cards.length > 1) {
    cards = state.cards.filter((card) =>
      state.winCards!.every((other) => card.id !== other.id)
    );
    const winNumberIdx = numbers.indexOf(state.winNumber!);
    numbers = numbers.splice(winNumberIdx + 1);
    return drawUntilLastWinner(cards, numbers);
  }
  return state;
}

export function partTwo(input: Input) {
  const cards = input.cards.map((numbers, id) => ({
    id,
    numbers,
    checked: new Set<number>(),
    isBingo: false,
  } as Card));
  const state = drawUntilLastWinner(cards, input.numbers);
  return state.winCards ? score(state) : NaN;
}
