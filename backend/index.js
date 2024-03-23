const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

app.post("/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/predict",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error making prediction");
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
