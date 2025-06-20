
import { Card, CardContent } from "@/components/ui/card";

const WasteManagementVideo = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden mb-12">
      <CardContent className="p-0">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/2OEQe_v8YVc"
            title="Drone Technology for Waste Management - Telangana Innovation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            Advanced Drone Technology for Waste Management
          </h3>
          <p className="text-gray-300">
            Watch how Telangana's innovative drone technology is revolutionizing waste management 
            and environmental monitoring across the state, making cities cleaner and smarter.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteManagementVideo;
