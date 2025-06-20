import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Phone, MapPin, Clock, Zap, Users, Shield, Camera, Play } from "lucide-react";

const EmergencyResponse = () => {
  const [activeIncidents, setActiveIncidents] = useState([
    {
      id: "INC-2024-004",
      type: "Building Fire",
      location: "Mehdipatnam, Hyderabad",
      severity: "Critical", 
      reportedAt: "15 minutes ago",
      status: "Responding",
      dronesAssigned: 4,
      estimatedArrival: "2 minutes",
      description: "High-rise residential building fire on 8th floor"
    },
    {
      id: "INC-2024-005",
      type: "Road Accident",
      location: "Outer Ring Road, Shamshabad",
      severity: "High",
      reportedAt: "22 minutes ago", 
      status: "En Route",
      dronesAssigned: 2,
      estimatedArrival: "4 minutes",
      description: "Multi-vehicle collision near airport exit"
    },
    {
      id: "INC-2024-006",
      type: "Missing Person",
      location: "KBR Park, Banjara Hills",
      severity: "Medium",
      reportedAt: "1 hour ago",
      status: "Searching",
      dronesAssigned: 3,
      estimatedArrival: "Ongoing",
      description: "Elderly person reported missing during morning walk"
    }
  ]);

  const emergencyProtocols = [
    {
      name: "Fire Response",
      description: "Rapid deployment for fire emergencies with thermal imaging",
      droneCount: 4,
      responseTime: "< 3 minutes",
      equipment: ["Thermal Camera", "Spotlight", "Speaker System"]
    },
    {
      name: "Medical Emergency",
      description: "Quick response for medical situations with supply delivery",
      droneCount: 2,
      responseTime: "< 5 minutes", 
      equipment: ["Medical Kit", "Communication Relay", "GPS Tracker"]
    },
    {
      name: "Security Breach",
      description: "Perimeter security and surveillance deployment",
      droneCount: 6,
      responseTime: "< 2 minutes",
      equipment: ["Night Vision", "High-Res Camera", "Motion Sensors"]
    },
    {
      name: "Natural Disaster",
      description: "Large-scale response for natural disasters and evacuation",
      droneCount: 8,
      responseTime: "< 10 minutes",
      equipment: ["Search & Rescue Kit", "Emergency Supplies", "Communication Array"]
    }
  ];

  const emergencyContacts = [
    { name: "Police Control Room", number: "100", department: "Police" },
    { name: "Fire Department", number: "101", department: "Fire Services" }, 
    { name: "Medical Emergency", number: "102", department: "Medical" },
    { name: "Disaster Management", number: "108", department: "NDRF" }
  ];

  const deployEmergencyResponse = (protocol: string) => {
    console.log(`Deploying emergency response: ${protocol}`);
    // Add actual deployment logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="w-10 h-10 mr-3 text-red-400" />
              Emergency Response Center
            </h1>
            <p className="text-gray-300 text-lg">Rapid drone deployment for emergency situations</p>
          </div>

          {/* Active Incidents */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-red-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Live Emergency Incidents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeIncidents.map((incident) => (
                  <div key={incident.id} className="p-4 bg-red-900/20 rounded-lg border border-red-700/30 animate-pulse">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${
                          incident.severity === 'Critical' 
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : incident.severity === 'High'
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                        }`}>
                          {incident.severity}
                        </Badge>
                        <span className="font-semibold text-white">{incident.type}</span>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {incident.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-300 mb-2">{incident.description}</div>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <div className="text-white font-semibold">{incident.location}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Reported:</span>
                        <div className="text-white font-semibold">{incident.reportedAt}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Drones:</span>
                        <div className="text-white font-semibold">{incident.dronesAssigned}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">ETA:</span>
                        <div className="text-white font-semibold">{incident.estimatedArrival}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Emergency Protocols */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Emergency Response Protocols
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyProtocols.map((protocol, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{protocol.name}</h3>
                        <Button 
                          onClick={() => deployEmergencyResponse(protocol.name)}
                          className="bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
                        >
                          Deploy Now
                        </Button>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{protocol.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Drones:</span>
                          <div className="text-white font-semibold flex items-center">
                            <Zap className="w-4 h-4 mr-1" />
                            {protocol.droneCount}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Response Time:</span>
                          <div className="text-white font-semibold flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {protocol.responseTime}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Equipment:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {protocol.equipment.map((item, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Emergency Contacts & Quick Actions */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-blue-400" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold">{contact.name}</div>
                          <div className="text-gray-400 text-sm">{contact.department}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{contact.number}</div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 mt-1">
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Emergency
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Live Surveillance
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center">
                    <Users className="w-4 h-4 mr-2" />
                    Coordinate Response
                  </Button>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Track All Units
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Training Video */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Play className="w-5 h-5 mr-2 text-red-400" />
                Emergency Response Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/K2qGNqIgQxY"
                  title="Emergency Response Drone Operations"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <p className="text-gray-300 text-sm mt-3">
                Advanced training for emergency response using drone technology for search and rescue operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponse;
