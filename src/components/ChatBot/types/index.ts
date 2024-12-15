import type { ReactNode } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string | ReactNode;
  timestamp: Date;
}

export interface HealthUnit {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  waitTime: number;
  distance?: number;
}