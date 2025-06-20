
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Square } from "lucide-react";
import { missionPlannerService } from "@/services/missionPlannerService";
import { useToast } from "@/hooks/use-toast";

interface FlightControlsProps {
  onControlCommand: (command: string) => void;
  selectedDrone: string;
  isConnected: boolean;
}

export const FlightControls = ({ onControlCommand, selectedDrone, isConnected }: FlightControlsProps) => {
  const { toast } = useToast();

  const sendMAVLinkCommand = async (command: string, params?: any) => {
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Please connect to Mission Planner first",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDrone) {
      toast({
        title: "No Drone Selected",
        description: "Please select a drone first",
        variant: "destructive"
      });
      return;
    }

    try {
      switch (command) {
        case "TAKEOFF":
          await missionPlannerService.sendMAVLinkCommand("COMMAND_LONG", 1, 1, {
            command: 22, // MAV_CMD_NAV_TAKEOFF
            param7: 10 // Takeoff altitude (10 meters)
          });
          break;
        
        case "LAND":
          await missionPlannerService.sendMAVLinkCommand("COMMAND_LONG", 1, 1, {
            command: 21 // MAV_CMD_NAV_LAND
          });
          break;
        
        case "RETURN_TO_HOME":
          await missionPlannerService.sendMAVLinkCommand("COMMAND_LONG", 1, 1, {
            command: 20 // MAV_CMD_NAV_RETURN_TO_LAUNCH
          });
          break;
        
        case "EMERGENCY_STOP":
          await missionPlannerService.sendMAVLinkCommand("COMMAND_LONG", 1, 1, {
            command: 400, // MAV_CMD_COMPONENT_ARM_DISARM
            param1: 0 // Disarm
          });
          break;
        
        case "MOVE_FORWARD":
          await missionPlannerService.sendCommand("set_velocity", {
            vx: 5, // 5 m/s forward
            vy: 0,
            vz: 0
          });
          break;
        
        case "MOVE_BACKWARD":
          await missionPlannerService.sendCommand("set_velocity", {
            vx: -5, // 5 m/s backward
            vy: 0,
            vz: 0
          });
          break;
        
        case "TURN_LEFT":
          await missionPlannerService.sendCommand("set_velocity", {
            vx: 0,
            vy: 5, // 5 m/s left
            vz: 0
          });
          break;
        
        case "TURN_RIGHT":
          await missionPlannerService.sendCommand("set_velocity", {
            vx: 0,
            vy: -5, // 5 m/s right
            vz: 0
          });
          break;
        
        case "HOVER":
          await missionPlannerService.sendCommand("set_velocity", {
            vx: 0,
            vy: 0,
            vz: 0
          });
          break;
      }

      onControlCommand(command);
      
      toast({
        title: "Command Sent",
        description: `${command} command sent to ${selectedDrone}`,
      });
    } catch (error) {
      console.error('Failed to send command:', error);
      toast({
        title: "Command Failed",
        description: `Failed to send ${command} command`,
        variant: "destructive"
      });
    }
  };

  return (
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
              onClick={() => sendMAVLinkCommand("MOVE_FORWARD")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={!isConnected}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <div></div>
            <Button 
              onClick={() => sendMAVLinkCommand("TURN_LEFT")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={!isConnected}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => sendMAVLinkCommand("HOVER")}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
              disabled={!isConnected}
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => sendMAVLinkCommand("TURN_RIGHT")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={!isConnected}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div></div>
            <Button 
              onClick={() => sendMAVLinkCommand("MOVE_BACKWARD")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={!isConnected}
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
              onClick={() => sendMAVLinkCommand("TAKEOFF")}
              className="bg-green-600 hover:bg-green-700 text-black font-medium"
              disabled={!isConnected}
            >
              <Play className="w-4 h-4 mr-2" />
              Takeoff
            </Button>
            <Button 
              onClick={() => sendMAVLinkCommand("LAND")}
              className="bg-red-600 hover:bg-red-700 text-black font-medium"
              disabled={!isConnected}
            >
              <Square className="w-4 h-4 mr-2" />
              Land
            </Button>
            <Button 
              onClick={() => sendMAVLinkCommand("RETURN_TO_HOME")}
              className="bg-orange-600 hover:bg-orange-700 text-black font-medium"
              disabled={!isConnected}
            >
              Return Home
            </Button>
            <Button 
              onClick={() => sendMAVLinkCommand("EMERGENCY_STOP")}
              className="bg-red-800 hover:bg-red-900 text-white font-medium"
              disabled={!isConnected}
            >
              Emergency Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
