import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Star, Clock } from 'lucide-react';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { Destination } from '@/lib/mockDb';

interface DestinationSearchProps {
  onDestinationSelect: (destination: Destination) => void;
  selectedDestination?: Destination | null;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ 
  onDestinationSelect, 
  selectedDestination 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { searchDestinations, destinations, isLoading } = useTripPlanner();

  useEffect(() => {
    if (searchQuery.trim()) {
      const delayedSearch = setTimeout(async () => {
        const results = await searchDestinations(searchQuery);
        setSearchResults(results);
        setShowResults(true);
      }, 300);

      return () => clearTimeout(delayedSearch);
    } else {
      setSearchResults(destinations);
      setShowResults(false);
    }
  }, [searchQuery, searchDestinations, destinations]);

  const handleDestinationClick = (destination: Destination) => {
    onDestinationSelect(destination);
    setSearchQuery(destination.name);
    setShowResults(false);
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
          className="pl-10 h-12 text-lg shadow-soft border-border/50 focus:border-primary"
        />
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto z-50 shadow-elevated border-primary/20">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="animate-pulse">Searching destinations...</div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="divide-y divide-border">
              {searchResults.map((destination) => (
                <button
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination)}
                  className="w-full p-4 text-left hover:bg-accent/50 transition-colors focus:outline-none focus:bg-accent/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {destination.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {destination.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          ₹{destination.averageCost}/day
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Best: {destination.bestTimeToVisit.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              No destinations found for "{searchQuery}"
            </div>
          ) : null}
        </Card>
      )}

      {selectedDestination && !showResults && (
        <Card className="mt-4 p-4 shadow-soft border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-hero flex items-center justify-center text-2xl">
              🏖️
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedDestination.name}, {selectedDestination.country}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedDestination.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedDestination.activities.slice(0, 3).map((activity) => (
                  <span
                    key={activity}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DestinationSearch;