import { assertArrayIncludes } from "https://deno.land/std/testing/asserts.ts";
import { dispatch } from "./mod.ts";

Deno.test("dispatch", async (t) => {
  await t.step("should do upwards diagonals", () => {
    const actualState = dispatch(new Map(), {
      type: "diagonal",
      payload: { start: { x: 1, y: 1 }, end: { x: 3, y: 3 } },
    });
    const actualKeys = Array.from(actualState.keys());
    assertArrayIncludes(
      actualKeys,
      [`1:1`, `2:2`, `3:3`],
    );
  });
  await t.step("should do downwards diagonals", () => {
    const actualState = dispatch(new Map(), {
      type: "diagonal",
      payload: { start: { x: 9, y: 7 }, end: { x: 7, y: 9 } },
    });
    const actualKeys = Array.from(actualState.keys());
    assertArrayIncludes(
      actualKeys,
      [`9:7`, `8:8`, `7:9`],
    );
  });
});
