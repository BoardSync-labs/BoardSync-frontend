import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/index";
import BoardPage from "./pages/BoardPage";
import NotFound from "./pages/NotFound";
import OrganizationRegister from "./pages/CreateOrganization";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "./pages/Dashboard";
import MemDashboard from "./pages/MemDashboard";
import CreateProject from "./pages/ProjectCreateForm";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import ProjectDashboard from "./pages/ProjectDashboard";
import InviteForm from "./pages/InviteMembersModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/invite/:token" element={<InviteForm />} />

          {/* Protected Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-organization"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <OrganizationRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/:orgId/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <OrganizationDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/:orgId/new-project"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          {/* Protected Member Routes */}
          <Route
            path="/member-dashboard"
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <MemDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/:orgId/member"
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <OrganizationDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for Both */}
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/:orgId/project/:projectId"
            element={
              <ProtectedRoute>
                <ProjectDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;