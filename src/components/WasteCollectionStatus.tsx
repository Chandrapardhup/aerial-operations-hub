
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Truck, MapPin, Clock, CheckCircle } from "lucide-react";

interface WasteZone {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  estimatedCompletion: string;
  wasteType: string;
  priority: 'low' | 'medium' | 'high';
}

const WasteCollectionStatus = () => {
  const wasteZones: WasteZone[] = [
    {
      id: "WZ-001",
      name: "Hitech City Commercial District",
      status: "in-progress",
      progress: 75,
      estimatedCompletion: "2:30 PM",
      wasteType: "Mixed Waste",
      priority: "high"
    },
    {
      id: "WZ-002", 
      name: "Banjara Hills Residential",
      status: "completed",
      progress: 100,
      estimatedCompletion: "Completed",
      wasteType: "Organic Waste",
      priority: "medium"
    },
    {
      id: "WZ-003",
      name: "Secunderabad Market Area",
      status: "pending",
      progress: 0,
      estimatedCompletion: "4:00 PM",
      wasteType: "Recyclable",
      priority: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Truck className="w-5 h-5 mr-2 text-green-400" />
          Waste Collection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {wasteZones.map((zone) => (
          <div key={zone.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{zone.name}</h4>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(zone.status)}>
                  {zone.status}
                </Badge>
                <Badge className={getPriorityColor(zone.priority)}>
                  {zone.priority}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Progress</span>
                <span className="text-white">{zone.progress}%</span>
              </div>
              <Progress value={zone.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-blue-400" />
                <span className="text-gray-300">{zone.wasteType}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-green-400" />
                <span className="text-gray-300">{zone.estimatedCompletion}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WasteCollectionStatus;
