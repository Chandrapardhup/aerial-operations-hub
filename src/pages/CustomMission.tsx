
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Zap, Settings, Play, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomMission = () => {
  const { toast } = useToast();
  const [missionData, setMissionData] = useState({
    name: "",
    type: "",
    priority: "Medium",
    description: "",
    startLocation: "",
    endLocation: "",
    estimatedDuration: "",
    maxAltitude: "",
    droneCount: "1",
  });

  const [selectedDrones, setSelectedDrones] = useState<string[]>([]);
  const [waypoints, setWaypoints] = useState([{ lat: "", lng: "", altitude: "", action: "hover" }]);

  const missionTypes = [
    "Surveillance",
    "Waste Collection", 
    "Environmental Monitoring",
    "Emergency Response",
    "Inspection",
    "Delivery",
    "Agricultural Survey"
  ];

  const availableDrones = [
    { id: "DRN-001", name: "Falcon-Alpha", status: "Available", battery: 95 },
    { id: "DRN-002", name: "Eagle-Beta", status: "Available", battery: 88 },
    { id: "DRN-003", name: "Hawk-Gamma", status: "Available", battery: 92 },
    { id: "DRN-004", name: "Raven-Delta", status: "Charging", battery: 45 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setMissionData(prev => ({ ...prev, [field]: value }));
  };

  const addWaypoint = () => {
    setWaypoints(prev => [...prev, { lat: "", lng: "", altitude: "", action: "hover" }]);
  };

  const updateWaypoint = (index: number, field: string, value: string) => {
    setWaypoints(prev => prev.map((wp, i) => 
      i === index ? { ...wp, [field]: value } : wp
    ));
  };

  const toggleDrone = (droneId: string) => {
    setSelectedDrones(prev => 
      prev.includes(droneId) 
        ? prev.filter(id => id !== droneId)
        : [...prev, droneId]
    );
  };

  const saveMission = () => {
    if (!missionData.name || !missionData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in mission name and type.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mission Saved",
      description: `Mission "${missionData.name}" has been saved successfully.`,
    });
  };

  const startMission = () => {
    if (selectedDrones.length === 0) {
      toast({
        title: "No Drones Selected",
        description: "Please select at least one drone for the mission.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mission Started",
      description: `Mission "${missionData.name}" is now active with ${selectedDrones.length} drone(s).`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Create Custom Mission</h1>
            <p className="text-gray-300 text-lg">Design and configure your custom drone mission</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mission Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-white">Mission Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Mission Name *</Label>
                      <Input
                        id="name"
                        value={missionData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="e.g., Harbor Security Patrol"
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Mission Type *</Label>
                      <Select value={missionData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                          <SelectValue placeholder="Select mission type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-600 border-slate-500">
                          {missionTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-white hover:bg-slate-500">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300">Priority</Label>
                      <Select value={missionData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-600 border-slate-500">
                          <SelectItem value="Low" className="text-white">Low</SelectItem>
                          <SelectItem value="Medium" className="text-white">Medium</SelectItem>
                          <SelectItem value="High" className="text-white">High</SelectItem>
                          <SelectItem value="Critical" className="text-white">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration" className="text-gray-300">Est. Duration (min)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={missionData.estimatedDuration}
                        onChange={(e) => handleInputChange("estimatedDuration", e.target.value)}
                        placeholder="60"
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="altitude" className="text-gray-300">Max Altitude (m)</Label>
                      <Input
                        id="altitude"
                        type="number"
                        value={missionData.maxAltitude}
                        onChange={(e) => handleInputChange("maxAltitude", e.target.value)}
                        placeholder="100"
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">Mission Description</Label>
                    <Textarea
                      id="description"
                      value={missionData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe the mission objectives and requirements..."
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Waypoints */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Mission Waypoints
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {waypoints.map((waypoint, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-gray-300">Latitude</Label>
                          <Input
                            value={waypoint.lat}
                            onChange={(e) => updateWaypoint(index, "lat", e.target.value)}
                            placeholder="17.3850"
                            className="bg-slate-600 border-slate-500 text-white text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Longitude</Label>
                          <Input
                            value={waypoint.lng}
                            onChange={(e) => updateWaypoint(index, "lng", e.target.value)}
                            placeholder="78.4867"
                            className="bg-slate-600 border-slate-500 text-white text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Altitude (m)</Label>
                          <Input
                            value={waypoint.altitude}
                            onChange={(e) => updateWaypoint(index, "altitude", e.target.value)}
                            placeholder="50"
                            className="bg-slate-600 border-slate-500 text-white text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Action</Label>
                          <Select value={waypoint.action} onValueChange={(value) => updateWaypoint(index, "action", value)}>
                            <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-600 border-slate-500">
                              <SelectItem value="hover" className="text-white">Hover</SelectItem>
                              <SelectItem value="photo" className="text-white">Take Photo</SelectItem>
                              <SelectItem value="scan" className="text-white">Scan Area</SelectItem>
                              <SelectItem value="wait" className="text-white">Wait</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addWaypoint} variant="outline" className="border-gray-600 text-gray-300">
                    Add Waypoint
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Drone Selection */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Select Drones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableDrones.map((drone) => (
                    <div 
                      key={drone.id} 
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                        selectedDrones.includes(drone.id)
                          ? 'bg-blue-600/20 border-blue-500'
                          : drone.status === 'Available'
                          ? 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                          : 'bg-slate-700/10 border-slate-700 opacity-50'
                      }`}
                      onClick={() => drone.status === 'Available' && toggleDrone(drone.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{drone.name}</span>
                        <Badge className={`${
                          drone.status === 'Available'
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                        }`}>
                          {drone.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        Battery: {drone.battery}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Mission Control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={saveMission} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Mission
                  </Button>
                  <Button onClick={startMission} className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Mission
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMission;
