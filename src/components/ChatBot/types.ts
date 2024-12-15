export interface HealthUnit {
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

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  healthUnits?: HealthUnit[];
}
