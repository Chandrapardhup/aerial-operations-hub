
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RealtimeData {
  altitude: number;
  speed: number;
  battery: number;
  gpsLat: number;
  gpsLon: number;
  status: string;
}

interface MissionStatusProps {
  realtimeData: RealtimeData;
}

export const MissionStatus = ({ realtimeData }: MissionStatusProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Mission Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Altitude:</span>
            <span className="text-white">{realtimeData.altitude.toFixed(1)}m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Speed:</span>
            <span className="text-white">{realtimeData.speed.toFixed(1)} m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Battery:</span>
            <span className="text-white">{realtimeData.battery.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
