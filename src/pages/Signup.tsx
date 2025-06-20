
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Shield, Zap, Users, Crown, Star } from "lucide-react";

const Signup = () => {
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$299",
      period: "per month",
      description: "Perfect for small agencies getting started",
      features: [
        "Up to 5 active drones",
        "Basic monitoring dashboard", 
        "Email support",
        "Standard reporting",
        "Mobile app access",
        "Basic analytics"
      ],
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      id: "professional", 
      name: "Professional",
      price: "$899",
      period: "per month",
      description: "Ideal for medium to large government operations",
      features: [
        "Up to 25 active drones",
        "Advanced monitoring & control",
        "24/7 phone & email support",
        "Custom reporting & analytics",
        "API access",
        "Real-time alerts",
        "Multi-user management",
        "Compliance reporting"
      ],
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise", 
      price: "Custom",
      period: "pricing",
      description: "For large-scale government deployments",
      features: [
        "Unlimited drones",
        "Full platform customization",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security features",
        "On-premise deployment option",
        "SLA guarantees",
        "Priority support",
        "Custom training programs"
      ],
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      popular: false
    }
  ];

  const securityFeatures = [
    "SOC 2 Type II Certified",
    "FISMA Compliant",
    "End-to-end encryption",
    "Multi-factor authentication",
    "Regular security audits",
    "GDPR compliant"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Get Started Today</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your government agency and start transforming your operations with advanced drone management.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Government Certified
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                30-Day Free Trial
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="plans" className="space-y-8">
            <TabsList className="bg-slate-800 border-slate-700 mx-auto">
              <TabsTrigger value="plans" className="data-[state=active]:bg-blue-600">Choose Plan</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="space-y-8">
              {/* Pricing Plans */}
              <div className="grid lg:grid-cols-3 gap-8">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <Card 
                      key={plan.id}
                      className={`relative bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transform hover:scale-105 transition-all duration-300 ${
                        plan.popular ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-blue-500 text-white px-4 py-2">
                            <Star className="w-4 h-4 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white">{plan.price}</div>
                          <div className="text-gray-400">{plan.period}</div>
                        </div>
                        <p className="text-gray-300 text-sm">{plan.description}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                              : 'bg-slate-700 hover:bg-slate-600'
                          } transform hover:scale-105 transition-all duration-300`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          {plan.id === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Security Features */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2" />
                    Enterprise-Grade Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {securityFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-slate-700/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup" className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-center">Create Your Account</CardTitle>
                    <p className="text-gray-300 text-center">Start your 30-day free trial today</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <Input placeholder="John" className="bg-slate-700 border-slate-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <Input placeholder="Doe" className="bg-slate-700 border-slate-600" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Work Email</label>
                      <Input type="email" placeholder="john.doe@government.gov" className="bg-slate-700 border-slate-600" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                        <Input placeholder="Government Agency" className="bg-slate-700 border-slate-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                        <Input placeholder="Operations Manager" className="bg-slate-700 border-slate-600" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Organization Size</label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">1-50 employees</SelectItem>
                            <SelectItem value="medium">51-200 employees</SelectItem>
                            <SelectItem value="large">201-1000 employees</SelectItem>
                            <SelectItem value="enterprise">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Agency Type</label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="federal">Federal Agency</SelectItem>
                            <SelectItem value="state">State Government</SelectItem>
                            <SelectItem value="local">Local Government</SelectItem>
                            <SelectItem value="municipal">Municipal Authority</SelectItem>
                            <SelectItem value="emergency">Emergency Services</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <Input type="tel" placeholder="+1 (555) 123-4567" className="bg-slate-700 border-slate-600" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                      <Input type="password" placeholder="Create a secure password" className="bg-slate-700 border-slate-600" />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-start space-x-2">
                        <input type="checkbox" className="mt-1 rounded border-gray-600" />
                        <span className="text-sm text-gray-300">
                          I agree to the <span className="text-blue-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-400 hover:underline cursor-pointer">Privacy Policy</span>
                        </span>
                      </label>
                      
                      <label className="flex items-start space-x-2">
                        <input type="checkbox" className="mt-1 rounded border-gray-600" />
                        <span className="text-sm text-gray-300">
                          I would like to receive product updates and marketing communications
                        </span>
                      </label>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                      <Users className="w-4 h-4 mr-2" />
                      Start Free Trial
                    </Button>

                    <p className="text-xs text-gray-400 text-center">
                      No credit card required. Cancel anytime during your trial period.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Signup;
