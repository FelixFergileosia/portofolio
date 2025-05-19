// utils/radialLayout.ts
import type { Node, Edge } from "reactflow";

type RFNode = Node<{ label: string }>;
type RFEdge = Edge;

/**
 * Lay out a single-root tree in concentric circles.
 * radiusStep – how far apart rings are (px)
 * anglePad   – extra blank space on each side of a branch (°)
 */
export function radialLayout(
  nodes: RFNode[],
  edges: RFEdge[],
  radiusStep = 180,
  anglePad = 10,
  totalAngle = 360,
  startAngle = -90
): RFNode[] {
  console.log("🚀 ~ nodes:", nodes);
  // 1. Build adjacency + depth map
  const childMap = new Map<string, string[]>(); // parent → children[]
  const parentMap = new Map<string, string>(); // child  → parent

  edges.forEach((e) => {
    childMap.set(e.source, [...(childMap.get(e.source) ?? []), e.target]);
    parentMap.set(e.target, e.source);
  });

  // 2. Find root(s) (no parent) and breadth-first collect depth
  const roots = nodes.filter((n) => !parentMap.has(n.id));
  const depthMap = new Map<string, number>();
  const queue: { id: string; depth: number }[] = roots.map((r) => ({
    id: r.id,
    depth: 0,
  }));

  while (queue.length) {
    const { id, depth } = queue.shift()!;
    depthMap.set(id, depth);
    (childMap.get(id) ?? []).forEach((ch) =>
      queue.push({ id: ch, depth: depth + 1 })
    );
  }

  // 3. Recursively assign an angular segment to each subtree
  //    Width of a segment = number of leaf descendants
  function leafCount(id: string): number {
    const kids = childMap.get(id) ?? [];
    return kids.length === 0 ? 1 : kids.reduce((s, k) => s + leafCount(k), 0);
  }

  const fullLeaves = roots.reduce((s, r) => s + leafCount(r.id), 0);
  let globalAngle = startAngle;

  const placed: Map<string, { r: number; a: number }> = new Map();

  function place(id: string, start: number, sweep: number) {
    const depth = depthMap.get(id)!;
    placed.set(id, { r: depth * radiusStep, a: start + sweep / 2 });

    const kids = childMap.get(id) ?? [];
    if (!kids.length) return;

    let cursor = start;
    kids.forEach((kid) => {
      const leaves = leafCount(kid);
      const seg = (leaves / fullLeaves) * 360;
      place(kid, cursor + anglePad, seg - 2 * anglePad);
      cursor += seg;
    });
  }

  // Place nodes in their angular segments
  roots.forEach((r) => {
    const seg = (leafCount(r.id) / fullLeaves) * totalAngle;
    place(r.id, globalAngle, seg);
    globalAngle += seg;
  });

  // 4. Convert polar → Cartesian for React Flow
  const DEG2RAD = Math.PI / 180;
  return nodes.map((n) => {
    const p = placed.get(n.id);
    if (!p) return n; // isolated nodes
    const { r, a } = p;
    return {
      ...n,
      position: {
        x: r * Math.cos(a * DEG2RAD),
        y: r * Math.sin(a * DEG2RAD),
      },
    };
  });
}
