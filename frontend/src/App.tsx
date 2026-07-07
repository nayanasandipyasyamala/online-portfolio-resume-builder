import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortfolioProvider } from "@/lib/portfolio-context";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PortfolioPage from "./pages/PortfolioPage";
import ResumePage from "./pages/ResumePage";
import ResumeEditor from "./pages/ResumeEditor";
import TemplateEditor from "./pages/TemplateEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PortfolioProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio/:username" element={<PortfolioPage />} />
            <Route path="/portfolio" element={<Navigate to="/" />} />
            <Route path="/resume" element={<Navigate to="/dashboard?tab=resume" />} />
            <Route path="/resume-view" element={<Navigate to="/dashboard?tab=resume" />} />
            <Route path="/resume-editor" element={<ResumeEditor />} />
            <Route path="/editor" element={<TemplateEditor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
