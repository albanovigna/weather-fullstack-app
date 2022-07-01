import express from "express"; // ESModules
import "dotenv/config";
// const express = require('express') -> commonjs
import weather from "./routes/weather";
// import diaryRouter from './routes/diaries'

const app = express();
import bodyParser from "body-parser";
app.use(express.json()); // middleware que transforma la req.body a un json

const PORT = 3001;
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// app.get('/ping', (_req, res) => {
//   console.log('someone pinged here!!')
//   res.send('pong')
// })

// app.use('/api/diaries', diaryRouter)

app.use("/weather", weather);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
