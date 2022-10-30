const axios = require("axios");
const express = require("express");
const app = express();
const port = 3002;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
