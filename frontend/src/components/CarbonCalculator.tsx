// src/components/CarbonCalculator.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store'
import { submitCarbonData, updateTravelData, loadSavedData } from '../../store/carbonSlice';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const CarbonCalculator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { travelData, loading } = useSelector((state: RootState) => state.carbon);

  useEffect(() => {
    dispatch(loadSavedData());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitCarbonData(travelData));
    
  };

  const handleChange = (field: keyof typeof travelData, value: string | number) => {
    dispatch(updateTravelData({ [field]: value }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Calculate Your Travel Carbon Footprint</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="transportation" className="text-sm font-medium">
              Mode of Transportation
            </label>
            <Select
              value={travelData.transportation}
              onValueChange={(value) => handleChange('transportation', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transportation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="plane">Airplane</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="distance" className="text-sm font-medium">
              Distance (km)
            </label>
            <Input
              id="distance"
              type="number"
              
              value={travelData.distance}
              onChange={(e) => handleChange('distance', Number(e.target.value))}
              placeholder="Enter distance in km"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="frequency" className="text-sm font-medium">
              Frequency
            </label>
            <Select
              value={travelData.frequency}
              onValueChange={(value) => handleChange('frequency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Footprint'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;