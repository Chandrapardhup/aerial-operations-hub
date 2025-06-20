
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Shield, Zap, Globe, MapPin } from "lucide-react";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Revolutionary Waste Management",
      subtitle: "with Real-Time Drone Monitoring",
      description: "Transform your operations with AI-powered drone technology for efficient waste management and environmental monitoring across Telangana.",
      badge: "Government Certified",
      image: "/lovable-uploads/fb9d08aa-ef94-4acd-85e5-cecbd156b7f8.png"
    },
    {
      title: "Real-Time Analytics",
      subtitle: "& Operational Intelligence",
      description: "Advanced monitoring systems with instant data processing and predictive analytics for optimal resource allocation across all districts.",
      badge: "Real-Time Updates",
      image: "/lovable-uploads/fb9d08aa-ef94-4acd-85e5-cecbd156b7f8.png"
    },
    {
      title: "Secure Operations",
      subtitle: "& Compliance Ready",
      description: "Military-grade security with full compliance monitoring and automated reporting for government standards and regulations.",
      badge: "Secure & Compliant",
      image: "/lovable-uploads/fb9d08aa-ef94-4acd-85e5-cecbd156b7f8.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-20 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300 transform hover:scale-105">
              <Shield className="w-4 h-4 mr-2" />
              {heroSlides[currentSlide].badge}
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight animate-slide-up">
                {heroSlides[currentSlide].title}
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text animate-float">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover-lift text-white font-medium">
                  <Zap className="w-5 h-5 mr-2" />
                  Launch Dashboard
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transform hover:scale-105 transition-all duration-300 hover-lift">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-8 pt-4">
              <div className="text-center animate-scale-in">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center animate-scale-in">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Monitoring</div>
              </div>
              <div className="text-center animate-scale-in">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Active Drones</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-white/10 transform hover:scale-105 transition-all duration-500 hover-lift">
              {/* Telangana Map Placeholder */}
              <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 md:w-20 md:h-20 text-blue-400 mx-auto animate-pulse" />
                    <div className="text-white font-bold text-xl md:text-2xl">Telangana</div>
                    <div className="text-blue-300 text-sm md:text-base">Drone Coverage Map</div>
                  </div>
                </div>
                
                {/* Animated drone positions */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl pointer-events-none"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-float">
              <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-green-400 font-bold text-lg">12</div>
                  <div className="text-xs text-gray-300">Active</div>
                </div>
                <div>
                  <div className="text-blue-400 font-bold text-lg">3</div>
                  <div className="text-xs text-gray-300">Standby</div>
                </div>
                <div>
                  <div className="text-purple-400 font-bold text-lg">95%</div>
                  <div className="text-xs text-gray-300">Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
              index === currentSlide ? "bg-blue-500 animate-pulse-glow" : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};
