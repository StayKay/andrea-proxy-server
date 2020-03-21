const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

app.use(express.static(path.join(__dirname, "/public")));

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
  const { out } = req.params;
  await axios
    .get(`http://localhost:3002/api/reserve/dates/${out}`)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      if (err) throw err;
    });
});

// app.use(
//   "/api/reserve/:locationid",
//   createProxyMiddleware({
//     target: "http://localhost:3002",
//     changeOrigin: true
//   })
// );

// app.use(
//   "/api/reserve/dates/:check:out",
//   createProxyMiddleware({
//     target: "http://localhost:3002",
//     changeOrigin: true
//   })
// );

app.listen(4040, () => {
  console.log("Listening on 4040");
});
