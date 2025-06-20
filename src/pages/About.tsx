
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Award, MapPin, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Zap, label: "Active Drones", value: "150+" },
    { icon: MapPin, label: "Districts Covered", value: "33" },
    { icon: Clock, label: "Flight Hours", value: "50,000+" },
    { icon: Award, label: "Success Rate", value: "99.2%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">About DRONEGOV</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading Telangana's digital transformation through innovative drone technology for enhanced governance and public services
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="relative h-96">
                <img 
                  src="/lovable-uploads/356f28c4-801c-47eb-9d80-c7da06a3dff3.png" 
                  alt="Advanced drone technology for waste management and environmental monitoring" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Waste Management & Environmental Monitoring</h2>
                    <p className="text-gray-300">Deploying advanced aerial technology for cleaner and smarter cities</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700 text-center hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Mission */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  To revolutionize public service delivery in Telangana through the strategic deployment of autonomous drone technology, enhancing efficiency, transparency, and citizen satisfaction across all government operations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">✓</Badge>
                    <span className="text-gray-300">Enhance operational efficiency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">✓</Badge>
                    <span className="text-gray-300">Improve citizen services</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">✓</Badge>
                    <span className="text-gray-300">Ensure environmental sustainability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">✓</Badge>
                    <span className="text-gray-300">Promote technological innovation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-purple-400" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  To establish Telangana as a global leader in drone-enabled governance, creating a model for other states and nations while building a sustainable, technology-driven ecosystem for public administration.
                </p>
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Key Focus Areas</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Smart city infrastructure development</li>
                    <li>• Emergency response optimization</li>
                    <li>• Environmental monitoring and protection</li>
                    <li>• Agricultural technology advancement</li>
                    <li>• Public safety and security enhancement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real Incidents Section */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-6 h-6 mr-3 text-green-400" />
                Recent Success Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Landfill Fire Response - Hyderabad</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Deployed 4 drones within 3 minutes to assess and monitor the Jawaharnagar landfill fire in December 2023, 
                    providing real-time thermal imaging to firefighters and reducing response time by 40%.
                  </p>
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Emergency Response</Badge>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Flood Assessment - Warangal</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    During monsoon floods in July 2023, drones mapped affected areas covering 150 sq km, 
                    helping authorities prioritize rescue operations and distribute relief materials efficiently.
                  </p>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Disaster Management</Badge>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Agricultural Survey - Nizamabad</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Completed crop damage assessment across 500 villages in 48 hours using drone technology, 
                    enabling rapid insurance claim processing for farmers affected by unexpected hailstorms.
                  </p>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Agriculture</Badge>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Traffic Management - HITEC City</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Live traffic monitoring during IT corridor peak hours reduced congestion by 25% through 
                    real-time signal optimization and alternative route suggestions to commuters.
                  </p>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Traffic Control</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
