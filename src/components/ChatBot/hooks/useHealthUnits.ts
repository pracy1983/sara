import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { HealthUnit } from '../types';
import { mockHealthUnits } from '../../../data/mockData';
import { calculateDistance } from '../../../utils/geoUtils';
import { HealthUnitDisplay } from '../components/HealthUnitDisplay';

interface UseHealthUnitsProps {
  addBotMessage: (content: string | ReactNode) => void;
}

export function useHealthUnits({ addBotMessage }: UseHealthUnitsProps) {
  const findNearbyUnits = useCallback((coords: GeolocationCoordinates): HealthUnit[] => {
    return mockHealthUnits
      .map(unit => ({
        ...unit,
        distance: calculateDistance(
          coords.latitude,
          coords.longitude,
          unit.coordinates.lat,
          unit.coordinates.lng
        )
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 3);
  }, []);

  const displayNearbyUnits = useCallback((units: HealthUnit[]) => {
    addBotMessage(React.createElement(HealthUnitDisplay, { units }));
  }, [addBotMessage]);

  return {
    findNearbyUnits,
    displayNearbyUnits
  };
}