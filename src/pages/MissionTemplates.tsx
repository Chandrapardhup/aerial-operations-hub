
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, MapPin, Settings, Clock, Zap, Play, Eye } from "lucide-react";

const MissionTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "waste-collection",
      name: "Waste Collection Route",
      description: "Automated waste monitoring and collection route optimization",
      category: "Municipal Services",
      duration: "2-4 hours",
      droneCount: "3-5",
      difficulty: "Medium",
      features: ["Route Optimization", "Real-time Monitoring", "Capacity Detection", "GPS Tracking"],
      steps: [
        "Define collection zones and waypoints",
        "Assign drones to specific routes", 
        "Configure waste detection sensors",
        "Set collection schedule and priorities",
        "Deploy drones and monitor progress"
      ]
    },
    {
      id: "emergency-response",
      name: "Emergency Response",
      description: "Rapid deployment for emergency situations and first responder support",
      category: "Emergency Services", 
      duration: "30 min - 2 hours",
      droneCount: "2-8",
      difficulty: "High",
      features: ["Rapid Deployment", "Live Video Feed", "Thermal Imaging", "Communication Relay"],
      steps: [
        "Receive emergency alert and location",
        "Auto-select nearest available drones",
        "Deploy drones to incident location",
        "Establish communication link",
        "Provide real-time situational awareness"
      ]
    },
    {
      id: "perimeter-patrol",
      name: "Perimeter Patrol",
      description: "Automated security patrol for facility and border monitoring",
      category: "Security",
      duration: "1-8 hours", 
      droneCount: "2-4",
      difficulty: "Easy",
      features: ["Motion Detection", "Night Vision", "Alert System", "Recording"],
      steps: [
        "Define patrol boundaries and checkpoints",
        "Set patrol frequency and schedule",
        "Configure security sensors and cameras",
        "Deploy drones on patrol routes",
        "Monitor for security breaches"
      ]
    },
    {
      id: "environmental-scan",
      name: "Environmental Monitoring",
      description: "Air quality monitoring and environmental data collection",
      category: "Environmental",
      duration: "3-6 hours",
      droneCount: "2-3", 
      difficulty: "Medium",
      features: ["Air Quality Sensors", "Data Logging", "Weather Monitoring", "Sample Collection"],
      steps: [
        "Select monitoring locations and grid",
        "Calibrate environmental sensors",
        "Program data collection intervals",
        "Deploy drones across monitoring area",
        "Analyze and report environmental data"
      ]
    }
  ];

  const useTemplate = (templateId: string) => {
    console.log(`Using template: ${templateId}`);
    // Redirect to custom mission page with template pre-filled
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Mission Templates</h1>
            <p className="text-gray-300 text-lg">Pre-configured mission templates for quick deployment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Template List */}
            <div className="lg:col-span-2">
              <div className="grid gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 animate-fade-in">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white flex items-center">
                            {template.category === 'Emergency Services' && <AlertCircle className="w-5 h-5 mr-2 text-red-400" />}
                            {template.category === 'Municipal Services' && <CheckCircle className="w-5 h-5 mr-2 text-green-400" />}
                            {template.category === 'Security' && <Settings className="w-5 h-5 mr-2 text-blue-400" />}
                            {template.category === 'Environmental' && <MapPin className="w-5 h-5 mr-2 text-purple-400" />}
                            {template.name}
                          </CardTitle>
                          <p className="text-gray-300 text-sm mt-1">{template.description}</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {template.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Duration:</span>
                          <div className="text-white font-semibold flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {template.duration}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Drones:</span>
                          <div className="text-white font-semibold flex items-center">
                            <Zap className="w-4 h-4 mr-1" />
                            {template.droneCount}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Difficulty:</span>
                          <Badge className={`${
                            template.difficulty === 'Easy' 
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : template.difficulty === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}>
                            {template.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-400 text-sm">Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => useTemplate(template.id)}
                          className="bg-green-600 hover:bg-green-700 flex items-center flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                        <Button 
                          onClick={() => setSelectedTemplate(template.id)}
                          variant="outline" 
                          className="border-gray-600 text-gray-300 hover:bg-slate-600"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Template Details */}
            <div>
              <Card className="bg-slate-800/50 border-slate-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">
                    {selectedTemplate ? 
                      templates.find(t => t.id === selectedTemplate)?.name || "Template Details" 
                      : "Template Details"
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTemplate ? (
                    <div className="space-y-4">
                      {templates.find(t => t.id === selectedTemplate)?.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="text-gray-300 text-sm">{step}</div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-slate-600">
                        <Link to="/custom-mission">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            Customize Template
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a template to view details and deployment steps</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionTemplates;
