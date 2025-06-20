
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Download, PlayCircle, FileText, Users, Shield, Zap, Globe, BarChart3, MapPin, Eye, Drone, Wind, Clock, Battery, CheckCircle, TrendingUp } from "lucide-react";

const LearnMore = () => {
  const handleDownloadBrochure = () => {
    // Create a mock PDF content
    const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(DroneGov - Government Drone Management Platform) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000185 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
280
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DroneGov-Brochure.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const droneApplications = [
    {
      icon: MapPin,
      title: "Waste Management & Collection",
      description: "Drones revolutionize waste management by providing real-time monitoring of bin levels, optimizing collection routes, and identifying overflow situations before they become environmental hazards.",
      benefits: ["95% reduction in missed collections", "40% fuel savings through route optimization", "Real-time bin level monitoring", "Automated scheduling"],
      efficiency: "300% improvement in operational efficiency"
    },
    {
      icon: Wind,
      title: "Environmental Monitoring",
      description: "Advanced sensor-equipped drones monitor air quality, water pollution, deforestation, and climate changes with precision that traditional methods cannot match.",
      benefits: ["24/7 environmental surveillance", "Early pollution detection", "Comprehensive data collection", "Cost-effective monitoring"],
      efficiency: "500% more data points than traditional monitoring"
    },
    {
      icon: Shield,
      title: "Emergency Response & Disaster Management",
      description: "In crisis situations, drones provide rapid assessment, search and rescue operations, and real-time situational awareness that can save lives and resources.",
      benefits: ["60% faster emergency response", "Safe reconnaissance in dangerous areas", "Real-time damage assessment", "Coordination of rescue efforts"],
      efficiency: "200% improvement in response time"
    },
    {
      icon: BarChart3,
      title: "Infrastructure Inspection",
      description: "Automated inspection of bridges, roads, power lines, and buildings using high-resolution cameras and thermal sensors to detect structural issues before they become critical.",
      benefits: ["90% cost reduction vs traditional methods", "Enhanced safety for inspection teams", "Detailed documentation", "Predictive maintenance"],
      efficiency: "400% faster than manual inspections"
    }
  ];

  const efficiencyStats = [
    {
      icon: Clock,
      title: "Time Efficiency",
      stat: "80%",
      description: "Reduction in task completion time compared to traditional methods"
    },
    {
      icon: TrendingUp,
      title: "Cost Savings",
      stat: "60%",
      description: "Average cost reduction across all government operations"
    },
    {
      icon: Battery,
      title: "Operational Uptime",
      stat: "99.5%",
      description: "System availability with minimal maintenance requirements"
    },
    {
      icon: CheckCircle,
      title: "Accuracy Rate",
      stat: "98%",
      description: "Data accuracy in monitoring and reporting systems"
    }
  ];

  const whyDrones = [
    {
      title: "Unprecedented Access",
      description: "Reach areas that are difficult, dangerous, or impossible for humans to access safely, providing comprehensive coverage of large territories."
    },
    {
      title: "Real-Time Data Collection",
      description: "Instant data transmission and processing enables immediate decision-making and rapid response to changing conditions."
    },
    {
      title: "Cost-Effective Operations",
      description: "Significantly lower operational costs compared to traditional aircraft or ground-based monitoring systems."
    },
    {
      title: "Environmental Benefits",
      description: "Reduced carbon footprint with electric-powered systems and optimized routing that minimizes fuel consumption."
    },
    {
      title: "Scalable Solutions",
      description: "Easily deployable fleets that can be scaled up or down based on operational requirements and seasonal demands."
    },
    {
      title: "Advanced Analytics",
      description: "AI-powered data analysis provides insights and predictive capabilities that transform raw data into actionable intelligence."
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Real-Time GPS Tracking",
      description: "Monitor drone locations with precision GPS tracking and live position updates across Telangana state.",
      benefits: ["Sub-meter accuracy", "Live fleet monitoring", "Geofencing capabilities"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive data analysis with predictive insights and performance metrics for government operations.",
      benefits: ["Predictive maintenance", "Performance optimization", "Custom dashboards"]
    },
    {
      icon: Shield,
      title: "Secure Operations",
      description: "Military-grade encryption and secure communication protocols ensuring data protection.",
      benefits: ["End-to-end encryption", "Role-based access", "Audit trails"]
    },
    {
      icon: Eye,
      title: "Visual Monitoring",
      description: "HD video streams and thermal imaging for comprehensive visual surveillance and inspection.",
      benefits: ["4K video quality", "Thermal imaging", "Night vision"]
    }
  ];

  const solutions = [
    {
      title: "Waste Management Optimization",
      description: "Optimize waste collection routes and monitor bin levels in real-time",
      link: "/optimize-operations"
    },
    {
      title: "Environmental Monitoring", 
      description: "Track air quality, water levels, and environmental changes",
      link: "/real-time-analytics"
    },
    {
      title: "Infrastructure Inspection",
      description: "Automated inspection of roads, bridges, and public facilities",
      link: "/automated-reports"
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
              Advanced Drone Management for
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Government Operations
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Discover how our cutting-edge platform is revolutionizing government operations across Telangana and beyond. 
              From waste management to environmental monitoring, we provide the tools you need for efficient, secure, and scalable drone operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleDownloadBrochure}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Why Drones Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Why Choose Drone Technology?</h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Drones represent the future of government operations, offering unparalleled efficiency, safety, and cost-effectiveness across multiple sectors.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyDrones.map((reason, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Drone Applications Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Drone Applications & Use Cases</h2>
            <div className="space-y-8">
              {droneApplications.map((application, index) => {
                const Icon = application.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-2">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{application.title}</h3>
                          </div>
                          <p className="text-gray-300 mb-6 text-lg">{application.description}</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {application.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center text-green-400">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                <span className="text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-400 mb-2">{application.efficiency}</div>
                          <div className="text-gray-300 text-sm">Efficiency Improvement</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Efficiency Statistics */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Proven Efficiency Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {efficiencyStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{stat.stat}</div>
                      <CardTitle className="text-white text-lg">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm">{stat.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Platform Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
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
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
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

          {/* Solutions Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Explore Our Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">{solution.description}</p>
                    <Link to={solution.link}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Join government agencies across Telangana already using our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Contact Sales
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

export default LearnMore;
