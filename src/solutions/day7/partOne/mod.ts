import { range } from "https://deno.land/x/it_range@v1.1.0/mod.ts";

export function consumption(targetPos: number, crabPosition: number): number {
  return Math.abs(targetPos - crabPosition);
}

export function partOne(input: number[], consumptionFn = consumption) {
  const consumptions = Array.from(range(input.length)).map((pos) =>
    input.reduce((acc, crabPos) => acc + consumptionFn(pos, crabPos), 0)
  );
  return Math.min(...consumptions);
}
