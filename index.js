const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const todoRouter = require("./routes/todo-routes");


app.get("/", (req, res) => {
  res.send("Welcome to Our API");
});

app.use(express.json());

// Use CORS middleware
app.use(cors());

// Use the todoRouter for the / route
app.use("/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});