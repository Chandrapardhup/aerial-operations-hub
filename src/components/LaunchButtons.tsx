
import { Button } from "@/components/ui/button";
import { Zap, Server } from "lucide-react";

interface LaunchButtonsProps {
  onLaunchMissionPlanner: () => Promise<void>;
  onCheckServerStatus: () => Promise<void>;
  isLaunching: boolean;
  missionPlannerStatus: 'not-running' | 'launching' | 'running';
}

export const LaunchButtons = ({ 
  onLaunchMissionPlanner, 
  onCheckServerStatus, 
  isLaunching, 
  missionPlannerStatus 
}: LaunchButtonsProps) => {
  return (
    <>
      <Button 
        onClick={onLaunchMissionPlanner}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
        disabled={isLaunching || missionPlannerStatus === 'launching'}
      >
        <Zap className="w-4 h-4 mr-2" />
        {isLaunching || missionPlannerStatus === 'launching' ? 'Launching...' : 'Launch Mission Planner'}
      </Button>

      <Button 
        onClick={onCheckServerStatus}
        variant="outline"
        className="w-full border-slate-600 text-gray-300 hover:bg-slate-700"
      >
        <Server className="w-4 h-4 mr-2" />
        Refresh Server Status
      </Button>
    </>
  );
};
