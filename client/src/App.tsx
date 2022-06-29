import { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { CityWeather, CityForecast } from "./vite-env";
import { getCityInfo, getCityInfoByBody, getCityForecast } from "./utils";

function App() {
  const [cityInfo, setCityInfo] = useState<CityWeather>();
  const [city, setCity] = useState("");
  const [forecast, SetForecast] = useState<Array<CityForecast>>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      const coordinates = {
        lat: success.coords.latitude,
        lon: success.coords.longitude,
      };
      console.log(coordinates, "coo es");
      getCityInfoByBody(coordinates).then((data) => setCityInfo(data));
      getCityForecast(coordinates).then((data) => SetForecast(data));
    });

    // getCityInfo(city).then((data) => setCityInfo(data));
  }, []);
  useEffect(() => {
    cityInfo
      ? getCityForecast({ lat: cityInfo.lat, lon: cityInfo.lon }).then((data) =>
          SetForecast(data)
        )
      : null;
  }, [cityInfo]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCity(e.currentTarget.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // getCityForecast(coordinates).then((data) => SetForecast(data));
    getCityInfo(city).then((data) => setCityInfo(data));
    // cityInfo
    //   ? getCityForecast({ lat: cityInfo.lat, lon: cityInfo.lon }).then((data) =>
    //       SetForecast(data)
    //     )
    //   : null;
    // cityInfo?getCityForecast({cityInfo.lat, cityInfo.lon}) : null
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={city}
          onChange={handleChange}
          placeholder="Search city..."
        />
        <button type="submit">Submit</button>
      </form>
      <h3>{cityInfo?.name}</h3>
      <h3>{cityInfo?.temperature}</h3>
      {/* const weekDay = new Date(val.dt * 1000).toLocaleString("en-us", {
  weekday: "long"
}); */}
      {forecast?.map((day) => {
        return (
          <div>
            <h3>
              {new Date(day.dateTime * 1000).toLocaleString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <h3>{day.max}</h3>
            <h3>{day.min}</h3>
            <h3>{day.description}</h3>
            <img
              src={`http://openweathermap.org/img/w/${day.icon}.png`}
              alt=""
            />
            {/* <h3>{`http://openweathermap.org/img/w/${day.icon}.png`}</h3> */}
          </div>
        );
      })}
    </div>
  );
}

export default App;
