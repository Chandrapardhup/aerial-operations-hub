
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MissionPlannerLauncher = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();

  const handleLaunchMissionPlanner = async () => {
    setIsLaunching(true);
    
    toast({
      title: "Launching Mission Planner",
      description: "Opening Mission Planner application...",
    });

    // Simulate launching Mission Planner
    try {
      // In a real application, this would interface with the system
      // For now, we'll simulate the launch process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      setIsLaunching(false);
      
      toast({
        title: "Mission Planner Connected",
        description: "Successfully connected to Mission Planner",
      });
    } catch (error) {
      setIsLaunching(false);
      toast({
        title: "Launch Failed",
        description: "Could not connect to Mission Planner",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <ExternalLink className="w-5 h-5 mr-2" />
          Mission Planner Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Status:</span>
          <Badge className={isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>
        <Button 
          onClick={handleLaunchMissionPlanner}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={isLaunching || isConnected}
        >
          <Zap className="w-4 h-4 mr-2" />
          {isLaunching ? 'Launching...' : isConnected ? 'Mission Planner Active' : 'Launch Mission Planner'}
        </Button>
        {isConnected && (
          <div className="text-sm text-green-400 text-center">
            Mission Planner is ready for drone operations
          </div>
        )}
      </CardContent>
    </Card>
  );
};
