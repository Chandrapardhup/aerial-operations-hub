
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Operations from "./pages/Operations";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";
import OptimizeOperations from "./pages/OptimizeOperations";
import RealTimeAnalytics from "./pages/RealTimeAnalytics";
import AutomatedReports from "./pages/AutomatedReports";
import MissionControl from "./pages/MissionControl";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/optimize-operations" element={<OptimizeOperations />} />
          <Route path="/real-time-analytics" element={<RealTimeAnalytics />} />
          <Route path="/automated-reports" element={<AutomatedReports />} />
          <Route path="/mission-control" element={<MissionControl />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
