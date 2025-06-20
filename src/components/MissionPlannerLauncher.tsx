
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap, AlertTriangle, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { missionPlannerService } from "@/services/missionPlannerService";

interface MissionPlannerLauncherProps {
  onConnectionChange: (connected: boolean) => void;
}

export const MissionPlannerLauncher = ({ onConnectionChange }: MissionPlannerLauncherProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [missionPlannerStatus, setMissionPlannerStatus] = useState<'not-running' | 'launching' | 'running'>('not-running');
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

  const handleLaunchMissionPlanner = async () => {
    setIsLaunching(true);
    setMissionPlannerStatus('launching');
    
    try {
      if (window.electronAPI) {
        // If running in Electron, use the native launcher
        await window.electronAPI.openMissionPlanner();
        setMissionPlannerStatus('running');
        toast({
          title: "Mission Planner Launched",
          description: "Mission Planner is starting up. Please wait for it to fully load.",
        });
      } else {
        // For web version, attempt to open Mission Planner from the specific path
        const missionPlannerPath = "C:\\Users\\chand\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Mission Planner\\Mission Planner.lnk";
        
        try {
          // Try to open the specific shortcut file
          window.open(`file:///${missionPlannerPath}`);
          setMissionPlannerStatus('running');
          toast({
            title: "Mission Planner Launch Attempted",
            description: "Attempting to open Mission Planner from the specified path.",
          });
        } catch (error) {
          console.error('Failed to launch from specific path:', error);
          
          // Fallback to other methods
          const fallbackPaths = [
            'missionplanner://', // Protocol handler if registered
            'file:///C:/Program%20Files/Mission%20Planner/MissionPlanner.exe',
            'file:///C:/Program%20Files%20(x86)/Mission%20Planner/MissionPlanner.exe'
          ];

          let launched = false;
          for (const path of fallbackPaths) {
            try {
              window.open(path);
              launched = true;
              break;
            } catch (fallbackError) {
              continue;
            }
          }

          if (launched) {
            setMissionPlannerStatus('running');
            toast({
              title: "Mission Planner Launch Attempted",
              description: "Attempting to open Mission Planner using fallback method.",
            });
          } else {
            setMissionPlannerStatus('not-running');
            toast({
              title: "Manual Launch Required",
              description: "Please start Mission Planner manually from your desktop or Start menu.",
              duration: 5000
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed to launch Mission Planner:', error);
      setMissionPlannerStatus('not-running');
      toast({
        title: "Launch Failed",
        description: "Could not auto-launch Mission Planner. Please start it manually.",
        variant: "destructive"
      });
    } finally {
      setIsLaunching(false);
    }
  };

  const getStatusColor = () => {
    if (isConnected) return 'bg-green-500/20 text-green-300';
    if (missionPlannerStatus === 'running') return 'bg-yellow-500/20 text-yellow-300';
    return 'bg-red-500/20 text-red-300';
  };

  const getStatusText = () => {
    if (isConnected) return 'Connected';
    if (missionPlannerStatus === 'running') return 'Running (Not Connected)';
    if (missionPlannerStatus === 'launching') return 'Launching...';
    return 'Not Running';
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
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
        
        {missionPlannerStatus === 'not-running' && (
          <div className="flex items-start space-x-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Play className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-300">
              <p className="font-medium">Ready to Launch Mission Planner:</p>
              <p className="mt-1 text-xs">Click the button below to automatically open Mission Planner, then use the connection panel to connect.</p>
            </div>
          </div>
        )}

        {missionPlannerStatus === 'running' && !isConnected && (
          <div className="flex items-start space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-300">
              <p className="font-medium">Mission Planner Setup Required:</p>
              <ol className="mt-1 space-y-1 text-xs">
                <li>1. Go to Config/Tuning → Planner</li>
                <li>2. Enable "WebSocket Server" (port 8080)</li>
                <li>3. Connect your drone to Mission Planner</li>
                <li>4. Use the connection panel to connect</li>
              </ol>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleLaunchMissionPlanner}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={isLaunching || missionPlannerStatus === 'launching'}
        >
          <Zap className="w-4 h-4 mr-2" />
          {isLaunching || missionPlannerStatus === 'launching' ? 'Launching...' : 'Launch Mission Planner'}
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
