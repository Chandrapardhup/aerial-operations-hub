
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Eye, Download, Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const ComplianceManagement = () => {
  const reports = [
    {
      id: "RPT-001",
      title: "Monthly Waste Collection Efficiency Report",
      type: "waste-management",
      status: "compliant",
      completion: 100,
      dueDate: "2025-01-31",
      department: "Municipal Corporation"
    },
    {
      id: "RPT-002",
      title: "Environmental Impact Assessment",
      type: "environmental",
      status: "under-review",
      completion: 75,
      dueDate: "2025-02-15",
      department: "Environmental Board"
    },
    {
      id: "RPT-003",
      title: "Drone Safety Compliance Audit",
      type: "safety",
      status: "non-compliant",
      completion: 45,
      dueDate: "2025-01-25",
      department: "Aviation Authority"
    },
    {
      id: "RPT-004",
      title: "Operational Efficiency Metrics",
      type: "operational",
      status: "pending",
      completion: 25,
      dueDate: "2025-02-01",
      department: "Operations Division"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'non-compliant': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'under-review': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Compliance Management</h1>
            <p className="text-gray-300 text-lg">Monitor and manage all compliance reports and regulatory requirements</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
            <Button variant="outline" className="border-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                All Compliance Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white font-medium mb-2">{report.title}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-500/20 text-blue-300">
                            {report.type.replace('-', ' ')}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {report.department} • Due: {report.dueDate}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link to="/compliance-details">
                          <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Completion Rate</span>
                        <span className="text-white">{report.completion}%</span>
                      </div>
                      <Progress value={report.completion} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplianceManagement;
