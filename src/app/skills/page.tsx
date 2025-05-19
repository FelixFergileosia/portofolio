"use client";

import { useState, useCallback, useEffect } from "react";
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
 * 1. Custom gaming-style skill node component
 * --------------------------------------------------------------------------*/
function SkillNode({ data, selected }: NodeProps) {
  // Set up status styling based on node status
  const status = data.status || "locked"; // locked, available, unlocked
  const getNodeStyles = (): React.CSSProperties => {
    const baseStyle = {
      width: 80,
      height: 80,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      position: "relative" as const,
      transition: "all 0.3s ease",
      boxShadow: selected ? "0 0 0 4px rgba(45, 212, 191, 0.3)" : "none",
    };

    switch (status) {
      case "unlocked":
        return {
          ...baseStyle,
          background: "#1f2937",
          border: "2px solid #a8df24",
          color: "#fef3c7",
        };
      case "available":
        return {
          ...baseStyle,
          background: "#1f2937",
          border: "2px solid #60a5fa",
          color: "#f8fafc",
        };
      default: // locked
        return {
          ...baseStyle,
          background: "#1f2937",
          border: "2px solid #4b5563",
          color: "#9ca3af",
          opacity: 0.8,
        };
    }
  };
  const nodeStyle = getNodeStyles();
  const hiddenHandleStyle = { opacity: 0 };

  // Hidden handle style

  // Outer glow for available skills
  // inside SkillNode
  const glow =
    status === "available"
      ? {
          position: "absolute" as const,
          inset: 0,
          borderRadius: "50%",
          boxShadow: "0 0 15px #60a5fa",
          animation: "pulse 2s infinite",
          zIndex: -1,
        }
      : undefined;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {glow && <div style={glow} />}

      {/* main circle, no text inside */}
      <div style={nodeStyle}>
        <Handle
          /* 1 ─ target (edges END here) */
          type="target"
          position={Position.Bottom} // ⬅ now the default target
          style={hiddenHandleStyle}
        />
        <Handle
          /* 2 ─ optional extra target for side-hits; keep or remove */
          type="target"
          position={Position.Left}
          style={hiddenHandleStyle}
        />
        <Handle
          /* 3 ─ source (edges START here) */
          type="source"
          position={Position.Bottom}
          style={hiddenHandleStyle}
        />
        <Handle
          /* 4 ─ source on the right */
          type="source"
          position={Position.Right}
          style={hiddenHandleStyle}
        />
      </div>

      {/* label underneath the node */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: 6,
          fontSize: 14,
          color: nodeStyle.color,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {data.label}
      </div>

      {/* tooltip stays unchanged */}
      {selected && data.description && (
        <div
          style={{
            position: "absolute",
            top: 90,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1f2937",
            border: "1px solid #374151",
            padding: "8px 12px",
            borderRadius: 6,
            zIndex: 10,
            width: 150,
            textAlign: "center",
            fontSize: 12,
            color: "#f3f4f6",
          }}
        >
          {data.description}
          {data.cost && (
            <div style={{ marginTop: 4, color: "#60a5fa" }}>
              {data.cost} skill points
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * 2. Enhanced nodes with gaming-style data
 * --------------------------------------------------------------------------*/
const initialNodes: Node[] = [
  {
    id: "root",
    position: { x: 0, y: 0 },
    data: {
      label: "Software Engineering Skills",
      status: "available", // Start as unlocked
      description:
        "This tree graph describe my journey in software engineering",
    },
    type: "skillNode",
  },

  // branches
  {
    id: "fe",
    position: { x: 0, y: 0 },
    data: {
      label: "Front-End",
      status: "available", // Available to unlock
      description: "UI/UX and client-side technologies",
      cost: 1,
    },
    type: "skillNode",
  },
  {
    id: "be",
    position: { x: 0, y: 0 },
    data: {
      label: "Back-End",
      status: "available", // Available to unlock
      description: "Server-side and database technologies",
      cost: 1,
    },
    type: "skillNode",
  },
  {
    id: "devops",
    position: { x: 0, y: 0 },
    data: {
      label: "DevOps",
      status: "available", // Available to unlock
      description: "Deployment and infrastructure",
      cost: 1,
    },
    type: "skillNode",
  },
  {
    id: "cms",
    position: { x: 0, y: 0 },
    data: {
      label: "CMS",
      status: "available", // Available to unlock
      description: "Web Builder",
      cost: 1,
    },
    type: "skillNode",
  },
  // front-end
  {
    id: "react",
    position: { x: 0, y: 0 },
    data: {
      label: "React",
      status: "unlocked",
      description: "Component-based UI library",
      cost: 2,
    },
    type: "skillNode",
  },
  {
    id: "js",
    position: { x: 0, y: 0 },
    data: {
      label: "JavaScript",
      status: "unlocked",
      description: "Core web programming language",
      cost: 1,
    },
    type: "skillNode",
  },
  // back-end
  {
    id: "php",
    position: { x: 0, y: 0 },
    data: {
      label: "PHP",
      status: "unlocked",
      description: "Server-side scripting language",
      cost: 2,
    },
    type: "skillNode",
  },
  {
    id: "golang",
    position: { x: 0, y: 0 },
    data: {
      label: "Golang",
      status: "unlocked",
      description: "Fast and efficient language",
      cost: 3,
    },
    type: "skillNode",
  },
  {
    id: "laravel",
    position: { x: 0, y: 0 },
    data: {
      label: "Laravel",
      status: "unlocked",
      description: "PHP web application framework",
      cost: 2,
    },
    type: "skillNode",
  },
  {
    id: "express",
    position: { x: 0, y: 0 },
    data: {
      label: "Express",
      status: "unlocked",
      description: "Node.js web framework",
      cost: 2,
    },
    type: "skillNode",
  },
  {
    id: "jest",
    position: { x: 0, y: 0 },
    data: {
      label: "Jest",
      status: "unlocked",
      description: "JavaScript testing framework",
      cost: 1,
    },
    type: "skillNode",
  },
  {
    id: "micro",
    position: { x: 0, y: 0 },
    data: {
      label: "Microservices",
      status: "unlocked",
      description: "Distributed architecture pattern",
      cost: 3,
    },
    type: "skillNode",
  },
  {
    id: "rest",
    position: { x: 0, y: 0 },
    data: {
      label: "REST",
      status: "unlocked",
      description: "Complete web development",
      cost: 4,
    },
    type: "skillNode",
  },

  // dev-ops
  {
    id: "docker",
    position: { x: 0, y: 0 },
    data: {
      label: "Docker",
      status: "unlocked",
      description: "Container platform",
      cost: 2,
    },
    type: "skillNode",
  },
  {
    id: "linux",
    position: { x: 0, y: 0 },
    data: {
      label: "Linux",
      status: "unlocked",
      description: "Server operating system",
      cost: 2,
    },
    type: "skillNode",
  },
  {
    id: "virtual-machine",
    position: { x: 0, y: 0 },
    data: {
      label: "Virtual Machine",
      status: "unlocked",
      description: "Operating Virtual Machine",
      cost: 2,
    },
    type: "skillNode",
  },
  //cms
  {
    id: "wp",
    position: { x: 0, y: 0 },
    data: {
      label: "WordPress",
      status: "unlocked",
      description: "CMS and website building",
      cost: 2,
    },
    type: "skillNode",
  },
];

/* ----------------------------------------------------------------------------
 * 3. Enhanced edges with visual styling
 * --------------------------------------------------------------------------*/
const initialEdges: Edge[] = [
  // branches - active connections
  {
    id: "root-fe",
    source: "root",
    target: "fe",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
  },
  {
    id: "root-be",
    source: "root",
    target: "be",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
  },
  {
    id: "root-dev",
    source: "root",
    target: "devops",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
  },
  {
    id: "root-cms",
    source: "root",
    target: "cms",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
  },

  // front-end - locked connections
  {
    id: "fe-react",
    source: "fe",
    target: "react",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "fe-js",
    source: "fe",
    target: "js",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  // back-end - locked connections
  {
    id: "be-php",
    source: "be",
    target: "php",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "be-golang",
    source: "be",
    target: "golang",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "be-laravel",
    source: "be",
    target: "laravel",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "be-express",
    source: "be",
    target: "express",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "be-jest",
    source: "be",
    target: "jest",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "be-micro",
    source: "be",
    target: "micro",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "be-fs",
    source: "be",
    target: "rest",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },

  // dev-ops - locked connections
  {
    id: "dev-docker",
    source: "devops",
    target: "docker",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "dev-linux",
    source: "devops",
    target: "linux",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  {
    id: "dev-virtual-machine",
    source: "devops",
    target: "virtual-machine",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
  //cms - locked connections
  {
    id: "cms-wp",
    source: "cms",
    target: "wp",
    style: { stroke: "#4b5563", strokeWidth: 2 },
  },
];

/* ----------------------------------------------------------------------------
 * 4. Main skill tree component
 * --------------------------------------------------------------------------*/
const nodeTypes = { skillNode: SkillNode };

export default function SkillTreeDark() {
  // Skill points system
  const [skillPoints, setSkillPoints] = useState(5);

  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Selected node tracking
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Apply layout on mount
  useEffect(() => {
    // Use improved radial layout with parameters for better spacing
    setNodes(radialLayout(nodes, edges, 240, 10, 270, -135));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode((prevSelected) =>
      prevSelected?.id === node.id ? null : node
    );
  }, []);

  // Handle connections
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // Unlock a skill node
  const unlockSkill = useCallback(() => {
    if (!selectedNode) return;

    const node = nodes.find((n) => n.id === selectedNode.id);
    if (!node || node.data.status !== "available") return;

    const cost = node.data.cost || 1;
    if (skillPoints < cost) return;

    // Deduct skill points
    setSkillPoints((prev) => prev - cost);

    // Update nodes
    setNodes((nds) =>
      nds.map((n) => {
        // Unlock the selected node
        if (n.id === selectedNode.id) {
          return {
            ...n,
            data: {
              ...n.data,
              status: "unlocked",
            },
          };
        }

        // Make connected child nodes available if they're locked
        if (n.data.status === "locked") {
          const isConnected = edges.some(
            (e) => e.source === selectedNode.id && e.target === n.id
          );

          if (isConnected) {
            return {
              ...n,
              data: {
                ...n.data,
                status: "available",
              },
            };
          }
        }

        return n;
      })
    );

    // Update edges to show active connections
    setEdges((eds) =>
      eds.map((e) => {
        if (e.source === selectedNode.id) {
          return {
            ...e,
            animated: true,
            style: { stroke: "#60a5fa", strokeWidth: 2 },
          };
        }
        return e;
      })
    );
  }, [selectedNode, nodes, edges, skillPoints, setNodes, setEdges]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* Skill points display */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#1f2937",
          padding: "10px",
          borderRadius: "8px",
          color: "#f8fafc",
          zIndex: 10,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #374151",
        }}
      >
        <div style={{ fontSize: "14px" }}>Skill Points</div>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#60a5fa" }}>
          {skillPoints}
        </div>
      </div>

      {/* Selected node info panel */}
      {selectedNode && selectedNode.data.status !== "locked" && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            background: "#1f2937",
            padding: "16px",
            borderRadius: "8px",
            color: "#f8fafc",
            zIndex: 10,
            width: "250px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #374151",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {selectedNode.data.label}
          </div>
          <div style={{ marginTop: "8px", fontSize: "14px", color: "#d1d5db" }}>
            {selectedNode.data.description}
          </div>

          {selectedNode.data.status === "available" && (
            <>
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "#60a5fa",
                }}
              >
                {selectedNode.data.cost > 0 && (
                  <div style={{ marginTop: 4, color: "#60a5fa" }}>
                    Cost: {selectedNode.data.cost} skill points
                  </div>
                )}
              </div>
              <button
                onClick={unlockSkill}
                disabled={skillPoints < (selectedNode.data.cost || 1)}
                style={{
                  marginTop: "12px",
                  padding: "8px 16px",
                  background:
                    skillPoints >= (selectedNode.data.cost || 1)
                      ? "#2563eb"
                      : "#6b7280",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  cursor:
                    skillPoints >= (selectedNode.data.cost || 1)
                      ? "pointer"
                      : "not-allowed",
                  width: "100%",
                }}
              >
                Unlock Skill
              </button>
            </>
          )}

          {selectedNode.data.status === "unlocked" && (
            <div
              style={{ marginTop: "12px", fontSize: "14px", color: "#34d399" }}
            >
              ✓ Skill Unlocked
            </div>
          )}
        </div>
      )}

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
        defaultEdgeOptions={{
          type: "straight", // 👈 makes every edge a straight line
          style: { stroke: "#4b5563", strokeWidth: 2 }, // keep your colour / width
        }}
        style={{ background: "#0d1117" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={18}
          size={1}
          color="#2dd4bf"
        />
        <MiniMap
          nodeColor={(n) => {
            return n.data.status === "unlocked"
              ? "#fbbf24"
              : n.data.status === "available"
              ? "#60a5fa"
              : "#4b5563";
          }}
          maskColor="rgba(0, 0, 0, 0.2)"
        />
        <Controls position="top-left" />
      </ReactFlow>
    </div>
  );
}
