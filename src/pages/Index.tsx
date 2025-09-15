import { useState } from "react";
import TripPlannerHero from "@/components/TripPlannerHero";
import ItineraryDisplay from "@/components/ItineraryDisplay";

const Index = () => {
  const [currentView, setCurrentView] = useState<'planner' | 'itinerary'>('planner');

  return (
    <div className="min-h-screen">
      {currentView === 'planner' ? (
        <TripPlannerHero onPlanGenerated={() => setCurrentView('itinerary')} />
      ) : (
        <ItineraryDisplay />
      )}
      
      {/* Dev Navigation - Remove in production */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentView('planner')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-soft hover:shadow-travel transition-all"
          >
            Planner
          </button>
          <button 
            onClick={() => setCurrentView('itinerary')}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-soft hover:shadow-travel transition-all"
          >
            Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
