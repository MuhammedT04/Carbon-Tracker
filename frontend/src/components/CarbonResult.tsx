import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { resetCarbonData } from '../../store/carbonSlice'; // You'll need to create this action

const CarbonResult: React.FC = () => {
  const { carbonFootprint, recommendations } = useSelector((state: RootState) => state.carbon);
  const dispatch = useDispatch();

  if (carbonFootprint === null && !recommendations.length) {
    return null;
  }

  const handleDelete = () => {
    dispatch(resetCarbonData());
  };

  return (
    <div className="space-y-4">
      {carbonFootprint !== null && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Your Carbon Footprint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-4xl font-bold">{carbonFootprint}.00</span>
              <span className="text-xl ml-2">kg CO₂e</span>
              <p className="mt-2 text-gray-500">
                This is your estimated carbon footprint based on your travel habits.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {recommendations.length > 0 && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm">
                  • {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button 
          variant="destructive" 
          onClick={handleDelete}
          className="mt-2"
        >
          Delete Results
        </Button>
      </div>
    </div>
  );
};

export default CarbonResult;