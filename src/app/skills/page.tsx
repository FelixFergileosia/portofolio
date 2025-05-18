"use client";

import { CSSProperties, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeProps,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

import { radialLayout } from "./radiallayout"; // radial helper

/* ----------------------------------------------------------------------------
 * 1. Custom circular node component (with invisible handles)
 * --------------------------------------------------------------------------*/
function SkillNode({ data }: NodeProps) {
  const circle: CSSProperties = {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#1f2937", // slate-800
    border: "2px solid #2dd4bf", // teal ring
    color: "#f8fafc", // slate-50
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    position: "relative", // ⬅️ required so handles position correctly
  };

  const hidden: CSSProperties = { opacity: 0 }; // keep the dots invisible

  return (
    <div style={circle}>
      {data.label}
      {/* target handles (edges can END here) */}
      <Handle type="target" position={Position.Top} style={hidden} />
      <Handle type="target" position={Position.Left} style={hidden} />

      {/* source handles (edges can START here) */}
      <Handle type="source" position={Position.Bottom} style={hidden} />
      <Handle type="source" position={Position.Right} style={hidden} />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * 2. Nodes & edges
 * --------------------------------------------------------------------------*/
export const initialNodes: Node[] = [
  {
    id: "root",
    position: { x: 0, y: 0 },
    data: { label: "Felixʼs Skill Tree" },
    type: "skillNode",
  },

  // branches
  {
    id: "fe",
    position: { x: 0, y: 0 },
    data: { label: "Front-End" },
    type: "skillNode",
  },
  {
    id: "be",
    position: { x: 0, y: 0 },
    data: { label: "Back-End" },
    type: "skillNode",
  },
  {
    id: "devops",
    position: { x: 0, y: 0 },
    data: { label: "DevOps" },
    type: "skillNode",
  },

  // front-end
  {
    id: "react",
    position: { x: 0, y: 0 },
    data: { label: "React" },
    type: "skillNode",
  },
  {
    id: "js",
    position: { x: 0, y: 0 },
    data: { label: "JavaScript" },
    type: "skillNode",
  },
  {
    id: "wp",
    position: { x: 0, y: 0 },
    data: { label: "WordPress" },
    type: "skillNode",
  },

  // back-end
  {
    id: "php",
    position: { x: 0, y: 0 },
    data: { label: "PHP" },
    type: "skillNode",
  },
  {
    id: "golang",
    position: { x: 0, y: 0 },
    data: { label: "Golang" },
    type: "skillNode",
  },
  {
    id: "laravel",
    position: { x: 0, y: 0 },
    data: { label: "Laravel" },
    type: "skillNode",
  },
  {
    id: "express",
    position: { x: 0, y: 0 },
    data: { label: "Express" },
    type: "skillNode",
  },
  {
    id: "jest",
    position: { x: 0, y: 0 },
    data: { label: "Jest" },
    type: "skillNode",
  },
  {
    id: "micro",
    position: { x: 0, y: 0 },
    data: { label: "Microservices" },
    type: "skillNode",
  },
  {
    id: "fullstack",
    position: { x: 0, y: 0 },
    data: { label: "Full-Stack" },
    type: "skillNode",
  },

  // dev-ops
  {
    id: "docker",
    position: { x: 0, y: 0 },
    data: { label: "Docker" },
    type: "skillNode",
  },
  {
    id: "linux",
    position: { x: 0, y: 0 },
    data: { label: "Linux" },
    type: "skillNode",
  },
];

export const initialEdges: Edge[] = [
  // branches
  { id: "root-fe", source: "root", target: "fe" },
  { id: "root-be", source: "root", target: "be" },
  { id: "root-dev", source: "root", target: "devops" },

  // front-end
  { id: "fe-react", source: "fe", target: "react", animated: true },
  { id: "fe-js", source: "fe", target: "js", animated: true },
  { id: "fe-wp", source: "fe", target: "wp", animated: true },

  // back-end
  { id: "be-php", source: "be", target: "php", animated: true },
  { id: "be-golang", source: "be", target: "golang", animated: true },
  { id: "be-laravel", source: "be", target: "laravel", animated: true },
  { id: "be-express", source: "be", target: "express", animated: true },
  { id: "be-jest", source: "be", target: "jest", animated: true },
  { id: "be-micro", source: "be", target: "micro", animated: true },
  { id: "be-fs", source: "be", target: "fullstack", animated: true },

  // dev-ops
  { id: "dev-docker", source: "devops", target: "docker", animated: true },
  { id: "dev-linux", source: "devops", target: "linux", animated: true },
];

/* ----------------------------------------------------------------------------
 * 3. Component
 * --------------------------------------------------------------------------*/
export default function SkillTreeDark() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  /* lay out once on mount */
  useEffect(() => {
    // Spread 3 nodes at 0°, 90°, and 180° around center
    setNodes(radialLayout(nodes, edges, 240, 50, 0, 180));
  }, []); //  eslint-disable-line

  const onConnect = useCallback(
    (c: Connection) => setEdges((eds) => addEdge(c, eds)),
    []
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodeTypes={{ skillNode: SkillNode }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{ style: { stroke: "#c4c2c0", strokeWidth: 2 } }}
        style={{ background: "#0d1117" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={18}
          size={1}
          color="#2dd4bf"
        />
        <MiniMap />
        <Controls position="top-left" />
      </ReactFlow>
    </div>
  );
}
