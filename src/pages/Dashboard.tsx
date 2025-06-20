
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Battery, Signal, AlertTriangle, CheckCircle, Clock, Zap, Settings, Play } from "lucide-react";

const Dashboard = () => {
  const [activeDrones, setActiveDrones] = useState(12);
  const [alerts, setAlerts] = useState(3);

  const drones = [
    { id: "DRN-001", status: "Active", battery: 85, signal: "Strong", location: "Sector A", mission: "Waste Monitoring" },
    { id: "DRN-002", status: "Active", battery: 92, signal: "Strong", location: "Sector B", mission: "Environmental Scan" },
    { id: "DRN-003", status: "Charging", battery: 45, signal: "Weak", location: "Base Station", mission: "Standby" },
    { id: "DRN-004", status: "Active", battery: 78, signal: "Strong", location: "Sector C", mission: "Route Inspection" },
  ];

  const recentOperations = [
    { id: "OP-001", type: "Waste Collection", status: "Completed", time: "2 hours ago", efficiency: "98%" },
    { id: "OP-002", type: "Environmental Scan", status: "In Progress", time: "Started 30 min ago", efficiency: "92%" },
    { id: "OP-003", type: "Route Optimization", status: "Completed", time: "4 hours ago", efficiency: "95%" },
  ];

  const realIncidents = [
    {
      id: "INC-2024-001",
      type: "Landfill Fire",
      location: "Jawaharnagar, Hyderabad",
      status: "Resolved",
      description: "Emergency response to landfill fire using thermal imaging drones",
      timestamp: "Jan 15, 2024 - 14:30"
    },
    {
      id: "INC-2024-002", 
      type: "Flood Assessment",
      location: "Warangal Urban",
      status: "Monitoring",
      description: "Ongoing flood impact assessment and rescue coordination",
      timestamp: "Jan 18, 2024 - 09:15"
    },
    {
      id: "INC-2024-003",
      type: "Traffic Congestion",
      location: "HITEC City, Hyderabad",
      status: "Active",
      description: "Real-time traffic monitoring and signal optimization",
      timestamp: "Jan 20, 2024 - 08:45"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Operations Dashboard</h1>
            <p className="text-gray-300 text-lg">Real-time monitoring and control center</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Drones</CardTitle>
                <Zap className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{activeDrones}</div>
                <p className="text-xs text-green-400">+2 from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{alerts}</div>
                <p className="text-xs text-yellow-400">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Efficiency</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">94.5%</div>
                <p className="text-xs text-green-400">Above target</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Uptime</CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <p className="text-xs text-purple-400">System operational</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Drone Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  Active Drone Fleet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {drones.map((drone) => (
                  <div key={drone.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${
                          drone.status === 'Active' 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                        }`}>
                          {drone.status}
                        </Badge>
                        <span className="font-semibold text-white">{drone.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Battery className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">{drone.battery}%</span>
                      </div>
                    </div>
                    <Progress value={drone.battery} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{drone.location}</span>
                      <span>{drone.mission}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Operations */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Recent Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOperations.map((operation) => (
                  <div key={operation.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{operation.type}</span>
                      <Badge className={`${
                        operation.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {operation.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{operation.time}</span>
                      <span>Efficiency: {operation.efficiency}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Real Incidents Section */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Live Incident Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {realIncidents.map((incident) => (
                  <div key={incident.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${
                          incident.status === 'Resolved' 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : incident.status === 'Active'
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                        }`}>
                          {incident.status}
                        </Badge>
                        <span className="font-semibold text-white">{incident.type}</span>
                      </div>
                      <span className="text-xs text-gray-400">{incident.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-1">{incident.location}</div>
                    <div className="text-sm text-gray-400">{incident.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* YouTube Training Video */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Play className="w-5 h-5 mr-2 text-red-400" />
                  Drone Operations Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Drone Operations Training Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="text-gray-300 text-sm mt-3">
                  Learn the fundamentals of drone operations and safety protocols for government missions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  <Link to="/drone-control">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                      Deploy Drone
                    </Button>
                  </Link>
                  <Link to="/custom-mission">
                    <Button className="w-full bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-300">
                      Start Mission
                    </Button>
                  </Link>
                  <Link to="/reports">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300">
                      Generate Report
                    </Button>
                  </Link>
                  <Link to="/mission-control">
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300">
                      <Settings className="w-4 h-4 mr-2" />
                      Mission Control
                    </Button>
                  </Link>
                  <Link to="/emergency-response">
                    <Button className="w-full bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300">
                      Emergency Stop
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
