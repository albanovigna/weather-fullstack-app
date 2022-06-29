import axios from "axios";
import { CityWeather, Coordinates, CityForecast } from "./vite-env";

declare module "axios" {
  export interface AxiosRequestConfig {
    lat: number;
    lon: number;
  }
}

export const getCityInfo = async (city: String): Promise<CityWeather> => {
  const result = await axios.get(
    `http://localhost:3001/weather?queryCity=${city}`
  );
  return result.data;
};

export const getCityInfoByBody = async (
  coord: Coordinates
): Promise<CityWeather> => {
  console.log(coord, "coords es");
  const result = await axios.get(
    `http://localhost:3001/weather/body?lat=${coord.lat}&lon=${coord.lon}`,
    coord
  );
  return result.data;
};

export const getCityForecast = async (
  coord: Coordinates
): Promise<Array<CityForecast>> => {
  const result = await axios.get(
    `http://localhost:3001/weather/forecast?lat=${coord.lat}&lon=${coord.lon}`,
    coord
  );
  return result.data;
};

// export default getCityInfo;
