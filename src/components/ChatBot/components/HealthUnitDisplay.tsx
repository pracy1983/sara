import React from 'react';
import { MapPin, Clock, Users, Phone, AlertCircle, Stethoscope } from 'lucide-react';

interface Unit {
  name: string;
  type: string;
  address: string;
  distance: string;
  phone: string;
  waitTime: string;
  occupancyRate: string;
  maxUrgencyLevel: string;
  specialties: string[];
  capacity: {
    total: string;
    available: string;
  };
  openingHours: string;
}

interface HealthUnitDisplayProps {
  units: Unit[];
}

export function HealthUnitDisplay({ units }: HealthUnitDisplayProps) {
  return (
    <div className="space-y-4">
      <p className="font-medium">Encontrei estas unidades próximas a você:</p>
      {units.map((unit, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
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
              <span>{unit.distance}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{unit.phone}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Espera: {unit.waitTime}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Ocupação: {unit.occupancyRate}</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span>Atende até: <span className="font-medium">{unit.maxUrgencyLevel}</span></span>
            </div>
            
            <div className="flex items-center gap-2 text-sm mt-2">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <span>Especialidades: <span className="font-medium">{unit.specialties.join(', ')}</span></span>
            </div>

            <div className="text-sm text-gray-600 mt-2">
              <p>Capacidade: {unit.capacity.available} vagas de {unit.capacity.total}</p>
              <p>Horário: {unit.openingHours}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}