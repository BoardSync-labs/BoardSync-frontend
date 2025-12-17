"use client";

import { useNavigate } from "react-router-dom";
import { Plus, Building2, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { authService } from "@/services/authService";
import { organizationService } from "@/services/organizationService";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Organization {
  organization_id: string;
  organization_name: string;
  admin: {
    id: string;
    name: string;
    email: string;
  };
  members: {
    id: string;
    name: string;
    email: string;
    role: string;
  }[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData) {
      navigate('/login');
      return;
    }
    
    // Ensure only admins can access this page
    if (userData.user_type !== 'admin') {
      navigate('/member-dashboard');
      return;
    }
    
    setUser(userData);
    fetchOrganizations();
  }, [navigate]);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await organizationService.getOrganizations();
      
      if (response.success) {
        // Filter organizations where current user is admin
        const userOrganizations = response.data.filter(org => 
          org.admin && org.admin.id === authService.getUser()?.user_id
        );
        setOrganizations(userOrganizations);
      }
    } catch (error: any) {
      console.error('Failed to fetch organizations:', error);
      toast({
        title: "Failed to Load Organizations",
        description: "Unable to fetch your organizations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

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

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center mt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Organization List */}
          {organizations.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-32 text-center">
              <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">No organizations yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first organization to get started
              </p>
              <Button onClick={() => navigate("/register-organization")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Organization
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {organizations.map((org) => (
                <Card
                  key={org.organization_id}
                  className="cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/organization/${org.organization_id}/admin`)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {org.organization_name}
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Admin
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {org.members.length} member{org.members.length !== 1 ? 's' : ''}
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
        </>
      )}
    </div>
  );
}