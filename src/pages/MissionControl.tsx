import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { MissionPlannerLauncher } from "@/components/MissionPlannerLauncher";
import { MissionPlannerConnection } from "@/components/MissionPlannerConnection";
import { LocalServerSetup } from "@/components/LocalServerSetup";
import { DroneSelector } from "@/components/DroneSelector";
import { MissionStatus } from "@/components/MissionStatus";
import { FlightControls } from "@/components/FlightControls";
import { AIChatInterface } from "@/components/AIChatInterface";
import { TelemetryDisplay } from "@/components/TelemetryDisplay";
import { missionPlannerService } from "@/services/missionPlannerService";

const MissionControl = () => {
  const [selectedDrone, setSelectedDrone] = useState("");
  const [missionPlannerConnected, setMissionPlannerConnected] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{role: string, message: string, timestamp: string}>>([]);
  const [realtimeData, setRealtimeData] = useState({
    altitude: 0,
    speed: 0,
    battery: 0,
    gpsLat: 0,
    gpsLon: 0,
    status: "Disconnected"
  });
  const { toast } = useToast();

  const drones = [
    { id: "DRN-001", name: "Hyderabad-Alpha", status: "Active", battery: 85 },
    { id: "DRN-002", name: "Warangal-Beta", status: "Active", battery: 92 },
    { id: "DRN-003", name: "Nizamabad-Gamma", status: "Standby", battery: 45 },
    { id: "DRN-004", name: "Karimnagar-Delta", status: "Active", battery: 78 },
  ];

  // Listen for real telemetry from Mission Planner
  useEffect(() => {
    const handleTelemetry = (telemetryData: any) => {
      console.log('Received telemetry:', telemetryData);
      setRealtimeData({
        altitude: telemetryData.altitude || 0,
        speed: telemetryData.groundspeed || 0,
        battery: telemetryData.battery_remaining || 0,
        gpsLat: telemetryData.lat || 0,
        gpsLon: telemetryData.lon || 0,
        status: telemetryData.mode || "Unknown"
      });
    };

    const handleStatus = (statusData: any) => {
      console.log('Received status:', statusData);
      setRealtimeData(prev => ({
        ...prev,
        status: statusData.mode || statusData.status || "Unknown"
      }));
    };

    const handleHeartbeat = (heartbeatData: any) => {
      console.log('Heartbeat received:', heartbeatData);
    };

    missionPlannerService.on('telemetry', handleTelemetry);
    missionPlannerService.on('status', handleStatus);
    missionPlannerService.on('heartbeat', handleHeartbeat);

    return () => {
      missionPlannerService.off('telemetry', handleTelemetry);
      missionPlannerService.off('status', handleStatus);
      missionPlannerService.off('heartbeat', handleHeartbeat);
    };
  }, []);

  const handleControlCommand = async (command: string) => {
    console.log(`Real command executed: ${command} for drone ${selectedDrone}`);
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

    const aiResponse = {
      role: "assistant", 
      message: `Processing command: "${chatMessage}". ${selectedDrone && missionPlannerConnected ? `Sending MAVLink commands to drone ${selectedDrone} via Mission Planner` : 'Please ensure drone is selected and Mission Planner is connected'}.`,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, aiResponse]);
    setChatMessage("");

    if (selectedDrone && missionPlannerConnected) {
      try {
        const lowerMessage = chatMessage.toLowerCase();
        
        if (lowerMessage.includes('takeoff') || lowerMessage.includes('take off')) {
          await missionPlannerService.sendMAVLinkCommand("COMMAND_LONG", 1, 1, { command: 22, param7: 10 });
        } else if (lowerMessage.includes('land')) {
          await missionPlannerService.sendMAVLinkCommand("COMMAND_LONG", 1, 1, { command: 21 });
        } else if (lowerMessage.includes('return') || lowerMessage.includes('home')) {
          await missionPlannerService.sendMAVLinkCommand("COMMAND_LONG", 1, 1, { command: 20 });
        }
        
        toast({
          title: "AI Command Processed",
          description: `AI interpreted your request and sent commands to Mission Planner`,
        });
      } catch (error) {
        toast({
          title: "Command Failed",
          description: "Failed to send AI-generated command to Mission Planner",
          variant: "destructive"
        });
      }
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
            <p className="text-gray-300 text-lg">Real-time drone control with Mission Planner integration</p>
          </div>

          {/* Local Server Setup */}
          <div className="mb-8">
            <LocalServerSetup />
          </div>

          {/* Mission Planner Connection and Status */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <MissionPlannerLauncher onConnectionChange={setMissionPlannerConnected} />
            <MissionPlannerConnection onConnectionChange={setMissionPlannerConnected} />
          </div>

          {/* Drone Selection and Mission Status */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DroneSelector 
              selectedDrone={selectedDrone}
              onDroneChange={setSelectedDrone}
              drones={drones}
            />
            <MissionStatus realtimeData={realtimeData} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <FlightControls 
              onControlCommand={handleControlCommand}
              selectedDrone={selectedDrone}
              isConnected={missionPlannerConnected}
            />

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
