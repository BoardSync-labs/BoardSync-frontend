import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import BoardPage from "./pages/BoardPage";
import NotFound from "./pages/NotFound";
import OrganizationRegister from "./pages/CreateOrganization";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "./pages/Dashboard";
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
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register-organization" element={<OrganizationRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization/:orgId" element={<OrganizationDashboard />}/>
          <Route path="/organization/:orgId/new-project" element={<CreateProject />}/>
          <Route path="/organization/:orgId/project/:projectId" element={<ProjectDashboard />}/>
          <Route path="/invite/:token" element={<InviteForm />} />


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
