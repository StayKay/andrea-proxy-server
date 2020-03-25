const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/reviews/:locationId", async (req, res) => {
  const { locationId } = req.params;
  await axios
    .get(`http://localhost:3000/api/reviews/${locationId}`)
    .then(result => {
      res.send(result.data);
    });
  res.end();
});

app.get("/api/reserve/:locationId", async (req, res) => {
  const { locationId } = req.params;
  await axios
    .get(`http://localhost:3002/api/reserve/${locationId}`)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      if (err) throw err;
    });
  res.end();
});

app.get("/api/reserve/dates/:check:out", async (req, res) => {
  const { check, out } = req.params;
  await axios
    .get(`http://localhost:3002/api/reserve/dates/:${check}:${out}`)
    .then(result => {
      res.json(result.data);
    })
    .catch(err => {
      if (err) throw err;
    });
});

app.post("/api/reserve/book/:locationId", async (req, res) => {
  const { dates, locationId } = req.body;
  await axios
    .post(`http://localhost:3002/api/reserve/book/:${locationId}`, {
      dates,
      locationId
    })
    .then(() => {
      res.end();
    })
    .catch(err => {
      if (err) throw err;
    });
});

app.get("/photogallery", async (req, res) => {
  await axios
    .get("http://localhost:3001/photogallery")
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.listen(4040, () => {
  console.log("Listening on http://localhost:4040");
});
