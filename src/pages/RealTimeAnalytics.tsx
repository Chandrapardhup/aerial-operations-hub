
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, Eye, Zap, Activity, AlertTriangle, CheckCircle, MapPin } from "lucide-react";

const RealTimeAnalytics = () => {
  const liveMetrics = [
    { label: "Active Drones", value: "24", change: "+3", status: "up" },
    { label: "Data Points/Min", value: "1,247", change: "+156", status: "up" },
    { label: "Response Time", value: "0.8s", change: "-0.2s", status: "down" },
    { label: "System Health", value: "99.9%", change: "+0.1%", status: "up" }
  ];

  const analyticsFeatures = [
    {
      icon: BarChart3,
      title: "Live Dashboards",
      description: "Real-time visualization of all operational metrics with customizable dashboards",
      capabilities: ["Interactive charts", "Custom widgets", "Data filtering", "Export options"]
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered predictions for maintenance, performance, and operational optimization",
      capabilities: ["Trend forecasting", "Anomaly detection", "Predictive maintenance", "Risk assessment"]
    },
    {
      icon: Eye,
      title: "Visual Intelligence",
      description: "Computer vision analytics for drone footage and environmental monitoring",
      capabilities: ["Object detection", "Pattern recognition", "Change detection", "Automated alerts"]
    },
    {
      icon: Activity,
      title: "Performance Monitoring",
      description: "Continuous monitoring of system performance and operational efficiency",
      capabilities: ["Real-time metrics", "Performance alerts", "Resource utilization", "SLA tracking"]
    }
  ];

  const telanganaRegions = [
    {
      name: "Hyderabad Metro",
      drones: 8,
      status: "Active",
      efficiency: 94,
      alerts: 1
    },
    {
      name: "Warangal District",
      drones: 6,
      status: "Active", 
      efficiency: 87,
      alerts: 0
    },
    {
      name: "Nizamabad Region",
      drones: 4,
      status: "Active",
      efficiency: 91,
      alerts: 2
    },
    {
      name: "Karimnagar Zone",
      drones: 6,
      status: "Active",
      efficiency: 89,
      alerts: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Real-Time Analytics &
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Live Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Monitor and analyze your drone operations across Telangana with advanced real-time analytics. 
              Get instant insights, predictive intelligence, and actionable data to optimize your operations.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>Live Data Stream</span>
              </div>
              <div className="flex items-center text-blue-400">
                <Activity className="w-4 h-4 mr-2" />
                <span>Real-Time Processing</span>
              </div>
            </div>
          </div>

          {/* Live Metrics */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Live System Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveMetrics.map((metric, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-400">{metric.label}</h3>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    <div className={`flex items-center text-sm ${
                      metric.status === 'up' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${metric.status === 'down' ? 'rotate-180' : ''}`} />
                      {metric.change} from last hour
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Telangana Operations Map */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Telangana Operations Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {telanganaRegions.map((region, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{region.name}</CardTitle>
                      <Badge className={`${
                        region.status === 'Active' 
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {region.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Active Drones</span>
                      <span className="text-white font-semibold">{region.drones}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Efficiency</span>
                        <span className="text-white">{region.efficiency}%</span>
                      </div>
                      <Progress value={region.efficiency} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Alerts</span>
                      <div className="flex items-center">
                        {region.alerts > 0 ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-400 mr-1" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                        )}
                        <span className="text-white">{region.alerts}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Analytics Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Analytics Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {analyticsFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{feature.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.capabilities.map((capability, idx) => (
                          <div key={idx} className="flex items-center text-sm text-blue-400">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            {capability}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Live Data Stream Visualization */}
          <Card className="mb-20 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-6 h-6 mr-2 text-green-400" />
                Live Data Stream - Telangana Operations
                <div className="ml-auto flex items-center text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm">Live</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Environmental Data</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Air Quality Index</span>
                      <span className="text-green-400">Good (42)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temperature</span>
                      <span className="text-white">28°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Humidity</span>
                      <span className="text-white">65%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Traffic Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Speed</span>
                      <span className="text-white">45 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Congestion</span>
                      <span className="text-yellow-400">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Incidents</span>
                      <span className="text-green-400">None</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime</span>
                      <span className="text-green-400">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Latency</span>
                      <span className="text-white">< 1s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing</span>
                      <span className="text-green-400">Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Experience Real-Time Intelligence</h2>
              <p className="text-xl text-blue-100 mb-8">
                Get instant insights and make data-driven decisions with our advanced analytics platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/automated-reports">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    View Automated Reports
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalytics;
