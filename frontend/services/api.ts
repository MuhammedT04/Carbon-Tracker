import { TravelData } from '../store/types';

const API_URL = 'https://carbon-tracker-6mad.onrender.com/api';

export const calculateCarbonFootprint = async (travelData: TravelData): Promise<number> => {
  const response = await fetch(`${API_URL}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(travelData),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate carbon footprint');
  }

  const data = await response.json();

  return data.carbonFootprint;

};

export const getRecommendations = async (
  travelData: TravelData, 
  footprint: number
): Promise<string[]> => {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ travelData, footprint }),
  });

  if (!response.ok) {
    throw new Error('Failed to get recommendations');
  }

  const data = await response.json();
  return data.recommendations;
};