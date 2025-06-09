const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");

dbConnect();

const app = express();

// Midleware
app.use(express.json());

// Welcome to the page
app.get("/", (req, res) => {
  res.send("Hello and welcome");
});

// Routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
