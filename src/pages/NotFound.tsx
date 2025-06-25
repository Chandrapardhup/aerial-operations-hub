
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Bolt } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>

      {/* Built with bolt.new Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none px-3 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Bolt className="w-4 h-4 mr-2" />
          Built with bolt.new
        </Badge>
      </div>
    </div>
  );
};

export default NotFound;
