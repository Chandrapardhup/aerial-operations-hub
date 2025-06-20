
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, BarChart3, Shield, Zap, Eye, Globe } from "lucide-react";

export const FeatureGrid = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time GPS Tracking",
      description: "Monitor drone locations with precision GPS tracking and live position updates.",
      badge: "Live",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive data analysis with predictive insights and performance metrics.",
      badge: "AI-Powered",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Secure Operations",
      description: "Military-grade encryption and secure communication protocols for all operations.",
      badge: "Encrypted",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Deploy drones instantly with automated mission planning and execution.",
      badge: "Automated",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Eye,
      title: "Visual Monitoring",
      description: "HD video streams and thermal imaging for comprehensive visual surveillance.",
      badge: "HD Quality",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide operation capabilities with satellite connectivity and mesh networks.",
      badge: "Worldwide",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
            Experience Real-Time
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Management Monitoring
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced drone management platform with cutting-edge technology for government operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transform hover:scale-105 transition-all duration-500 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
