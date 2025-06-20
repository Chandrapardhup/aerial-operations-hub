import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import LearnMore from "./pages/LearnMore";
import Operations from "./pages/Operations";
import DroneControl from "./pages/DroneControl";
import MissionControl from "./pages/MissionControl";
import MissionTemplates from "./pages/MissionTemplates";
import CustomMission from "./pages/CustomMission";
import EmergencyResponse from "./pages/EmergencyResponse";
import RealTimeAnalytics from "./pages/RealTimeAnalytics";
import OptimizeOperations from "./pages/OptimizeOperations";
import AutomatedReports from "./pages/AutomatedReports";
import AlertDetails from "./pages/AlertDetails";
import AlertsManagement from "./pages/AlertsManagement";
import ComplianceDetails from "./pages/ComplianceDetails";
import ComplianceManagement from "./pages/ComplianceManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/drone-control" element={<DroneControl />} />
          <Route path="/mission-control" element={<MissionControl />} />
          <Route path="/mission-templates" element={<MissionTemplates />} />
          <Route path="/custom-mission" element={<CustomMission />} />
          <Route path="/emergency-response" element={<EmergencyResponse />} />
          <Route path="/real-time-analytics" element={<RealTimeAnalytics />} />
          <Route path="/optimize-operations" element={<OptimizeOperations />} />
          <Route path="/automated-reports" element={<AutomatedReports />} />
          <Route path="/alert-details" element={<AlertDetails />} />
          <Route path="/alerts-management" element={<AlertsManagement />} />
          <Route path="/compliance-details" element={<ComplianceDetails />} />
          <Route path="/compliance-management" element={<ComplianceManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
