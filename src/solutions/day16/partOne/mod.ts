export function partOne(input: string) {
  const bits = BitBuffer.fromBytes(input);
  return packetVersion(bits);
}

export class BitBuffer {
  private byteBuffer: string[] = [];

  private constructor(private bytes: string[]) {}

  static fromBytes(bytes: string) {
    return new BitBuffer(Array.from(bytes));
  }

  read(bytes: number): string {
    const buffer = this.byteBuffer.splice(0, bytes);
    while (buffer.length < bytes) {
      this.byteBuffer = Array.from(
        parseInt(this.bytes.shift()!, 16).toString(2).padStart(4, "0"),
      );
      buffer.push(...this.byteBuffer.splice(0, bytes - buffer.length));
    }
    return buffer.join("");
  }

  flushByte() {
    this.byteBuffer = [];
  }

  get length() {
    return this.byteBuffer.length + this.bytes.length * 4;
  }
}

export interface LiteralPacket {
  version: number;
  tag: number;
  value: number;
}

export interface OperatorPacket {
  version: number;
  tag: number;
  id: number;
  length: number;
  subPackets: Packet[];
}

export type Packet = LiteralPacket | OperatorPacket;

export function parsePacket(bits: BitBuffer, flush = true): Packet {
  const version = parseInt(bits.read(3), 2);
  const tag = parseInt(bits.read(3), 2);
  if (tag === 4) {
    let subPackets = "";
    while (true) {
      const packet = bits.read(5);
      subPackets += packet.slice(1);
      if (packet.startsWith("0")) {
        break;
      }
    }
    if (flush) bits.flushByte();
    return {
      version,
      tag,
      value: parseInt(subPackets, 2),
    } as LiteralPacket;
  }
  const id = parseInt(bits.read(1), 2);
  if (id === 0) {
    const length = parseInt(bits.read(15), 2);
    const subPackets: Packet[] = [];
    const startBufferLength = bits.length;
    while (startBufferLength - bits.length < length) {
      subPackets.push(parsePacket(bits, false));
    }
    if (flush) bits.flushByte();
    return {
      version,
      tag,
      id,
      length,
      subPackets,
    } as OperatorPacket;
  }
  const length = parseInt(bits.read(11), 2);
  const subPackets = [];
  for (let i = 0; i < length; i++) {
    subPackets.push(parsePacket(bits, false));
  }
  if (flush) bits.flushByte();
  return {
    version,
    tag,
    id,
    length,
    subPackets,
  } as OperatorPacket;
}

export function packetVersion(bits: BitBuffer) {
  const packet = parsePacket(bits);
  return calculatePackerVersion(packet);
}

export function isOperationPacket(packet: Packet): packet is OperatorPacket {
  return "id" in packet;
}

function calculatePackerVersion(packet: Packet): number {
  if (!isOperationPacket(packet)) {
    return packet.version;
  }
  return packet.version +
    packet.subPackets.reduce(
      (acc, subPacket) => acc + calculatePackerVersion(subPacket),
      0,
    );
}
