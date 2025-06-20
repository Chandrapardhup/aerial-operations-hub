
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Bell, CheckCircle, Clock, X } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  area: string;
  actionRequired: boolean;
}

const GovernmentAlerts = () => {
  const alerts: Alert[] = [
    {
      id: "ALT-001",
      title: "Overflowing Waste Bin Detected",
      description: "Multiple waste containers in Jubilee Hills require immediate attention",
      severity: "high",
      timestamp: "2 minutes ago",
      status: "active",
      area: "Jubilee Hills",
      actionRequired: true
    },
    {
      id: "ALT-002",
      title: "Air Quality Degradation",
      description: "PM2.5 levels approaching threshold in Gachibowli area",
      severity: "medium",
      timestamp: "15 minutes ago", 
      status: "acknowledged",
      area: "Gachibowli",
      actionRequired: false
    },
    {
      id: "ALT-003",
      title: "Illegal Dumping Activity",
      description: "Unauthorized waste disposal detected near Hussain Sagar",
      severity: "critical",
      timestamp: "1 hour ago",
      status: "resolved",
      area: "Hussain Sagar",
      actionRequired: false
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'acknowledged': return Clock;
      default: return AlertCircle;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-red-400" />
          Government Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const StatusIcon = getStatusIcon(alert.status);
          return (
            <div key={alert.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <StatusIcon className="w-5 h-5 mt-0.5 text-blue-400" />
                  <div>
                    <h4 className="text-white font-medium mb-1">{alert.title}</h4>
                    <p className="text-gray-300 text-sm mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{alert.area}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  {alert.actionRequired && (
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      Action Required
                    </Badge>
                  )}
                </div>
              </div>
              
              {alert.status === 'active' && (
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Acknowledge
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                    <X className="w-4 h-4 mr-1" />
                    Dismiss
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default GovernmentAlerts;
