
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Battery, Signal, AlertTriangle, CheckCircle, Clock, Zap, Settings, Play, Pause, StopCircle } from "lucide-react";
import WasteCollectionStatus from "@/components/WasteCollectionStatus";
import EnvironmentalMetrics from "@/components/EnvironmentalMetrics";
import GovernmentAlerts from "@/components/GovernmentAlerts";
import ComplianceReporting from "@/components/ComplianceReporting";

const Operations = () => {
  const [activeMissions, setActiveMissions] = useState(8);
  const [completedToday, setCompletedToday] = useState(24);

  const missions = [
    { id: "M-001", type: "Waste Collection", status: "Active", progress: 75, location: "Sector A", drone: "DRN-001" },
    { id: "M-002", type: "Environmental Scan", status: "Active", progress: 45, location: "Sector B", drone: "DRN-002" },
    { id: "M-003", type: "Route Inspection", status: "Completed", progress: 100, location: "Sector C", drone: "DRN-003" },
    { id: "M-004", type: "Emergency Response", status: "Paused", progress: 30, location: "Sector D", drone: "DRN-004" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Paused': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Waste Management Operations</h1>
            <p className="text-gray-300 text-lg">Real-time monitoring and control of drone operations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Missions</CardTitle>
                <Zap className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{activeMissions}</div>
                <p className="text-xs text-green-400">+2 from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Completed Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{completedToday}</div>
                <p className="text-xs text-green-400">Above target</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">System Efficiency</CardTitle>
                <Settings className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">96.2%</div>
                <p className="text-xs text-purple-400">Optimal performance</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Response Time</CardTitle>
                <Clock className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3.2 min</div>
                <p className="text-xs text-orange-400">Average response</p>
              </CardContent>
            </Card>
          </div>

          {/* Government Alerts Section */}
          <div className="mb-8">
            <GovernmentAlerts />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Waste Collection Status */}
            <WasteCollectionStatus />

            {/* Environmental Metrics */}
            <EnvironmentalMetrics />
          </div>

          {/* Current Missions */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  Current Missions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {missions.map((mission) => (
                  <div key={mission.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(mission.status)}>
                          {mission.status}
                        </Badge>
                        <span className="font-semibold text-white">{mission.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400">
                          <Pause className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                          <StopCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={mission.progress} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{mission.location} • {mission.drone}</span>
                      <span>{mission.progress}% Complete</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Compliance Reporting */}
          <div className="mb-8">
            <ComplianceReporting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
