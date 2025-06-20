
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
  const { toast } = useToast();

  useEffect(() => {
    checkLocalServerStatus();

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
        // Try direct launch first
        try {
          console.log('Attempting direct Mission Planner launch...');
          
          // Use Windows shell command to launch the .lnk file
          const missionPlannerPath = 'C:\\Users\\chand\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Mission Planner\\Mission Planner.lnk';
          
          // Create a command that Windows can execute
          const command = `start "" "${missionPlannerPath}"`;
          
          // Try to execute via a hidden iframe (browser security may block this)
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = `data:text/html,<script>window.location='file:///${missionPlannerPath.replace(/\\/g, '/')}';</script>`;
          document.body.appendChild(iframe);
          
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
          
          setMissionPlannerStatus('running');
          toast({
            title: "Mission Planner Launch Attempted",
            description: "Attempting to launch Mission Planner from your specified path.",
          });
          
        } catch (directError) {
          console.log('Direct launch failed, trying server method...');
          
          if (localServerRunning) {
            try {
              const result = await localServerService.launchMissionPlanner();
              
              if (result.success) {
                setMissionPlannerStatus('running');
                toast({
                  title: "Mission Planner Launched",
                  description: result.message || "Mission Planner is starting up via local server.",
                });
              } else {
                setMissionPlannerStatus('not-running');
                toast({
                  title: "Launch Failed",
                  description: result.message || "Failed to launch Mission Planner.",
                  variant: "destructive"
                });
              }
            } catch (serverError: any) {
              console.error('Server launch failed:', serverError);
              setMissionPlannerStatus('not-running');
              toast({
                title: "Launch Failed",
                description: "Unable to launch Mission Planner. Browser security may be blocking direct file access.",
                variant: "destructive"
              });
            }
          } else {
            setMissionPlannerStatus('not-running');
            toast({
              title: "Local Server Required",
              description: "Please set up the local server service to launch Mission Planner securely.",
              variant: "destructive",
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
        description: "Could not launch Mission Planner. Please check your setup.",
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
          Mission Planner Launcher
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MissionPlannerStatus 
          isConnected={isConnected}
          missionPlannerStatus={missionPlannerStatus}
        />
        
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
