
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { FileText, Download, Calendar, Clock, TrendingUp, BarChart3, CheckCircle, Zap } from "lucide-react";

const AutomatedReports = () => {
  const reportTypes = [
    {
      icon: FileText,
      title: "Daily Operations Summary",
      description: "Automated daily reports covering all drone operations across Telangana",
      frequency: "Daily at 6 AM",
      format: "PDF, Excel",
      recipients: "Operations Team"
    },
    {
      icon: BarChart3,
      title: "Weekly Performance Analysis",
      description: "Comprehensive weekly performance metrics and efficiency analysis",
      frequency: "Every Monday",
      format: "PDF, Dashboard",
      recipients: "Management"
    },
    {
      icon: TrendingUp,
      title: "Monthly Environmental Impact",
      description: "Environmental monitoring results and compliance reporting",
      frequency: "1st of each month",
      format: "PDF, CSV",
      recipients: "Environmental Team"
    },
    {
      icon: Clock,
      title: "Real-time Incident Reports",
      description: "Instant automated reports for incidents and anomalies",
      frequency: "As needed",
      format: "Email, SMS",
      recipients: "Emergency Response"
    }
  ];

  const recentReports = [
    {
      id: "RPT-2024-001",
      title: "Telangana Operations - Daily Summary",
      type: "Daily Operations",
      generated: "2024-06-20 06:00",
      status: "Delivered",
      size: "2.4 MB"
    },
    {
      id: "RPT-2024-002", 
      title: "Hyderabad Metro - Performance Analysis",
      type: "Performance",
      generated: "2024-06-19 09:00",
      status: "Delivered",
      size: "3.1 MB"
    },
    {
      id: "RPT-2024-003",
      title: "Environmental Monitoring - Weekly",
      type: "Environmental",
      generated: "2024-06-18 08:00", 
      status: "Delivered",
      size: "1.8 MB"
    },
    {
      id: "RPT-2024-004",
      title: "Incident Response - Emergency Alert",
      type: "Incident",
      generated: "2024-06-17 14:30",
      status: "Delivered",
      size: "890 KB"
    }
  ];

  const automationFeatures = [
    {
      title: "Smart Scheduling",
      description: "Configure automated report generation based on your operational needs",
      icon: Calendar
    },
    {
      title: "Custom Templates", 
      description: "Design custom report templates that match your organization's requirements",
      icon: FileText
    },
    {
      title: "Multi-format Export",
      description: "Generate reports in multiple formats including PDF, Excel, CSV, and dashboards",
      icon: Download
    },
    {
      title: "Intelligent Distribution",
      description: "Automatically distribute reports to relevant stakeholders based on roles",
      icon: Zap
    }
  ];

  const handleGenerateReport = (reportType: string) => {
    // Simulate report generation
    console.log(`Generating ${reportType} report...`);
    
    // Create a mock PDF for demonstration
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
>>
endobj

xref
0 4
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
trailer
<<
/Size 4
/Root 1 0 R
>>
startxref
185
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}-Report-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Automated Reports &
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Intelligence Delivery
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Streamline your reporting process with intelligent automation. Generate, schedule, and distribute 
              comprehensive reports for all your drone operations across Telangana automatically.
            </p>
            <div className="flex items-center justify-center space-x-6 text-green-400 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Automated Generation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Smart Distribution</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Custom Templates</span>
              </div>
            </div>
          </div>

          {/* Report Types */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Automated Report Types</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {reportTypes.map((report, index) => {
                const Icon = report.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white text-xl">{report.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{report.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Frequency:</span>
                          <p className="text-white">{report.frequency}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Format:</span>
                          <p className="text-white">{report.format}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400">Recipients:</span>
                          <p className="text-white">{report.recipients}</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleGenerateReport(report.title)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Recent Reports</h2>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>ID: {report.id}</span>
                            <span>Generated: {report.generated}</span>
                            <span>Size: {report.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {report.status}
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {report.type}
                        </Badge>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleGenerateReport(report.title)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Automation Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Automation Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {automationFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 text-center">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Report Scheduler */}
          <Card className="mb-20 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Report Scheduler - Telangana Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Upcoming Reports</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Daily Summary</span>
                      <span className="text-blue-400">Tomorrow 6:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Weekly Analysis</span>
                      <span className="text-blue-400">Monday 9:00 AM</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Report Health</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-green-400">99.8%</span>
                    </div>
                    <Progress value={99.8} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Generation Time</span>
                      <span className="text-white">2.3 minutes</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email Delivery</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dashboard Updates</span>
                      <span className="text-green-400">Real-time</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mobile Alerts</span>
                      <span className="text-green-400">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Automate Your Reporting Today</h2>
              <p className="text-xl text-blue-100 mb-8">
                Save time and ensure consistency with automated report generation and distribution
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Automation
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Schedule Demo
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

export default AutomatedReports;
