import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Star, 
  Camera, 
  Utensils, 
  Car,
  Heart,
  Share2,
  DollarSign,
  CheckCircle
} from "lucide-react";

const ItineraryDisplay = () => {
  const mockItinerary = [
    {
      day: 1,
      date: "Dec 15, 2024",
      location: "Mumbai, India",
      activities: [
        {
          time: "9:00 AM",
          title: "Gateway of India",
          type: "Heritage",
          duration: "2 hours",
          cost: "₹50",
          rating: 4.8,
          description: "Iconic monument overlooking the Arabian Sea",
          image: "🏛️"
        },
        {
          time: "12:00 PM",
          title: "Tiffin Room at Taj Palace",
          type: "Dining",
          duration: "1.5 hours",
          cost: "₹1,200",
          rating: 4.9,
          description: "Authentic Maharashtrian cuisine with ocean views",
          image: "🍽️"
        },
        {
          time: "3:00 PM",
          title: "Elephanta Caves",
          type: "Adventure",
          duration: "4 hours",
          cost: "₹300",
          rating: 4.7,
          description: "Ancient rock-cut caves via scenic ferry ride",
          image: "⛵"
        }
      ],
      totalCost: "₹1,550",
      transport: "Local taxi + Ferry"
    },
    {
      day: 2,
      date: "Dec 16, 2024",
      location: "Mumbai, India",
      activities: [
        {
          time: "8:00 AM",
          title: "Sunrise at Marine Drive",
          type: "Experience",
          duration: "1 hour",
          cost: "Free",
          rating: 4.9,
          description: "Queen's Necklace at golden hour",
          image: "🌅"
        },
        {
          time: "10:00 AM",
          title: "Crawford Market",
          type: "Culture",
          duration: "2 hours",
          cost: "₹200",
          rating: 4.6,
          description: "Vibrant local market with spices and textiles",
          image: "🛒"
        }
      ],
      totalCost: "₹800",
      transport: "Walking + Metro"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Your Perfect Mumbai Adventure
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            AI-crafted itinerary for 2 travelers • Dec 15-16, 2024
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg">
              <CheckCircle className="w-5 h-5" />
              Book Complete Trip
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="w-5 h-5" />
              Share Itinerary
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="w-5 h-5" />
              Save for Later
            </Button>
          </div>
        </div>

        {/* Trip Summary Card */}
        <Card className="p-6 mb-8 shadow-travel border-0 card-gradient">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">2 Days</div>
              <div className="text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-adventure">₹2,350</div>
              <div className="text-muted-foreground">Total Cost</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">5</div>
              <div className="text-muted-foreground">Experiences</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-wanderlust">4.8★</div>
              <div className="text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </Card>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          {mockItinerary.map((day) => (
            <Card key={day.day} className="overflow-hidden shadow-elevated border-0 card-gradient">
              {/* Day Header */}
              <div className="p-6 travel-gradient text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Day {day.day}</h2>
                    <p className="text-white/90">{day.date} • {day.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{day.totalCost}</div>
                    <div className="text-white/80 text-sm">{day.transport}</div>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="p-6 space-y-6">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex gap-6 p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                    {/* Time & Icon */}
                    <div className="flex-shrink-0 text-center">
                      <div className="text-lg font-semibold text-primary">{activity.time}</div>
                      <div className="text-3xl mt-2">{activity.image}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{activity.title}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{activity.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{activity.description}</p>
                      
                      <div className="flex flex-wrap gap-3 items-center">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.duration}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {activity.cost}
                        </Badge>
                        <Badge variant="outline">{activity.type}</Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* AI Suggestions */}
        <Card className="mt-12 p-6 shadow-soft border-primary/20 border-2">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI Travel Assistant Suggestions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <h4 className="font-semibold text-primary mb-2">Weather Alert</h4>
              <p className="text-sm text-muted-foreground">
                Rain expected on Day 2 afternoon. Consider indoor backup: Prince of Wales Museum.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
              <h4 className="font-semibold text-adventure mb-2">Budget Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Save ₹300 by booking Elephanta Caves ferry online in advance.
              </p>
            </div>
          </div>
        </Card>

        {/* Final Booking CTA */}
        <div className="text-center mt-12">
          <Card className="p-8 shadow-elevated travel-gradient text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to embark on your journey?</h3>
            <p className="text-white/90 mb-6">
              Book your complete itinerary with one click. All accommodations, experiences, and transport included.
            </p>
            <Button variant="glass" size="xl" className="w-full md:w-auto">
              <CheckCircle className="w-6 h-6" />
              Proceed to Payment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;