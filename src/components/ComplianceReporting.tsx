
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface ComplianceReport {
  id: string;
  title: string;
  type: 'environmental' | 'waste-management' | 'safety' | 'operational';
  status: 'compliant' | 'non-compliant' | 'under-review' | 'pending';
  dueDate: string;
  completionRate: number;
  lastUpdated: string;
  department: string;
}

const ComplianceReporting = () => {
  const reports: ComplianceReport[] = [
    {
      id: "RPT-001",
      title: "Monthly Waste Collection Efficiency Report",
      type: "waste-management",
      status: "compliant",
      dueDate: "2025-01-31",
      completionRate: 100,
      lastUpdated: "2 hours ago",
      department: "Municipal Corporation"
    },
    {
      id: "RPT-002",
      title: "Environmental Impact Assessment",
      type: "environmental", 
      status: "under-review",
      dueDate: "2025-02-15",
      completionRate: 75,
      lastUpdated: "1 day ago",
      department: "Environmental Board"
    },
    {
      id: "RPT-003",
      title: "Drone Safety Compliance Audit",
      type: "safety",
      status: "non-compliant",
      dueDate: "2025-01-25",
      completionRate: 45,
      lastUpdated: "3 days ago",
      department: "Aviation Authority"
    },
    {
      id: "RPT-004",
      title: "Operational Efficiency Metrics",
      type: "operational",
      status: "pending",
      dueDate: "2025-02-01",
      completionRate: 25,
      lastUpdated: "5 days ago",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'environmental': return 'bg-green-500/20 text-green-300';
      case 'waste-management': return 'bg-blue-500/20 text-blue-300';
      case 'safety': return 'bg-red-500/20 text-red-300';
      default: return 'bg-purple-500/20 text-purple-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CheckCircle;
      case 'non-compliant': return AlertTriangle;
      default: return FileText;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-400" />
            Compliance & Reporting
          </div>
          <Link to="/compliance-management">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              View All
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reports.map((report) => {
          const StatusIcon = getStatusIcon(report.status);
          return (
            <div key={report.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <StatusIcon className="w-5 h-5 mt-0.5 text-blue-400" />
                  <div>
                    <h4 className="text-white font-medium mb-1">{report.title}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getTypeColor(report.type)}>
                        {report.type.replace('-', ' ')}
                      </Badge>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      <p>Department: {report.department}</p>
                      <p>Due: {report.dueDate} • Updated: {report.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Completion Rate</span>
                  <span className="text-white">{report.completionRate}%</span>
                </div>
                <Progress value={report.completionRate} className="h-2" />
              </div>

              <div className="flex space-x-2">
                <Link to="/compliance-details">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </Link>
                <Button size="sm" variant="outline" className="border-gray-600">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                {report.status === 'pending' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Submit Report
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ComplianceReporting;
