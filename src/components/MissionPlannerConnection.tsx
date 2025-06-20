
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { missionPlannerService } from "@/services/missionPlannerService";

interface MissionPlannerConnectionProps {
  onConnectionChange: (connected: boolean) => void;
}

export const MissionPlannerConnection = ({ onConnectionChange }: MissionPlannerConnectionProps) => {
  const [connectionType, setConnectionType] = useState<'TCP' | 'UDP' | 'Serial'>('TCP');
  const [host, setHost] = useState('127.0.0.1');
  const [port, setPort] = useState('8080');
  const [comPort, setComPort] = useState('COM3');
  const [baudRate, setBaudRate] = useState('57600');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      const config = {
        type: connectionType,
        host: connectionType !== 'Serial' ? host : undefined,
        port: connectionType !== 'Serial' ? parseInt(port) : undefined,
        comPort: connectionType === 'Serial' ? comPort : undefined,
        baudRate: connectionType === 'Serial' ? parseInt(baudRate) : undefined
      };

      await missionPlannerService.connect(config);
      setIsConnected(true);
      onConnectionChange(true);
      
      toast({
        title: "Connected to Mission Planner",
        description: `Successfully connected via ${connectionType}`,
      });
    } catch (error) {
      console.error('Connection failed:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Mission Planner. Make sure it's running and WebSocket is enabled.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    missionPlannerService.disconnect();
    setIsConnected(false);
    onConnectionChange(false);
    
    toast({
      title: "Disconnected",
      description: "Disconnected from Mission Planner",
    });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Mission Planner Connection
          <Badge className={`ml-auto ${isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {isConnected ? (
              <>
                <Wifi className="w-3 h-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                Disconnected
              </>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="connectionType" className="text-gray-300">Connection Type</Label>
            <Select value={connectionType} onValueChange={(value: 'TCP' | 'UDP' | 'Serial') => setConnectionType(value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="TCP" className="text-white hover:bg-slate-600">TCP</SelectItem>
                <SelectItem value="UDP" className="text-white hover:bg-slate-600">UDP</SelectItem>
                <SelectItem value="Serial" className="text-white hover:bg-slate-600">Serial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {connectionType !== 'Serial' ? (
            <>
              <div>
                <Label htmlFor="host" className="text-gray-300">Host</Label>
                <Input
                  id="host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="127.0.0.1"
                />
              </div>
              <div>
                <Label htmlFor="port" className="text-gray-300">Port</Label>
                <Input
                  id="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="8080"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="comPort" className="text-gray-300">COM Port</Label>
                <Input
                  id="comPort"
                  value={comPort}
                  onChange={(e) => setComPort(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="COM3"
                />
              </div>
              <div>
                <Label htmlFor="baudRate" className="text-gray-300">Baud Rate</Label>
                <Select value={baudRate} onValueChange={setBaudRate}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="9600" className="text-white hover:bg-slate-600">9600</SelectItem>
                    <SelectItem value="57600" className="text-white hover:bg-slate-600">57600</SelectItem>
                    <SelectItem value="115200" className="text-white hover:bg-slate-600">115200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <div className="pt-4">
          {!isConnected ? (
            <Button 
              onClick={handleConnect}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect to Mission Planner'}
            </Button>
          ) : (
            <Button 
              onClick={handleDisconnect}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Disconnect
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-400">
          <p><strong>Setup Instructions:</strong></p>
          <p>1. Open Mission Planner on your computer</p>
          <p>2. Go to Config/Tuning → Planner → Enable "WebSocket Server"</p>
          <p>3. Set WebSocket port to 8080 (default)</p>
          <p>4. Connect your drone to Mission Planner first</p>
        </div>
      </CardContent>
    </Card>
  );
};
