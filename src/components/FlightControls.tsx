
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Square } from "lucide-react";

interface FlightControlsProps {
  onControlCommand: (command: string) => void;
}

export const FlightControls = ({ onControlCommand }: FlightControlsProps) => {
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
              onClick={() => onControlCommand("MOVE_FORWARD")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <div></div>
            <Button 
              onClick={() => onControlCommand("TURN_LEFT")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => onControlCommand("HOVER")}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => onControlCommand("TURN_RIGHT")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div></div>
            <Button 
              onClick={() => onControlCommand("MOVE_BACKWARD")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
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
              onClick={() => onControlCommand("TAKEOFF")}
              className="bg-green-600 hover:bg-green-700 text-black font-medium"
            >
              <Play className="w-4 h-4 mr-2" />
              Takeoff
            </Button>
            <Button 
              onClick={() => onControlCommand("LAND")}
              className="bg-red-600 hover:bg-red-700 text-black font-medium"
            >
              <Square className="w-4 h-4 mr-2" />
              Land
            </Button>
            <Button 
              onClick={() => onControlCommand("RETURN_TO_HOME")}
              className="bg-orange-600 hover:bg-orange-700 text-black font-medium"
            >
              Return Home
            </Button>
            <Button 
              onClick={() => onControlCommand("EMERGENCY_STOP")}
              className="bg-red-800 hover:bg-red-900 text-white font-medium"
            >
              Emergency Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
