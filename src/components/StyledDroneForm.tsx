
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Drone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StyledDroneForm = () => {
  const [droneData, setDroneData] = useState({
    name: '',
    model: '',
    type: '',
    serialNumber: '',
    batteryCapacity: '',
    maxFlightTime: '',
    maxSpeed: '',
    operatingRange: '',
    sensors: '',
    description: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Drone Added Successfully!",
      description: `${droneData.name} has been added to the fleet.`,
    });
    setDroneData({
      name: '',
      model: '',
      type: '',
      serialNumber: '',
      batteryCapacity: '',
      maxFlightTime: '',
      maxSpeed: '',
      operatingRange: '',
      sensors: '',
      description: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setDroneData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Plus className="w-5 h-5 mr-2 text-green-400" />
          Add New Drone to Fleet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Drone Name</Label>
              <Input
                placeholder="Enter drone name"
                className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                value={droneData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Model</Label>
              <Input
                placeholder="Enter model number"
                className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                value={droneData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Drone Type</Label>
              <Select onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="bg-white text-black border-gray-300">
                  <SelectValue placeholder="Select drone type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="surveillance">Surveillance</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="mapping">Mapping</SelectItem>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Serial Number</Label>
              <Input
                placeholder="Enter serial number"
                className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                value={droneData.serialNumber}
                onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Battery Capacity (mAh)</Label>
              <Input
                type="number"
                placeholder="Enter battery capacity"
                className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                value={droneData.batteryCapacity}
                onChange={(e) => handleInputChange('batteryCapacity', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-gray-300">Max Flight Time (minutes)</Label>
              <Input
                type="number"
                placeholder="Enter max flight time"
                className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                value={droneData.maxFlightTime}
                onChange={(e) => handleInputChange('maxFlightTime', e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Max Speed (km/h)</Label>
              <Input
                type="number"
                placeholder="Enter max speed"
                className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                value={droneData.maxSpeed}
                onChange={(e) => handleInputChange('maxSpeed', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-gray-300">Operating Range (km)</Label>
              <Input
                type="number"
                placeholder="Enter operating range"
                className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                value={droneData.operatingRange}
                onChange={(e) => handleInputChange('operatingRange', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Sensors & Equipment</Label>
            <Input
              placeholder="List installed sensors and equipment"
              className="bg-white text-black border-gray-300 placeholder:text-gray-500"
              value={droneData.sensors}
              onChange={(e) => handleInputChange('sensors', e.target.value)}
            />
          </div>

          <div>
            <Label className="text-gray-300">Description</Label>
            <Textarea
              placeholder="Enter detailed description..."
              className="bg-white text-black border-gray-300 placeholder:text-gray-500 min-h-24"
              value={droneData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
          >
            <Drone className="w-4 h-4 mr-2" />
            Add Drone to Fleet
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StyledDroneForm;
