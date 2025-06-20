
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { MissionPlannerLauncher } from "@/components/MissionPlannerLauncher";
import { DroneSelector } from "@/components/DroneSelector";
import { MissionStatus } from "@/components/MissionStatus";
import { FlightControls } from "@/components/FlightControls";
import { AIChatInterface } from "@/components/AIChatInterface";
import { TelemetryDisplay } from "@/components/TelemetryDisplay";

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

  const handleControlCommand = async (command: string) => {
    if (!selectedDrone) {
      toast({
        title: "No Drone Selected",
        description: "Please select a drone first",
        variant: "destructive"
      });
      return;
    }

    if (!missionPlannerConnected) {
      toast({
        title: "Mission Planner Not Connected",
        description: "Please connect to Mission Planner first",
        variant: "destructive"
      });
      return;
    }

    // Send command to Mission Planner
    toast({
      title: `Command Executed: ${command}`,
      description: `Sending ${command} command to ${selectedDrone}`,
    });

    console.log(`Executing command: ${command} for drone ${selectedDrone}`);
  };

  const handleAIChat = async () => {
    if (!chatMessage.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    const userMessage = {
      role: "user",
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI processing and command generation
    const aiResponse = {
      role: "assistant", 
      message: `Processing command: "${chatMessage}". ${selectedDrone ? `Sending instructions to drone ${selectedDrone}` : 'Please select a drone first'}.`,
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

          {/* Mission Planner Launcher and Drone Selection */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <MissionPlannerLauncher />
            <DroneSelector 
              selectedDrone={selectedDrone}
              onDroneChange={setSelectedDrone}
              drones={drones}
            />
            <MissionStatus realtimeData={realtimeData} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <FlightControls onControlCommand={handleControlCommand} />

            {/* AI Chat Interface */}
            <AIChatInterface 
              chatMessage={chatMessage}
              onChatMessageChange={setChatMessage}
              chatHistory={chatHistory}
              onSendMessage={handleAIChat}
            />
          </div>

          {/* Real-time Data Display */}
          <div className="mt-8">
            <TelemetryDisplay 
              realtimeData={realtimeData}
              missionPlannerConnected={missionPlannerConnected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;
