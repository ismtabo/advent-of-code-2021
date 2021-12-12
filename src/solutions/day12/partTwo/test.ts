import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { List } from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";
import { partTwoNextNodesPredicate } from "./mod.ts";

Deno.test("next nodes predicate", async (t) => {
  await t.step("shouldn't allow more than two repeated nodes", () => {
    assertEquals(
      partTwoNextNodesPredicate("d", List(["start", "b", "d", "b"])),
      false,
    );
  });
  await t.step("should allow more repeated node", () => {
    assertEquals(
      partTwoNextNodesPredicate("d", List(["start", "b", "d"])),
      true,
    );
  });
  await t.step("should allow uppercase repeated nodes", () => {
    assertEquals(
      partTwoNextNodesPredicate("A", List(["start", "A", "d", "A", "d"])),
      true,
    );
  });
});
