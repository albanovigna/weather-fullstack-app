import express from "express";
import axios from "axios";
import { CityWeather, CityForecast } from "../types";
// import { Coordinates } from "../types";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

const router = express.Router();
const API_KEY = process.env.API_KEY;
// const API_KEY_2 = process.env.API_KEY_2;
// const weekDay = new Date(val.dt * 1000).toLocaleString("en-us", {
//   weekday: "long"
// });

router.get("/", async (req, res) => {
  try {
    // if (!req.body) {
    const { queryCity } = req.query;
    const city = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${API_KEY}&units=metric`
    );
    const cityObject: CityWeather = {
      name: city.data.name,
      temperature: city.data.main.temp,
      lat: city.data.coord.lat,
      lon: city.data.coord.lon,
    };
    res.status(200).json(cityObject);
    // } else {
    // console.log(req.body);
    // const { lat, lon } = req.body;
    // const city = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    // );
    // const cityObject: CityWeather = {
    //   name: city.data.name,
    //   temperature: city.data.main.temp,
    // };
    // res.status(200).json(cityObject);
    // }
  } catch (error) {
    res.status(400).send("Error in the http request");
  }
});

router.get("/body", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const city = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const cityObject: CityWeather = {
      name: city.data.name,
      temperature: city.data.main.temp,
      lat: city.data.coord.lat,
      lon: city.data.coord.lon,
    };
    res.status(200).json(cityObject);
  } catch (error) {
    res.status(400).send("Error in the http request");
  }
});

router.get("/forecast", async (req, res) => {
  try {
    const arrayForecast: Array<CityForecast> = [];
    const { lat, lon } = req.query;
    const city = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}&units=metric`
    );
    city.data.daily.map((day: any) => {
      const cityObject: CityForecast = {
        dateTime: day.dt,
        min: day.temp.min,
        max: day.temp.max,
        description: day.weather[0].main,
        icon: day.weather[0].icon,
      };
      arrayForecast.push(cityObject);
    });
    // const cityObject: CityForecast = {
    //   min: city.data.daily[0].temp.min,
    //   max: city.data.daily[0].temp.max,
    //   description: city.data.daily[0].weather[0].main,
    //   icon: city.data.daily[0].weather[0].icon,
    // };
    res.status(200).json(arrayForecast);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in the http request");
  }
});

export default router;
