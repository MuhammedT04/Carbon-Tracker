import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CarbonState, TravelData } from './types';
import { calculateCarbonFootprint, getRecommendations } from '../services/api';

const initialState: CarbonState = {
  carbonFootprint: null,
  travelData: {
    transportation: 'car',
    distance: 0,
    frequency: 'daily'
  },
  recommendations: [],
  loading: false,
  error: null
};


export const submitCarbonData = createAsyncThunk(
  'carbon/submitData',
  async (travelData: TravelData, { rejectWithValue }) => {
    try {
      const footprint = await calculateCarbonFootprint(travelData);
      const recommendations = await getRecommendations(travelData, footprint);
      
      // Store in localStorage
      localStorage.setItem('carbonData', JSON.stringify({
        travelData,
        carbonFootprint: footprint,
        recommendations
      }));
      
      return { footprint, recommendations };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    updateTravelData: (state, action: PayloadAction<Partial<TravelData>>) => {
      state.travelData = { ...state.travelData, ...action.payload };
    },
    loadSavedData: (state) => {
      const savedData = localStorage.getItem('carbonData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        state.travelData = parsed.travelData;
        state.carbonFootprint = parsed.carbonFootprint;
        state.recommendations = parsed.recommendations;
      }
    },
    resetCarbonData:(state)=>{
      state.carbonFootprint = null;
      state.recommendations = [];
      state.error = null;
    
      localStorage.removeItem('carbonData');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCarbonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCarbonData.fulfilled, (state, action) => {
        state.loading = false;
        state.carbonFootprint = action.payload.footprint;
        state.recommendations = action.payload.recommendations;
      })
      .addCase(submitCarbonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateTravelData, loadSavedData,resetCarbonData } = carbonSlice.actions;
export default carbonSlice.reducer;