
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Battery, Signal, AlertTriangle, CheckCircle, Clock, Zap, Play, Square, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MessageSquare, Send, ExternalLink, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MissionControl = () => {
  const [selectedDrone, setSelectedDrone] = useState("");
  const [missionPlannerConnected, setMissionPlannerConnected] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{role: string, message: string, timestamp: string}>>([]);
  const [realtimeData, setRealtimeData] = useState({
    altitude: 120,
    speed: 15,
    battery: 85,
    gpsLat: 17.3850,
    gpsLon: 78.4867,
    status: "Flying"
  });
  const { toast } = useToast();

  const drones = [
    { id: "DRN-001", name: "Hyderabad-Alpha", status: "Active", battery: 85 },
    { id: "DRN-002", name: "Warangal-Beta", status: "Active", battery: 92 },
    { id: "DRN-003", name: "Nizamabad-Gamma", status: "Standby", battery: 45 },
    { id: "DRN-004", name: "Karimnagar-Delta", status: "Active", battery: 78 },
  ];

  // Simulate real-time updates from Mission Planner
  useEffect(() => {
    const interval = setInterval(() => {
      if (missionPlannerConnected && selectedDrone) {
        setRealtimeData(prev => ({
          ...prev,
          altitude: prev.altitude + (Math.random() - 0.5) * 10,
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 5),
          battery: Math.max(0, prev.battery - 0.1),
          gpsLat: prev.gpsLat + (Math.random() - 0.5) * 0.001,
          gpsLon: prev.gpsLon + (Math.random() - 0.5) * 0.001,
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [missionPlannerConnected, selectedDrone]);

  const handleOpenMissionPlanner = () => {
    // This would trigger the desktop application to open Mission Planner
    toast({
      title: "Opening Mission Planner",
      description: "Launching Mission Planner on your PC...",
    });
    
    // Simulate connection after 3 seconds
    setTimeout(() => {
      setMissionPlannerConnected(true);
      toast({
        title: "Mission Planner Connected",
        description: "Successfully connected to Mission Planner",
      });
    }, 3000);
  };

  const handleControlCommand = async (command: string) => {
    if (!selectedDrone || !missionPlannerConnected) {
      toast({
        title: "Error",
        description: "Please select a drone and connect to Mission Planner first",
        variant: "destructive"
      });
      return;
    }

    // Send command to Mission Planner
    toast({
      title: `Command Sent: ${command}`,
      description: `Sending ${command} command to ${selectedDrone} via Mission Planner`,
    });

    // Simulate command execution
    console.log(`Sending command to Mission Planner: ${command} for drone ${selectedDrone}`);
  };

  const handleAIChat = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      role: "user",
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI processing and command generation
    const aiResponse = {
      role: "assistant", 
      message: `Processing command: "${chatMessage}". Sending instructions to Mission Planner for drone ${selectedDrone || "N/A"}.`,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, aiResponse]);
    setChatMessage("");

    // Send command to Mission Planner based on AI interpretation
    if (selectedDrone && missionPlannerConnected) {
      toast({
        title: "AI Command Processed",
        description: `AI interpreted your request and sent commands to Mission Planner`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Mission Control Center</h1>
            <p className="text-gray-300 text-lg">Real-time drone control and mission planning interface</p>
          </div>

          {/* Connection Status and Drone Selection */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Mission Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status:</span>
                  <Badge className={missionPlannerConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                    {missionPlannerConnected ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
                <Button 
                  onClick={handleOpenMissionPlanner}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={missionPlannerConnected}
                >
                  {missionPlannerConnected ? 'Mission Planner Active' : 'Open Mission Planner'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Select Drone</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedDrone} onValueChange={setSelectedDrone}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Choose drone..." />
                  </SelectTrigger>
                  <SelectContent>
                    {drones.map((drone) => (
                      <SelectItem key={drone.id} value={drone.id}>
                        {drone.name} ({drone.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Mission Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Altitude:</span>
                    <span className="text-white">{realtimeData.altitude.toFixed(1)}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Speed:</span>
                    <span className="text-white">{realtimeData.speed.toFixed(1)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Battery:</span>
                    <span className="text-white">{realtimeData.battery.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Flight Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Movement Controls */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Movement</h3>
                  <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
                    <div></div>
                    <Button 
                      onClick={() => handleControlCommand("MOVE_FORWARD")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <div></div>
                    <Button 
                      onClick={() => handleControlCommand("TURN_LEFT")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => handleControlCommand("HOVER")}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => handleControlCommand("TURN_RIGHT")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <div></div>
                    <Button 
                      onClick={() => handleControlCommand("MOVE_BACKWARD")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <div></div>
                  </div>
                </div>

                {/* Mission Controls */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Mission Controls</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => handleControlCommand("TAKEOFF")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Takeoff
                    </Button>
                    <Button 
                      onClick={() => handleControlCommand("LAND")}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Land
                    </Button>
                    <Button 
                      onClick={() => handleControlCommand("RETURN_TO_HOME")}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Return Home
                    </Button>
                    <Button 
                      onClick={() => handleControlCommand("EMERGENCY_STOP")}
                      className="bg-red-800 hover:bg-red-900"
                    >
                      Emergency Stop
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  AI Mission Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 bg-slate-700/30 rounded-lg p-4 overflow-y-auto space-y-2">
                  {chatHistory.length === 0 ? (
                    <p className="text-gray-400 text-center">Start a conversation with the AI assistant to control your drone...</p>
                  ) : (
                    chatHistory.map((msg, index) => (
                      <div key={index} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-600/20 ml-4' : 'bg-green-600/20 mr-4'}`}>
                        <div className="flex justify-between">
                          <span className="font-semibold text-white">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                          <span className="text-xs text-gray-400">{msg.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex space-x-2">
                  <Textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Tell the AI what you want the drone to do... (e.g., 'Take off and patrol the area')"
                    className="bg-slate-700 border-slate-600 resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleAIChat}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!chatMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Data Display */}
          <Card className="mt-8 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Real-time Telemetry from Mission Planner
                {missionPlannerConnected && (
                  <div className="ml-auto flex items-center text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm">Live</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Position</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Latitude:</span>
                      <span className="text-white">{realtimeData.gpsLat.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Longitude:</span>
                      <span className="text-white">{realtimeData.gpsLon.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Altitude:</span>
                      <span className="text-white">{realtimeData.altitude.toFixed(1)}m</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Flight Data</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ground Speed:</span>
                      <span className="text-white">{realtimeData.speed.toFixed(1)} m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">{realtimeData.status}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Power</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Battery:</span>
                      <span className="text-white">{realtimeData.battery.toFixed(1)}%</span>
                    </div>
                    <Progress value={realtimeData.battery} className="h-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Connection</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mission Planner:</span>
                      <span className={missionPlannerConnected ? "text-green-400" : "text-red-400"}>
                        {missionPlannerConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Signal:</span>
                      <span className="text-green-400">Strong</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;
