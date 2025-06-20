import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Zap, Settings, Camera, Battery } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DroneCreationFormProps {
  onClose: () => void;
  onDroneCreated: (drone: any) => void;
}

export const DroneCreationForm = ({ onClose, onDroneCreated }: DroneCreationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    type: "",
    maxSpeed: "",
    maxAltitude: "",
    batteryLife: "",
    range: "",
    description: "",
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState({
    color: "#3B82F6",
    cameraResolution: "4K",
    sensorType: "Standard",
    specialEquipment: [] as string[],
  });

  const droneTypes = [
    "Surveillance",
    "Delivery",
    "Inspection",
    "Environmental Monitoring",
    "Emergency Response",
    "Agricultural",
  ];

  const availableFeatures = [
    "GPS Navigation",
    "Obstacle Avoidance",
    "Night Vision",
    "Thermal Imaging",
    "Auto Return",
    "Weather Resistance",
    "Live Streaming",
    "Data Recording",
  ];

  const specialEquipment = [
    "High-Resolution Camera",
    "Thermal Camera",
    "LiDAR Sensor",
    "Air Quality Sensor",
    "Spotlight",
    "Speaker System",
    "Cargo Bay",
    "Extended Battery",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const toggleEquipment = (equipment: string) => {
    setCustomizations(prev => ({
      ...prev,
      specialEquipment: prev.specialEquipment.includes(equipment)
        ? prev.specialEquipment.filter(e => e !== equipment)
        : [...prev.specialEquipment, equipment]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.model || !formData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newDrone = {
      id: `DRN-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      name: formData.name,
      model: formData.model,
      type: formData.type,
      status: "Standby",
      battery: 100,
      location: "Base Station",
      specifications: {
        maxSpeed: formData.maxSpeed,
        maxAltitude: formData.maxAltitude,
        batteryLife: formData.batteryLife,
        range: formData.range,
      },
      features: selectedFeatures,
      customizations,
      description: formData.description,
      mission: null,
    };

    onDroneCreated(newDrone);
    toast({
      title: "Drone Created Successfully",
      description: `${formData.name} has been added to your fleet.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Zap className="w-6 h-6 mr-2 text-blue-400" />
            Create New Drone
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <Card className="bg-slate-700/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Drone Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Falcon-01"
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="model" className="text-gray-300">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    placeholder="e.g., DJI Mavic 3"
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="type" className="text-gray-300">Drone Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Select drone type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500">
                    {droneTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-white hover:bg-slate-500">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the drone's purpose..."
                  className="bg-slate-600 border-slate-500 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card className="bg-slate-700/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Technical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxSpeed" className="text-gray-300">Max Speed (km/h)</Label>
                  <Input
                    id="maxSpeed"
                    type="number"
                    value={formData.maxSpeed}
                    onChange={(e) => handleInputChange("maxSpeed", e.target.value)}
                    placeholder="65"
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="maxAltitude" className="text-gray-300">Max Altitude (m)</Label>
                  <Input
                    id="maxAltitude"
                    type="number"
                    value={formData.maxAltitude}
                    onChange={(e) => handleInputChange("maxAltitude", e.target.value)}
                    placeholder="6000"
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="batteryLife" className="text-gray-300">Battery Life (min)</Label>
                  <Input
                    id="batteryLife"
                    type="number"
                    value={formData.batteryLife}
                    onChange={(e) => handleInputChange("batteryLife", e.target.value)}
                    placeholder="46"
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="range" className="text-gray-300">Range (km)</Label>
                  <Input
                    id="range"
                    type="number"
                    value={formData.range}
                    onChange={(e) => handleInputChange("range", e.target.value)}
                    placeholder="15"
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-slate-700/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2">
                {availableFeatures.map((feature) => (
                  <Button
                    key={feature}
                    type="button"
                    variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFeature(feature)}
                    className={`justify-start ${
                      selectedFeatures.includes(feature)
                        ? "bg-blue-600 text-white"
                        : "border-slate-500 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {feature}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customizations */}
          <Card className="bg-slate-700/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Customizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="color" className="text-gray-300">Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="color"
                      value={customizations.color}
                      onChange={(e) => setCustomizations(prev => ({...prev, color: e.target.value}))}
                      className="w-12 h-10 rounded border-slate-500"
                    />
                    <span className="text-gray-300">{customizations.color}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300">Camera Resolution</Label>
                  <Select 
                    value={customizations.cameraResolution} 
                    onValueChange={(value) => setCustomizations(prev => ({...prev, cameraResolution: value}))}
                  >
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 border-slate-500">
                      <SelectItem value="HD" className="text-white">HD (1080p)</SelectItem>
                      <SelectItem value="4K" className="text-white">4K</SelectItem>
                      <SelectItem value="8K" className="text-white">8K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Sensor Type</Label>
                  <Select 
                    value={customizations.sensorType} 
                    onValueChange={(value) => setCustomizations(prev => ({...prev, sensorType: value}))}
                  >
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 border-slate-500">
                      <SelectItem value="Standard" className="text-white">Standard</SelectItem>
                      <SelectItem value="Thermal" className="text-white">Thermal</SelectItem>
                      <SelectItem value="Multispectral" className="text-white">Multispectral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block">Special Equipment</Label>
                <div className="grid md:grid-cols-2 gap-2">
                  {specialEquipment.map((equipment) => (
                    <Button
                      key={equipment}
                      type="button"
                      variant={customizations.specialEquipment.includes(equipment) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleEquipment(equipment)}
                      className={`justify-start ${
                        customizations.specialEquipment.includes(equipment)
                          ? "bg-purple-600 text-white"
                          : "border-slate-500 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {equipment}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Drone
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
