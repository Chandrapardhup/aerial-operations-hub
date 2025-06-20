
import { Badge } from "@/components/ui/badge";

interface MissionPlannerStatusProps {
  isConnected: boolean;
  missionPlannerStatus: 'not-running' | 'launching' | 'running';
}

export const MissionPlannerStatus = ({ isConnected, missionPlannerStatus }: MissionPlannerStatusProps) => {
  const getStatusColor = () => {
    if (isConnected) return 'bg-green-500/20 text-green-300';
    if (missionPlannerStatus === 'running') return 'bg-yellow-500/20 text-yellow-300';
    if (missionPlannerStatus === 'launching') return 'bg-blue-500/20 text-blue-300';
    return 'bg-red-500/20 text-red-300';
  };

  const getStatusText = () => {
    if (isConnected) return 'Connected & WebSocket Ready';
    if (missionPlannerStatus === 'running') return 'Running (WebSocket Pending)';
    if (missionPlannerStatus === 'launching') return 'Launching...';
    return 'Not Running';
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-300">Application Status:</span>
      <Badge className={getStatusColor()}>
        {getStatusText()}
      </Badge>
    </div>
  );
};
