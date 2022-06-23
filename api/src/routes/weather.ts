import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = process.env.API_KEY;

// const getCityWeatherByQuery = () => {

// };

router.get("/", async (req, res) => {
  try {
    const { queryCity } = req.query;
    const city = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${API_KEY}&units=metric`
    );
    res.json(city.data);
  } catch (error) {
    res.status(400).send("Error in the http request");
  }
});

export default router;
