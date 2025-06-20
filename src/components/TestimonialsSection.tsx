
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      rating: 5,
      text: "The platform has revolutionized our waste management operations. Real-time monitoring capabilities are exceptional.",
      author: "Director of Operations",
      organization: "City Environmental Department",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      rating: 5,
      text: "Outstanding solution for government compliance. The analytics and reporting features exceeded our expectations.",
      author: "Environmental Coordinator", 
      organization: "Federal Waste Management",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b495?w=150&h=150&fit=crop&crop=face"
    },
    {
      rating: 5,
      text: "Incredible efficiency gains and cost savings. The drone management system is intuitive and powerful.",
      author: "Operations Manager",
      organization: "Regional Authority",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Customer Testimonials</h2>
          <p className="text-xl text-gray-300">What government agencies say about our platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transform hover:scale-105 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.organization}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
