import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Battery, Signal, AlertTriangle, CheckCircle, Clock, Zap, Settings, Play, Pause, StopCircle, Users, Activity, Bolt } from "lucide-react";
import WasteCollectionStatus from "@/components/WasteCollectionStatus";
import EnvironmentalMetrics from "@/components/EnvironmentalMetrics";
import GovernmentAlerts from "@/components/GovernmentAlerts";
import ComplianceReporting from "@/components/ComplianceReporting";
import { MissionPlannerLauncher } from "@/components/MissionPlannerLauncher";
import { Link } from "react-router-dom";

const Operations = () => {
  const [activeMissions, setActiveMissions] = useState(8);
  const [completedToday, setCompletedToday] = useState(24);
  const [missionPlannerConnected, setMissionPlannerConnected] = useState(false);

  const drones = [
    { id: "TG-DRN-001", name: "Hyderabad-Alpha", status: "Active", battery: 85, signal: "Strong", location: "Sector A", mission: "Waste Monitoring" },
    { id: "TG-DRN-002", name: "Warangal-Beta", status: "Active", battery: 92, signal: "Strong", location: "Sector B", mission: "Environmental Scan" },
    { id: "TG-DRN-003", name: "Nizamabad-Gamma", status: "Standby", battery: 45, signal: "Weak", location: "Base Station", mission: "Charging" },
    { id: "TG-DRN-004", name: "Karimnagar-Delta", status: "Active", battery: 78, signal: "Strong", location: "Sector C", mission: "Route Inspection" },
    { id: "TG-DRN-005", name: "Khammam-Echo", status: "Active", battery: 67, signal: "Strong", location: "Sector D", mission: "Traffic Monitoring" },
    { id: "TG-DRN-006", name: "Nalgonda-Foxtrot", status: "Maintenance", battery: 23, signal: "Offline", location: "Service Bay", mission: "Under Repair" },
  ];

  const missions = [
    { id: "M-001", type: "Waste Collection", status: "Active", progress: 75, location: "Sector A", drone: "TG-DRN-001" },
    { id: "M-002", type: "Environmental Scan", status: "Active", progress: 45, location: "Sector B", drone: "TG-DRN-002" },
    { id: "M-003", type: "Route Inspection", status: "Completed", progress: 100, location: "Sector C", drone: "TG-DRN-004" },
    { id: "M-004", type: "Emergency Response", status: "Paused", progress: 30, location: "Sector D", drone: "TG-DRN-005" },
    { id: "M-005", type: "Traffic Monitoring", status: "Active", progress: 60, location: "HITEC City", drone: "TG-DRN-005" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Paused': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Standby': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'Maintenance': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getDroneStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Standby': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Maintenance': return 'bg-red-500/20 text-red-300 border-red-500/30';
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
            <h1 className="text-4xl font-bold text-white mb-4">Drone Operations Center</h1>
            <p className="text-gray-300 text-lg">Real-time monitoring and control of drone fleet operations</p>
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
                <CardTitle className="text-sm font-medium text-gray-300">Active Drones</CardTitle>
                <Activity className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{drones.filter(d => d.status === 'Active').length}</div>
                <p className="text-xs text-green-400">Fleet operational</p>
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
          </div>

          {/* Government Alerts Section */}
          <div className="mb-8">
            <GovernmentAlerts />
          </div>

          {/* Mission Planner Control Center */}
          <div className="mb-8">
            <MissionPlannerLauncher onConnectionChange={setMissionPlannerConnected} />
          </div>

          {/* Drone Fleet Status */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  Telangana Drone Fleet Status
                </CardTitle>
                <div className="flex space-x-2">
                  <Link to="/mission-control">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Mission Control
                    </Button>
                  </Link>
                  <Link to="/drone-control">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Manual Control
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {drones.map((drone) => (
                  <div key={drone.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getDroneStatusColor(drone.status)}>
                          {drone.status}
                        </Badge>
                        <div>
                          <span className="font-semibold text-white">{drone.id}</span>
                          <div className="text-sm text-gray-400">{drone.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Signal className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{drone.signal}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Battery className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{drone.battery}%</span>
                        </div>
                      </div>
                    </div>
                    <Progress value={drone.battery} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span><MapPin className="w-3 h-3 inline mr-1" />{drone.location}</span>
                      <span>{drone.mission}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  Mission Control Center
                </CardTitle>
                <div className="flex space-x-2">
                  <Link to="/mission-templates">
                    <Button variant="outline" className="border-blue-600 text-blue-400">
                      Mission Templates
                    </Button>
                  </Link>
                  <Link to="/custom-mission">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Create Mission
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {missions.map((mission) => (
                  <div key={mission.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(mission.status)}>
                          {mission.status}
                        </Badge>
                        <div>
                          <span className="font-semibold text-white">{mission.type}</span>
                          <div className="text-sm text-gray-400">{mission.id}</div>
                        </div>
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

      {/* Built with bolt.new Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <a href="https://bolt.new/~/aerial-operations-hub" target="_blank" rel="noopener noreferrer">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none px-3 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Bolt className="w-4 h-4 mr-2" />
            Built with bolt.new
          </Badge>
        </a>
      </div>
    </div>
  );
};

export default Operations;
