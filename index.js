const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
  res.send("Welcome to Our API");
});

app.use(express.json());

// Use CORS middleware
app.use(cors());