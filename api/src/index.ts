import express from "express"; // ESModules
import "dotenv/config";
// const express = require('express') -> commonjs
import weather from "./routes/weather";
// import diaryRouter from './routes/diaries'

const app = express();
app.use(express.json()); // middleware que transforma la req.body a un json

const PORT = 3000;

// app.get('/ping', (_req, res) => {
//   console.log('someone pinged here!!')
//   res.send('pong')
// })

// app.use('/api/diaries', diaryRouter)

app.use("/weather", weather);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
