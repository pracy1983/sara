import React from 'react';
import { MapPin, Navigation, Clock, Users, Phone, AlertCircle, Stethoscope, Zap } from 'lucide-react';
import { HealthUnit } from '../types';

interface HealthUnitDisplayProps {
  units: HealthUnit[];
}

export function HealthUnitDisplay({ units }: HealthUnitDisplayProps) {
  // Encontra a unidade com menor tempo de espera
  const fastestUnit = units.reduce((fastest, current) => 
    current.waitTime < fastest.waitTime ? current : fastest
  , units[0]);

  return (
    <div className="space-y-4">
      <p className="font-medium">Encontrei estas unidades próximas a você:</p>
      {units.map((unit) => {
        const isFastest = unit.id === fastestUnit.id;
        
        return (
          <div 
            key={unit.id} 
            className={`relative bg-white rounded-lg p-4 shadow-sm border transition-all duration-300 ${
              isFastest 
                ? 'border-green-200 bg-green-50/30 hover:shadow-lg hover:border-green-300' 
                : 'border-gray-100 hover:shadow-md hover:border-gray-200'
            }`}
          >
            
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-blue-600">{unit.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                  {unit.type}
                </span>
                {isFastest && (
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500 text-white flex items-center gap-1 animate-pulse">
                    <Zap className="w-3 h-3" />
                    Mais Rápido
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mt-1 mb-2">{unit.address}</p>
            
            <div className="text-xs text-gray-500 mb-3">
              {unit.type === 'UPA' && 
                "Procure a UPA em casos de urgência e emergência"
              }
              {unit.type === 'UBS' && 
                "Procure a UBS para atendimentos de rotina e prevenção de doenças"
              }
              {unit.type === 'Hospital' && 
                "Procure o Hospital em casos de maior complexidade e internação"
              }
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{unit.distance?.toFixed(1)} km</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{unit.phone}</span>
              </div>
              
              <div className={`flex items-center gap-2 text-sm ${
                isFastest ? 'text-green-600 font-medium' : 'text-gray-600'
              }`}>
                <Clock className={`w-4 h-4 ${isFastest ? 'text-green-600' : ''}`} />
                <span>Espera: ~{unit.waitTime} min</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Ocupação: {unit.occupancyRate}%</span>
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

            <div className="mt-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${unit.coordinates.lat},${unit.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <Navigation className="w-4 h-4" />
                Como chegar
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}