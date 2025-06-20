
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["1234 Government Plaza", "Washington, DC 20001", "United States"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Phone Support", 
      details: ["+1 (555) 123-4567", "24/7 Emergency Line", "+1 (555) 987-6543"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email Contact",
      details: ["support@dronegov.com", "sales@dronegov.com", "security@dronegov.com"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM EST", "Sat: 9:00 AM - 5:00 PM EST", "24/7 Emergency Support"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const offices = [
    {
      city: "Washington, DC",
      address: "1234 Government Plaza, DC 20001",
      phone: "+1 (555) 123-4567",
      type: "Headquarters"
    },
    {
      city: "San Francisco, CA", 
      address: "567 Tech Center Blvd, CA 94105",
      phone: "+1 (555) 234-5678",
      type: "West Coast Operations"
    },
    {
      city: "Austin, TX",
      address: "890 Innovation Drive, TX 78701", 
      phone: "+1 (555) 345-6789",
      type: "South Regional Hub"
    },
    {
      city: "Chicago, IL",
      address: "321 Midwest Plaza, IL 60601",
      phone: "+1 (555) 456-7890", 
      type: "Central Operations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with our team of experts. We're here to help with your drone management needs and answer any questions you may have.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card 
                  key={index}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transform hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Send Us a Message
                </CardTitle>
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <Input type="email" placeholder="john.doe@government.gov" className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <Input type="tel" placeholder="+1 (555) 123-4567" className="bg-slate-700 border-slate-600" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                    <Input placeholder="Government Agency" className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type</label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="demo">Request Demo</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="security">Security Questions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us about your requirements and how we can help..."
                    className="bg-slate-700 border-slate-600 min-h-32"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-600" />
                  <label className="text-sm text-gray-300">
                    I agree to receive communications from DroneGov and understand that I can unsubscribe at any time.
                  </label>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Office Locations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offices.map((office, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">{office.city}</h3>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {office.type}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">{office.address}</p>
                      <p className="text-gray-400 text-sm">{office.phone}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Emergency Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h3 className="font-semibold text-red-300 mb-2">24/7 Emergency Line</h3>
                      <p className="text-red-200 text-lg font-bold">+1 (555) 911-DRONE</p>
                      <p className="text-red-200 text-sm">For critical system failures and emergency support</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <h3 className="font-semibold text-yellow-300 mb-2">Priority Support</h3>
                      <p className="text-yellow-200">Available for enterprise customers with SLA agreements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
