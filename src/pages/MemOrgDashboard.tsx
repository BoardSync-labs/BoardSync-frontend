"use client";

import { useNavigate, useParams } from "react-router-dom";
import { Plus, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChevronLeft} from 'lucide-react';
import { Link } from 'react-router-dom';
// TEMP MOCK DATA — replace with API later
const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Update landing page and dashboard UI",
  },
  {
    id: "2",
    name: "Mobile App",
    description: "Build initial MVP",
  },
];

export default function OrganizationDashboard() {
  const { orgId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 py-8">
<div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="mr-2">
                <Link to={`/dashboard`}>
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              </Button>
              </div>
      {/* Header (same as org dashboard) */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage projects for this organization
          </p>
        </div>

        <Button onClick={() => navigate(`/organization/${orgId}/new-project`)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <FolderKanban className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">No projects yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first project to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                navigate(
                  `/organization/${orgId}/project/${project.id}`
                )
              }
            >
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  {project.description || "No description"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FolderKanban className="w-4 h-4" />
                  Open project
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
