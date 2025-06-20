
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { missionPlannerService } from "@/services/missionPlannerService";

interface MissionPlannerLauncherProps {
  onConnectionChange: (connected: boolean) => void;
}

export const MissionPlannerLauncher = ({ onConnectionChange }: MissionPlannerLauncherProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleConnection = () => {
      setIsConnected(true);
      onConnectionChange(true);
    };

    const handleDisconnection = () => {
      setIsConnected(false);
      onConnectionChange(false);
    };

    const handleError = (error: any) => {
      toast({
        title: "Mission Planner Error",
        description: error.message || "Connection error occurred",
        variant: "destructive"
      });
    };

    missionPlannerService.on('connected', handleConnection);
    missionPlannerService.on('disconnected', handleDisconnection);
    missionPlannerService.on('error', handleError);

    return () => {
      missionPlannerService.off('connected', handleConnection);
      missionPlannerService.off('disconnected', handleDisconnection);
      missionPlannerService.off('error', handleError);
    };
  }, [onConnectionChange, toast]);

  const handleLaunchMissionPlanner = () => {
    setIsLaunching(true);
    
    // Open Mission Planner executable (this requires the app to be installed)
    // Note: This will only work in Electron or similar desktop environments
    // For web deployment, users need to manually start Mission Planner
    
    toast({
      title: "Opening Mission Planner",
      description: "Please manually start Mission Planner and enable WebSocket server",
    });

    try {
      // Attempt to open Mission Planner via system command
      // This is a placeholder - in a real implementation, you'd use:
      // - Electron's shell.openExternal() for desktop apps
      // - Or instruct users to manually start Mission Planner
      
      if (window.electronAPI) {
        // If running in Electron
        window.electronAPI.openMissionPlanner();
      } else {
        // For web version, show instructions
        toast({
          title: "Manual Launch Required",
          description: "Please start Mission Planner manually and configure WebSocket connection",
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Failed to launch Mission Planner:', error);
      toast({
        title: "Launch Failed",
        description: "Please start Mission Planner manually",
        variant: "destructive"
      });
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <ExternalLink className="w-5 h-5 mr-2" />
          Mission Planner Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Application Status:</span>
          <Badge className={isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </Badge>
        </div>
        
        {!isConnected && (
          <div className="flex items-start space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-300">
              <p className="font-medium">Mission Planner Setup Required:</p>
              <ol className="mt-1 space-y-1 text-xs">
                <li>1. Start Mission Planner application</li>
                <li>2. Go to Config/Tuning → Planner</li>
                <li>3. Enable "WebSocket Server" (port 8080)</li>
                <li>4. Connect your drone to Mission Planner</li>
                <li>5. Use the connection panel to connect</li>
              </ol>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleLaunchMissionPlanner}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={isLaunching}
        >
          <Zap className="w-4 h-4 mr-2" />
          {isLaunching ? 'Opening...' : 'Open Mission Planner'}
        </Button>
        
        {isConnected && (
          <div className="text-sm text-green-400 text-center">
            Mission Planner is connected and ready
          </div>
        )}
      </CardContent>
    </Card>
  );
};
