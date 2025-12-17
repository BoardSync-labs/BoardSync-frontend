"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// MOCK ORG MEMBERS (replace with API later)
const orgMembers = [
  { id: "u1", name: "Amit Sharma" },
  { id: "u2", name: "Neha Verma" },
  { id: "u3", name: "Rahul Mehta" },
  { id: "u4", name: "Sneha Patil" },
];

export default function CreateProject() {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [leaders, setLeaders] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);

  const availableMembers = orgMembers.filter(
    (m) => !leaders.includes(m.id) && !members.includes(m.id)
  );

  const addLeader = (id: string) => {
    if (!leaders.includes(id)) {
      setLeaders([...leaders, id]);
      setMembers(members.filter((m) => m !== id));
    }
  };

  const addMember = (id: string) => {
    if (!members.includes(id)) {
      setMembers([...members, id]);
    }
  };

  const removeLeader = (id: string) => {
    setLeaders(leaders.filter((l) => l !== id));
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m !== id));
  };

  const handleCreate = () => {
    const payload = {
      name,
      description,
      leaders,
      members,
      orgId,
    };

    console.log("CREATE PROJECT PAYLOAD:", payload);
    // API call here
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Set project details and assign team members
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Project Info */}
          <div className="space-y-4">
            <Input
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* TEAM ASSIGNMENT */}
          <div>
            <h3 className="font-semibold mb-4">Assign Team</h3>

            <div className="space-y-6">

              {/* Leaders */}
              <div>
                <p className="font-medium mb-2">Leaders</p>

                {leaders.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No leaders selected
                  </p>
                )}

                {leaders.map((id) => {
                  const user = orgMembers.find((u) => u.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between border rounded px-3 py-2 mb-2"
                    >
                      <span className="text-sm">{user?.name}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeLeader(id)}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Members */}
              <div>
                <p className="font-medium mb-2">Members</p>

                {members.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No members selected
                  </p>
                )}

                {members.map((id) => {
                  const user = orgMembers.find((u) => u.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between border rounded px-3 py-2 mb-2"
                    >
                      <span className="text-sm">{user?.name}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeMember(id)}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Organization Members */}
              <div>
                <p className="font-medium mb-2">Organization Members</p>

                {availableMembers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border rounded px-3 py-2 mb-2"
                  >
                    <span className="text-sm">{user.name}</span>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addLeader(user.id)}
                      >
                        Leader
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => addMember(user.id)}
                      >
                        Member
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            Create Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
