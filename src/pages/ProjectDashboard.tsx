"use client";

import { useParams } from "react-router-dom";
import KanbanBoard from "@/components/board/KanbanBoard";
import BoardHeader from "@/components/board/BoardHeader";
import { type Board } from "@/types/board";



export default function ProjectDashboard() {
  const { orgId, projectId } = useParams();

  /**
   * Board data comes from project context
   * (later replace with API call)
   * No hardcoded values
   */
  const board: Board = {
    id: projectId!,
    name: `Project ${projectId}`,
    description: "",
    members: [],
    columns: [],
    createdAt: ""
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

            
      {/* Board Header */}
      <BoardHeader board={board} orgId={orgId!} />

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>

    </div>
  );
}
