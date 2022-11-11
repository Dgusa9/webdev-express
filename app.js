const axios = require("axios");
const express = require("express");
const app = express();
const port = 3002;

const googleApiKey = "AIzaSyC23pRb8ueQJiIc99GP9Z7_tgjg9KkN3k4";

app.get("/autocomplete/:text", async (req, res) => {
  const API_KEY =
    "4YOz0Q3d2ZErUMi0QIYBrmYpfTXhzfJ2LQa-jaNkS9Nhyy6h5NmlaRANT7cJbobyff7P3aHPy28VfMCcaAhK7Z6nlPwTCodIf0YYXtJEJ-4tzy5d5jiyLzbZdSc6Y3Yx";
  const headers = { Authorization: `bearer ${API_KEY}` };
  try {
    const data = await axios.get(
      "https://api.yelp.com/v3/autocomplete?text=" + req.params.text,
      { headers }
    );
    res.json(data.data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/submit/:location/:category/:keyword/:distance", async (req, res) => {
  console.log("i am here", req.params);
  try {
    const googleResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        req.params.location +
        "&key=" +
        googleApiKey
    );
    console.log("google response", googleResponse);
    const { lat: latitude, lng: longitude } =
      googleResponse.data.results[0].geometry.location;

    const API_KEY =
      "4YOz0Q3d2ZErUMi0QIYBrmYpfTXhzfJ2LQa-jaNkS9Nhyy6h5NmlaRANT7cJbobyff7P3aHPy28VfMCcaAhK7Z6nlPwTCodIf0YYXtJEJ-4tzy5d5jiyLzbZdSc6Y3Yx";
    const headers = { Authorization: `Bearer ${API_KEY}` };
    const data = await axios.get(
      "https://api.yelp.com/v3/businesses/search?term=" +
        req.params.keyword +
        "&latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&categories=" +
        req.params.category +
        "&radius=" +
        req.params.distance,
      { headers }
    );
    res.json(data.data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
