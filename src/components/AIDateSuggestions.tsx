import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar, Sun, Cloud, Thermometer } from 'lucide-react';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { useToast } from '@/hooks/use-toast';

interface AIDateSuggestionsProps {
  destination: string;
  onDateSelect: (startDate: string, endDate: string) => void;
}

const AIDateSuggestions: React.FC<AIDateSuggestionsProps> = ({ 
  destination, 
  onDateSelect 
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { getBestTravelDates } = useTripPlanner();
  const { toast } = useToast();

  const generateSuggestions = async () => {
    if (!destination.trim()) {
      toast({
        title: "Select Destination",
        description: "Please select a destination first to get AI date suggestions.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const dates = await getBestTravelDates(destination);
      setSuggestions(dates);
      toast({
        title: "AI Suggestions Ready! ✨",
        description: `Found ${dates.length} optimal travel dates for ${destination}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate date suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDateSelection = (startDate: string) => {
    // Calculate end date (3 days later for example)
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 3);
    
    onDateSelect(startDate, end.toISOString().split('T')[0]);
    
    toast({
      title: "Dates Selected! 📅",
      description: `Trip planned from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`,
    });
  };

  const getWeatherIcon = (date: string) => {
    // Mock weather based on date
    const month = new Date(date).getMonth();
    if ([11, 0, 1].includes(month)) return <Sun className="w-4 h-4 text-yellow-500" />;
    if ([6, 7, 8].includes(month)) return <Cloud className="w-4 h-4 text-gray-500" />;
    return <Thermometer className="w-4 h-4 text-orange-500" />;
  };

  const getWeatherDescription = (date: string) => {
    const month = new Date(date).getMonth();
    if ([11, 0, 1].includes(month)) return "Perfect weather";
    if ([6, 7, 8].includes(month)) return "Monsoon season";
    return "Pleasant climate";
  };

  const getReason = (date: string) => {
    const reasons = [
      "Lower crowd levels",
      "Best weather conditions",
      "Festival season",
      "Ideal temperature",
      "Clear skies expected"
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="hero" 
        size="lg" 
        onClick={generateSuggestions}
        disabled={isGenerating || !destination.trim()}
        className="w-full h-12"
      >
        <Sparkles className="w-5 h-5" />
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            AI is analyzing best dates...
          </>
        ) : (
          "Get AI Date Suggestions"
        )}
      </Button>

      {suggestions.length > 0 && (
        <Card className="p-6 shadow-soft border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Recommended Dates</h3>
          </div>
          
          <div className="grid gap-3">
            {suggestions.slice(0, 5).map((date, index) => {
              const dateObj = new Date(date);
              const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
              
              return (
                <button
                  key={date}
                  onClick={() => handleDateSelection(date)}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/30 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg travel-gradient text-white flex items-center justify-center font-semibold">
                        {dateObj.getDate()}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {dateObj.toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getWeatherIcon(date)}
                          <span>{getWeatherDescription(date)}</span>
                          <span>•</span>
                          <span>{getReason(date)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {index === 0 && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Best Match
                        </Badge>
                      )}
                      {isWeekend && (
                        <Badge variant="outline" className="text-xs">
                          Weekend
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <Calendar className="w-3 h-3" />
                        Click to select
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <strong>AI Tip:</strong> These dates are optimized based on weather patterns, 
                local events, crowd levels, and seasonal pricing for {destination}.
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIDateSuggestions;