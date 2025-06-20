
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Drone {
  id: string;
  name: string;
  status: string;
  battery: number;
}

interface DroneSelectorProps {
  selectedDrone: string;
  onDroneChange: (droneId: string) => void;
  drones: Drone[];
}

export const DroneSelector = ({ selectedDrone, onDroneChange, drones }: DroneSelectorProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Select Drone</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedDrone} onValueChange={onDroneChange}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Choose drone..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            {drones.map((drone) => (
              <SelectItem key={drone.id} value={drone.id} className="text-white hover:bg-slate-600">
                {drone.name} ({drone.id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
