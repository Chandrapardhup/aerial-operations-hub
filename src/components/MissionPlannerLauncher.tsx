
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { missionPlannerService } from "@/services/missionPlannerService";
import { localServerService } from "@/services/localServerService";
import { MissionPlannerStatus } from "@/components/MissionPlannerStatus";
import { LaunchInstructions } from "@/components/LaunchInstructions";
import { LaunchButtons } from "@/components/LaunchButtons";

interface MissionPlannerLauncherProps {
  onConnectionChange: (connected: boolean) => void;
}

export const MissionPlannerLauncher = ({ onConnectionChange }: MissionPlannerLauncherProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [missionPlannerStatus, setMissionPlannerStatus] = useState<'not-running' | 'launching' | 'running'>('not-running');
  const [localServerRunning, setLocalServerRunning] = useState(false);
  const [pathVerified, setPathVerified] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkLocalServerStatus();
    verifyInstallationPath();

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

  const checkLocalServerStatus = async () => {
    try {
      const status = await localServerService.checkServerStatus();
      setLocalServerRunning(status);
    } catch (error) {
      setLocalServerRunning(false);
    }
  };

  const verifyInstallationPath = async () => {
    if (!localServerRunning) return;
    
    try {
      const verification = await localServerService.verifyMissionPlannerPath();
      setPathVerified(verification.exists);
      
      if (!verification.exists) {
        toast({
          title: "Installation Path Issue",
          description: `Mission Planner not found at expected path: ${verification.path}`,
          variant: "destructive",
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Path verification failed:', error);
      setPathVerified(false);
    }
  };

  const handleLaunchMissionPlanner = async () => {
    setIsLaunching(true);
    setMissionPlannerStatus('launching');
    
    try {
      if (!localServerRunning) {
        throw new Error('Local server is not running. Please start the Mission Planner Bridge service first.');
      }

      console.log('Launching Mission Planner via local server...');
      console.log('Expected path:', localServerService.getMissionPlannerPath());
      
      const result = await localServerService.launchMissionPlanner();
      
      if (result.success) {
        setMissionPlannerStatus('running');
        toast({
          title: "Mission Planner Launched",
          description: `Mission Planner is starting up. WebSocket server will be available on port 8080.`,
        });

        // Check if Mission Planner WebSocket becomes available
        setTimeout(async () => {
          try {
            const status = await localServerService.getMissionPlannerStatus();
            if (status.webSocketReady) {
              toast({
                title: "WebSocket Ready",
                description: "Mission Planner WebSocket server is now available for connections.",
              });
            }
          } catch (error) {
            console.log('WebSocket status check failed:', error);
          }
        }, 5000);
      } else {
        setMissionPlannerStatus('not-running');
        toast({
          title: "Launch Failed",
          description: result.message || "Mission Planner could not be launched. Please check the installation path or permissions.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Failed to launch Mission Planner:', error);
      setMissionPlannerStatus('not-running');
      
      let errorMessage = "Mission Planner could not be launched. Please check the installation path or permissions.";
      
      if (error.message.includes('Local server')) {
        errorMessage = "Local server is not running. Please start the Mission Planner Bridge service.";
      } else if (error.message.includes('path')) {
        errorMessage = `Mission Planner not found at: ${localServerService.getMissionPlannerPath()}. Please verify the installation.`;
      } else if (error.message.includes('permissions')) {
        errorMessage = "Permission denied. Please run the local server with administrator privileges.";
      }
      
      toast({
        title: "Launch Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 7000
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
          Mission Planner Launcher
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MissionPlannerStatus 
          isConnected={isConnected}
          missionPlannerStatus={missionPlannerStatus}
        />
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Installation Path:</span>
          <div className="text-right">
            <div className="text-xs text-blue-300 font-mono">
              {localServerService.getMissionPlannerPath()}
            </div>
            <div className={`text-xs ${pathVerified ? 'text-green-400' : 'text-red-400'}`}>
              {pathVerified ? '✓ Verified' : '✗ Not verified'}
            </div>
          </div>
        </div>
        
        <LaunchInstructions 
          missionPlannerStatus={missionPlannerStatus}
          isConnected={isConnected}
        />
        
        <LaunchButtons 
          onLaunchMissionPlanner={handleLaunchMissionPlanner}
          onCheckServerStatus={checkLocalServerStatus}
          isLaunching={isLaunching}
          missionPlannerStatus={missionPlannerStatus}
        />
      </CardContent>
    </Card>
  );
};
