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