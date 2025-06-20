
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ArrowRight, CheckCircle, Zap, Shield, Globe, Users, TrendingUp, Eye, Play } from "lucide-react";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: "99.9% Uptime",
      description: "Reliable performance for critical operations"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Military-grade encryption and secure protocols"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide operation capabilities"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Expert support when you need it"
    }
  ];

  const useCases = [
    {
      title: "Waste Management",
      description: "Monitor and optimize waste collection routes with real-time tracking",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    },
    {
      title: "Environmental Monitoring",
      description: "Track air quality, water levels, and environmental changes",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
    },
    {
      title: "Infrastructure Inspection",
      description: "Automated inspection of bridges, roads, and public facilities",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      <Hero />
      
      {/* Enhanced Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose DroneGov?</h2>
            <p className="text-xl text-gray-300">Trusted by government agencies worldwide</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <FeatureGrid />

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Real-World Applications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how government agencies are transforming their operations with our drone management platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-500 overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />
      
      {/* Enhanced CTA Section with Visible Buttons */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in">
            Join leading government agencies using our advanced drone management platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg bg-transparent">
                <Eye className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </Link>
            <Link to="/learn-more">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg bg-transparent">
                Learn More
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg bg-transparent">
                Schedule Demo
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>30-Day Trial</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
