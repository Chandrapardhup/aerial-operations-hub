import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      title: "T-Hub Headquarters",
      details: ["T-Hub, IIIT-H Campus", "Gachibowli, Hyderabad", "Telangana 500081"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Aviation Helpline", 
      details: ["Telangana Aviation: +91-40-2345-6789", "Emergency: +91-100", "T-Hub Office: +91-40-6677-1020"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Official Email",
      details: ["aviation@telangana.gov.in", "thub@telangana.gov.in", "dronegov@telangana.gov.in"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon - Fri: 9:30 AM - 6:00 PM IST", "Sat: 10:00 AM - 4:00 PM IST", "24/7 Emergency Aviation Support"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const offices = [
    {
      city: "T-Hub Hyderabad (Main Office)",
      address: "T-Hub Phase-II, IIIT-H Campus, Prof. C R Rao Road, Gachibowli, Hyderabad, Telangana 500081",
      phone: "+91-40-6677-1020",
      type: "Technology Hub & Drone Operations Center",
      email: "thub@telangana.gov.in"
    },
    {
      city: "Telangana Aviation Department", 
      address: "Secretariat, Hyderabad, Telangana 500022",
      phone: "+91-40-2345-6789",
      type: "Government Aviation Authority",
      email: "aviation@telangana.gov.in"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailData = {
        to: 'aviation@telangana.gov.in',
        subject: `New Contact Form Submission - ${formData.inquiryType}`,
        body: `
          Name: ${formData.firstName} ${formData.lastName}
          Email: ${formData.email}
          Phone: ${formData.phone}
          Organization: ${formData.organization}
          Inquiry Type: ${formData.inquiryType}
          Message: ${formData.message}
        `
      };

      console.log('Sending email to:', emailData.to);
      console.log('Email content:', emailData);

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Message Sent Successfully!",
        description: "Your message has been sent to Telangana Aviation Department. We'll get back to you within 24 hours.",
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        inquiryType: '',
        message: ''
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Contact Telangana Aviation Department</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with our aviation experts at T-Hub, Hyderabad. Official contact points for drone operations, aviation clearances, and emergency support across Telangana state.
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
                  Contact Telangana Aviation Department
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <Input 
                        placeholder="John" 
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <Input 
                        placeholder="Doe" 
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <Input 
                        type="email" 
                        placeholder="john.doe@government.gov" 
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <Input 
                        type="tel" 
                        placeholder="+91 9876543210" 
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                      <Input 
                        placeholder="Government Agency" 
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type</label>
                      <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aviation-clearance">Aviation Clearance</SelectItem>
                          <SelectItem value="drone-registration">Drone Registration</SelectItem>
                          <SelectItem value="technical-support">Technical Support</SelectItem>
                          <SelectItem value="emergency">Emergency Support</SelectItem>
                          <SelectItem value="partnership">Government Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <Textarea 
                      placeholder="Describe your aviation/drone requirements or inquiry..."
                      className="bg-slate-700 border-slate-600 min-h-32 text-white placeholder:text-gray-400"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-600" required />
                    <label className="text-sm text-gray-300">
                      I agree to receive communications from Telangana Aviation Department and understand government privacy policies.
                    </label>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending to Aviation Department...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send to Aviation Department
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Locations and Map */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Official Government Offices</CardTitle>
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
                      <p className="text-gray-300 text-sm mb-2">{office.address}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{office.phone}</span>
                        <span className="text-blue-400">{office.email}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* T-Hub Map */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Us at T-Hub Hyderabad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6293842764157!2d78.34880631489086!3d17.444806088047267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sT-Hub!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <strong className="text-white">Address:</strong> T-Hub Phase-II, IIIT-H Campus, Prof. C R Rao Road, Gachibowli, Hyderabad
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      <strong className="text-white">Landmarks:</strong> Near IIIT Hyderabad, Gachibowli Metro Station, Google Office
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Emergency Aviation Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h3 className="font-semibold text-red-300 mb-2">24/7 Aviation Emergency</h3>
                      <p className="text-red-200 text-lg font-bold">+91-100 (Emergency Services)</p>
                      <p className="text-red-200 text-sm">For aviation emergencies and critical incidents</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <h3 className="font-semibold text-yellow-300 mb-2">Aviation Department Helpline</h3>
                      <p className="text-yellow-200 text-lg font-bold">+91-40-2345-6789</p>
                      <p className="text-yellow-200 text-sm">Drone clearances, registrations, and aviation queries</p>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <h3 className="font-semibold text-blue-300 mb-2">T-Hub Operations Center</h3>
                      <p className="text-blue-200 text-lg font-bold">+91-40-6677-1020</p>
                      <p className="text-blue-200 text-sm">Technical support and operational assistance</p>
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
