export interface TravelPreferences {
  destination: string;
  duration: number;
  budget: string;
  interests: string[];
  restrictions: string;
}

export interface SavedItinerary {
  id: string;
  preferences: TravelPreferences;
  itinerary: string;
  createdAt: string;
}

export interface DaySchedule {
  day: number;
  title: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  budget?: string;
}
