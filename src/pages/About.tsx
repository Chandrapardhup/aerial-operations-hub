
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Zap, Award, MapPin, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Zap, label: "Active Drones", value: "150+" },
    { icon: MapPin, label: "Districts Covered", value: "33" },
    { icon: Clock, label: "Flight Hours", value: "50,000+" },
    { icon: Award, label: "Success Rate", value: "99.2%" },
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Director of Drone Operations",
      department: "Technology & Innovation",
      image: "/lovable-uploads/27a1feed-bd29-44a2-9a3f-80e67122c0ea.png"
    },
    {
      name: "Priya Sharma",
      role: "Chief Technology Officer", 
      department: "IT & Digital Services",
      image: "/lovable-uploads/27a1feed-bd29-44a2-9a3f-80e67122c0ea.png"
    },
    {
      name: "Suresh Reddy",
      role: "Operations Manager",
      department: "Municipal Administration",
      image: "/lovable-uploads/27a1feed-bd29-44a2-9a3f-80e67122c0ea.png"
    },
    {
      name: "Anitha Rao",
      role: "Safety & Compliance Head",
      department: "Regulatory Affairs",
      image: "/lovable-uploads/27a1feed-bd29-44a2-9a3f-80e67122c0ea.png"
    }
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
                  src="/lovable-uploads/fb9d08aa-ef94-4acd-85e5-cecbd156b7f8.png" 
                  alt="Advanced drone technology for government operations" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Innovative Drone Solutions</h2>
                    <p className="text-gray-300">Empowering smart governance through cutting-edge aerial technology</p>
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

          {/* Team */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-green-400" />
                Leadership Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-slate-600 group-hover:border-blue-400 transition-colors duration-300"
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-400 text-sm mb-1">{member.role}</p>
                    <p className="text-gray-400 text-xs">{member.department}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
