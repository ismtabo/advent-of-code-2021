import {
  List,
  OrderedMap,
  OrderedSet,
} from "https://deno.land/x/immutable@4.0.0-rc.14-deno/mod.ts";

export type State = OrderedMap<string, OrderedSet<string>>;

export function State() {
  return OrderedMap<string, OrderedSet<string>>();
}

export function toEdges(edges: string[][]): State {
  return edges
    .reduce(
      (s, [a, b]) =>
        s.update(a, (value) => (value ?? OrderedSet()).add(b))
          .update(b, (value) => (value ?? OrderedSet()).add(a)),
      State(),
    )
    .map((value) => value.remove("start"))
    .set("end", OrderedSet());
}

export interface Step {
  node: string;
  path: List<string>;
}

export function Step(node: string, path: List<string>): Step {
  return { node, path };
}

export function isUppercase(str: string) {
  return str === str.toUpperCase();
}

export type NextNodesPredicate = (
  node: string,
  path: List<string>,
) => boolean;

export function partOneNextNodesPredicate(
  node: string,
  path: List<string>,
): boolean {
  return (isUppercase(node) || !path.contains(node));
}

export function findAllPaths(
  state: State,
  nextNodesPredicate: NextNodesPredicate,
) {
  let pending = state.get("start")!.toList()
    .map((node) => Step(node, List(["start"])));
  let paths = List<List<string>>();
  state = state.set("start", OrderedSet()).set("end", OrderedSet());
  while (!pending.isEmpty()) {
    const { node, path } = pending.first()!;
    pending = pending.shift();
    if (node === "end") {
      paths = paths.push(path.push("end"));
      continue;
    }
    const nextNodes = state.get(node)!
      .filter((other) => nextNodesPredicate(other, path.push(node)));
    pending = pending.unshift(
      ...nextNodes.map((other) => Step(other, path.push(node))),
    );
  }
  return paths;
}

export function partOne(
  input: string[][],
  nextNodesPredicate: NextNodesPredicate = partOneNextNodesPredicate,
) {
  const state = toEdges(input);
  const paths = findAllPaths(state, nextNodesPredicate);
  return paths.size!;
}
