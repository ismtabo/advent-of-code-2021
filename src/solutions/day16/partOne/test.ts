import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { BitBuffer, LiteralPacket, packetVersion, parsePacket } from "./mod.ts";

Deno.test("test parse packet", async (t) => {
  await t.step("literal value", () => {
    assertEquals(parsePacket(BitBuffer.fromBytes("D2FE28")), {
      version: 6,
      tag: 4,
      value: 2021,
    } as LiteralPacket);
  });
  await t.step("operator packet v0", () => {
    assertEquals(parsePacket(BitBuffer.fromBytes("38006F45291200")), {
      version: 1,
      tag: 6,
      id: 0,
      length: 27,
      subPackets: [
        {
          tag: 4,
          value: 10,
          version: 6,
        },
        {
          tag: 4,
          value: 20,
          version: 2,
        },
      ],
    });
  });
  await t.step("operator packet v1", () => {
    assertEquals(parsePacket(BitBuffer.fromBytes("EE00D40C823060")), {
      version: 7,
      tag: 3,
      id: 1,
      length: 3,
      subPackets: [
        {
          tag: 4,
          value: 1,
          version: 2,
        },
        {
          tag: 4,
          value: 2,
          version: 4,
        },
        {
          tag: 4,
          value: 3,
          version: 1,
        },
      ],
    });
  });
});

Deno.test("test sum versions", () => {
  assertEquals(packetVersion(BitBuffer.fromBytes("8A004A801A8002F478")), 16);
  assertEquals(
    packetVersion(BitBuffer.fromBytes("620080001611562C8802118E34")),
    12,
  );
  assertEquals(
    packetVersion(BitBuffer.fromBytes("C0015000016115A2E0802F182340")),
    23,
  );
  assertEquals(
    packetVersion(BitBuffer.fromBytes("A0016C880162017C3686B18A3D4780")),
    31,
  );
});
