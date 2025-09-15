// Mock Local Database for Trip Planner
export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    budget: string;
    travelStyle: string;
    interests: string[];
  };
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  averageCost: number;
  bestTimeToVisit: string[];
  activities: string[];
  coordinates: { lat: number; lng: number };
}

export interface TripPlan {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  mood: string;
  itinerary: DayPlan[];
  totalCost: number;
  status: 'draft' | 'confirmed' | 'booked';
  createdAt: string;
  updatedAt: string;
}

export interface DayPlan {
  day: number;
  date: string;
  location: string;
  activities: Activity[];
  totalCost: number;
  transport: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  type: string;
  duration: string;
  cost: string;
  rating: number;
  description: string;
  image: string;
  coordinates?: { lat: number; lng: number };
}

export interface BookingData {
  tripId: string;
  userId: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingReference: string;
  createdAt: string;
}

class MockDatabase {
  private storageKey = 'tripPlannerDB';

  // Initialize with mock data
  private defaultData = {
    users: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
          budget: 'medium',
          travelStyle: 'adventure',
          interests: ['heritage', 'culture', 'food']
        },
        createdAt: new Date().toISOString()
      }
    ] as User[],
    destinations: [
      {
        id: '1',
        name: 'Mumbai',
        country: 'India',
        description: 'The commercial capital of India with rich history and vibrant culture',
        averageCost: 2000,
        bestTimeToVisit: ['October', 'November', 'December', 'January', 'February'],
        activities: ['heritage', 'culture', 'food', 'nightlife'],
        coordinates: { lat: 19.0760, lng: 72.8777 }
      },
      {
        id: '2',
        name: 'Goa',
        country: 'India',
        description: 'Beach paradise with Portuguese heritage and laid-back vibes',
        averageCost: 3000,
        bestTimeToVisit: ['November', 'December', 'January', 'February'],
        activities: ['beach', 'adventure', 'nightlife', 'food'],
        coordinates: { lat: 15.2993, lng: 74.1240 }
      },
      {
        id: '3',
        name: 'Rajasthan',
        country: 'India',
        description: 'Royal heritage with magnificent palaces and desert landscapes',
        averageCost: 2500,
        bestTimeToVisit: ['October', 'November', 'December', 'January', 'February', 'March'],
        activities: ['heritage', 'culture', 'adventure', 'photography'],
        coordinates: { lat: 27.0238, lng: 74.2179 }
      }
    ] as Destination[],
    tripPlans: [] as TripPlan[],
    bookings: [] as BookingData[]
  };

  private getData() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default data
    this.saveData(this.defaultData);
    return this.defaultData;
  }

  private saveData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // User operations
  async getUser(id: string): Promise<User | null> {
    const data = this.getData();
    return data.users.find((user: User) => user.id === id) || null;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const data = this.getData();
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    data.users.push(newUser);
    this.saveData(data);
    return newUser;
  }

  // Destination operations
  async searchDestinations(query: string): Promise<Destination[]> {
    const data = this.getData();
    if (!query.trim()) return data.destinations;
    
    return data.destinations.filter((dest: Destination) =>
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.country.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getDestination(id: string): Promise<Destination | null> {
    const data = this.getData();
    return data.destinations.find((dest: Destination) => dest.id === id) || null;
  }

  // Trip planning operations
  async createTripPlan(tripData: Omit<TripPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<TripPlan> {
    const data = this.getData();
    const newTrip: TripPlan = {
      id: Date.now().toString(),
      ...tripData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.tripPlans.push(newTrip);
    this.saveData(data);
    return newTrip;
  }

  async getTripPlan(id: string): Promise<TripPlan | null> {
    const data = this.getData();
    return data.tripPlans.find((trip: TripPlan) => trip.id === id) || null;
  }

  async getUserTripPlans(userId: string): Promise<TripPlan[]> {
    const data = this.getData();
    return data.tripPlans.filter((trip: TripPlan) => trip.userId === userId);
  }

  async updateTripPlan(id: string, updates: Partial<TripPlan>): Promise<TripPlan | null> {
    const data = this.getData();
    const tripIndex = data.tripPlans.findIndex((trip: TripPlan) => trip.id === id);
    if (tripIndex === -1) return null;

    data.tripPlans[tripIndex] = {
      ...data.tripPlans[tripIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData(data);
    return data.tripPlans[tripIndex];
  }

  // AI suggestions simulation
  async getBestTravelDates(destination: string, month?: string): Promise<string[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = this.getData();
    const dest = data.destinations.find((d: Destination) => 
      d.name.toLowerCase().includes(destination.toLowerCase())
    );
    
    if (!dest) {
      return ['2024-12-15', '2024-12-22', '2024-12-29'];
    }

    // Generate suggested dates based on best time to visit
    const currentYear = new Date().getFullYear();
    const suggestedDates: string[] = [];
    
    dest.bestTimeToVisit.forEach((month: string) => {
      const monthNum = new Date(`${month} 1, ${currentYear}`).getMonth();
      const date1 = new Date(currentYear, monthNum, 15);
      const date2 = new Date(currentYear, monthNum, 22);
      suggestedDates.push(date1.toISOString().split('T')[0]);
      suggestedDates.push(date2.toISOString().split('T')[0]);
    });

    return suggestedDates.slice(0, 5);
  }

  async generateItinerary(params: {
    destination: string;
    days: number;
    budget: number;
    mood: string;
    travelers: number;
  }): Promise<DayPlan[]> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { destination, days, mood } = params;
    
    // Mock itinerary based on destination and mood
    const mockActivities: { [key: string]: Activity[] } = {
      mumbai: [
        {
          id: '1',
          time: '9:00 AM',
          title: 'Gateway of India',
          type: 'Heritage',
          duration: '2 hours',
          cost: '₹50',
          rating: 4.8,
          description: 'Iconic monument overlooking the Arabian Sea',
          image: '🏛️'
        },
        {
          id: '2',
          time: '12:00 PM',
          title: 'Tiffin Room at Taj Palace',
          type: 'Dining',
          duration: '1.5 hours',
          cost: '₹1,200',
          rating: 4.9,
          description: 'Authentic Maharashtrian cuisine with ocean views',
          image: '🍽️'
        },
        {
          id: '3',
          time: '3:00 PM',
          title: 'Elephanta Caves',
          type: 'Adventure',
          duration: '4 hours',
          cost: '₹300',
          rating: 4.7,
          description: 'Ancient rock-cut caves via scenic ferry ride',
          image: '⛵'
        }
      ]
    };

    const itinerary: DayPlan[] = [];
    const destinationKey = destination.toLowerCase();
    const activities = mockActivities[destinationKey] || mockActivities.mumbai;

    for (let day = 1; day <= days; day++) {
      const dayDate = new Date();
      dayDate.setDate(dayDate.getDate() + day - 1);
      
      itinerary.push({
        day,
        date: dayDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        location: destination,
        activities: activities.slice(0, Math.min(3, activities.length)),
        totalCost: activities.reduce((sum, activity) => {
          const cost = parseInt(activity.cost.replace(/[^\d]/g, '')) || 0;
          return sum + cost;
        }, 0),
        transport: 'Local taxi + Ferry'
      });
    }

    return itinerary;
  }

  // Booking operations
  async createBooking(bookingData: Omit<BookingData, 'bookingReference' | 'createdAt'>): Promise<BookingData> {
    const data = this.getData();
    const newBooking: BookingData = {
      ...bookingData,
      bookingReference: `TRP${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    data.bookings.push(newBooking);
    this.saveData(data);
    return newBooking;
  }

  async getBooking(reference: string): Promise<BookingData | null> {
    const data = this.getData();
    return data.bookings.find((booking: BookingData) => booking.bookingReference === reference) || null;
  }

  // Utility methods
  async clearAllData(): Promise<void> {
    localStorage.removeItem(this.storageKey);
  }

  async exportData(): Promise<string> {
    return JSON.stringify(this.getData(), null, 2);
  }
}

export const mockDb = new MockDatabase();