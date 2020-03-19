const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  axios.get("http://localhost:3000/api/reviews/1").then(result => {
    console.log(result);
    res.send(result.data);
  });
});

app.listen(4040, () => {
  console.log("Listening on 4040");
});
