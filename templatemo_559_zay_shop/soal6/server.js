import express, { response } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hostname = "127.0.0.1";
const port = 3001;

const dataFilePath = `${__dirname}/../public/archive.json`;
let archiveData;

fs.readFile(dataFilePath, (err, data) => {
  archiveData = JSON.parse(data);
});

app.get("/range-suhu-setahun", (req, res) => {
  const { time, temperature_2m_max, temperature_2m_min } = archiveData.daily;

  let minTemp = Infinity;
  let maxTemp = -Infinity;
  let tgl_min, tgl_max;
  time.forEach((date, index) => {
    const tempMax = temperature_2m_max[index];
    const tempMin = temperature_2m_min[index];

    if (tempMin < minTemp) {
      minTemp = tempMin;
      tgl_min = date;
    }
    if (tempMax > maxTemp) {
      maxTemp = tempMax;
      tgl_max = date;
    }
  });

  res.json({
    message: "GET / range-suhu-setahun:",
    response: {
      tgl_min,
      min: minTemp,
      tgl_max,
      max: maxTemp,
    },
  });
});

app.get("/suhu-melebihi/:suhu", (req, res) => {
  const besarSuhu = parseFloat(req.params.suhu);
  const { time, temperature_2m_max } = archiveData.daily;
  const suhuMelebihi = [];

  time.forEach((date, index) => {
    const temp = temperature_2m_max[index];
    if (temp > besarSuhu) {
      suhuMelebihi.push({ suhu: temp, tgl: date });
    }
  });

  res.json({
    message: `GET /suhu-melebihi/${besarSuhu}`,
    response: {
      total: suhuMelebihi.length,
      tgl: suhuMelebihi,
    },
  });
});

app.get("/suhu-dibawah/:suhu", (req, res) => {
  const besarSuhu = parseFloat(req.params.suhu);
  const { time, temperature_2m_min } = archiveData.daily;
  const suhuDibawah = [];

  time.forEach((date, index) => {
    const temp = temperature_2m_min[index];
    if (temp < besarSuhu) {
      suhuDibawah.push({ suhu: temp, tgl: date });
    }
  });

  res.json({
    message: `GET /suhu-dibawah/${besarSuhu}`,
    response: {
      total: suhuDibawah.length,
      tgl: suhuDibawah,
    },
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
