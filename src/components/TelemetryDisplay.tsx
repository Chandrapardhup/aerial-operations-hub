
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

interface RealtimeData {
  altitude: number;
  speed: number;
  battery: number;
  gpsLat: number;
  gpsLon: number;
  status: string;
}

interface TelemetryDisplayProps {
  realtimeData: RealtimeData;
  missionPlannerConnected: boolean;
}

export const TelemetryDisplay = ({ realtimeData, missionPlannerConnected }: TelemetryDisplayProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Real-time Telemetry from Mission Planner
          {missionPlannerConnected && (
            <div className="ml-auto flex items-center text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Position</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Latitude:</span>
                <span className="text-white">{realtimeData.gpsLat.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Longitude:</span>
                <span className="text-white">{realtimeData.gpsLon.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Altitude:</span>
                <span className="text-white">{realtimeData.altitude.toFixed(1)}m</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Flight Data</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Ground Speed:</span>
                <span className="text-white">{realtimeData.speed.toFixed(1)} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400">{realtimeData.status}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Power</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Battery:</span>
                <span className="text-white">{realtimeData.battery.toFixed(1)}%</span>
              </div>
              <Progress value={realtimeData.battery} className="h-2" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Connection</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Mission Planner:</span>
                <span className={missionPlannerConnected ? "text-green-400" : "text-red-400"}>
                  {missionPlannerConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal:</span>
                <span className="text-green-400">Strong</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
