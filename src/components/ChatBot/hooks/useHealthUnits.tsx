import { useCallback } from 'react';
import { HealthUnit } from '../types';
import { mockHealthUnits } from '../../../data/mockData';
import { calculateDistance } from '../../../utils/geoUtils';

export function useHealthUnits() {
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

  return {
    findNearbyUnits
  };
}