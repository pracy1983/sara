import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { HealthUnit } from '../types';

interface HealthUnitDisplayProps {
  units: HealthUnit[];
}

export function HealthUnitDisplay({ units }: HealthUnitDisplayProps) {
  return (
    <div className="space-y-4">
      <p className="font-medium">Encontrei estas unidades próximas a você:</p>
      {units.map((unit) => (
        <div key={unit.id} className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-blue-600">{unit.name}</h3>
          <p className="text-sm text-gray-600">{unit.address}</p>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{unit.distance?.toFixed(1)} km</span>
            <span className="text-gray-400">|</span>
            <span>Espera: ~{unit.waitTime} min</span>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${unit.coordinates.lat},${unit.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Navigation className="w-4 h-4" />
            Como chegar
          </a>
        </div>
      ))}
    </div>
  );
}