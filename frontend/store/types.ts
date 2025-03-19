export interface TravelData {
    transportation: string;
    distance: number;
    frequency: string;
  }
  
  export interface CarbonState {
    carbonFootprint: number | null;
    travelData: TravelData;
    recommendations: string[];
    loading: boolean;
    error: string | null;
  }