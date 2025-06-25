
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Filter, Eye, CheckCircle, X, Bolt } from "lucide-react";
import { Link } from "react-router-dom";

const AlertsManagement = () => {
  const alerts = [
    {
      id: "ALT-001",
      title: "Overflowing Waste Bin Detected",
      location: "Jubilee Hills",
      severity: "high",
      status: "active",
      time: "2 min ago"
    },
    {
      id: "ALT-002", 
      title: "Air Quality Degradation",
      location: "Gachibowli",
      severity: "medium",
      status: "acknowledged",
      time: "15 min ago"
    },
    {
      id: "ALT-003",
      title: "Illegal Dumping Activity",
      location: "Hussain Sagar",
      severity: "critical",
      status: "resolved",
      time: "1 hour ago"
    },
    {
      id: "ALT-004",
      title: "Route Blockage Detected",
      location: "Banjara Hills",
      severity: "medium",
      status: "active",
      time: "30 min ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Alerts Management</h1>
            <p className="text-gray-300 text-lg">Monitor and manage all system alerts and notifications</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search alerts..."
                className="pl-10 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2 text-red-400" />
                All Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-white font-medium">{alert.title}</h3>
                          <p className="text-gray-400 text-sm">{alert.location} • {alert.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <div className="flex space-x-2">
                          <Link to="/alert-details">
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Built with bolt.new Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <a href="https://bolt.new/~/aerial-operations-hub" target="_blank" rel="noopener noreferrer">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none px-3 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Bolt className="w-4 h-4 mr-2" />
            Built with bolt.new
          </Badge>
        </a>
      </div>
    </div>
  );
};

export default AlertsManagement;
