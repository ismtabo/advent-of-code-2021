import { Set } from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";

export interface AbstractSegment<T> {
  [_: string]: T;
}

export type Segment = AbstractSegment<string>;

export type UnknownSegment = AbstractSegment<Set<string>>;
