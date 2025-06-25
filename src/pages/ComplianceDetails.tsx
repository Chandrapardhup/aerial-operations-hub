
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, FileText, Calendar, User, CheckCircle, Bolt } from "lucide-react";
import { Link } from "react-router-dom";

const ComplianceDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/operations">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Operations
              </Button>
            </Link>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Compliance Report Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Monthly Waste Collection Efficiency Report</h2>
                  <p className="text-gray-300 mb-4">Comprehensive analysis of waste collection operations for January 2025</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Compliant</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Waste Management</Badge>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                    <span>Due Date: January 31, 2025</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <User className="w-5 h-5 mr-2 text-green-400" />
                    <span>Department: Municipal Corporation</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FileText className="w-5 h-5 mr-2 text-purple-400" />
                    <span>Report ID: RPT-001</span>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Completion Status</h3>
                  <Progress value={100} className="h-3 mb-2" />
                  <div className="text-sm text-gray-300">100% Complete</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Key Metrics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Collection Efficiency</h4>
                    <div className="text-2xl font-bold text-green-400 mb-1">96.5%</div>
                    <p className="text-sm text-gray-300">Above target of 95%</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Routes Completed</h4>
                    <div className="text-2xl font-bold text-blue-400 mb-1">487/500</div>
                    <p className="text-sm text-gray-300">97.4% completion rate</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Waste Processed</h4>
                    <div className="text-2xl font-bold text-purple-400 mb-1">1,245 tons</div>
                    <p className="text-sm text-gray-300">Monthly total</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Response Time</h4>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">3.2 min</div>
                    <p className="text-sm text-gray-300">Average response</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Compliance Status</h3>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-green-300 font-medium">All compliance requirements met</span>
                  </div>
                  <p className="text-green-200 text-sm mt-2">
                    This report meets all municipal and environmental standards for waste management operations.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="border-gray-600">
                  Generate Summary
                </Button>
                <Button variant="outline" className="border-gray-600">
                  Email Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Built with bolt.new Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <a href="https://bolt.new/~/aerial-operations-hub" target="_blank" rel="noopener noreferrer">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none px-3 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Bolt className="w-4 h-4 mr-2" />
            Built with bolt.new
          </Badge>
        </a>
      </div>
    </div>
  );
};

export default ComplianceDetails;
