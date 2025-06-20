
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Satellite, Battery, Navigation } from "lucide-react";

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
  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'bg-green-500';
    if (battery > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'armed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'disarmed': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'auto': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'manual': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Real-time Telemetry Stream
          {missionPlannerConnected && (
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Live Data</span>
              <Badge className="bg-green-500/20 text-green-300">Active</Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Satellite className="w-4 h-4 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">GPS Position</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Latitude:</span>
                <span className="text-white font-mono text-sm">{realtimeData.gpsLat.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Longitude:</span>
                <span className="text-white font-mono text-sm">{realtimeData.gpsLon.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Altitude:</span>
                <span className="text-white font-mono">{realtimeData.altitude.toFixed(1)} m</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Flight Data</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Ground Speed:</span>
                <span className="text-white font-mono">{realtimeData.speed.toFixed(1)} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <Badge className={getStatusColor(realtimeData.status)}>
                  {realtimeData.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Mode:</span>
                <span className="text-blue-400">External Control</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Power Systems</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Battery:</span>
                <span className="text-white font-mono">{realtimeData.battery.toFixed(1)}%</span>
              </div>
              <div className="space-y-1">
                <Progress value={realtimeData.battery} className="h-3" />
                <div className={`h-1 rounded-full ${getBatteryColor(realtimeData.battery)}`} style={{width: `${realtimeData.battery}%`}}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Voltage:</span>
                <span className="text-green-400 font-mono">12.4V</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Connection</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">GCS Status:</span>
                <span className={missionPlannerConnected ? "text-green-400" : "text-red-400"}>
                  {missionPlannerConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal:</span>
                <span className="text-green-400">Strong (-45 dBm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data Rate:</span>
                <span className="text-blue-400">57600 bps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Packets:</span>
                <span className="text-white font-mono">1,247 rx</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
