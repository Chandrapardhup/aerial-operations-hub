
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Server, Settings, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { localServerService } from "@/services/localServerService";

export const LocalServerSetup = () => {
  const [serverHost, setServerHost] = useState("localhost");
  const [serverPort, setServerPort] = useState("3001");
  const [apiKey, setApiKey] = useState("");
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    setIsChecking(true);
    try {
      const status = await localServerService.checkServerStatus();
      setIsServerRunning(status);
    } catch (error) {
      setIsServerRunning(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleUpdateConfig = () => {
    localServerService.updateConfig({
      host: serverHost,
      port: parseInt(serverPort),
      apiKey: apiKey || undefined
    });
    
    toast({
      title: "Configuration Updated",
      description: "Local server configuration has been updated. Please check connection.",
    });
    
    checkServerStatus();
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Server className="w-5 h-5 mr-2" />
          Local Server Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Server Status:</span>
          <Badge className={isServerRunning ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
            {isChecking ? 'Checking...' : (isServerRunning ? 'Connected' : 'Disconnected')}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="host" className="text-gray-300">Host</Label>
            <Input
              id="host"
              value={serverHost}
              onChange={(e) => setServerHost(e.target.value)}
              placeholder="localhost"
              className="bg-slate-700/50 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="port" className="text-gray-300">Port</Label>
            <Input
              id="port"
              value={serverPort}
              onChange={(e) => setServerPort(e.target.value)}
              placeholder="3001"
              className="bg-slate-700/50 border-slate-600 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="apiKey" className="text-gray-300">API Key (Optional)</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API key for secure access"
            className="bg-slate-700/50 border-slate-600 text-white"
          />
        </div>

        <div className="flex space-x-2">
          <Button 
            onClick={handleUpdateConfig}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Settings className="w-4 h-4 mr-2" />
            Update Config
          </Button>
          <Button 
            onClick={checkServerStatus}
            variant="outline"
            className="border-slate-600 text-gray-300 hover:bg-slate-700"
            disabled={isChecking}
          >
            {isChecking ? 'Checking...' : 'Test Connection'}
          </Button>
        </div>

        {!isServerRunning && (
          <div className="flex items-start space-x-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-300">
              <p className="font-medium">Local Server Required:</p>
              <p className="mt-1 text-xs">
                Install and run the Mission Planner Bridge service on your local machine. 
                Check the setup documentation for installation instructions.
              </p>
            </div>
          </div>
        )}

        {isServerRunning && (
          <div className="flex items-start space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-300">
              <p className="font-medium">Server Connected</p>
              <p className="mt-1 text-xs">
                Local server is running and ready to launch Mission Planner.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
