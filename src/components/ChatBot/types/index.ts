import type { ReactNode } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string | ReactNode;
  timestamp: Date;
}

export type UrgencyLevel = 'baixa' | 'média' | 'alta' | 'emergência';
export type FacilityType = 'UBS' | 'UPA' | 'Hospital' | 'AME' | 'Pronto Socorro';

export interface Specialty {
  name: string;
  availableNow: boolean;
  nextAvailableTime?: string;
}

export interface HealthUnit {
  id: string;
  name: string;
  type: FacilityType;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  distance?: number;
  waitTime: number;
  occupancyRate: number;
  maxUrgencyLevel: UrgencyLevel;
  specialties: Specialty[];
  services: string[];
  openingHours: string;
  currentCapacity: {
    total: number;
    available: number;
  };
}