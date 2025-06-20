
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, User, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AlertDetails = () => {
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
              <CardTitle className="text-white text-2xl">Alert Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Overflowing Waste Bin Detected</h2>
                  <p className="text-gray-300 mb-4">Multiple waste containers in Jubilee Hills require immediate attention</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">High Priority</Badge>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Action Required</Badge>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                    <span>Location: Jubilee Hills, Sector 7</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-green-400" />
                    <span>Reported: 2 minutes ago</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <User className="w-5 h-5 mr-2 text-purple-400" />
                    <span>Assigned Team: Waste Management Unit 3</span>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Drone Data</h3>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>Drone ID: DRN-007</p>
                    <p>Fill Level: 95%</p>
                    <p>Last Collection: 3 days ago</p>
                    <p>GPS Coordinates: 17.4239, 78.4738</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Recommended Actions</h3>
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <ul className="text-gray-300 space-y-2">
                    <li>• Deploy immediate collection team to location</li>
                    <li>• Schedule additional pickup for tomorrow</li>
                    <li>• Monitor surrounding bins for overflow</li>
                    <li>• Update collection route frequency for this area</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Mark as Resolved
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Assign Team
                </Button>
                <Button variant="outline" className="border-gray-600">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
