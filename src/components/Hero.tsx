
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Shield, Zap, Globe } from "lucide-react";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Revolutionary Waste Management",
      subtitle: "with Real-Time Drone Monitoring",
      description: "Transform your operations with AI-powered drone technology for efficient waste management and environmental monitoring.",
      badge: "Government Certified",
      image: "/lovable-uploads/fb9d08aa-ef94-4acd-85e5-cecbd156b7f8.png"
    },
    {
      title: "Real-Time Analytics",
      subtitle: "& Operational Intelligence",
      description: "Advanced monitoring systems with instant data processing and predictive analytics for optimal resource allocation.",
      badge: "Real-Time Updates",
      image: "/lovable-uploads/fb9d08aa-ef94-4acd-85e5-cecbd156b7f8.png"
    },
    {
      title: "Secure Operations",
      subtitle: "& Compliance Ready",
      description: "Military-grade security with full compliance monitoring and automated reporting for government standards.",
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
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300">
              <Shield className="w-4 h-4 mr-2" />
              {heroSlides[currentSlide].badge}
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                {heroSlides[currentSlide].title}
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Launch Dashboard
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transform hover:scale-105 transition-all duration-300">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Active Drones</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10 transform hover:scale-105 transition-all duration-500">
              <img 
                src={heroSlides[currentSlide].image} 
                alt="Drone Management Interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-600"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};
