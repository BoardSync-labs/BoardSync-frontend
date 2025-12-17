"use client";

import { useNavigate } from "react-router-dom";
import { Plus, Building2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";

// TEMP mock data (replace with API later)
const organizations = [
  {
    id: "1",
    name: "BoardSync Technologies", 
    members: 8,
  },
  {
    id: "2",
    name: "Design Team",
    members: 4,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData) {
      navigate('/login');
      return;
    }
    
    // Ensure only admins can access this page
    if (userData.user_type !== 'admin') {
      navigate('/member-dashboard'); // Redirect members to member dashboard
      return;
    }
    
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Manage your organizations
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => navigate("/register-organization")}>
            <Plus className="w-4 h-4 mr-2" />
            Create Organization
          </Button>
          
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Organization List */}
      {organizations.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">No organizations yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first organization to get started
          </p>
          <Button onClick={() => navigate("/register-organization")}>
            Create Organization
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <Card
              key={org.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/organization/${org.id}/admin`)}
            >
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
                <CardDescription>
                  {org.members} members
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  Manage organization
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}