
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MissionPlannerDownload = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    // Open Mission Planner download page
    window.open('https://ardupilot.org/planner/docs/mission-planner-installation.html', '_blank');
    
    toast({
      title: "Mission Planner Download",
      description: "Redirecting to official Mission Planner download page. Please follow the installation instructions.",
      duration: 5000
    });
  };

  const handleDirectDownload = () => {
    // Direct download link for Mission Planner
    window.open('https://firmware.ardupilot.org/Tools/MissionPlanner/MissionPlanner-latest.msi', '_blank');
    
    toast({
      title: "Downloading Mission Planner",
      description: "Mission Planner installer is downloading. Run the installer with administrator privileges.",
      duration: 7000
    });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Mission Planner Installation
          <Badge className="ml-auto bg-blue-500/20 text-blue-300">Required</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-300">
            <p className="font-medium">Installation Required:</p>
            <p className="mt-1 text-xs">
              Mission Planner must be installed on your system to connect and control drones. 
              Please download and install before proceeding.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Installation Path:</span>
            <span className="text-xs text-blue-300 font-mono">
              C:\Program Files (x86)\Mission Planner\
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">WebSocket Port:</span>
            <span className="text-xs text-green-400 font-mono">8080 (TCP)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleDirectDownload}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download MSI
          </Button>
          
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="border-slate-600 text-gray-300 hover:bg-slate-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Install Guide
          </Button>
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          <p><strong>Post-Installation Setup:</strong></p>
          <p className="text-xs">1. Launch Mission Planner as Administrator</p>
          <p className="text-xs">2. Go to Config/Tuning → Planner</p>
          <p className="text-xs">3. Enable "WebSocket Server" on port 8080</p>
          <p className="text-xs">4. Connect your drone to Mission Planner</p>
          <p className="text-xs">5. Return here to establish connection</p>
        </div>
      </CardContent>
    </Card>
  );
};
