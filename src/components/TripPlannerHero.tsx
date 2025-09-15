import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const TripPlannerHero = () => {
  return (
    <div className="min-h-screen travel-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-white/5 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-white animate-pulse-soft" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              AI Trip Planner
            </h1>
            <Sparkles className="w-8 h-8 text-white animate-pulse-soft" />
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover personalized adventures with AI-powered itineraries tailored to your mood, budget, and dreams
          </p>
        </div>

        {/* Main Planning Interface */}
        <Card className="max-w-4xl mx-auto p-8 shadow-elevated bg-white/95 backdrop-blur-sm border-0">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Destination Input */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Where to?
              </label>
              <Input 
                placeholder="Search destinations..." 
                className="h-12 text-lg shadow-soft border-border/50 focus:border-primary"
              />
            </div>

            {/* Travel Dates */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                When?
              </label>
              <div className="flex gap-2">
                <Input 
                  type="date" 
                  className="h-12 shadow-soft border-border/50 focus:border-primary"
                />
                <Input 
                  type="date" 
                  className="h-12 shadow-soft border-border/50 focus:border-primary"
                />
              </div>
            </div>

            {/* Group Size */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Travelers
              </label>
              <Input 
                type="number" 
                placeholder="Number of travelers" 
                className="h-12 shadow-soft border-border/50 focus:border-primary"
                min="1"
                defaultValue="1"
              />
            </div>

            {/* AI Suggestions Button */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-foreground">
                Let AI Choose Best Dates
              </label>
              <Button variant="hero" size="lg" className="w-full h-12">
                <Sparkles className="w-5 h-5" />
                Get AI Suggestions
              </Button>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-foreground">What's your travel mood?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="adventure" size="sm" className="h-12">
                🏃‍♂️ Adventure
              </Button>
              <Button variant="ocean" size="sm" className="h-12">
                🧘‍♀️ Relax
              </Button>
              <Button variant="sunset" size="sm" className="h-12">
                🏛️ Culture
              </Button>
              <Button variant="glass" size="sm" className="h-12">
                🌃 Nightlife
              </Button>
            </div>
          </div>

          {/* Main CTA */}
          <div className="mt-8 text-center">
            <Button variant="hero" size="xl" className="px-12">
              <Sparkles className="w-6 h-6" />
              Create My Perfect Trip
              <Sparkles className="w-6 h-6" />
            </Button>
          </div>
        </Card>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          <Card className="p-6 card-gradient shadow-soft border-0 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Planning</h3>
            <p className="text-muted-foreground">Smart recommendations based on your preferences and real-time data</p>
          </Card>

          <Card className="p-6 card-gradient shadow-soft border-0 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-adventure/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-adventure" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Dynamic Itineraries</h3>
            <p className="text-muted-foreground">Adaptive plans that adjust to weather, crowds, and your changing mood</p>
          </Card>

          <Card className="p-6 card-gradient shadow-soft border-0 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Group Collaboration</h3>
            <p className="text-muted-foreground">Plan together with friends and family with AI-mediated consensus</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripPlannerHero;