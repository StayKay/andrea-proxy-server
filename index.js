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
    .get(
      `http://ec2-54-183-24-91.us-west-1.compute.amazonaws.com:3000/api/reviews/5`
    )
    .then(result => {
      res.send(result.data);
    });
  res.end();
});

app.get("/api/reserve/:locationId", async (req, res) => {
  const { locationId } = req.params;
  await axios
    .get(
      `http://ec2-52-14-244-249.us-east-2.compute.amazonaws.com:3002/api/reserve/${locationId}`
    )
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
    .get(
      `http://ec2-52-14-244-249.us-east-2.compute.amazonaws.com:3002/api/reserve/dates/:${check}:${out}`
    )
    .then(result => {
      res.json(result.data);
    })
    .catch(err => {
      if (err) throw err;
    });
});

app.post(
  "http://ec2-52-14-244-249.us-east-2.compute.amazonaws.com:3002/api/reserve/book/:locationId",
  async (req, res) => {
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
  }
);

app.get("/api/location/1", async (req, res) => {
  // const { locationId } = req.body;
  await axios
    .get(
      `http://ec2-18-144-27-212.us-west-1.compute.amazonaws.com:4001/api/location/1`
    )
    .then(result => {
      res.send(result.data);
    });
  res.end();
});

app.get("/api/user/1", async (req, res) => {
  // const { locationId } = req.body;
  await axios
    .get(
      `http://ec2-18-144-27-212.us-west-1.compute.amazonaws.com:4001/api/user/1`
    )
    .then(result => {
      res.send(result.data);
    });
  res.end();
});

app.get("/api/amenities/1", async (req, res) => {
  const { locationId } = req.body;
  await axios
    .get(
      `http://ec2-18-144-27-212.us-west-1.compute.amazonaws.com:4001/api/amenities/1`
    )
    .then(result => {
      res.send(result.data);
    });
  res.end();
});
app.get("/photogallery", async (req, res) => {
  await axios
    .get(
      "http://ec2-13-52-182-227.us-west-1.compute.amazonaws.com:3001/photogallery"
    )
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
