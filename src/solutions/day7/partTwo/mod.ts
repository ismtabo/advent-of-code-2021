import { partOne } from "../partOne/mod.ts";

export function crabConsumption(targetPos: number, crabPos: number): number {
  const distance = Math.abs(targetPos - crabPos);
  return Math.floor(distance * (distance + 1) / 2);
}

export function partTwo(input: number[]) {
  return partOne(input, crabConsumption);
}
