
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Maximize, Volume2, Settings } from "lucide-react";

const WasteManagementVideo = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden mb-12">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center">
            <Play className="w-5 h-5 mr-2 text-green-400" />
            Telangana Drone Waste Management System
          </span>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Live Demo
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video bg-slate-900 rounded-lg mb-4 flex items-center justify-center border border-slate-600">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Advanced Drone Technology for Waste Management
            </h3>
            <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
              Experience how Telangana's innovative drone technology is revolutionizing waste management 
              and environmental monitoring across the state, making cities cleaner and smarter through 
              real-time monitoring, automated collection routing, and comprehensive data analytics.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Watch Live Demo
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Button size="sm" variant="outline" className="border-gray-600">
              <Volume2 className="w-4 h-4 mr-1" />
              Audio
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600">
              <Settings className="w-4 h-4 mr-1" />
              Quality
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Duration: 8:45</span>
            <Button size="sm" variant="outline" className="border-gray-600">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 p-3 rounded-lg">
            <h4 className="text-white font-medium mb-1">Real-time Tracking</h4>
            <p className="text-gray-400 text-sm">Monitor waste collection vehicles and drone fleets in real-time</p>
          </div>
          <div className="bg-slate-700/30 p-3 rounded-lg">
            <h4 className="text-white font-medium mb-1">Route Optimization</h4>
            <p className="text-gray-400 text-sm">AI-powered route planning for maximum efficiency</p>
          </div>
          <div className="bg-slate-700/30 p-3 rounded-lg">
            <h4 className="text-white font-medium mb-1">Environmental Impact</h4>
            <p className="text-gray-400 text-sm">Comprehensive environmental monitoring and reporting</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteManagementVideo;
