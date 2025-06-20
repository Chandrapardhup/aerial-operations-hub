
import { Play, AlertTriangle } from "lucide-react";

interface LaunchInstructionsProps {
  missionPlannerStatus: 'not-running' | 'launching' | 'running';
  isConnected: boolean;
}

export const LaunchInstructions = ({ missionPlannerStatus, isConnected }: LaunchInstructionsProps) => {
  return (
    <>
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

      {isConnected && (
        <div className="text-sm text-green-400 text-center">
          Mission Planner is connected and ready
        </div>
      )}
    </>
  );
};
