
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, Filter, Search, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateReport = async (reportType: string, templateName?: string) => {
    const reportId = templateName || reportType;
    setIsGenerating(reportId);

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create a mock PDF
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
/Length 120
>>
stream
BT
/F1 12 Tf
72 720 Td
(${templateName || reportType} Report - Telangana Operations) Tj
0 -20 Td
(Generated on: ${new Date().toLocaleDateString()}) Tj
0 -20 Td
(DroneGov Management Platform) Tj
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
350
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${templateName || reportType}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Report Generated Successfully!",
        description: `${templateName || reportType} report has been generated and downloaded.`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(null);
    }
  };

  const reports = [
    {
      id: "RPT-001",
      title: "Monthly Operations Summary",
      type: "Operations",
      date: "2024-06-15",
      status: "Generated",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: "RPT-002", 
      title: "Environmental Impact Analysis",
      type: "Environmental",
      date: "2024-06-14",
      status: "Generated", 
      size: "1.8 MB",
      format: "PDF"
    },
    {
      id: "RPT-003",
      title: "Drone Fleet Performance",
      type: "Performance",
      date: "2024-06-13",
      status: "Processing",
      size: "3.1 MB",
      format: "PDF"
    },
    {
      id: "RPT-004",
      title: "Cost Analysis Q2 2024",
      type: "Financial",
      date: "2024-06-12",
      status: "Generated",
      size: "1.5 MB", 
      format: "Excel"
    },
    {
      id: "RPT-005",
      title: "Incident Response Log",
      type: "Incident",
      date: "2024-06-11",
      status: "Generated",
      size: "890 KB",
      format: "PDF"
    }
  ];

  const templates = [
    {
      name: "Daily Operations Report",
      description: "Comprehensive daily summary of all drone operations and activities across Telangana",
      frequency: "Daily",
      category: "Operations"
    },
    {
      name: "Weekly Performance Analysis", 
      description: "Performance metrics and efficiency analysis for the week",
      frequency: "Weekly",
      category: "Performance"
    },
    {
      name: "Monthly Environmental Impact",
      description: "Environmental monitoring results and impact assessment for Telangana regions", 
      frequency: "Monthly",
      category: "Environmental"
    },
    {
      name: "Quarterly Financial Summary",
      description: "Cost analysis and budget performance review",
      frequency: "Quarterly", 
      category: "Financial"
    }
  ];

  const quickStats = [
    { label: "Reports Generated", value: "247", trend: "+12%" },
    { label: "Data Processed", value: "45.2 TB", trend: "+8%" },
    { label: "Active Templates", value: "18", trend: "+3%" },
    { label: "Automated Reports", value: "156", trend: "+25%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Reports & Analytics</h1>
            <p className="text-gray-300 text-lg">Generate and manage comprehensive operational reports for Telangana operations</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300 mb-2">{stat.label}</div>
                  <div className="flex items-center text-xs text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend} this month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600">Generated Reports</TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-blue-600">Report Templates</TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-blue-600">Create Report</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-6">
              {/* Filters */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search reports..." className="pl-10 bg-slate-700 border-slate-600" />
                    </div>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Report Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="generated">Generated</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Reports List */}
              <div className="space-y-4">
                {reports.map((report) => (
                  <Card key={report.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
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
                              <span>{report.date}</span>
                              <span>{report.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Badge className={`${
                            report.status === 'Generated' 
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : report.status === 'Processing'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}>
                            {report.status}
                          </Badge>
                          
                          <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                            {report.type}
                          </Badge>
                          
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {report.format}
                          </Badge>
                          
                          {report.status === 'Generated' && (
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleGenerateReport(report.title)}
                              disabled={isGenerating === report.title}
                            >
                              {isGenerating === report.title ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                              ) : (
                                <Download className="w-4 h-4 mr-1" />
                              )}
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {templates.map((template, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{template.name}</CardTitle>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {template.frequency}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {template.category}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-gray-600">
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleGenerateReport(template.category, template.name)}
                            disabled={isGenerating === template.name}
                          >
                            {isGenerating === template.name ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                            ) : null}
                            Generate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Create Custom Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Report Title</label>
                        <Input placeholder="Enter report title..." className="bg-slate-700 border-slate-600" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="operations">Operations Report</SelectItem>
                            <SelectItem value="performance">Performance Analysis</SelectItem>
                            <SelectItem value="environmental">Environmental Impact</SelectItem>
                            <SelectItem value="financial">Financial Summary</SelectItem>
                            <SelectItem value="incident">Incident Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="date" className="bg-slate-700 border-slate-600" />
                          <Input type="date" className="bg-slate-700 border-slate-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Output Format</label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Document</SelectItem>
                            <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                            <SelectItem value="csv">CSV Data</SelectItem>
                            <SelectItem value="json">JSON Export</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Include Sections</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-600" defaultChecked />
                            <span className="text-sm text-gray-300">Executive Summary</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-600" defaultChecked />
                            <span className="text-sm text-gray-300">Operational Data</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-600" />
                            <span className="text-sm text-gray-300">Financial Analysis</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-600" />
                            <span className="text-sm text-gray-300">Recommendations</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" className="border-gray-600">
                      Save as Template
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleGenerateReport("Custom Report")}
                      disabled={isGenerating === "Custom Report"}
                    >
                      {isGenerating === "Custom Report" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        "Generate Report"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
