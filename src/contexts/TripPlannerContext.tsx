import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDb, TripPlan, User, Destination } from '@/lib/mockDb';

interface TripPlannerContextType {
  currentUser: User | null;
  currentTrip: TripPlan | null;
  destinations: Destination[];
  isLoading: boolean;
  error: string | null;
  
  // User actions
  setCurrentUser: (user: User) => void;
  
  // Search actions
  searchDestinations: (query: string) => Promise<Destination[]>;
  
  // Trip planning actions
  createTrip: (tripData: Omit<TripPlan, 'id' | 'createdAt' | 'updatedAt'>) => Promise<TripPlan>;
  updateTrip: (id: string, updates: Partial<TripPlan>) => Promise<void>;
  setCurrentTrip: (trip: TripPlan) => void;
  
  // AI actions
  getBestTravelDates: (destination: string) => Promise<string[]>;
  generateItinerary: (params: {
    destination: string;
    days: number;
    budget: number;
    mood: string;
    travelers: number;
  }) => Promise<void>;
  
  // Booking actions
  bookTrip: (tripId: string, amount: number) => Promise<string>;
}

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

export const useTripPlanner = () => {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error('useTripPlanner must be used within a TripPlannerProvider');
  }
  return context;
};

export const TripPlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock user and destinations
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // Set mock user
        const mockUser = await mockDb.getUser('1');
        if (mockUser) {
          setCurrentUser(mockUser);
        }

        // Load initial destinations
        const initialDestinations = await mockDb.searchDestinations('');
        setDestinations(initialDestinations);
      } catch (err) {
        setError('Failed to initialize data');
        console.error('Initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const searchDestinations = async (query: string): Promise<Destination[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await mockDb.searchDestinations(query);
      setDestinations(results);
      return results;
    } catch (err) {
      setError('Failed to search destinations');
      console.error('Search error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createTrip = async (tripData: Omit<TripPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<TripPlan> => {
    try {
      setIsLoading(true);
      setError(null);
      const newTrip = await mockDb.createTripPlan(tripData);
      setCurrentTrip(newTrip);
      return newTrip;
    } catch (err) {
      setError('Failed to create trip');
      console.error('Create trip error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTrip = async (id: string, updates: Partial<TripPlan>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedTrip = await mockDb.updateTripPlan(id, updates);
      if (updatedTrip && currentTrip?.id === id) {
        setCurrentTrip(updatedTrip);
      }
    } catch (err) {
      setError('Failed to update trip');
      console.error('Update trip error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getBestTravelDates = async (destination: string): Promise<string[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const dates = await mockDb.getBestTravelDates(destination);
      return dates;
    } catch (err) {
      setError('Failed to get travel date suggestions');
      console.error('Date suggestions error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const generateItinerary = async (params: {
    destination: string;
    days: number;
    budget: number;
    mood: string;
    travelers: number;
  }): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const itinerary = await mockDb.generateItinerary(params);
      const totalCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0);
      
      if (currentTrip) {
        await updateTrip(currentTrip.id, {
          itinerary,
          totalCost,
          status: 'draft'
        });
      } else {
        // Create new trip if none exists
        const newTrip = await createTrip({
          userId: currentUser?.id || '1',
          destination: params.destination,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + params.days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          travelers: params.travelers,
          budget: params.budget,
          mood: params.mood,
          itinerary,
          totalCost,
          status: 'draft'
        });
        setCurrentTrip(newTrip);
      }
    } catch (err) {
      setError('Failed to generate itinerary');
      console.error('Generate itinerary error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const bookTrip = async (tripId: string, amount: number): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const booking = await mockDb.createBooking({
        tripId,
        userId: currentUser?.id || '1',
        totalAmount: amount,
        paymentStatus: 'completed'
      });

      // Update trip status to booked
      await updateTrip(tripId, { status: 'booked' });
      
      return booking.bookingReference;
    } catch (err) {
      setError('Failed to book trip');
      console.error('Booking error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: TripPlannerContextType = {
    currentUser,
    currentTrip,
    destinations,
    isLoading,
    error,
    setCurrentUser,
    searchDestinations,
    createTrip,
    updateTrip,
    setCurrentTrip,
    getBestTravelDates,
    generateItinerary,
    bookTrip
  };

  return (
    <TripPlannerContext.Provider value={contextValue}>
      {children}
    </TripPlannerContext.Provider>
  );
};