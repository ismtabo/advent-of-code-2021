import { BitBuffer, Packet, parsePacket } from "../partOne/mod.ts";
import { isOperationPacket } from "../partOne/mod.ts";

export function partTwo(input: string) {
  const bits = BitBuffer.fromBytes(input);
  const packet = parsePacket(bits);
  return calculatePackerValue(packet);
}

export function calculatePackerValue(packet: Packet): number {
  if (!isOperationPacket(packet)) {
    return packet.value;
  }
  switch (packet.tag) {
    case 0:
      return packet.subPackets.reduce(
        (acc, subPacket) => acc + calculatePackerValue(subPacket),
        0,
      );
    case 1:
      return packet.subPackets.reduce(
        (acc, subPacket) => acc * calculatePackerValue(subPacket),
        1,
      );
    case 2:
      return Math.min(
        ...packet.subPackets.map((subPacket) =>
          calculatePackerValue(subPacket)
        ),
      );
    case 3:
      return Math.max(
        ...packet.subPackets.map((subPacket) =>
          calculatePackerValue(subPacket)
        ),
      );
    case 5: {
      const left = calculatePackerValue(packet.subPackets.at(0)!);
      const right = calculatePackerValue(packet.subPackets.at(1)!);
      return left > right ? 1 : 0;
    }
    case 6: {
      const left = calculatePackerValue(packet.subPackets.at(0)!);
      const right = calculatePackerValue(packet.subPackets.at(1)!);
      return left < right ? 1 : 0;
    }
    default: {
      const left = calculatePackerValue(packet.subPackets.at(0)!);
      const right = calculatePackerValue(packet.subPackets.at(1)!);
      return left === right ? 1 : 0;
    }
  }
}
