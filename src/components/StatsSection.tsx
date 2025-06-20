
import { useState, useEffect } from "react";

export const StatsSection = () => {
  const [counts, setCounts] = useState({
    drones: 0,
    operations: 0,
    data: 0,
    uptime: 0
  });

  const finalCounts = {
    drones: 500,
    operations: 1250,
    data: 75,
    uptime: 99.9
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const interval = setInterval(() => {
      setCounts(prev => ({
        drones: Math.min(prev.drones + finalCounts.drones / steps, finalCounts.drones),
        operations: Math.min(prev.operations + finalCounts.operations / steps, finalCounts.operations),
        data: Math.min(prev.data + finalCounts.data / steps, finalCounts.data),
        uptime: Math.min(prev.uptime + finalCounts.uptime / steps, finalCounts.uptime)
      }));
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      number: Math.floor(counts.drones),
      suffix: "+",
      label: "Active Drones",
      description: "Monitored in Real-Time"
    },
    {
      number: Math.floor(counts.operations),
      suffix: "+",
      label: "Operations Completed",
      description: "Successful Missions"
    },
    {
      number: Math.floor(counts.data),
      suffix: "TB",
      label: "Data Processed",
      description: "Monthly Analytics"
    },
    {
      number: counts.uptime.toFixed(1),
      suffix: "%",
      label: "System Uptime",
      description: "Reliability Guaranteed"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Streamlined Waste Management
          </h2>
          <p className="text-xl text-gray-300">
            Solutions for Government Operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-blue-500/50 transform hover:scale-105 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Optimize Operations with Advanced Management Features</h3>
            <p className="text-gray-400 text-sm">Real-time monitoring and control systems</p>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Gain Insights with In-Depth Analytics Reports</h3>
            <p className="text-gray-400 text-sm">Comprehensive data analysis and reporting</p>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-green-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Report Incidents Quickly and Efficiently</h3>
            <p className="text-gray-400 text-sm">Instant notification and response systems</p>
          </div>
        </div>
      </div>
    </section>
  );
};
