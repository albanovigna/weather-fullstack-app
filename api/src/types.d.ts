import { Weather, Visibility } from "./enums";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export interface CityWeather {
  name: string;
  temperature: number;
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

export interface Coordinates {
  lat: number;
  lon: number;
}

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export * from "./types";
