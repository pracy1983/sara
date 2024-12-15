import React from 'react';
import { MapPin, Navigation, Clock, Users, Phone, AlertCircle, Stethoscope } from 'lucide-react';
import { HealthUnit } from '../types';

interface HealthUnitDisplayProps {
  units: HealthUnit[];
}

export function HealthUnitDisplay({ units }: HealthUnitDisplayProps) {
  return (
    <div className="space-y-4">
      <p className="font-medium">Encontrei estas unidades próximas a você:</p>
      {units.map((unit) => (
        <div key={unit.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-blue-600">{unit.name}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              {unit.type}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{unit.address}</p>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{unit.distance?.toFixed(1)} km</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{unit.phone}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Espera: ~{unit.waitTime} min</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Ocupação: {unit.occupancyRate}%</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span>Atende até: <span className="font-medium">{unit.maxUrgencyLevel}</span></span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 text-sm mb-1">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Especialidades disponíveis agora:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {unit.specialties
                .filter(spec => spec.availableNow)
                .map(spec => (
                  <span key={spec.name} className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
                    {spec.name}
                  </span>
                ))}
            </div>
          </div>

          <div className="mt-3 text-sm">
            <p className="text-gray-600">
              Capacidade: {unit.currentCapacity.available} vagas de {unit.currentCapacity.total}
            </p>
            <p className="text-gray-600">
              Horário: {unit.openingHours}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${unit.coordinates.lat},${unit.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <Navigation className="w-4 h-4" />
              Como chegar
            </a>
            <span className="text-xs text-gray-500">
              ID: {unit.id}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}