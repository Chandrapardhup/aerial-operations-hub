
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap, AlertTriangle, Play, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { missionPlannerService } from "@/services/missionPlannerService";
import { localServerService } from "@/services/localServerService";

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
          Mission Planner Launcher
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Application Status:</span>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Installation Path:</span>
          <Badge className="bg-blue-500/20 text-blue-300 text-xs">
            Mission Planner.lnk
          </Badge>
        </div>
        
        <div className="flex items-start space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <Play className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-green-300">
            <p className="font-medium">Ready to Launch:</p>
            <p className="mt-1 text-xs">Click the button below to launch Mission Planner from your installation.</p>
          </div>
        </div>

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

        <Button 
          onClick={checkLocalServerStatus}
          variant="outline"
          className="w-full border-slate-600 text-gray-300 hover:bg-slate-700"
        >
          <Server className="w-4 h-4 mr-2" />
          Refresh Server Status
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
