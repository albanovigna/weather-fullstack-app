/// <reference types="vite/client" />

export interface CityWeather {
  name: string;
  temperature: number;
  lat: number;
  lon: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CityForecast {
  dateTime: number;
  min: number;
  max: number;
  description: string;
  icon: string;
}
