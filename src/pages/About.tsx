
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Globe, Users, Award, Target } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption and compliance with government security standards."
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Instant data processing and live monitoring capabilities for immediate response."
    },
    {
      icon: Globe,
      title: "Global Operations",
      description: "Worldwide deployment capabilities with satellite connectivity and mesh networks."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 technical support from drone operations specialists and engineers."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of successful deployments across multiple government agencies."
    },
    {
      icon: Target,
      title: "Mission-Critical",
      description: "Designed specifically for high-stakes government and public safety operations."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      expertise: "Autonomous Systems & AI",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b495?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez",
      role: "Director of Operations",
      expertise: "Government Relations & Compliance",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr. Emily Johnson",
      role: "Lead Systems Engineer",
      expertise: "Drone Technology & Integration",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "David Park",
      role: "Security Architect",
      expertise: "Cybersecurity & Data Protection",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
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
              About DroneGov
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Leading the future of government drone operations with cutting-edge technology, 
              uncompromising security, and mission-critical reliability.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                Government Certified
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                ISO 27001 Compliant
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                99.9% Uptime
              </Badge>
            </div>
          </div>

          {/* Mission Statement */}
          <Card className="bg-slate-800/50 border-slate-700 mb-16">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    To revolutionize government operations through intelligent drone technology, 
                    providing real-time monitoring, data-driven insights, and automated solutions 
                    that enhance public safety and operational efficiency.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We believe in empowering government agencies with the tools they need to 
                    serve their communities better while maintaining the highest standards of 
                    security and compliance.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/fb9d08aa-ef94-4acd-85e5-cecbd156b7f8.png" 
                    alt="Drone Technology"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose DroneGov?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transform hover:scale-105 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Expert Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card 
                  key={index} 
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transform hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.expertise}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-gray-300">Active Drones</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-300">Government Agencies</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">10K+</div>
                  <div className="text-gray-300">Missions Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-gray-300">System Uptime</div>
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
