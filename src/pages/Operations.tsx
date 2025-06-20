
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DroneCreationForm } from "@/components/DroneCreationForm";
import { MapPin, Play, Pause, Square, Settings, AlertCircle, CheckCircle, Plus, Drone } from "lucide-react";

const Operations = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [showDroneCreationForm, setShowDroneCreationForm] = useState(false);

  const activeMissions = [
    {
      id: "MSN-001",
      name: "Waste Collection Route A",
      status: "In Progress",
      progress: 65,
      drones: 3,
      startTime: "08:30 AM",
      estimatedCompletion: "11:45 AM",
      priority: "High"
    },
    {
      id: "MSN-002", 
      name: "Environmental Monitoring",
      status: "Active",
      progress: 25,
      drones: 2,
      startTime: "09:15 AM",
      estimatedCompletion: "02:30 PM",
      priority: "Medium"
    },
    {
      id: "MSN-003",
      name: "Perimeter Security Scan",
      status: "Completed",
      progress: 100,
      drones: 1,
      startTime: "06:00 AM",
      estimatedCompletion: "08:00 AM",
      priority: "High"
    }
  ];

  const [droneFleet, setDroneFleet] = useState([
    { id: "DRN-001", status: "Active", mission: "MSN-001", battery: 78, location: "Grid A-4" },
    { id: "DRN-002", status: "Active", mission: "MSN-001", battery: 82, location: "Grid A-5" },
    { id: "DRN-003", status: "Active", mission: "MSN-001", battery: 65, location: "Grid A-3" },
    { id: "DRN-004", status: "Active", mission: "MSN-002", battery: 91, location: "Grid B-2" },
    { id: "DRN-005", status: "Active", mission: "MSN-002", battery: 88, location: "Grid B-7" },
    { id: "DRN-006", status: "Standby", mission: null, battery: 95, location: "Base Station" },
  ]);

  const handleDroneCreated = (newDrone: any) => {
    setDroneFleet(prev => [...prev, newDrone]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Operations Control</h1>
            <p className="text-gray-300 text-lg">Mission planning and real-time drone management</p>
          </div>

          <Tabs defaultValue="missions" className="space-y-6">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="missions" className="data-[state=active]:bg-blue-600">Active Missions</TabsTrigger>
              <TabsTrigger value="fleet" className="data-[state=active]:bg-blue-600">Drone Fleet</TabsTrigger>
              <TabsTrigger value="planning" className="data-[state=active]:bg-blue-600">Mission Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="missions" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {activeMissions.map((mission) => (
                    <Card key={mission.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                            {mission.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${
                              mission.status === 'Completed' 
                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                : mission.status === 'In Progress'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                            }`}>
                              {mission.status}
                            </Badge>
                            <Badge className={`${
                              mission.priority === 'High' 
                                ? 'bg-red-500/20 text-red-300 border-red-500/30'
                                : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                            }`}>
                              {mission.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Progress</span>
                            <span className="text-white">{mission.progress}%</span>
                          </div>
                          <Progress value={mission.progress} className="h-2" />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Drones Assigned:</span>
                            <div className="text-white font-semibold">{mission.drones}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Start Time:</span>
                            <div className="text-white font-semibold">{mission.startTime}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Est. Completion:</span>
                            <div className="text-white font-semibold">{mission.estimatedCompletion}</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          {mission.status !== 'Completed' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Play className="w-4 h-4 mr-1" />
                                Resume
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-600">
                                <Pause className="w-4 h-4 mr-1" />
                                Pause
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                                <Square className="w-4 h-4 mr-1" />
                                Stop
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Settings className="w-4 h-4 mr-1" />
                            Settings
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Mission Control</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Create New Mission
                      </Button>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Mission Templates
                      </Button>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Emergency Response
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fleet" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Drone Fleet Management</h2>
                <Button 
                  onClick={() => setShowDroneCreationForm(true)}
                  className="bg-green-600 hover:bg-green-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Drone
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {droneFleet.map((drone) => (
                  <Card key={drone.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <Drone className="w-5 h-5 mr-2 text-blue-400" />
                          {drone.id}
                        </CardTitle>
                        <Badge className={`${
                          drone.status === 'Active' 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                        }`}>
                          {drone.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Battery</span>
                          <span className="text-white">{drone.battery}%</span>
                        </div>
                        <Progress value={drone.battery} className="h-2" />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location:</span>
                          <span className="text-white">{drone.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Mission:</span>
                          <span className="text-white">{drone.mission || 'None'}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                          Control
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="planning" className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Mission Planning Interface</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Quick Mission Templates</h3>
                      <div className="space-y-2">
                        <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-left">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Waste Collection Route
                        </Button>
                        <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-left">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Emergency Response
                        </Button>
                        <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-left">
                          <MapPin className="w-4 h-4 mr-2" />
                          Perimeter Patrol
                        </Button>
                        <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-left">
                          <Settings className="w-4 h-4 mr-2" />
                          Environmental Scan
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Mission Parameters</h3>
                      <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg">
                        <p className="text-gray-300">Select a mission template to configure parameters and assign drone resources.</p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Create Custom Mission
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {showDroneCreationForm && (
        <DroneCreationForm
          onClose={() => setShowDroneCreationForm(false)}
          onDroneCreated={handleDroneCreated}
        />
      )}
    </div>
  );
};

export default Operations;
