import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { BitBuffer, parsePacket } from "../partOne/mod.ts";
import { calculatePackerValue } from "./mod.ts";

Deno.test("test sum versions", () => {
  assertEquals(
    calculatePackerValue(parsePacket(BitBuffer.fromBytes("C200B40A82"))),
    3,
  );
  assertEquals(
    calculatePackerValue(parsePacket(BitBuffer.fromBytes("04005AC33890"))),
    54,
  );
  assertEquals(
    calculatePackerValue(parsePacket(BitBuffer.fromBytes("880086C3E88112"))),
    7,
  );
  assertEquals(
    calculatePackerValue(parsePacket(BitBuffer.fromBytes("CE00C43D881120"))),
    9,
  );
  assertEquals(
    calculatePackerValue(parsePacket(BitBuffer.fromBytes("D8005AC2A8F0"))),
    1,
  );
  assertEquals(
    calculatePackerValue(parsePacket(BitBuffer.fromBytes("F600BC2D8F"))),
    0,
  );
  assertEquals(
    calculatePackerValue(parsePacket(BitBuffer.fromBytes("9C005AC2F8F0"))),
    0,
  );
  assertEquals(
    calculatePackerValue(
      parsePacket(BitBuffer.fromBytes("9C0141080250320F1802104A08")),
    ),
    1,
  );
});
