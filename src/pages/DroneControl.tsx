
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Square, Pause, RotateCcw, Zap, MapPin, Battery } from "lucide-react";

const DroneControl = () => {
  const [selectedDrone, setSelectedDrone] = useState("DRN-001");
  const [isFlying, setIsFlying] = useState(false);
  
  const droneData = {
    id: "DRN-001",
    status: "Active",
    battery: 78,
    altitude: 45,
    speed: 12,
    location: { lat: 17.3850, lng: 78.4867 },
    mission: "Waste Collection Route A"
  };

  const handleMovement = (direction: string) => {
    console.log(`Moving drone ${direction}`);
  };

  const handleTakeoff = () => {
    setIsFlying(true);
    console.log("Drone taking off");
  };

  const handleLand = () => {
    setIsFlying(false);
    console.log("Drone landing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Drone Control Center</h1>
            <p className="text-gray-300 text-lg">Real-time manual drone control interface</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Drone Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-400" />
                  {droneData.id} Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status:</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {droneData.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Battery</span>
                    <span className="text-white">{droneData.battery}%</span>
                  </div>
                  <Progress value={droneData.battery} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Altitude:</span>
                    <span className="text-white">{droneData.altitude}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Speed:</span>
                    <span className="text-white">{droneData.speed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mission:</span>
                    <span className="text-white text-sm">{droneData.mission}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Movement Controls */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Movement Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Directional Pad */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Direction</h3>
                  <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
                    <div></div>
                    <Button 
                      onClick={() => handleMovement("forward")}
                      className="bg-blue-600 hover:bg-blue-700 animate-pulse"
                      disabled={!isFlying}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <div></div>
                    
                    <Button 
                      onClick={() => handleMovement("left")}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!isFlying}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => handleMovement("stop")}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!isFlying}
                    >
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => handleMovement("right")}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!isFlying}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    
                    <div></div>
                    <Button 
                      onClick={() => handleMovement("backward")}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!isFlying}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <div></div>
                  </div>
                </div>

                {/* Altitude Controls */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Altitude</h3>
                  <div className="flex space-x-4">
                    <Button 
                      onClick={() => handleMovement("up")}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={!isFlying}
                    >
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Ascend
                    </Button>
                    <Button 
                      onClick={() => handleMovement("down")}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      disabled={!isFlying}
                    >
                      <ArrowDown className="w-4 h-4 mr-2" />
                      Descend
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flight Controls */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Flight Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleTakeoff}
                    className="bg-green-600 hover:bg-green-700 animate-scale-in"
                    disabled={isFlying}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Takeoff
                  </Button>
                  <Button 
                    onClick={handleLand}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={!isFlying}
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Land
                  </Button>
                  <Button 
                    onClick={() => console.log("Return to home")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Return Home
                  </Button>
                  <Button 
                    onClick={() => console.log("Emergency stop")}
                    className="bg-red-800 hover:bg-red-900"
                  >
                    Emergency Stop
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-slate-600">
                  <h4 className="text-white font-semibold mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-600 text-gray-300 hover:bg-slate-600"
                      onClick={() => console.log("Hold position")}
                    >
                      Hold Position
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-600 text-gray-300 hover:bg-slate-600"
                      onClick={() => console.log("Auto hover")}
                    >
                      Auto Hover
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Data */}
          <div className="mt-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-400" />
                  Real-time Telemetry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{droneData.location.lat.toFixed(4)}</div>
                    <div className="text-sm text-gray-300">Latitude</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{droneData.location.lng.toFixed(4)}</div>
                    <div className="text-sm text-gray-300">Longitude</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{droneData.altitude}m</div>
                    <div className="text-sm text-gray-300">Altitude</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{droneData.speed} km/h</div>
                    <div className="text-sm text-gray-300">Ground Speed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneControl;
