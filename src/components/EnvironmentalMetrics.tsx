
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Wind, Droplets, Thermometer, AlertTriangle } from "lucide-react";

const EnvironmentalMetrics = () => {
  const metrics = [
    {
      id: 1,
      name: "Air Quality Index",
      value: 45,
      unit: "AQI",
      status: "good",
      icon: Wind,
      threshold: 50,
      description: "PM2.5 levels monitored"
    },
    {
      id: 2,
      name: "Water Quality",
      value: 8.2,
      unit: "pH",
      status: "excellent",
      icon: Droplets,
      threshold: 8.5,
      description: "Surface water bodies"
    },
    {
      id: 3,
      name: "Temperature",
      value: 32,
      unit: "°C",
      status: "normal",
      icon: Thermometer,
      threshold: 35,
      description: "Average ambient temp"
    },
    {
      id: 4,
      name: "Vegetation Index",
      value: 0.75,
      unit: "NDVI",
      status: "healthy",
      icon: Leaf,
      threshold: 0.8,
      description: "Green cover assessment"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/20 text-green-300';
      case 'good': return 'bg-blue-500/20 text-blue-300';
      case 'healthy': return 'bg-emerald-500/20 text-emerald-300';
      case 'normal': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-red-500/20 text-red-300';
    }
  };

  const getProgressValue = (value: number, threshold: number) => {
    return Math.min((value / threshold) * 100, 100);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-green-400" />
          Environmental Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-2 text-blue-400" />
                  <h4 className="text-white font-medium">{metric.name}</h4>
                </div>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-white">
                  {metric.value} {metric.unit}
                </span>
                <span className="text-gray-400 text-sm">
                  Threshold: {metric.threshold} {metric.unit}
                </span>
              </div>

              <Progress 
                value={getProgressValue(metric.value, metric.threshold)} 
                className="h-2 mb-2" 
              />
              
              <p className="text-gray-400 text-sm">{metric.description}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default EnvironmentalMetrics;
