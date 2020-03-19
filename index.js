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

app.listen(4040, () => {
  console.log("Listening on 4040");
});
