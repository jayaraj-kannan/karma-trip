import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Sparkles, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import DestinationSearch from "@/components/DestinationSearch";
import AIDateSuggestions from "@/components/AIDateSuggestions";
import { useTripPlanner } from "@/contexts/TripPlannerContext";
import { useToast } from "@/hooks/use-toast";
import { Destination } from "@/lib/mockDb";

interface TripPlannerHeroProps {
  onPlanGenerated: () => void;
}

const TripPlannerHero: React.FC<TripPlannerHeroProps> = ({ onPlanGenerated }) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(5000);
  const [selectedMood, setSelectedMood] = useState('');
  
  const { generateItinerary, isLoading } = useTripPlanner();
  const { toast } = useToast();

  const handleDateSelection = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 3;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleCreateTrip = async () => {
    if (!selectedDestination) {
      toast({
        title: "Select Destination",
        description: "Please select a destination to create your trip.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedMood) {
      toast({
        title: "Choose Your Mood",
        description: "Please select your travel mood to get personalized recommendations.",
        variant: "destructive"
      });
      return;
    }

    try {
      const days = calculateDays();
      await generateItinerary({
        destination: selectedDestination.name,
        days,
        budget,
        mood: selectedMood,
        travelers
      });
      
      toast({
        title: "Trip Created! 🎉",
        description: `Your ${days}-day ${selectedMood} adventure in ${selectedDestination.name} is ready!`,
      });
      
      onPlanGenerated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create your trip. Please try again.",
        variant: "destructive"
      });
    }
  };
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
          <div className="space-y-8">
            {/* Destination Selection */}
            <div>
              <label className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                Where would you like to go?
              </label>
              <DestinationSearch 
                onDestinationSelect={setSelectedDestination}
                selectedDestination={selectedDestination}
              />
            </div>

            {/* AI Date Suggestions */}
            {selectedDestination && (
              <div>
                <label className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  When do you want to travel?
                </label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <AIDateSuggestions 
                      destination={selectedDestination.name}
                      onDateSelect={handleDateSelection}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">
                          Start Date
                        </label>
                        <Input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="h-11 shadow-soft border-border/50 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">
                          End Date
                        </label>
                        <Input 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="h-11 shadow-soft border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trip Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Travelers */}
              <div>
                <label className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  How many travelers?
                </label>
                <Input 
                  type="number" 
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                  className="h-12 shadow-soft border-border/50 focus:border-primary"
                  min="1"
                  max="20"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  💰 Budget per person
                </label>
                <Input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value) || 5000)}
                  className="h-12 shadow-soft border-border/50 focus:border-primary"
                  min="1000"
                  step="500"
                />
              </div>
            </div>

            {/* Mood Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">What's your travel mood?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { mood: 'adventure', label: '🏃‍♂️ Adventure', variant: 'adventure' as const },
                  { mood: 'relax', label: '🧘‍♀️ Relax', variant: 'ocean' as const },
                  { mood: 'culture', label: '🏛️ Culture', variant: 'sunset' as const },
                  { mood: 'nightlife', label: '🌃 Nightlife', variant: 'glass' as const }
                ].map(({ mood, label, variant }) => (
                  <Button 
                    key={mood}
                    variant={selectedMood === mood ? variant : 'outline'} 
                    size="sm" 
                    className="h-12"
                    onClick={() => handleMoodSelect(mood)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Main CTA */}
            <div className="text-center">
              <Button 
                variant="hero" 
                size="xl" 
                className="px-12"
                onClick={handleCreateTrip}
                disabled={isLoading || !selectedDestination || !selectedMood}
              >
                <Sparkles className="w-6 h-6" />
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Creating Your Perfect Trip...
                  </>
                ) : (
                  <>
                    Create My Perfect Trip
                    <Sparkles className="w-6 h-6" />
                  </>
                )}
              </Button>
            </div>
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