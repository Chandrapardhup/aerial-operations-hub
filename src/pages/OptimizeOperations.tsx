
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Route, TrendingUp, Clock, MapPin, Zap, CheckCircle, ArrowRight, BarChart3 } from "lucide-react";

const OptimizeOperations = () => {
  const optimizationMetrics = [
    { label: "Route Efficiency", value: 94, improvement: "+18%" },
    { label: "Fuel Savings", value: 87, improvement: "+25%" },
    { label: "Time Reduction", value: 76, improvement: "+32%" },
    { label: "Cost Optimization", value: 89, improvement: "+28%" }
  ];

  const optimizationFeatures = [
    {
      icon: Route,
      title: "Smart Route Planning",
      description: "AI-powered algorithms optimize routes based on traffic, weather, and operational constraints",
      benefits: ["Real-time route adjustments", "Traffic pattern analysis", "Weather-based optimization"]
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track and analyze operational performance with detailed metrics and insights",
      benefits: ["KPI dashboards", "Performance trends", "Comparative analysis"]
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Optimize scheduling and resource allocation for maximum efficiency",
      benefits: ["Automated scheduling", "Resource optimization", "Deadline tracking"]
    },
    {
      icon: Zap,
      title: "Real-time Optimization",
      description: "Dynamic adjustments based on live data and changing conditions",
      benefits: ["Live data integration", "Adaptive algorithms", "Instant notifications"]
    }
  ];

  const useCases = [
    {
      title: "Waste Collection Optimization",
      description: "Reduce collection time by 35% with optimized routes",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      results: ["35% time reduction", "25% fuel savings", "40% cost reduction"]
    },
    {
      title: "Emergency Response",
      description: "Optimize emergency service deployment across Telangana",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=300&fit=crop",
      results: ["50% faster response", "Real-time coordination", "Resource optimization"]
    },
    {
      title: "Infrastructure Maintenance",
      description: "Streamline maintenance schedules and resource allocation",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      results: ["30% efficiency gain", "Predictive maintenance", "Cost optimization"]
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
              Optimize Operations with
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                AI-Powered Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Transform your government operations with advanced optimization algorithms. 
              Reduce costs, improve efficiency, and deliver better services to citizens across Telangana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Start Optimizing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Optimization Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {optimizationMetrics.map((metric, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">{metric.label}</h3>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        {metric.improvement}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}%</div>
                    <Progress value={metric.value} className="mb-2" />
                    <p className="text-sm text-gray-400">Above target efficiency</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Optimization Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {optimizationFeatures.map((feature, index) => {
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
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm text-green-400">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Real-World Applications</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">{useCase.description}</p>
                    <div className="space-y-2">
                      {useCase.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-sm text-green-400">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {result}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Start Optimizing Today</h2>
              <p className="text-xl text-blue-100 mb-8">
                See immediate improvements in efficiency and cost savings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/real-time-analytics">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
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

export default OptimizeOperations;
